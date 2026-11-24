import { OAuth2Client } from 'google-auth-library';
import { getEnv } from '../../config/env.js';
import {
  ServiceUnavailableError,
  UnauthorizedError,
} from '../../shared/errors/AppError.js';

const VALID_GOOGLE_ISSUERS = new Set([
  'accounts.google.com',
  'https://accounts.google.com',
]);

let cachedClient = null;
let cachedClientId = '';

function getOAuthClient(clientId) {
  if (!cachedClient || cachedClientId !== clientId) {
    cachedClient = new OAuth2Client(clientId);
    cachedClientId = clientId;
  }
  return cachedClient;
}

/**
 * Verifica criptográficamente el ID Token de Google y extrae ÚNICAMENTE `sub` (Google ID).
 * Por política de privacidad del proyecto, el correo y demás datos de perfil de Google
 * son descartados inmediatamente y nunca se persisten ni se registran.
 */
export async function verifyGoogleIdToken(idToken) {
  const env = getEnv();
  if (!env.googleClientId) {
    throw new ServiceUnavailableError(
      'GOOGLE_CLIENT_ID no está configurado en el servidor.',
    );
  }

  try {
    const client = getOAuthClient(env.googleClientId);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.googleClientId,
    });
    const payload = ticket.getPayload();

    if (!payload?.sub || !VALID_GOOGLE_ISSUERS.has(payload.iss)) {
      throw new UnauthorizedError('El token de Google no contiene un identificador válido.');
    }

    return {
      googleSub: String(payload.sub),
    };
  } catch (err) {
    if (err instanceof UnauthorizedError || err instanceof ServiceUnavailableError) {
      throw err;
    }
    throw new UnauthorizedError('No fue posible verificar tu sesión con Google. Intenta de nuevo.');
  }
}
