import { getEnv } from '../../config/env.js';
import { ForbiddenError, UnauthorizedError } from '../../shared/errors/AppError.js';
import { toAdminUserResponseDto } from '../adminUsers/adminUsers.dtos.js';
import { adminUsersRepository } from '../adminUsers/adminUsers.repository.js';
import { jwtService } from './jwtService.js';

function extractTokenFromRequest(req) {
  const env = getEnv();
  const authHeader = req.headers?.authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    const bearer = authHeader.slice(7).trim();
    if (bearer) return { token: bearer, source: 'bearer' };
  }

  const cookieToken = req.cookies?.[env.sessionCookieName];
  if (typeof cookieToken === 'string' && cookieToken.trim()) {
    return { token: cookieToken.trim(), source: 'cookie' };
  }

  return { token: null, source: null };
}

/**
 * Valida sesión JWT + estado activo actual del administrador en base de datos.
 */
export async function requireAuth(req, _res, next) {
  try {
    const { token } = extractTokenFromRequest(req);
    if (!token) {
      throw new UnauthorizedError('Debes iniciar sesión con Google para acceder al panel.');
    }

    const payload = jwtService.verifySessionToken(token);
    if (!payload) {
      throw new UnauthorizedError('Tu sesión ha expirado o no es válida. Inicia sesión nuevamente.');
    }

    const adminRow = await adminUsersRepository.findById(Number(payload.sub));
    if (!adminRow) {
      throw new UnauthorizedError('Tu usuario administrativo no existe.');
    }
    if (!adminRow.activo) {
      throw new ForbiddenError('Tu cuenta administrativa está desactivada.');
    }

    req.admin = toAdminUserResponseDto(adminRow);
    return next();
  } catch (err) {
    return next(err);
  }
}

export function requireRole(...allowedRoles) {
  return function roleGuard(req, _res, next) {
    if (!req.admin) {
      return next(new UnauthorizedError());
    }
    if (!allowedRoles.includes(req.admin.rol)) {
      return next(
        new ForbiddenError('No tienes privilegios suficientes para realizar esta acción.'),
      );
    }
    return next();
  };
}
