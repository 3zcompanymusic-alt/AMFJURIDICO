import {
  BENEFICIO_DECISION_OPTIONS,
  FIELD_LIMITS,
  FORM_ORIGIN_LIST,
  OCURRIO_BOGOTA_OPTIONS,
  REVIEW_STATUSES,
  SITUACION_ACTUAL_OPTIONS,
} from '../../../../shared/constants.js';
import {
  cleanText,
  validateAndSanitizeConsultaGeneral,
  validateAndSanitizePostulacion,
} from '../../../../shared/validators.js';
import { ValidationError } from '../../shared/errors/AppError.js';

export function parseCreateAniversarioDto(body = {}) {
  const { errors, sanitized } = validateAndSanitizePostulacion(body);
  if (Object.keys(errors).length > 0) {
    throw new ValidationError(
      'Revisa los campos requeridos antes de enviar tu postulación.',
      errors,
    );
  }
  return sanitized;
}

export function parseBeneficioDecisionDto(body = {}) {
  const id = Number(body.id);
  const submissionToken = cleanText(body.submissionToken);
  const decision = cleanText(body.decision);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError('Identificador de postulación inválido.');
  }
  if (!submissionToken || submissionToken.length < 16 || submissionToken.length > 128) {
    throw new ValidationError('Token de sesión de postulación inválido.');
  }
  if (!BENEFICIO_DECISION_OPTIONS.includes(decision)) {
    throw new ValidationError('Decisión de beneficio no permitida.');
  }

  return { id, submissionToken, decision };
}

export function parseCreateConsultaGeneralDto(body = {}) {
  const { errors, sanitized } = validateAndSanitizeConsultaGeneral(body);
  if (Object.keys(errors).length > 0) {
    throw new ValidationError(
      'Revisa los campos requeridos antes de enviar tu solicitud.',
      errors,
    );
  }
  return sanitized;
}

function parseIsoDateOnly(raw) {
  const v = cleanText(raw);
  if (!v) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    throw new ValidationError('Formato de fecha inválido (usa YYYY-MM-DD).');
  }
  return v;
}

export function parseAdminFormsQueryDto(query = {}) {
  const search = cleanText(query.search).slice(0, 100);
  const estadoRevision = cleanText(query.estadoRevision);
  const ocurrioBogota = cleanText(query.ocurrioBogota);
  const situacionActual = cleanText(query.situacionActual);
  const decisionBeneficio = cleanText(query.decisionBeneficio);
  const origenFormulario = cleanText(query.origenFormulario);
  const necesidadServicio = cleanText(query.necesidadServicio).slice(0, 120);
  const dateFrom = parseIsoDateOnly(query.dateFrom);
  const dateTo = parseIsoDateOnly(query.dateTo);

  if (estadoRevision && !REVIEW_STATUSES.includes(estadoRevision)) {
    throw new ValidationError('Estado de revisión inválido.');
  }
  if (ocurrioBogota && !OCURRIO_BOGOTA_OPTIONS.includes(ocurrioBogota)) {
    throw new ValidationError('Filtro de ubicación en Bogotá inválido.');
  }
  if (situacionActual && !SITUACION_ACTUAL_OPTIONS.includes(situacionActual)) {
    throw new ValidationError('Filtro de situación actual inválido.');
  }
  if (
    decisionBeneficio &&
    !['pendiente', ...BENEFICIO_DECISION_OPTIONS].includes(decisionBeneficio)
  ) {
    throw new ValidationError('Filtro de decisión de beneficio inválido.');
  }
  if (origenFormulario && !FORM_ORIGIN_LIST.includes(origenFormulario)) {
    throw new ValidationError('Filtro de origen de formulario inválido.');
  }

  const page = query.page === undefined ? 1 : Number(query.page);
  const pageSize = query.pageSize === undefined ? 50 : Number(query.pageSize);

  if (!Number.isInteger(page) || page < 1) {
    throw new ValidationError('El número de página debe ser un entero positivo.');
  }
  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 200) {
    throw new ValidationError('El tamaño de página debe estar entre 1 y 200.');
  }

  return {
    search,
    estadoRevision: estadoRevision || null,
    ocurrioBogota: ocurrioBogota || null,
    situacionActual: situacionActual || null,
    decisionBeneficio: decisionBeneficio || null,
    origenFormulario: origenFormulario || null,
    necesidadServicio: necesidadServicio || null,
    dateFrom,
    dateTo,
    page,
    pageSize,
  };
}

