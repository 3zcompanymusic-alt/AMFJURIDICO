import { Router } from 'express';
import { createRateLimiter } from '../../shared/middlewares/rateLimiters.js';
import { requireAuth } from '../auth/auth.middleware.js';
import { formsController } from './forms.controller.js';

export function createPublicFormsRouter() {
  const router = Router();
  const submitRateLimit = createRateLimiter({
    windowMs: 60_000,
    maxRequests: 30,
    message: 'Demasiados envíos en poco tiempo. Espera un momento e intenta nuevamente.',
  });

  router.post('/aniversario', submitRateLimit, formsController.createAniversario);
  router.patch('/aniversario/beneficio', submitRateLimit, formsController.updateBeneficio);
  router.post('/consultas', submitRateLimit, formsController.createConsultaGeneral);

  return router;
}

export function createLegacyPostulacionesRouter() {
  const router = Router();
  const submitRateLimit = createRateLimiter({
    windowMs: 60_000,
    maxRequests: 30,
    message: 'Demasiados envíos en poco tiempo. Espera un momento e intenta nuevamente.',
  });

  router.post('/', submitRateLimit, formsController.createAniversario);
  router.patch('/', submitRateLimit, formsController.updateBeneficio);

  return router;
}

export function createAdminFormsRouter() {
  const router = Router();
  router.use(requireAuth);

  router.get('/resumen', formsController.adminSummary);
  router.get('/aniversario', formsController.adminListAniversario);
  router.patch('/aniversario/:id', formsController.adminUpdateAniversario);
  router.get('/consultas', formsController.adminListConsultas);
  router.patch('/consultas/:id', formsController.adminUpdateConsulta);

  return router;
}
