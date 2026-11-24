import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_STORE_PATH = path.resolve(__dirname, '../../../.local-dev-store.json');

const EMPTY_STORE = {
  sistemaConfiguracion: {},
  usuariosAdmin: [],
  codigosInvitacion: [],
  postulacionesAniversario: [],
  consultasGenerales: [],
};

function getStorePath() {
  return process.env.LOCAL_DEV_STORE_PATH?.trim() || DEFAULT_STORE_PATH;
}

export function readLocalStore() {
  try {
    const raw = fs.readFileSync(getStorePath(), 'utf8');
    const parsed = JSON.parse(raw);
    return {
      sistemaConfiguracion:
        parsed.sistemaConfiguracion && typeof parsed.sistemaConfiguracion === 'object'
          ? parsed.sistemaConfiguracion
          : {},
      usuariosAdmin: Array.isArray(parsed.usuariosAdmin) ? parsed.usuariosAdmin : [],
      codigosInvitacion: Array.isArray(parsed.codigosInvitacion) ? parsed.codigosInvitacion : [],
      postulacionesAniversario: Array.isArray(parsed.postulacionesAniversario)
        ? parsed.postulacionesAniversario
        : [],
      consultasGenerales: Array.isArray(parsed.consultasGenerales)
        ? parsed.consultasGenerales
        : [],
    };
  } catch {
    return structuredClone(EMPTY_STORE);
  }
}

export function writeLocalStore(store) {
  const target = getStorePath();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(store, null, 2), 'utf8');
}

export function nextLocalId(records) {
  if (!Array.isArray(records) || records.length === 0) return 1;
  return Math.max(...records.map((item) => Number(item.id) || 0)) + 1;
}
