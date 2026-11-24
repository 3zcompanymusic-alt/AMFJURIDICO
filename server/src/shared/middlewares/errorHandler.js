import { AppError } from '../errors/AppError.js';

export function errorHandler(err, _req, res, _next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      ok: false,
      code: 'INVALID_JSON',
      error: 'El cuerpo JSON enviado es inválido.',
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      ok: false,
      code: err.code,
      error: err.message,
      ...(err.fieldErrors ? { fieldErrors: err.fieldErrors } : {}),
    });
  }

  console.error('[Unhandled Server Error]', err?.message || err);
  return res.status(500).json({
    ok: false,
    code: 'INTERNAL_ERROR',
    error: 'Ocurrió un inconveniente interno en el servidor.',
  });
}
