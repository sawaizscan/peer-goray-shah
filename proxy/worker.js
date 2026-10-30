// Cloudflare Worker: keeps the Gemini API key secret.
// The website sends its chat request here; this adds the key and forwards it to Google.

const ALLOWED_ORIGINS = ['https://pirgorayshah.live', 'https://www.pirgorayshah.live'];
const MODELS = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-2.5-flash-lite'];
const MAX_BODY_CHARS = 60000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST' || !allowed) return new Response('Forbidden', { status: 403, headers: cors });

    const raw = await request.text();
    if (raw.length > MAX_BODY_CHARS) return new Response('Too large', { status: 413, headers: cors });

    let data;
    try { data = JSON.parse(raw); } catch (e) { return new Response('Bad request', { status: 400, headers: cors }); }
    if (!MODELS.includes(data.model) || typeof data.payload !== 'object' || !data.payload) {
      return new Response('Bad request', { status: 400, headers: cors });
    }

    const upstream = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' + data.model + ':generateContent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body: JSON.stringify(data.payload)
      }
    );
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { ...cors, 'Content-Type': 'application/json' }
    });
  }
};
