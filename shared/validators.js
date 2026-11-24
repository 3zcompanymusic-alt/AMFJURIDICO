import {
  FIELD_LIMITS,
  FORM_ORIGINS,
  OCURRIO_BOGOTA_OPTIONS,
  QUIEN_NECESITA_OPTIONS,
  SITUACION_ACTUAL_OPTIONS,
} from './constants.js';

export const cleanText = (value) => (typeof value === 'string' ? value.trim() : '');

export const extractDigits = (value) => cleanText(value).replace(/\D/g, '');

export function isValidEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanText(email));
}

/**
 * Valida un campo del formulario de Aniversario Bogotá.
 * Retorna string de error o '' si es válido.
 */
export function validatePostulacionField(name, value, formValues = {}) {
  switch (name) {
    case 'nombrePostulante': {
      const v = cleanText(value);
      if (!v) return 'Por favor escribe tu nombre y apellido.';
      if (v.length < FIELD_LIMITS.nombrePostulanteMin) {
        return 'Por favor escribe tu nombre y apellido completo.';
      }
      if (v.length > FIELD_LIMITS.nombrePostulanteMax) {
        return `El nombre no puede superar ${FIELD_LIMITS.nombrePostulanteMax} caracteres.`;
      }
      return '';
    }

    case 'celularWhatsapp': {
      const v = cleanText(value);
      const digits = extractDigits(v);
      if (!v) return 'Por favor escribe tu número de celular para contactarte por WhatsApp.';
      if (
        digits.length < FIELD_LIMITS.celularMinDigits ||
        digits.length > FIELD_LIMITS.celularMaxDigits ||
        v.length > FIELD_LIMITS.celularMaxLength
      ) {
        return 'Ingresa un número de celular o WhatsApp válido (entre 7 y 15 dígitos).';
      }
      return '';
    }

    case 'quienNecesita': {
      const v = cleanText(value);
      if (!QUIEN_NECESITA_OPTIONS.includes(v)) {
        return 'Selecciona quién necesita el abogado.';
      }
      return '';
    }

    case 'nombrePersona': {
      const quien = cleanText(formValues.quienNecesita);
      const v = cleanText(value);
      if (quien && quien !== 'Yo.') {
        if (!v) return 'Escribe el nombre de la persona que necesita el abogado.';
        if (v.length < FIELD_LIMITS.nombrePersonaMin) {
          return 'Escribe el nombre completo o como la conozcan (mínimo 2 caracteres).';
        }
      }
      if (v.length > FIELD_LIMITS.nombrePersonaMax) {
        return `El nombre no puede superar ${FIELD_LIMITS.nombrePersonaMax} caracteres.`;
      }
      return '';
    }

    case 'ocurrioBogota': {
      const v = cleanText(value);
      if (!OCURRIO_BOGOTA_OPTIONS.includes(v)) {
        return 'Indica si lo que pasó ocurrió en Bogotá.';
      }
      return '';
    }

    case 'situacionActual': {
      const v = cleanText(value);
      if (!SITUACION_ACTUAL_OPTIONS.includes(v)) {
        return 'Selecciona cómo está esa persona hoy.';
      }
      return '';
    }

    case 'relatoCaso': {
      const v = cleanText(value);
      if (!v) return 'Cuéntanos con tus propias palabras qué pasó y en qué va el caso.';
      if (v.length < FIELD_LIMITS.relatoCasoMin) {
        return 'Por favor danos un poco más de contexto sobre lo ocurrido (mínimo 10 caracteres).';
      }
      if (v.length > FIELD_LIMITS.relatoCasoMax) {
        return `El relato no puede superar ${FIELD_LIMITS.relatoCasoMax} caracteres.`;
      }
      return '';
    }

    case 'aceptaDatos': {
      if (value !== true) {
        return 'Debes autorizar la Política de Tratamiento de Datos Personales para enviar tu caso.';
      }
      return '';
    }

    default:
      return '';
  }
}

/**
 * Valida y normaliza el payload completo de una postulación de aniversario.
 */
export function validateAndSanitizePostulacion(payload = {}) {
  const safeInput = {
    nombrePostulante: cleanText(payload.nombrePostulante),
    celularWhatsapp: cleanText(payload.celularWhatsapp),
    quienNecesita: cleanText(payload.quienNecesita),
    nombrePersona: cleanText(payload.nombrePersona),
    ocurrioBogota: cleanText(payload.ocurrioBogota),
    situacionActual: cleanText(payload.situacionActual),
    relatoCaso: cleanText(payload.relatoCaso),
    aceptaDatos: payload.aceptaDatos === true,
  };

  const fields = [
    'nombrePostulante',
    'celularWhatsapp',
    'quienNecesita',
    'nombrePersona',
    'ocurrioBogota',
    'situacionActual',
    'relatoCaso',
    'aceptaDatos',
  ];

  const errors = {};
  for (const field of fields) {
    const err = validatePostulacionField(field, safeInput[field], safeInput);
    if (err) errors[field] = err;
  }

  const sanitized = {
    ...safeInput,
    nombrePersona:
      safeInput.quienNecesita === 'Yo.' && !safeInput.nombrePersona
        ? null
        : safeInput.nombrePersona || null,
  };

  return { errors, sanitized };
}

