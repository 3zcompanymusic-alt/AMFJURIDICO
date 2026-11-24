import { checkDatabaseHealth } from '../../database/pool.js';
import { ServiceUnavailableError } from '../../shared/errors/AppError.js';

export const healthService = {
  async getStatus() {
    try {
      const db = await checkDatabaseHealth();
      return {
        ok: true,
        service: 'amf-juridico-api',
        database: db.mode,
        serverTime: db.serverTime,
      };
    } catch (err) {
      console.error('[Health Check Error]', err.message);
      throw new ServiceUnavailableError('No fue posible verificar la conexión a la base de datos.');
    }
  },
};
