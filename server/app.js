import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { getEnv } from './src/config/env.js';
import { createAdminUsersRouter } from './src/modules/adminUsers/adminUsers.routes.js';
import { createAuthRouter } from './src/modules/auth/auth.routes.js';
import { createExportRouter } from './src/modules/export/export.routes.js';
import {
  createAdminFormsRouter,
  createLegacyPostulacionesRouter,
  createPublicFormsRouter,
} from './src/modules/forms/forms.routes.js';
import { createHealthRouter } from './src/modules/health/health.routes.js';
import { corsMiddleware } from './src/shared/middlewares/corsMiddleware.js';
import { errorHandler } from './src/shared/middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

export function createApp({ googleVerifier } = {}) {
  const env = getEnv();
  const app = express();

  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    }),
  );

  app.use(corsMiddleware);
  app.use(cookieParser());
  app.use(
    express.json({
      limit: '150kb',
      type: ['application/json', 'text/plain'],
    }),
  );

  // Módulos del monolito modular
  app.use('/api/health', createHealthRouter());
  app.use('/api/auth', createAuthRouter({ googleVerifier }));
  app.use('/api/formularios', createPublicFormsRouter());
  app.use('/api/postulaciones', createLegacyPostulacionesRouter());
  app.use('/api/admin/users', createAdminUsersRouter());
  app.use('/api/admin/formularios', createAdminFormsRouter());
  app.use('/api/admin/export', createExportRouter());

  app.use('/api/*', (_req, res) => {
    res.status(404).json({ ok: false, code: 'NOT_FOUND', error: 'Ruta de API no encontrada.' });
  });

  // En modo monolito (Render único) sirve dist/ si SERVE_STATIC !== 'false'
  if (env.serveStatic && fs.existsSync(INDEX_HTML_PATH)) {
    app.use(
      express.static(DIST_DIR, {
        maxAge: '1h',
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('index.html')) {
            res.setHeader('Cache-Control', 'no-cache');
          }
        },
      }),
    );

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      return res.sendFile(INDEX_HTML_PATH);
    });
  }

  app.use(errorHandler);

  return app;
}