/**
 * Valida un campo del formulario general (/formulario) o diagnóstico compliance.
 */
export function validateConsultaGeneralField(name, value, origenFormulario = FORM_ORIGINS.GENERAL) {
  switch (name) {
    case 'nombre': {
      const v = cleanText(value);
      if (!v) return 'El nombre completo es obligatorio.';
      if (v.length < FIELD_LIMITS.nombreGeneralMin) return 'Ingresa tu nombre completo.';
      if (v.length > FIELD_LIMITS.nombreGeneralMax) {
        return `El nombre no puede superar ${FIELD_LIMITS.nombreGeneralMax} caracteres.`;
      }
      return '';
    }

    case 'telefono': {
      const v = cleanText(value);
      const digits = extractDigits(v);
      if (!v) return 'El número de WhatsApp o teléfono es obligatorio.';
      if (
        digits.length < FIELD_LIMITS.celularMinDigits ||
        digits.length > FIELD_LIMITS.celularMaxDigits ||
        v.length > FIELD_LIMITS.celularMaxLength
      ) {
        return 'Ingresa un número de teléfono válido (entre 7 y 15 dígitos).';
      }
      return '';
    }

    case 'ciudad': {
      const v = cleanText(value);
      if (origenFormulario === FORM_ORIGINS.GENERAL && !v) {
        return 'La ciudad es obligatoria.';
      }
      if (v.length > FIELD_LIMITS.ciudadMax) {
        return `La ciudad no puede superar ${FIELD_LIMITS.ciudadMax} caracteres.`;
      }
      return '';
    }

    case 'email': {
      const v = cleanText(value);
      if (origenFormulario === FORM_ORIGINS.GENERAL && !v) {
        return 'El correo electrónico es obligatorio.';
      }
      if (v && (!isValidEmailFormat(v) || v.length > FIELD_LIMITS.emailMax)) {
        return 'Ingresa un correo electrónico válido.';
      }
      return '';
    }

    case 'detalles': {
      const v = cleanText(value);
      if (!v) return 'Por favor describe brevemente tu caso o consulta.';
      if (v.length < FIELD_LIMITS.detallesMin) {
        return 'Por favor brinda un poco más de detalle (mínimo 5 caracteres).';
      }
      if (v.length > FIELD_LIMITS.detallesMax) {
        return `El detalle no puede superar ${FIELD_LIMITS.detallesMax} caracteres.`;
      }
      return '';
    }

    case 'empresaRazonSocial': {
      const v = cleanText(value);
      if (origenFormulario === FORM_ORIGINS.COMPLIANCE && !v) {
        return 'La razón social o nombre de la empresa es obligatorio.';
      }
      return '';
    }

    case 'aceptaDatos': {
      if (value !== true) {
        return 'Debes autorizar el tratamiento de datos personales conforme a la ley colombiana.';
      }
      return '';
    }

    default:
      return '';
  }
}

/**
 * Valida y sanitiza la consulta general (/formulario) o diagnóstico de compliance.
 */
export function validateAndSanitizeConsultaGeneral(payload = {}) {
  const origenFormulario =
    cleanText(payload.origenFormulario) === FORM_ORIGINS.COMPLIANCE
      ? FORM_ORIGINS.COMPLIANCE
      : FORM_ORIGINS.GENERAL;

  const isCompliance = origenFormulario === FORM_ORIGINS.COMPLIANCE;

  const safeInput = {
    origenFormulario,
    nombre: cleanText(payload.nombre || payload.contacto),
    telefono: cleanText(payload.telefono),
    email: cleanText(payload.email),
    ciudad: cleanText(payload.ciudad),
    necesidad: cleanText(payload.necesidad) || (isCompliance ? 'Diagnóstico Compliance Corporativo' : 'Consulta General / Orientación Legal'),
    institucion: cleanText(payload.institucion) || null,
    planInteres: cleanText(payload.planInteres) || null,
    situacionPenal: cleanText(payload.situacionPenal) || null,
    audienciaProxima: cleanText(payload.audienciaProxima) || null,
    urgencia: cleanText(payload.urgencia) || null,
    empresaRazonSocial: cleanText(payload.empresaRazonSocial || payload.empresa) || null,
    empresaSector: cleanText(payload.empresaSector || payload.sector) || null,
    empresaTamano: cleanText(payload.empresaTamano || payload.tamano) || null,
    detalles:
      cleanText(payload.detalles) ||
      (isCompliance
        ? `Diagnóstico corporativo: ${cleanText(payload.preocupacion || 'Evaluación general')}`
        : ''),
    aceptaDatos: payload.aceptaDatos === true,
  };

  const errors = {};
  const requiredFields = isCompliance
    ? ['empresaRazonSocial', 'nombre', 'telefono', 'detalles', 'aceptaDatos']
    : ['nombre', 'telefono', 'ciudad', 'email', 'detalles', 'aceptaDatos'];

  for (const field of requiredFields) {
    const err = validateConsultaGeneralField(field, safeInput[field], origenFormulario);
    if (err) errors[field] = err;
  }

  return {
    errors,
    sanitized: {
      ...safeInput,
      email: safeInput.email || null,
      ciudad: safeInput.ciudad || null,
    },
  };
}
