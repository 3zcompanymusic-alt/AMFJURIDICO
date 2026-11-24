import dotenv from 'dotenv';
import { checkDatabaseHealth, ensureSchema, getPool } from '../server/src/database/pool.js';

dotenv.config();

async function main() {
  console.log('Conectando a PostgreSQL para inicializar esquema AMF Firma Legal S.A.S...');
  const health = await checkDatabaseHealth();
  console.log(`Conexión exitosa (${health.mode}). Hora del servidor: ${health.serverTime}`);
  await ensureSchema();
  console.log('Tablas e índices verificados/creados correctamente.');
  if (process.env.DATABASE_URL?.trim()) {
    await getPool().end();
  }
}

main().catch(async (err) => {
  console.error('Error inicializando la base de datos:', err.message);
  try {
    if (process.env.DATABASE_URL?.trim()) {
      await getPool().end();
    }
  } catch {
    // noop
  }
  process.exit(1);
});
