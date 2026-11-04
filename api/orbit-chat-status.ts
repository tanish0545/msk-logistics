// Serverless API endpoint for Vercel: /api/orbit-chat-status (or /api/orbit-chat/status via rewrites)

export default async function handler(req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY || '';

  if (!apiKey) {
    return res.status(200).json({
      status: 'local-mode',
      verified: false,
      model: null,
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const baseUrl = (process.env.GEMINI_API_BASE_URL || 'https://generativelanguage.googleapis.com').replace(/\/+$/, '');
    const testUrl = `${baseUrl}/v1beta/models?key=${apiKey}`;
    const testRes = await fetch(testUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (testRes.ok) {
      return res.status(200).json({
        status: 'gemini-active',
        label: 'Gemini AI Active',
        verified: true,
        model: 'gemini-1.5-flash',
      });
    }

    return res.status(200).json({
      status: 'unavailable',
      label: 'AI Temporarily Unavailable',
      verified: false,
      model: null,
      error: `Gemini verification returned ${testRes.status}`,
    });
  } catch (err: any) {
    return res.status(200).json({
      status: 'unavailable',
      label: 'AI Temporarily Unavailable',
      verified: false,
      model: null,
      error: err?.message || 'Network error',
    });
  }
}
