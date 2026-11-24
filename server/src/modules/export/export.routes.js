import { Router } from 'express';
import { requireAuth } from '../auth/auth.middleware.js';
import { exportController } from './export.controller.js';

export function createExportRouter() {
  const router = Router();
  router.use(requireAuth);
  router.get('/', exportController.download);
  return router;
}
