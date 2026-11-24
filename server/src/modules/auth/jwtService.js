import { getEnv } from '../../config/env.js';
import { signJwtHs256, verifyJwtHs256 } from '../../shared/utils/crypto.js';

const ONBOARDING_TTL_SECONDS = 600; // 10 minutos

export const jwtService = {
  signSessionToken(adminUser) {
    const env = getEnv();
    return signJwtHs256(
      {
        type: 'admin_session',
        sub: String(adminUser.id),
        rol: adminUser.rol,
      },
      env.jwtSecret,
      env.sessionTtlSeconds,
    );
  },

  verifySessionToken(token) {
    const env = getEnv();
    const payload = verifyJwtHs256(token, env.jwtSecret);
    if (!payload || payload.type !== 'admin_session' || !payload.sub) {
      return null;
    }
    return payload;
  },

  signOnboardingToken(googleSub) {
    const env = getEnv();
    return signJwtHs256(
      {
        type: 'google_onboarding',
        googleSub,
      },
      env.jwtSecret,
      ONBOARDING_TTL_SECONDS,
    );
  },

  verifyOnboardingToken(token) {
    const env = getEnv();
    const payload = verifyJwtHs256(token, env.jwtSecret);
    if (!payload || payload.type !== 'google_onboarding' || !payload.googleSub) {
      return null;
    }
    return String(payload.googleSub);
  },
};
