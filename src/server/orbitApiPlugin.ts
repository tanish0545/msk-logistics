import type { Plugin } from 'vite';
import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { ORBIT_SYSTEM_INSTRUCTION, getLocalGroundedResponse } from '../data/orbitKnowledge.ts';
import contactHandler from '../../api/contact.ts';
import quoteHandler from '../../api/quote.ts';

/**
 * Reads GEMINI_API_KEY exclusively from backend environment variables or server-side .env
 * NEVER exposed to client bundles or frontend window globals.
 */
function getBackendGeminiApiKey(): string {
  // 1. Process environment (server only)
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
    return process.env.GEMINI_API_KEY.trim();
  }

  // 2. Check server-side .env file in project root
  const projectEnv = path.join(process.cwd(), '.env');
  if (fs.existsSync(projectEnv)) {
    try {
      const content = fs.readFileSync(projectEnv, 'utf-8');
      const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
      if (match && match[1]) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
    } catch { }
  }

  // 3. Check ~/.env in home directory
  const homeEnv = path.join(os.homedir(), '.env');
  if (fs.existsSync(homeEnv)) {
    try {
      const content = fs.readFileSync(homeEnv, 'utf-8');
      const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
      if (match && match[1]) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
    } catch { }
  }

  return '';
}

function getGeminiBaseUrl(): string {
  if (process.env.GEMINI_API_BASE_URL && process.env.GEMINI_API_BASE_URL.trim()) {
    return process.env.GEMINI_API_BASE_URL.trim().replace(/\/+$/, '');
  }
  const projectEnv = path.join(process.cwd(), '.env');
  if (fs.existsSync(projectEnv)) {
    try {
      const content = fs.readFileSync(projectEnv, 'utf-8');
      const match = content.match(/^GEMINI_API_BASE_URL=(.+)$/m);
      if (match && match[1]) {
        return match[1].trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
      }
    } catch { }
  }
  return 'https://generativelanguage.googleapis.com';
}

export type EngineStatus = 'gemini-active' | 'local-mode' | 'unavailable';

function adaptVercelHandler(handler: (req: any, res: any) => Promise<any>) {
  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    let bodyStr = '';
    req.on('data', chunk => { bodyStr += chunk; });
    req.on('end', async () => {
      let body: any = {};
      try {
        body = bodyStr ? JSON.parse(bodyStr) : {};
      } catch {
        body = bodyStr;
      }
      const enhancedReq = Object.assign(req, {
        body,
        socket: req.socket,
        headers: req.headers,
        method: req.method,
      });
      const enhancedRes = Object.assign(res, {
        status(code: number) {
          res.statusCode = code;
          return enhancedRes;
        },
        json(data: any) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return enhancedRes;
        },
      });
      try {
        await handler(enhancedReq, enhancedRes);
      } catch (err: any) {
        console.error('[API Adapter Error]:', err);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            success: false,
            error: 'Internal Server Error',
            message: err?.message || 'Server error occurred',
          }));
        }
      }
    });
  };
}

interface VerificationCache {
  status: EngineStatus;
  label: string;
  verified: boolean;
  model: string | null;
  error?: string;
  checkedAt: number;
}

let verificationCache: VerificationCache | null = null;

