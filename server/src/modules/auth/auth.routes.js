import { Router } from 'express';
import { createRateLimiter } from '../../shared/middlewares/rateLimiters.js';
import { createAuthController } from './auth.controller.js';
import { requireAuth } from './auth.middleware.js';
import { createAuthService } from './auth.service.js';

export function createAuthRouter({ googleVerifier } = {}) {
  const router = Router();
  const authService = createAuthService({ googleVerifier });
  const authController = createAuthController(authService);

  const authRateLimit = createRateLimiter({
    windowMs: 60_000,
    maxRequests: 25,
    message: 'Demasiados intentos de autenticación. Espera un minuto e intenta de nuevo.',
  });

  const bootstrapRateLimit = createRateLimiter({
    windowMs: 15 * 60_000,
    maxRequests: 8,
    message: 'Demasiados intentos de activación inicial. Espera 15 minutos e intenta nuevamente.',
  });

  router.get('/config', authController.config);
  router.post('/google', authRateLimit, authController.googleLogin);
  router.post('/bootstrap-admin', bootstrapRateLimit, authController.bootstrapAdmin);
  router.post('/register-with-code', authRateLimit, authController.registerWithCode);
  router.get('/me', requireAuth, authController.me);
  router.post('/logout', authController.logout);

  return router;
}
