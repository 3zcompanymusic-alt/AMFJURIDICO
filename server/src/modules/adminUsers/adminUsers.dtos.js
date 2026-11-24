import { ADMIN_ROLE_LIST, ADMIN_ROLES, FIELD_LIMITS } from '../../../../shared/constants.js';
import { cleanText } from '../../../../shared/validators.js';
import { ValidationError } from '../../shared/errors/AppError.js';

export function parseCreateInvitationDto(body = {}) {
  const errors = {};
  const etiquetaUsuario = cleanText(body.etiquetaUsuario);
  const rolAsignado = cleanText(body.rolAsignado) || ADMIN_ROLES.ADMIN;
  const rawHours = body.expiraEnHoras === undefined ? 72 : Number(body.expiraEnHoras);

  if (!etiquetaUsuario || etiquetaUsuario.length < FIELD_LIMITS.adminAliasMin) {
    errors.etiquetaUsuario = 'Ingresa un nombre o etiqueta interna para identificar al usuario (mínimo 2 caracteres).';
  } else if (etiquetaUsuario.length > FIELD_LIMITS.adminAliasMax) {
    errors.etiquetaUsuario = `La etiqueta no puede superar ${FIELD_LIMITS.adminAliasMax} caracteres.`;
  }

  if (!ADMIN_ROLE_LIST.includes(rolAsignado)) {
    errors.rolAsignado = 'Rol asignado inválido.';
  }

  if (!Number.isInteger(rawHours) || rawHours < 1 || rawHours > 720) {
    errors.expiraEnHoras = 'La vigencia debe estar entre 1 y 720 horas.';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Datos inválidos para generar el código de invitación.', errors);
  }

  return {
    etiquetaUsuario,
    rolAsignado,
    expiraEnHoras: rawHours,
  };
}

export function parseUpdateAdminStatusDto(body = {}) {
  const errors = {};
  const hasActivo = typeof body.activo === 'boolean';
  const hasRol = body.rol !== undefined;

  if (!hasActivo && !hasRol) {
    throw new ValidationError('Debes indicar al menos el estado (activo) o el rol a actualizar.');
  }

  if (body.activo !== undefined && typeof body.activo !== 'boolean') {
    errors.activo = 'El campo activo debe ser booleano.';
  }

  let rol;
  if (hasRol) {
    rol = cleanText(body.rol);
    if (!ADMIN_ROLE_LIST.includes(rol)) {
      errors.rol = 'Rol inválido.';
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Parámetros de actualización inválidos.', errors);
  }

  return {
    ...(hasActivo ? { activo: body.activo } : {}),
    ...(hasRol ? { rol } : {}),
  };
}

export function toAdminUserResponseDto(row) {
  if (!row) return null;
  return {
    id: Number(row.id),
    nombreInterno: row.nombre_interno ?? row.nombreInterno,
    rol: row.rol,
    esFundador: Boolean(row.es_fundador ?? row.esFundador),
    activo: Boolean(row.activo),
    creadoPorAdminId: row.creado_por_admin_id ?? row.creadoPorAdminId ?? null,
    creadoPorNombre: row.creado_por_nombre ?? row.creadoPorNombre ?? null,
    ultimoAccesoAt: row.ultimo_acceso_at ?? row.ultimoAccesoAt ?? null,
    createdAt: row.created_at ?? row.createdAt,
    updatedAt: row.updated_at ?? row.updatedAt,
  };
}

export function computeInvitationEstado(row) {
  if (row.revocado) return 'revocado';
  if (row.usado_at || row.usadoAt) return 'usado';
  const expira = new Date(row.expira_at ?? row.expiraAt);
  if (expira.getTime() <= Date.now()) return 'expirado';
  return 'activo';
}

export function toInvitationCodeResponseDto(row, codigoPlano = null) {
  return {
    id: Number(row.id),
    codigoPreview: row.codigo_preview ?? row.codigoPreview,
    etiquetaUsuario: row.etiqueta_usuario ?? row.etiquetaUsuario,
    rolAsignado: row.rol_asignado ?? row.rolAsignado,
    creadoPorAdminId: Number(row.creado_por_admin_id ?? row.creadoPorAdminId),
    creadoPorNombre: row.creado_por_nombre ?? row.creadoPorNombre ?? null,
    usadoPorAdminId: row.usado_por_admin_id ?? row.usadoPorAdminId ?? null,
    usadoPorNombre: row.usado_por_nombre ?? row.usadoPorNombre ?? null,
    expiraAt: row.expira_at ?? row.expiraAt,
    usadoAt: row.usado_at ?? row.usadoAt ?? null,
    revocado: Boolean(row.revocado),
    estado: computeInvitationEstado(row),
    createdAt: row.created_at ?? row.createdAt,
    ...(codigoPlano ? { codigoPlano } : {}),
  };
}
