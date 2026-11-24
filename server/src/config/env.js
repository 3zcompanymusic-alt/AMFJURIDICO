import dotenv from 'dotenv';

dotenv.config();

const DEV_FALLBACK_JWT_SECRET = 'amf-local-dev-only-jwt-secret-change-in-production-2026';

/**
 * Lee dinámicamente la configuración de entorno para facilitar pruebas e inicialización limpia.
 */
export function getEnv() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const isProd = nodeEnv === 'production';
  const databaseUrl = process.env.DATABASE_URL?.trim() || '';
  const isCloudRuntime = process.env.VERCEL === '1' || process.env.RENDER === 'true';

  const jwtSecret = process.env.AUTH_JWT_SECRET?.trim() || '';
  if ((isProd || isCloudRuntime) && jwtSecret.length < 24) {
    throw new Error(
      'AUTH_JWT_SECRET debe estar configurado (mínimo 24 caracteres) en producción.',
    );
  }

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  return {
    nodeEnv,
    isProd,
    isCloudRuntime,
    port: Number(process.env.PORT) || 4000,
    serveStatic: process.env.SERVE_STATIC !== 'false',
    databaseUrl,
    dbSslRejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
    allowedOrigins,
    googleClientId: process.env.GOOGLE_CLIENT_ID?.trim() || '',
    jwtSecret: jwtSecret || DEV_FALLBACK_JWT_SECRET,
    adminBootstrapCode: process.env.ADMIN_BOOTSTRAP_CODE?.trim() || '',
    cookieDomain: process.env.COOKIE_DOMAIN?.trim() || '',
    cookieSameSite: (process.env.COOKIE_SAME_SITE?.trim() || (isProd ? 'lax' : 'lax')).toLowerCase(),
    sessionCookieName: 'amf_admin_session',
    sessionTtlSeconds: Number(process.env.SESSION_TTL_SECONDS) || 60 * 60 * 8, // 8 horas
  };
}
