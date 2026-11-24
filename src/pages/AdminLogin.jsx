import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, KeyRound, Loader2 } from 'lucide-react';
import { getAssetUrl } from '../config/siteConfig';
import { adminApi } from '../services/adminApi';
import './Admin.css';

const logoWine = getAssetUrl('/assets/logos/Sin Fondo/AMF FIRMA LEGAL VINO TINTO.png');

export const AdminLogin = () => {
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  const [checkingSession, setCheckingSession] = useState(true);
  const [authConfig, setAuthConfig] = useState(null);
  const [phase, setPhase] = useState('google'); // 'google' | 'bootstrap' | 'invite'
  const [onboardingToken, setOnboardingToken] = useState('');
  const [nombreInterno, setNombreInterno] = useState('');
  const [bootstrapCode, setBootstrapCode] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await adminApi.getMe();
        if (active) {
          navigate('/admin', { replace: true });
          return;
        }
      } catch {
        // Sin sesión activa
      }

      try {
        const cfg = await adminApi.getAuthConfig();
        if (active) {
          setAuthConfig(cfg);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'No fue posible conectar con el servidor.');
        }
      } finally {
        if (active) {
          setCheckingSession(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [navigate]);

  const effectiveClientId =
    authConfig?.googleClientId || import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  useEffect(() => {
    if (checkingSession || phase !== 'google' || !effectiveClientId) return;

    const handleGoogleCallback = async (response) => {
      if (!response?.credential) return;
      setError('');
      setSubmitting(true);
      try {
        const result = await adminApi.loginWithGoogle(response.credential);
        if (result.status === 'AUTHENTICATED') {
          navigate('/admin', { replace: true });
          return;
        }
        if (result.status === 'REGISTRATION_REQUIRED') {
          setOnboardingToken(result.onboardingToken);
          setPhase(result.requiresBootstrap ? 'bootstrap' : 'invite');
        }
      } catch (err) {
        setError(err.message || 'No se pudo validar tu cuenta de Google.');
      } finally {
        setSubmitting(false);
      }
    };

    const renderButton = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: effectiveClientId,
        callback: handleGoogleCallback,
      });
      googleButtonRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        locale: 'es',
        width: 300,
      });
    };

    if (window.google?.accounts?.id) {
      renderButton();
      return;
    }

    const scriptId = 'google-gsi-client-script';
    let scriptEl = document.getElementById(scriptId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.src = 'https://accounts.google.com/gsi/client';
      scriptEl.async = true;
      scriptEl.defer = true;
      document.head.appendChild(scriptEl);
    }
    scriptEl.addEventListener('load', renderButton);
    return () => {
      scriptEl.removeEventListener('load', renderButton);
    };
  }, [checkingSession, phase, effectiveClientId, navigate]);

  const handleBootstrapSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await adminApi.bootstrapInitialAdmin({
        onboardingToken,
        bootstrapCode,
        nombreInterno,
      });
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'No se pudo completar la activación.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await adminApi.registerWithInvitationCode({
        onboardingToken,
        invitationCode,
      });
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'El código ingresado no es válido o expiró.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <Helmet>
        <title>Acceso Administrativo | AMF Firma Legal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="admin-auth-card" style={{ maxWidth: '420px' }}>
        <div className="admin-auth-header" style={{ padding: '1.75rem 1.75rem 1.35rem 1.75rem' }}>
          <img
            src={logoWine}
            alt="AMF Firma Legal"
            className="admin-auth-logo"
            style={{ marginBottom: '0.75rem' }}
          />
          <h1
            className="text-serif"
            style={{ fontSize: '1.5rem', color: 'var(--color-wine)', margin: 0 }}
          >
            {phase === 'google' && 'Acceso Administrativo'}
            {phase === 'bootstrap' && 'Activación Inicial'}
            {phase === 'invite' && 'Activación de Acceso'}
          </h1>
        </div>

        <div className="admin-auth-body" style={{ padding: '1.75rem' }}>
          {error && (
            <div className="admin-alert-error" role="alert">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {checkingSession ? (
            <div style={{ textAlign: 'center', padding: '1.25rem 0', color: 'var(--color-wine)' }}>
              <Loader2 size={26} className="aniv-spin" style={{ margin: '0 auto 0.5rem auto' }} />
              <p style={{ fontSize: '0.88rem', margin: 0 }}>Cargando...</p>
            </div>
          ) : phase === 'google' ? (
            <>
              {effectiveClientId ? (
                <>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textAlign: 'center', margin: 0 }}>
                    Inicia sesión con tu cuenta de Google autorizada.
                  </p>
                  <div className="admin-google-btn-wrap" ref={googleButtonRef} />
                  {submitting && (
                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-wine)', margin: 0 }}>
                      Verificando...
                    </p>
                  )}
                </>
              ) : (
                <p style={{ fontSize: '0.88rem', color: '#92400E', textAlign: 'center', margin: 0 }}>
                  El acceso con Google aún no está disponible en este entorno.
                </p>
              )}
            </>
          ) : phase === 'bootstrap' ? (
            <form onSubmit={handleBootstrapSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Ingresa tu nombre y el código de activación inicial.
              </p>

              <div>
                <label className="admin-detail-label" htmlFor="nombreInterno">
                  Nombre *
                </label>
                <input
                  id="nombreInterno"
                  type="text"
                  required
                  value={nombreInterno}
                  onChange={(e) => setNombreInterno(e.target.value)}
                  placeholder="Ej. Dr. Esteban Ávila"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-detail-label" htmlFor="bootstrapCode">
                  Código de activación *
                </label>
                <input
                  id="bootstrapCode"
                  type="password"
                  required
                  value={bootstrapCode}
                  onChange={(e) => setBootstrapCode(e.target.value)}
                  placeholder="Ingresa el código"
                  className="admin-input"
                />
              </div>

              <button type="submit" disabled={submitting} className="btn btn-gold">
                <KeyRound size={17} />
                <span>{submitting ? 'Activando...' : 'Activar y entrar'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPhase('google');
                  setOnboardingToken('');
                  setError('');
                }}
                className="btn btn-outline-wine admin-btn-sm"
              >
                Usar otra cuenta de Google
              </button>
            </form>
          ) : (
            <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Ingresa el código de invitación asignado para habilitar tu acceso.
              </p>

              <div>
                <label className="admin-detail-label" htmlFor="invitationCode">
                  Código de invitación *
                </label>
                <input
                  id="invitationCode"
                  type="text"
                  required
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                  placeholder="AMF-XXXX-XXXX-XXXX"
                  className="admin-input"
                  style={{ fontFamily: 'monospace', letterSpacing: '0.06em' }}
                />
              </div>

              <button type="submit" disabled={submitting} className="btn btn-gold">
                <KeyRound size={17} />
                <span>{submitting ? 'Validando...' : 'Continuar'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPhase('google');
                  setOnboardingToken('');
                  setError('');
                }}
                className="btn btn-outline-wine admin-btn-sm"
              >
                Usar otra cuenta de Google
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', paddingTop: '0.25rem' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.84rem',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              <ArrowLeft size={14} />
              <span>Volver al sitio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
