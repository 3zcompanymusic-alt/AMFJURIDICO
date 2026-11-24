import { getEnv } from '../../config/env.js';
import { asyncHandler } from '../../shared/middlewares/asyncHandler.js';
import {
  parseBootstrapAdminDto,
  parseGoogleLoginDto,
  parseRegisterWithCodeDto,
} from './auth.dtos.js';

function getCookieOptions(req) {
  const env = getEnv();
  const isHttps = req.secure || req.headers?.['x-forwarded-proto'] === 'https';
  const sameSite = env.cookieSameSite === 'none' ? 'none' : 'lax';
  const secure = sameSite === 'none' ? true : (env.isProd || env.isCloudRuntime || isHttps);

  return {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: env.sessionTtlSeconds * 1000,
    path: '/',
    ...(env.cookieDomain ? { domain: env.cookieDomain } : {}),
  };
}

function attachSessionCookie(req, res, accessToken) {
  const env = getEnv();
  res.cookie(env.sessionCookieName, accessToken, getCookieOptions(req));
}

export function createAuthController(authService) {
  return {
    config: asyncHandler(async (_req, res) => {
      const cfg = await authService.getPublicConfig();
      res.status(200).json({ ok: true, data: cfg });
    }),

    googleLogin: asyncHandler(async (req, res) => {
      const dto = parseGoogleLoginDto(req.body);
      const result = await authService.authenticateWithGoogle(dto);

      if (result.status === 'AUTHENTICATED') {
        attachSessionCookie(req, res, result.accessToken);
      }

      res.status(200).json({
        ok: true,
        data: result,
      });
    }),

    bootstrapAdmin: asyncHandler(async (req, res) => {
      const dto = parseBootstrapAdminDto(req.body);
      const result = await authService.bootstrapInitialAdmin(dto);
      attachSessionCookie(req, res, result.accessToken);
      res.status(201).json({
        ok: true,
        message: 'Administrador inicial vinculado con éxito.',
        data: result,
      });
    }),

    registerWithCode: asyncHandler(async (req, res) => {
      const dto = parseRegisterWithCodeDto(req.body);
      const result = await authService.registerWithInvitationCode(dto);
      attachSessionCookie(req, res, result.accessToken);
      res.status(201).json({
        ok: true,
        message: 'Cuenta administrativa activada y vinculada con éxito.',
        data: result,
      });
    }),

    me: asyncHandler(async (req, res) => {
      res.status(200).json({
        ok: true,
        data: { user: req.admin },
      });
    }),

    logout: asyncHandler(async (req, res) => {
      const env = getEnv();
      const opts = getCookieOptions(req);
      delete opts.maxAge;
      res.clearCookie(env.sessionCookieName, opts);
      res.status(200).json({ ok: true, message: 'Sesión cerrada.' });
    }),
  };
}
