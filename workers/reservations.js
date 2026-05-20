const RESEND_EMAILS_URL = 'https://api.resend.com/emails';
const MAX_FIELD_LENGTH = 2000;

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

    if (request.method !== 'POST') {
      return json({ error: 'method_not_allowed' }, 405, cors);
    }

    try {
      const url = new URL(request.url);
      if (url.pathname === '/api/order-request' || url.pathname === '/') {
        const payload = await readJson(request);
        if (looksLikeLegacyReservation(payload)) {
          return json(await sendReservationRequest(payload, env), 200, cors);
        }
        return json(await sendOrderRequest(payload, env), 200, cors);
      }

      return json({ error: 'not_found' }, 404, cors);
    } catch (error) {
      const status = error.status || 500;
      return json({ error: error.message || 'server_error' }, status, cors);
    }
  }
};

async function sendOrderRequest(payload, env) {
  const honeypot = clean(payload.website, 200);
  if (honeypot) return { ok: true };

  const type = clean(payload.type, 40);
  const name = clean(payload.name, 120);
  const email = clean(payload.email, 180);
  const phone = clean(payload.phone, 80);
  const vat = clean(payload.vat, 80);
  const message = clean(payload.message, MAX_FIELD_LENGTH);
  const language = clean(payload.language, 12);

  if (!name || !email || !message) throw httpError(400, 'missing_required_fields');
  if (!isValidEmail(email)) throw httpError(400, 'invalid_email');

  const to = clean(env.ORDER_TO_EMAIL || env.RESERVATION_TO_EMAIL || '', 240);
  const from = clean(env.ORDER_FROM_EMAIL || env.FROM_EMAIL || '', 240);
  if (!env.RESEND_API_KEY || !to || !from) throw httpError(500, 'email_not_configured');

  const subject = `Demande de commande - ${name}`;
  const text = [
    'Nouvelle demande de commande depuis le site.',
    '',
    `Type de demande: ${type || 'Non precise'}`,
    `Nom: ${name}`,
    `Adresse e-mail: ${email}`,
    phone ? `Telephone: ${phone}` : '',
    vat ? `Numero de TVA: ${vat}` : '',
    language ? `Langue du site: ${language}` : '',
    '',
    'Quantite souhaitee / message:',
    message,
    '',
    'Note: demande sans confirmation automatique de prix ou de disponibilite.'
  ].filter(Boolean).join('\n');

  const html = [
    '<p>Nouvelle demande de commande depuis le site.</p>',
    '<dl>',
    `<dt>Type de demande</dt><dd>${escapeHtml(type || 'Non precise')}</dd>`,
    `<dt>Nom</dt><dd>${escapeHtml(name)}</dd>`,
    `<dt>Adresse e-mail</dt><dd>${escapeHtml(email)}</dd>`,
    phone ? `<dt>Telephone</dt><dd>${escapeHtml(phone)}</dd>` : '',
    vat ? `<dt>Numero de TVA</dt><dd>${escapeHtml(vat)}</dd>` : '',
    language ? `<dt>Langue du site</dt><dd>${escapeHtml(language)}</dd>` : '',
    '</dl>',
    '<p><strong>Quantite souhaitee / message</strong></p>',
    `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    '<p><em>Demande sans confirmation automatique de prix ou de disponibilite.</em></p>'
  ].filter(Boolean).join('');

  return sendEmail(env, { from, to, reply_to: email, subject, text, html });
}

async function sendReservationRequest(payload, env) {
  const honeypot = clean(payload.website, 200);
  if (honeypot) return { ok: true };

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 180);
  const phone = clean(payload.phone, 80);
  const datePreferred = clean(payload.date_preferred, 80);
  const dateAlternative = clean(payload.date_alternative, 80);
  const partySize = clean(payload.party_size, 20);
  const visitType = clean(payload.visit_type, 120);
  const notes = clean(payload.notes, MAX_FIELD_LENGTH);
  const language = clean(payload.language, 12);

  if (!name || !email || !phone || !datePreferred || !partySize) {
    throw httpError(400, 'missing_required_fields');
  }
  if (!isValidEmail(email)) throw httpError(400, 'invalid_email');

  const to = clean(env.RESERVATION_TO_EMAIL || env.ORDER_TO_EMAIL || '', 240);
  const from = clean(env.RESERVATION_FROM_EMAIL || env.ORDER_FROM_EMAIL || env.FROM_EMAIL || '', 240);
  if (!env.RESEND_API_KEY || !to || !from) throw httpError(500, 'email_not_configured');

  const subject = `Demande de reservation - ${name}`;
  const text = [
    'Nouvelle demande de reservation depuis le site.',
    '',
    `Nom: ${name}`,
    `Adresse e-mail: ${email}`,
    `Telephone: ${phone}`,
    `Date preferee: ${datePreferred}`,
    dateAlternative ? `Date alternative: ${dateAlternative}` : '',
    `Nombre de personnes: ${partySize}`,
    visitType ? `Type de visite: ${visitType}` : '',
    language ? `Langue du site: ${language}` : '',
    '',
    notes ? 'Message:' : '',
    notes
  ].filter(Boolean).join('\n');

  const html = [
    '<p>Nouvelle demande de reservation depuis le site.</p>',
    '<dl>',
    `<dt>Nom</dt><dd>${escapeHtml(name)}</dd>`,
    `<dt>Adresse e-mail</dt><dd>${escapeHtml(email)}</dd>`,
    `<dt>Telephone</dt><dd>${escapeHtml(phone)}</dd>`,
    `<dt>Date preferee</dt><dd>${escapeHtml(datePreferred)}</dd>`,
    dateAlternative ? `<dt>Date alternative</dt><dd>${escapeHtml(dateAlternative)}</dd>` : '',
    `<dt>Nombre de personnes</dt><dd>${escapeHtml(partySize)}</dd>`,
    visitType ? `<dt>Type de visite</dt><dd>${escapeHtml(visitType)}</dd>` : '',
    language ? `<dt>Langue du site</dt><dd>${escapeHtml(language)}</dd>` : '',
    '</dl>',
    notes ? '<p><strong>Message</strong></p>' : '',
    notes ? `<p>${escapeHtml(notes).replace(/\n/g, '<br>')}</p>` : ''
  ].filter(Boolean).join('');

  return sendEmail(env, { from, to, reply_to: email, subject, text, html });
}

async function sendEmail(env, payload) {
  const response = await fetch(RESEND_EMAILS_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': crypto.randomUUID()
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw httpError(response.status, `resend_${response.status}: ${body.slice(0, 300)}`);
  }

  const result = await response.json();
  return { ok: true, id: result.id || null };
}

function looksLikeLegacyReservation(payload) {
  return Boolean(payload.date_preferred || payload.party_size || payload.visit_type);
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw httpError(400, 'invalid_json');
  }
}

function corsHeaders(origin, env) {
  const allowed = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
  const allowedOrigins = allowed.length ? allowed : DEFAULT_ALLOWED_ORIGINS;
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
  if (!origin || allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin || allowedOrigins[0];
  }
  return headers;
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  });
}

function clean(value, maxLength) {
  return String(value || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
