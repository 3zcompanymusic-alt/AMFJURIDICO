import { FIELD_LIMITS } from '../../../../shared/constants.js';
import { cleanText } from '../../../../shared/validators.js';
import { ValidationError } from '../../shared/errors/AppError.js';
import { normalizeInvitationCode } from '../../shared/utils/crypto.js';

export function parseGoogleLoginDto(body = {}) {
  const idToken = cleanText(body.idToken);
  if (!idToken || idToken.length < 20) {
    throw new ValidationError('El token de identidad de Google es requerido.', {
      idToken: 'Token de Google inválido o ausente.',
    });
  }
  return { idToken };
}

export function parseBootstrapAdminDto(body = {}) {
  const errors = {};
  const onboardingToken = cleanText(body.onboardingToken);
  const bootstrapCode = cleanText(body.bootstrapCode);
  const nombreInterno = cleanText(body.nombreInterno);

  if (!onboardingToken) {
    errors.onboardingToken = 'Sesión temporal de Google ausente o expirada.';
  }
  if (!bootstrapCode) {
    errors.bootstrapCode = 'Ingresa el código maestro inicial.';
  }
  if (!nombreInterno || nombreInterno.length < FIELD_LIMITS.adminAliasMin) {
    errors.nombreInterno = 'Ingresa un nombre o alias interno (mínimo 2 caracteres).';
  } else if (nombreInterno.length > FIELD_LIMITS.adminAliasMax) {
    errors.nombreInterno = `El alias no puede superar ${FIELD_LIMITS.adminAliasMax} caracteres.`;
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Completa los campos requeridos para activar el administrador inicial.', errors);
  }

  return {
    onboardingToken,
    bootstrapCode,
    nombreInterno,
  };
}

export function parseRegisterWithCodeDto(body = {}) {
  const errors = {};
  const onboardingToken = cleanText(body.onboardingToken);
  const invitationCode = normalizeInvitationCode(body.invitationCode);

  if (!onboardingToken) {
    errors.onboardingToken = 'Sesión temporal de Google ausente o expirada.';
  }
  if (!invitationCode || invitationCode.length < 8) {
    errors.invitationCode = 'Ingresa un código de registro válido.';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Revisa los datos de registro.', errors);
  }

  return {
    onboardingToken,
    invitationCode,
  };
}
