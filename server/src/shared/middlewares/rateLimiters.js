import { TooManyRequestsError } from '../errors/AppError.js';

/**
 * Rate limiter en memoria por IP para proteger endpoints públicos y de autenticación.
 */
export function createRateLimiter({ windowMs = 60_000, maxRequests = 30, message } = {}) {
  const hits = new Map();

  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits.entries()) {
      if (entry.resetAt <= now) {
        hits.delete(key);
      }
    }
  }, Math.max(windowMs, 30_000));
  timer.unref?.();

  return function rateLimiterMiddleware(req, _res, next) {
    if (process.env.DISABLE_RATE_LIMIT === 'true') {
      return next();
    }

    const ip =
      req.headers?.['x-forwarded-for']?.toString().split(',')[0].trim() ||
      req.ip ||
      req.socket?.remoteAddress ||
      'unknown';

    const now = Date.now();
    const current = hits.get(ip);

    if (!current || current.resetAt <= now) {
      hits.set(ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    current.count += 1;
    if (current.count > maxRequests) {
      return next(new TooManyRequestsError(message));
    }

    return next();
  };
}
