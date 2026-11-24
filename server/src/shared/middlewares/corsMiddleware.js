import { getEnv } from '../../config/env.js';

/**
 * Configura CORS estricto con soporte de credenciales (cookies HttpOnly)
 * para arquitecturas separadas (ej. Cloudflare Pages + Render API).
 */
export function corsMiddleware(req, res, next) {
  const env = getEnv();
  const origin = req.headers?.origin?.replace(/\/+$/, '');

  if (origin) {
    const isLocalOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
    const isAllowed =
      env.allowedOrigins.includes('*') ||
      env.allowedOrigins.includes(origin) ||
      (!env.isProd && isLocalOrigin);

    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin === '*' ? '*' : origin);
      res.setHeader('Vary', 'Origin');
      if (origin !== '*') {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, Authorization',
      );
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    }
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return next();
}
