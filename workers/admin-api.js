const REPO_OWNER = 'larskristel-max';
const REPO_NAME = 'brasserie-chateau-durbuy-2026';
const BRANCH = 'main';
const ARTICLES_PATH = 'content/journal/articles.json';
const IMAGE_ASSET_DIR = 'src/assets/journal/';
const SESSION_TTL_SECONDS = 8 * 60 * 60;

const DEFAULT_ALLOWED_ORIGINS = [
  'http://127.0.0.1:4188',
  'http://localhost:4188',
  'https://larskristel-max.github.io',
  'https://brasseriechateaudurbuy.be',
  'https://www.brasseriechateaudurbuy.be'
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      const url = new URL(request.url);
      if (url.pathname === '/api/login' && request.method === 'POST') {
        return json(await login(request, env), 200, cors);
      }

      const session = await requireSession(request, env);
      if (!session.ok) return json({ error: 'unauthorized' }, 401, cors);

      if (url.pathname === '/api/articles' && request.method === 'GET') {
        return json(await fetchArticles(env), 200, cors);
      }

      if (url.pathname === '/api/articles' && request.method === 'PUT') {
        return json(await saveArticles(request, env), 200, cors);
      }

      if (url.pathname === '/api/assets' && request.method === 'PUT') {
        return json(await saveAsset(request, env), 200, cors);
      }

      return json({ error: 'not_found' }, 404, cors);
    } catch (error) {
      const status = error.status || 500;
      return json({ error: error.message || 'server_error' }, status, cors);
    }
  }
};

async function login(request, env) {
  const { email, password } = await readJson(request);
  const expectedEmail = String(env.ADMIN_EMAIL || '').trim().toLowerCase();
  const expectedPassword = String(env.ADMIN_PASSWORD || '');

  if (!expectedEmail || !expectedPassword || !env.ADMIN_SESSION_SECRET || !env.GITHUB_TOKEN) {
    throw httpError(500, 'admin_not_configured');
  }

  if (String(email || '').trim().toLowerCase() !== expectedEmail || String(password || '') !== expectedPassword) {
    throw httpError(401, 'invalid_credentials');
  }

  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = base64UrlEncode(JSON.stringify({ sub: expectedEmail, exp }));
  const signature = await sign(payload, env.ADMIN_SESSION_SECRET);
  return { token: `${payload}.${signature}`, expiresAt: exp };
}

async function requireSession(request, env) {
  const header = request.headers.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false };

  const [payload, signature] = parts;
  const expected = await sign(payload, env.ADMIN_SESSION_SECRET || '');
  if (!timingSafeEqual(signature, expected)) return { ok: false };

  let data;
  try {
    data = JSON.parse(base64UrlDecode(payload));
  } catch {
    return { ok: false };
  }

  if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) return { ok: false };
  return { ok: true, email: data.sub };
}

async function fetchArticles(env) {
  const response = await githubFetch(env, githubContentsUrl(ARTICLES_PATH) + `?ref=${BRANCH}`);
  if (response.status === 404) {
    return { data: { version: 1, articles: [] }, sha: null };
  }
  if (!response.ok) throw await githubError(response);

  const file = await response.json();
  const text = decodeBase64Utf8(String(file.content || '').replace(/\n/g, ''));
  return { data: JSON.parse(text), sha: file.sha };
}

async function saveArticles(request, env) {
  const { data, sha, message } = await readJson(request);
  if (!data || !Array.isArray(data.articles)) throw httpError(400, 'invalid_articles_payload');

  const body = {
    message: message || 'Update journal articles',
    content: encodeBase64Utf8(JSON.stringify(data, null, 2) + '\n'),
    branch: BRANCH
  };
  if (sha) body.sha = sha;

  const response = await githubFetch(env, githubContentsUrl(ARTICLES_PATH), {
    method: 'PUT',
    body: JSON.stringify(body)
  });
  if (!response.ok) throw await githubError(response);

  const result = await response.json();
  return { sha: result.content.sha };
}

async function saveAsset(request, env) {
  const { path, base64Content, message } = await readJson(request);
  const cleanPath = String(path || '');
  if (!cleanPath.startsWith(IMAGE_ASSET_DIR) || !cleanPath.endsWith('.webp')) {
    throw httpError(400, 'invalid_asset_path');
  }
  if (!base64Content || !/^[A-Za-z0-9+/=]+$/.test(base64Content)) {
    throw httpError(400, 'invalid_asset_content');
  }

  const response = await githubFetch(env, githubContentsUrl(cleanPath), {
    method: 'PUT',
    body: JSON.stringify({
      message: message || 'Add journal image',
      content: base64Content,
      branch: BRANCH
    })
  });
  if (!response.ok) throw await githubError(response);

  return response.json();
}

function githubContentsUrl(path) {
  return `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path.split('/').map(encodeURIComponent).join('/')}`;
}

function githubFetch(env, url, init = {}) {
  return fetch(url, {
    ...init,
    headers: {
      'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'brasserie-chateau-durbuy-admin',
      ...(init.headers || {})
    }
  });
}

async function githubError(response) {
  const body = await response.text();
  return httpError(response.status, `github_${response.status}: ${body.slice(0, 500)}`);
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw httpError(400, 'invalid_json');
  }
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

function corsHeaders(origin, env) {
  const configured = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
  const allowed = configured.length ? configured : DEFAULT_ALLOWED_ORIGINS;
  const allowedOrigin = allowed.includes(origin) ? origin : allowed[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin'
  };
}

async function sign(payload, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return base64UrlEncodeBytes(new Uint8Array(signature));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

function encodeBase64Utf8(value) {
  let binary = '';
  new TextEncoder().encode(value).forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function decodeBase64Utf8(value) {
  const binary = atob(value);
  return new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0)));
}

function base64UrlEncode(value) {
  return base64UrlEncodeBytes(new TextEncoder().encode(value));
}

function base64UrlEncodeBytes(bytes) {
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
  return decodeBase64Utf8(padded);
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
