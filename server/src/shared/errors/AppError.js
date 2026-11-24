/**
 * Jerarquía de errores de dominio y HTTP para serialización consistente.
 */
export class AppError extends Error {
  constructor(message, { statusCode = 500, code = 'INTERNAL_ERROR', fieldErrors = null } = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Datos inválidos.', fieldErrors = null) {
    super(message, { statusCode: 400, code: 'VALIDATION_ERROR', fieldErrors });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Autenticación requerida.') {
    super(message, { statusCode: 401, code: 'UNAUTHORIZED' });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'No tienes permisos para realizar esta acción.') {
    super(message, { statusCode: 403, code: 'FORBIDDEN' });
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado.') {
    super(message, { statusCode: 404, code: 'NOT_FOUND' });
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflicto con el estado actual del recurso.') {
    super(message, { statusCode: 409, code: 'CONFLICT' });
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.') {
    super(message, { statusCode: 429, code: 'RATE_LIMITED' });
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Servicio temporalmente no disponible.') {
    super(message, { statusCode: 503, code: 'SERVICE_UNAVAILABLE' });
  }
}
