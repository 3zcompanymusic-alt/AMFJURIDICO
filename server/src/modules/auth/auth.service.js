import { getEnv } from '../../config/env.js';
import {
  ConflictError,
  ForbiddenError,
  ServiceUnavailableError,
  UnauthorizedError,
} from '../../shared/errors/AppError.js';
import {
  sha256Hex,
  timingSafeEqualStrings,
} from '../../shared/utils/crypto.js';
import { toAdminUserResponseDto } from '../adminUsers/adminUsers.dtos.js';
import { adminUsersRepository } from '../adminUsers/adminUsers.repository.js';
import { verifyGoogleIdToken as defaultGoogleVerifier } from './googleVerifier.js';
import { jwtService } from './jwtService.js';

export function createAuthService({ googleVerifier = defaultGoogleVerifier } = {}) {
  return {
    async getPublicConfig() {
      const env = getEnv();
      const bootstrapConsumed = await adminUsersRepository.isBootstrapConsumed();
      return {
        googleClientIdConfigured: Boolean(env.googleClientId),
        googleClientId: env.googleClientId || null,
        requiresBootstrap: !bootstrapConsumed,
        bootstrapLocked: bootstrapConsumed,
      };
    },

    async authenticateWithGoogle({ idToken }) {
      const { googleSub } = await googleVerifier(idToken);
      const existingAdmin = await adminUsersRepository.findByGoogleSub(googleSub);

      if (existingAdmin) {
        if (!existingAdmin.activo) {
          throw new ForbiddenError('Tu acceso administrativo fue desactivado por un administrador.');
        }

        await adminUsersRepository.touchLastLogin(existingAdmin.id);
        const userDto = toAdminUserResponseDto({
          ...existingAdmin,
          ultimo_acceso_at: new Date().toISOString(),
        });
        const accessToken = jwtService.signSessionToken(userDto);

        return {
          status: 'AUTHENTICATED',
          user: userDto,
          accessToken,
        };
      }

      const bootstrapConsumed = await adminUsersRepository.isBootstrapConsumed();
      const onboardingToken = jwtService.signOnboardingToken(googleSub);

      return {
        status: 'REGISTRATION_REQUIRED',
        requiresBootstrap: !bootstrapConsumed,
        onboardingToken,
      };
    },

    async bootstrapInitialAdmin({ onboardingToken, bootstrapCode, nombreInterno }) {
      const bootstrapConsumed = await adminUsersRepository.isBootstrapConsumed();
      if (bootstrapConsumed) {
        throw new ConflictError(
          'El código maestro inicial ya fue usado y quedó bloqueado de forma permanente.',
        );
      }

      const env = getEnv();
      if (!env.adminBootstrapCode) {
        throw new ServiceUnavailableError(
          'ADMIN_BOOTSTRAP_CODE no está configurado en el servidor.',
        );
      }

      const googleSub = jwtService.verifyOnboardingToken(onboardingToken);
      if (!googleSub) {
        throw new UnauthorizedError(
          'Tu sesión temporal de Google expiró. Vuelve a hacer clic en Continuar con Google.',
        );
      }

      if (!timingSafeEqualStrings(bootstrapCode, env.adminBootstrapCode)) {
        throw new ForbiddenError('El código maestro inicial es incorrecto.');
      }

      const created = await adminUsersRepository.createBootstrapAdmin({
        googleSub,
        nombreInterno,
      });

      const userDto = toAdminUserResponseDto(created);
      const accessToken = jwtService.signSessionToken(userDto);

      return {
        status: 'AUTHENTICATED',
        user: userDto,
        accessToken,
      };
    },

    async registerWithInvitationCode({ onboardingToken, invitationCode }) {
      const googleSub = jwtService.verifyOnboardingToken(onboardingToken);
      if (!googleSub) {
        throw new UnauthorizedError(
          'Tu sesión temporal de Google expiró. Vuelve a hacer clic en Continuar con Google.',
        );
      }

      const codigoHash = sha256Hex(invitationCode);
      const created = await adminUsersRepository.claimInvitationAndCreateAdmin({
        codigoHash,
        googleSub,
      });

      const userDto = toAdminUserResponseDto(created);
      const accessToken = jwtService.signSessionToken(userDto);

      return {
        status: 'AUTHENTICATED',
        user: userDto,
        accessToken,
      };
    },
  };
}
