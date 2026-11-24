import crypto from 'node:crypto';

const INVITE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function sha256Hex(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

export function timingSafeEqualStrings(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export function generateOpaqueToken(bytes = 24) {
  return crypto.randomBytes(bytes).toString('hex');
}

export function generatePublicCode(prefix = 'AMF') {
  const year = new Date().getUTCFullYear();
  const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${year}-${randomSuffix}`;
}

export function normalizeInvitationCode(rawCode = '') {
  return String(rawCode).trim().toUpperCase().replace(/\s+/g, '');
}

/**
 * Genera código legible de alta entropía: AMF-XXXX-XXXX-XXXX
 */
export function generateInvitationCode() {
  const segment = (len) => {
    let out = '';
    for (let i = 0; i < len; i += 1) {
      const idx = crypto.randomInt(0, INVITE_ALPHABET.length);
      out += INVITE_ALPHABET[idx];
    }
    return out;
  };
  return `AMF-${segment(4)}-${segment(4)}-${segment(4)}`;
}

export function maskInvitationCode(normalizedCode) {
  const suffix = normalizedCode.slice(-4);
  return `AMF-••••-••••-${suffix}`;
}

function base64UrlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(JSON.stringify(input), 'utf8');
  return buf.toString('base64url');
}

function base64UrlDecodeJson(str) {
  const raw = Buffer.from(str, 'base64url').toString('utf8');
  return JSON.parse(raw);
}

/**
 * Firma un JWT HS256 sin dependencias externas usando node:crypto.
 */
export function signJwtHs256(payload, secret, expiresInSeconds) {
  const nowSec = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = {
    ...payload,
    iat: nowSec,
    exp: nowSec + expiresInSeconds,
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedBody = base64UrlEncode(body);
  const signingInput = `${encodedHeader}.${encodedBody}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signingInput)
    .digest('base64url');

  return `${signingInput}.${signature}`;
}

/**
 * Verifica un JWT HS256 y su expiración usando comparación en tiempo constante.
 */
export function verifyJwtHs256(token, secret) {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedBody, providedSig] = parts;
  if (!encodedHeader || !encodedBody || !providedSig) return null;

  const signingInput = `${encodedHeader}.${encodedBody}`;
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(signingInput)
    .digest();

  let providedSigBuf;
  try {
    providedSigBuf = Buffer.from(providedSig, 'base64url');
  } catch {
    return null;
  }

  if (providedSigBuf.length !== expectedSig.length) return null;
  if (!crypto.timingSafeEqual(providedSigBuf, expectedSig)) return null;

  try {
    const header = base64UrlDecodeJson(encodedHeader);
    if (header.alg !== 'HS256') return null;
    const payload = base64UrlDecodeJson(encodedBody);
    const nowSec = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== 'number' || payload.exp <= nowSec) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