async function checkGeminiStatus(apiKey: string): Promise<VerificationCache> {
  if (!apiKey) {
    return {
      status: 'local-mode',
      label: '',
      verified: false,
      model: null,
      checkedAt: Date.now(),
    };
  }

  // Return cached result if verified recently (within 45 seconds)
  if (verificationCache && Date.now() - verificationCache.checkedAt < 45000) {
    return verificationCache;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    // Verify key with a lightweight models list request
    const testUrl = `${getGeminiBaseUrl()}/v1beta/models?key=${apiKey}`;
    const testRes = await fetch(testUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (testRes.ok) {
      verificationCache = {
        status: 'gemini-active',
        label: 'MSK Orbit AI Active',
        verified: true,
        model: 'gemini-1.5-flash',
        checkedAt: Date.now(),
      };
      return verificationCache;
    } else {
      let friendlyError = 'Google Gemini API responded with error';
      if (testRes.status === 400 || testRes.status === 403) {
        friendlyError = 'Invalid or unauthorized GEMINI_API_KEY';
      } else if (testRes.status === 429) {
        friendlyError = 'Gemini API rate limit reached';
      }
      verificationCache = {
        status: 'unavailable',
        label: 'AI Temporarily Unavailable',
        verified: false,
        model: null,
        error: friendlyError,
        checkedAt: Date.now(),
      };
      return verificationCache;
    }
  } catch (err: any) {
    verificationCache = {
      status: 'unavailable',
      label: 'AI Temporarily Unavailable',
      verified: false,
      model: null,
      error: err?.message || 'Network connectivity error',
      checkedAt: Date.now(),
    };
    return verificationCache;
  }
}

export function mskOrbitApiPlugin(): Plugin {
  const handler = async (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => {
    const url = req.url?.split('?')[0];

    // Status endpoint: verifies connection before reporting active
    if (url === '/api/orbit-chat/status' && req.method === 'GET') {
      const apiKey = getBackendGeminiApiKey();
      const statusInfo = await checkGeminiStatus(apiKey);

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(statusInfo));
      return;
    }

    // Contact Us API endpoint (local dev and preview simulation)
    if (url === '/api/contact' && req.method === 'POST') {
      adaptVercelHandler(contactHandler)(req, res);
      return;
    }

    // Request a Quote API endpoint (local dev and preview simulation)
    if (url === '/api/quote' && req.method === 'POST') {
      adaptVercelHandler(quoteHandler)(req, res);
      return;
    }

    // Chat completion endpoint
    if (url === '/api/orbit-chat' && req.method === 'POST') {
      let bodyStr = '';
      req.on('data', chunk => bodyStr += chunk);
      req.on('end', async () => {
        res.setHeader('Content-Type', 'application/json');

        let parsed: any = {};
        try {
          parsed = JSON.parse(bodyStr || '{}');
        } catch {
          parsed = {};
        }

        const prompt = (parsed.prompt || parsed.message || '').trim();
        const history = Array.isArray(parsed.conversationHistory)
          ? parsed.conversationHistory
          : Array.isArray(parsed.history)
            ? parsed.history
            : [];

        const apiKey = getBackendGeminiApiKey();
        if (!apiKey) {
          // Graceful fallback to verified MSK Logistics Solution Artificial Intelligence
          const localReply = getLocalGroundedResponse(prompt);
          res.statusCode = 200;
          res.end(JSON.stringify({
            status: 'local-mode',
            label: '',
            reply: localReply,
            fallback: true,
            message: 'GEMINI_API_KEY is not configured in backend environment.'
          }));
          return;
        }

        try {
          // Format contents for Gemini REST API
          const contents = [
            ...history.map((h: { role: string; content: string }) => ({
              role: h.role === 'user' ? 'user' : 'model',
              parts: [{ text: h.content }],
            })),
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ];

          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 12000);
          const geminiUrl = `${getGeminiBaseUrl()}/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

          const geminiRes = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: ORBIT_SYSTEM_INSTRUCTION }],
              },
              contents,
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 800,
              },
            }),
            signal: controller.signal,
          });
          clearTimeout(timeout);

          if (!geminiRes.ok) {
            console.error('[MSK ORBIT] Gemini call failed with status:', geminiRes.status);
            const localReply = getLocalGroundedResponse(prompt);
            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'unavailable',
              label: 'AI Temporarily Unavailable',
              reply: localReply,
              fallback: true,
              error: `Gemini API returned ${geminiRes.status}`,
            }));
            return;
          }

          const geminiJson = (await geminiRes.json()) as any;
          const candidate = geminiJson.candidates?.[0];
          const text = candidate?.content?.parts?.[0]?.text || '';

          // Reset cache to active on successful inference
          verificationCache = {
            status: 'gemini-active',
            label: 'MSK Orbit AI Active',
            verified: true,
            model: 'gemini-1.5-flash',
            checkedAt: Date.now(),
          };

          res.end(JSON.stringify({
            status: 'gemini-active',
            label: 'MSK Orbit AI Active',
            reply: text,
            fallback: false,
          }));
        } catch (error: any) {
          console.error('[MSK ORBIT] Server chat handler error:', error?.message);
          const localReply = getLocalGroundedResponse(prompt);
          res.statusCode = 200;
          res.end(JSON.stringify({
            status: 'unavailable',
            label: 'AI Temporarily Unavailable',
            reply: localReply,
            fallback: true,
            error: error?.message || 'Server error',
          }));
        }
      });
      return;
    }

    next();
  };

  return {
    name: 'msk-orbit-api-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}
