import {
  FIELD_LIMITS,
  FORM_ORIGINS,
  OCURRIO_BOGOTA_OPTIONS,
  QUIEN_NECESITA_OPTIONS,
  SITUACION_ACTUAL_OPTIONS,
} from './constants.js';

export const cleanText = (value) => (typeof value === 'string' ? value.trim() : '');

export const extractDigits = (value) => cleanText(value).replace(/\D/g, '');

const LETTER_REGEX = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g;
const PERSON_NAME_ALLOWED_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'´.\-\s]+$/;
const CITY_ALLOWED_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ.,\-\s]+$/;
const PHONE_ALLOWED_CHARS_REGEX = /^[+\d\s()-]+$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function isValidEmailFormat(email) {
  const v = cleanText(email);
  return EMAIL_REGEX.test(v) && !v.includes('..');
}

function countLetters(str) {
  return (str.match(LETTER_REGEX) || []).length;
}

export function validatePersonName(value, { required = true, emptyMsg, min, max }) {
  const v = cleanText(value);
  if (!v) return required ? emptyMsg : '';
  if (/\d/.test(v)) {
    return 'El nombre no puede contener números.';
  }
  if (!PERSON_NAME_ALLOWED_REGEX.test(v)) {
    return 'El nombre solo debe contener letras y espacios (sin símbolos).';
  }
  if (v.length < min || countLetters(v) < 2) {
    return 'Escribe un nombre válido (mínimo 2 letras).';
  }
  if (v.length > max) {
    return `El nombre no puede superar ${max} caracteres.`;
  }
  return '';
}

export function validatePhone10Digits(value, emptyMsg) {
  const v = cleanText(value);
  if (!v) return emptyMsg;
  if (/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(v)) {
    return 'El número de teléfono no puede contener letras.';
  }
  if (!PHONE_ALLOWED_CHARS_REGEX.test(v)) {
    return 'Ingresa solo dígitos numéricos (ej. 301 234 5678).';
  }

  let digits = extractDigits(v);
  // Permite prefijo internacional explícito +57 seguido de 10 dígitos
  if (v.startsWith('+57') && digits.length === 12) {
    digits = digits.slice(2);
  }

  if (digits.length !== FIELD_LIMITS.telefonoExactDigits || v.length > FIELD_LIMITS.celularMaxLength) {
    return 'El número de teléfono debe tener exactamente 10 dígitos (ej. 301 234 5678).';
  }
  return '';
}

export function validateCityName(value, { required = true }) {
  const v = cleanText(value);
  if (!v) return required ? 'La ciudad es obligatoria.' : '';
  if (/\d/.test(v)) {
    return 'La ciudad no puede contener números.';
  }
  if (!CITY_ALLOWED_REGEX.test(v)) {
    return 'Ingresa un nombre de ciudad válido (solo letras).';
  }
  if (v.length < FIELD_LIMITS.ciudadMin || countLetters(v) < 2) {
    return 'Ingresa el nombre completo de la ciudad.';
  }
  if (v.length > FIELD_LIMITS.ciudadMax) {
    return `La ciudad no puede superar ${FIELD_LIMITS.ciudadMax} caracteres.`;
  }
  return '';
}

function validateCaseNarrative(value, { min, max, emptyMsg, minMsg, maxMsg }) {
  const v = cleanText(value);
  if (!v) return emptyMsg;
  if (/^\d+$/.test(v.replace(/\s+/g, ''))) {
    return 'Por favor describe el caso con palabras, no solo números.';
  }
  if (v.length < min || countLetters(v) < 4) {
    return minMsg;
  }
  if (v.length > max) {
    return maxMsg;
  }
  return '';
}

/**
 * Valida un campo del formulario de Aniversario Bogotá.
 * Retorna string de error o '' si es válido.
 */
