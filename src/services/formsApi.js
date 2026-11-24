import { apiRequest } from './apiClient';

/**
 * Envía una postulación de la campaña Aniversario Bogotá al backend PostgreSQL (Neon).
 */
export async function submitAniversarioPostulacion(payload) {
  return apiRequest('/api/formularios/aniversario', {
    method: 'POST',
    body: payload,
  });
}

/**
 * Registra de forma no bloqueante si el usuario eligió la asesoría con descuento o finalizó.
 */
export async function registerAniversarioBeneficio({ id, submissionToken, decision }) {
  if (!id || !submissionToken || !decision) return null;

  try {
    return await apiRequest('/api/formularios/aniversario/beneficio', {
      method: 'PATCH',
      body: { id, submissionToken, decision },
      keepalive: true,
    });
  } catch {
    return null;
  }
}

/**
 * Envía una consulta del formulario general (/formulario) o diagnóstico de compliance.
 */
export async function submitConsultaGeneral(payload) {
  return apiRequest('/api/formularios/consultas', {
    method: 'POST',
    body: payload,
  });
}
