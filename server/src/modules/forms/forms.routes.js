import { Router } from 'express';
import { ADMIN_ROLES } from '../../../../shared/constants.js';
import { createRateLimiter } from '../../shared/middlewares/rateLimiters.js';
import { requireAuth, requireRole } from '../auth/auth.middleware.js';
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
  router.use(requireAuth, requireRole(ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.ADMIN));

  router.get('/resumen', formsController.adminSummary);
  router.get('/aniversario', formsController.adminListAniversario);
  router.patch('/aniversario/:id', formsController.adminUpdateAniversario);
  router.delete('/aniversario/:id', formsController.adminDeleteAniversario);
  router.get('/consultas', formsController.adminListConsultas);
  router.patch('/consultas/:id', formsController.adminUpdateConsulta);
  router.delete('/consultas/:id', formsController.adminDeleteConsulta);

  return router;
}
