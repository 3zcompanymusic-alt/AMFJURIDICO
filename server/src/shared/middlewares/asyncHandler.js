/**
 * Envuelve controladores async de Express para delegar errores al errorHandler centralizado.
 */
export function asyncHandler(fn) {
  return function wrappedController(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
