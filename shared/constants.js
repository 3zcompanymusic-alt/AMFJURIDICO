/**
 * Constantes de dominio compartidas entre Frontend y Backend
 * AMF Firma Legal S.A.S.
 */

export const ADMIN_ROLES = Object.freeze({
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
});

export const ADMIN_ROLE_LIST = Object.freeze([
  ADMIN_ROLES.SUPER_ADMIN,
  ADMIN_ROLES.ADMIN,
]);

export const REVIEW_STATUSES = Object.freeze([
  'recibido',
  'en_revision',
  'contactado',
  'seleccionado',
  'archivado',
]);

export const FORM_ORIGINS = Object.freeze({
  GENERAL: 'formulario_general',
  COMPLIANCE: 'diagnostico_compliance',
});

export const FORM_ORIGIN_LIST = Object.freeze([
  FORM_ORIGINS.GENERAL,
  FORM_ORIGINS.COMPLIANCE,
]);

export const QUIEN_NECESITA_OPTIONS = Object.freeze([
  'Yo.',
  'Un familiar.',
  'Un amigo o conocido.',
]);

export const OCURRIO_BOGOTA_OPTIONS = Object.freeze([
  'Sí.',
  'No.',
  'No estoy seguro.',
]);

export const SITUACION_ACTUAL_OPTIONS = Object.freeze([
  'La capturaron hace poco.',
  'Está en la cárcel.',
  'Está libre, pero tiene un proceso penal.',
  'Un juez ya la condenó.',
  'No sé.',
]);

export const BENEFICIO_DECISION_OPTIONS = Object.freeze([
  'quiero_asesoria',
  'no_gracias',
]);

export const GENERAL_NECESIDADES = Object.freeze([
  'Consulta General / Orientación Legal',
  'Defensa Penal (24/7)',
  'Representación de Víctimas',
  'Protección Constitucional (Tutelas / Peticiones)',
  'Planes y Suscripción Fuerza Pública',
  'Otros Servicios Legales',
  'Diagnóstico Compliance Corporativo',
]);

export const FIELD_LIMITS = Object.freeze({
  nombrePostulanteMin: 2,
  nombrePostulanteMax: 150,
  celularMinDigits: 7,
  celularMaxDigits: 15,
  celularMaxLength: 30,
  nombrePersonaMin: 2,
  nombrePersonaMax: 150,
  relatoCasoMin: 10,
  relatoCasoMax: 5000,
  nombreGeneralMin: 2,
  nombreGeneralMax: 150,
  ciudadMax: 100,
  emailMax: 160,
  detallesMin: 5,
  detallesMax: 5000,
  notasAdminMax: 4000,
  adminAliasMin: 2,
  adminAliasMax: 120,
});
