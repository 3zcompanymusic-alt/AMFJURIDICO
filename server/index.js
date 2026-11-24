import { createApp } from './app.js';
import { getEnv } from './src/config/env.js';
import { ensureSchema } from './src/database/pool.js';

const env = getEnv();
const app = createApp();

async function bootstrapServer() {
  if (env.databaseUrl) {
    try {
      await ensureSchema();
      console.log('[DB] Esquema PostgreSQL (Neon) verificado correctamente.');
    } catch (err) {
      console.error('[DB] Advertencia verificando esquema al arranque:', err.message);
    }
  } else {
    console.warn(
      '[DB] DATABASE_URL no definida: usando almacenamiento JSON local temporal (.local-dev-store.json).',
    );
  }

  const server = app.listen(env.port, () => {
    console.log(
      `[AMF API] Servidor modular escuchando en http://localhost:${env.port} (${env.nodeEnv})`,
    );
  });

  const shutdown = (signal) => {
    console.log(`[AMF API] Señal ${signal} recibida, cerrando servidor...`);
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrapServer();
