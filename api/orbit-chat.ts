// Serverless API endpoint for Vercel: /api/orbit-chat
import { ORBIT_SYSTEM_INSTRUCTION, getLocalGroundedResponse } from '../src/data/orbitKnowledge';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST requests are supported.',
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch { }
  }

  const prompt = (body?.prompt || body?.message || '').trim();
  const history = Array.isArray(body?.conversationHistory)
    ? body.conversationHistory
    : Array.isArray(body?.history)
      ? body.history
      : [];

  const apiKey = process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    const localReply = getLocalGroundedResponse(prompt);
    return res.status(200).json({
      status: 'local-mode',
      reply: localReply,
      fallback: true,
      message: 'GEMINI_API_KEY is not configured in backend environment.'
    });
  }

  try {
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
    const baseUrl = (process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com').replace(/\/+$/, '');
    const geminiUrl = `${baseUrl}/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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
      const localReply = getLocalGroundedResponse(prompt);
      return res.status(200).json({
        status: 'unavailable',
        label: 'AI Temporarily Unavailable',
        reply: localReply,
        fallback: true,
        error: `Gemini API returned ${geminiRes.status}`,
      });
    }

    const geminiJson = await geminiRes.json();
    const candidate = geminiJson.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text || '';

    return res.status(200).json({
      status: 'gemini-active',
      label: 'MSK Orbit AI Active',
      reply: text,
      fallback: false,
    });
  } catch (error: any) {
    const localReply = getLocalGroundedResponse(prompt);
    return res.status(200).json({
      status: 'unavailable',
      label: 'AI Temporarily Unavailable',
      reply: localReply,
      fallback: true,
      error: error?.message || 'Server error',
    });
  }
}
