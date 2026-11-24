import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { getEnv } from '../config/env.js';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCHEMA_FILE_PATH = path.resolve(__dirname, '../../../database/schema.sql');

export function isLocalDevFallbackEnabled() {
  const env = getEnv();
  return !env.databaseUrl && !env.isProd && !env.isCloudRuntime;
}

function buildSslConfig(connectionString, rejectUnauthorized) {
  const isLocalHost = /localhost|127\.0\.0\.1/i.test(connectionString);
  if (isLocalHost) return false;
  return { rejectUnauthorized };
}

/**
 * Pool singleton compatible con Render (servidor persistente) y serverless.
 */
export function getPool() {
  const env = getEnv();
  if (!env.databaseUrl) {
    throw new Error('La variable de entorno DATABASE_URL no está configurada.');
  }

  if (globalThis.__amfUnifiedPgPool && globalThis.__amfUnifiedPgUrl === env.databaseUrl) {
    return globalThis.__amfUnifiedPgPool;
  }

  const pool = new Pool({
    connectionString: env.databaseUrl,
    ssl: buildSslConfig(env.databaseUrl, env.dbSslRejectUnauthorized),
    max: 10,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 10000,
  });

  pool.on('error', (err) => {
    console.error('[PostgreSQL Pool Error]', err.message);
  });

  globalThis.__amfUnifiedPgPool = pool;
  globalThis.__amfUnifiedPgUrl = env.databaseUrl;
  return pool;
}

/**
 * Ejecuta migración idempotente del esquema completo una sola vez por ciclo de proceso.
 */
export async function ensureSchema() {
  if (isLocalDevFallbackEnabled()) return;

  if (!globalThis.__amfUnifiedSchemaPromise) {
    globalThis.__amfUnifiedSchemaPromise = (async () => {
      const pool = getPool();
      const schemaSql = fs.readFileSync(SCHEMA_FILE_PATH, 'utf8');
      await pool.query(schemaSql);
    })().catch((err) => {
      globalThis.__amfUnifiedSchemaPromise = null;
      throw err;
    });
  }

  return globalThis.__amfUnifiedSchemaPromise;
}

/**
 * Ejecuta una operación dentro de una transacción PostgreSQL con rollback automático ante error.
 */
export async function withTransaction(workFn) {
  await ensureSchema();
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await workFn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // noop
    }
    throw err;
  } finally {
    client.release();
  }
}

export async function checkDatabaseHealth() {
  if (isLocalDevFallbackEnabled()) {
    return {
      connected: true,
      mode: 'local-dev-json',
      serverTime: new Date().toISOString(),
    };
  }

  const pool = getPool();
  const result = await pool.query('SELECT NOW() AS server_time');
  return {
    connected: true,
    mode: 'postgresql',
    serverTime: result.rows[0]?.server_time || null,
  };
}