export function validatePostulacionField(name, value, formValues = {}) {
  switch (name) {
    case 'nombrePostulante':
      return validatePersonName(value, {
        required: true,
        emptyMsg: 'Por favor escribe tu nombre y apellido.',
        min: FIELD_LIMITS.nombrePostulanteMin,
        max: FIELD_LIMITS.nombrePostulanteMax,
      });

    case 'celularWhatsapp':
      return validatePhone10Digits(
        value,
        'Por favor escribe tu número de celular (10 dígitos) para contactarte por WhatsApp.',
      );

    case 'quienNecesita': {
      const v = cleanText(value);
      if (!QUIEN_NECESITA_OPTIONS.includes(v)) {
        return 'Selecciona quién necesita el abogado.';
      }
      return '';
    }

    case 'nombrePersona': {
      const quien = cleanText(formValues.quienNecesita);
      const isRequired = Boolean(quien && quien !== 'Yo.');
      return validatePersonName(value, {
        required: isRequired,
        emptyMsg: 'Escribe el nombre de la persona que necesita el abogado.',
        min: FIELD_LIMITS.nombrePersonaMin,
        max: FIELD_LIMITS.nombrePersonaMax,
      });
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

    case 'relatoCaso':
      return validateCaseNarrative(value, {
        min: FIELD_LIMITS.relatoCasoMin,
        max: FIELD_LIMITS.relatoCasoMax,
        emptyMsg: 'Cuéntanos con tus propias palabras qué pasó y en qué va el caso.',
        minMsg: 'Por favor danos un poco más de contexto sobre lo ocurrido (mínimo 10 caracteres).',
        maxMsg: `El relato no puede superar ${FIELD_LIMITS.relatoCasoMax} caracteres.`,
      });

    case 'aceptaDatos':
      if (value !== true) {
        return 'Debes autorizar la Política de Tratamiento de Datos Personales para enviar tu caso.';
      }
      return '';

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
    case 'nombre':
      return validatePersonName(value, {
        required: true,
        emptyMsg: 'El nombre completo es obligatorio.',
        min: FIELD_LIMITS.nombreGeneralMin,
        max: FIELD_LIMITS.nombreGeneralMax,
      });

    case 'telefono':
      return validatePhone10Digits(
        value,
        'El número de WhatsApp o teléfono (10 dígitos) es obligatorio.',
      );

    case 'ciudad':
      return validateCityName(value, {
        required: origenFormulario === FORM_ORIGINS.GENERAL,
      });

    case 'email': {
      const v = cleanText(value);
      if (origenFormulario === FORM_ORIGINS.GENERAL && !v) {
        return 'El correo electrónico es obligatorio.';
      }
      if (v && (!isValidEmailFormat(v) || v.length > FIELD_LIMITS.emailMax)) {
        return 'Ingresa un correo electrónico válido (ej. nombre@correo.com).';
      }
      return '';
    }

    case 'detalles':
      return validateCaseNarrative(value, {
        min: FIELD_LIMITS.detallesMin,
        max: FIELD_LIMITS.detallesMax,
        emptyMsg: 'Por favor describe brevemente tu caso o consulta.',
        minMsg: 'Por favor brinda un poco más de detalle sobre tu consulta (mínimo 10 caracteres).',
        maxMsg: `El detalle no puede superar ${FIELD_LIMITS.detallesMax} caracteres.`,
      });

    case 'empresaRazonSocial': {
      const v = cleanText(value);
      if (origenFormulario === FORM_ORIGINS.COMPLIANCE && !v) {
        return 'La razón social o nombre de la empresa es obligatorio.';
      }
      if (v) {
        if (v.length < FIELD_LIMITS.empresaMin || countLetters(v) < 2) {
          return 'Ingresa un nombre de empresa válido (mínimo 2 letras).';
        }
        if (v.length > FIELD_LIMITS.empresaMax) {
          return `La razón social no puede superar ${FIELD_LIMITS.empresaMax} caracteres.`;
        }
      }
      return '';
    }

    case 'empresaSector': {
      const v = cleanText(value);
      if (origenFormulario === FORM_ORIGINS.COMPLIANCE && !v) {
        return 'El sector de actividad es obligatorio.';
      }
      if (v) {
        if (/\d/.test(v)) {
          return 'El sector no debe contener números.';
        }
        if (v.length < FIELD_LIMITS.sectorMin || countLetters(v) < 2) {
          return 'Ingresa un sector de actividad válido.';
        }
        if (v.length > FIELD_LIMITS.sectorMax) {
          return `El sector no puede superar ${FIELD_LIMITS.sectorMax} caracteres.`;
        }
      }
      return '';
    }

    case 'aceptaDatos':
      if (value !== true) {
        return 'Debes autorizar el tratamiento de datos personales conforme a la ley colombiana.';
      }
      return '';

    default:
      return '';
  }
}

/**
 * Valida y normaliza la consulta general (/formulario) o diagnóstico de compliance.
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
    necesidad:
      cleanText(payload.necesidad) ||
      (isCompliance ? 'Diagnóstico Compliance Corporativo' : 'Consulta General / Orientación Legal'),
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
    ? ['empresaRazonSocial', 'empresaSector', 'nombre', 'telefono', 'detalles', 'aceptaDatos']
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