export function parseUpdateReviewDto(body = {}) {
  const hasEstado = body.estadoRevision !== undefined;
  const hasNotas = body.notasAdmin !== undefined;

  if (!hasEstado && !hasNotas) {
    throw new ValidationError('Debes enviar estadoRevision o notasAdmin.');
  }

  const updates = {};
  if (hasEstado) {
    const estadoRevision = cleanText(body.estadoRevision);
    if (!REVIEW_STATUSES.includes(estadoRevision)) {
      throw new ValidationError('Estado de revisión no permitido.');
    }
    updates.estadoRevision = estadoRevision;
  }

  if (hasNotas) {
    const notasAdmin = typeof body.notasAdmin === 'string' ? body.notasAdmin.trim() : '';
    if (notasAdmin.length > FIELD_LIMITS.notasAdminMax) {
      throw new ValidationError(
        `Las notas internas no pueden superar ${FIELD_LIMITS.notasAdminMax} caracteres.`,
      );
    }
    updates.notasAdmin = notasAdmin || null;
  }

  return updates;
}

export function toAniversarioAdminDto(row) {
  return {
    id: Number(row.id),
    codigoPostulacion: row.codigo_postulacion,
    nombrePostulante: row.nombre_postulante,
    celularWhatsapp: row.celular_whatsapp,
    quienNecesita: row.quien_necesita,
    nombrePersonaAfectada: row.nombre_persona_afectada ?? null,
    ocurrioEnBogota: row.ocurrio_en_bogota,
    situacionActual: row.situacion_actual,
    relatoCaso: row.relato_caso,
    aceptaTratamientoDatos: Boolean(row.acepta_tratamiento_datos),
    fechaAutorizacionDatos: row.fecha_autorizacion_datos,
    decisionBeneficio: row.decision_beneficio,
    fechaDecisionBeneficio: row.fecha_decision_beneficio ?? null,
    estadoRevision: row.estado_revision,
    notasAdmin: row.notas_admin ?? null,
    revisadoPorAdminId: row.revisado_por_admin_id ? Number(row.revisado_por_admin_id) : null,
    revisadoPorNombre: row.revisado_por_nombre ?? null,
    origenRegistro: row.origen_registro,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toConsultaGeneralAdminDto(row) {
  return {
    id: Number(row.id),
    codigoConsulta: row.codigo_consulta,
    origenFormulario: row.origen_formulario,
    nombreCompleto: row.nombre_completo,
    telefonoWhatsapp: row.telefono_whatsapp,
    correoElectronico: row.correo_electronico ?? null,
    ciudad: row.ciudad ?? null,
    necesidadServicio: row.necesidad_servicio,
    institucionFuerzaPublica: row.institucion_fuerza_publica ?? null,
    planInteres: row.plan_interes ?? null,
    situacionPenal: row.situacion_penal ?? null,
    audienciaProxima: row.audiencia_proxima ?? null,
    urgencia: row.urgencia ?? null,
    empresaRazonSocial: row.empresa_razon_social ?? null,
    empresaSector: row.empresa_sector ?? null,
    empresaTamano: row.empresa_tamano ?? null,
    detallesCaso: row.detalles_caso,
    aceptaTratamientoDatos: Boolean(row.acepta_tratamiento_datos),
    fechaAutorizacionDatos: row.fecha_autorizacion_datos,
    estadoRevision: row.estado_revision,
    notasAdmin: row.notas_admin ?? null,
    revisadoPorAdminId: row.revisado_por_admin_id ? Number(row.revisado_por_admin_id) : null,
    revisadoPorNombre: row.revisado_por_nombre ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
