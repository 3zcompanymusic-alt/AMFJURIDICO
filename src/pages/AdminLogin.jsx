import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  KeyRound,
  Loader2,
  Lock,
  ShieldCheck,
} from 'lucide-react';
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

  // Verificar si ya existe una sesión activa
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
        // Sin sesión activa: continuar al flujo de login
      }

      try {
        const cfg = await adminApi.getAuthConfig();
        if (active) {
          setAuthConfig(cfg);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'No fue posible conectar con el servidor de autenticación.');
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

  // Cargar e inicializar Google Identity Services
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
        setError(err.message || 'Error validando tu cuenta de Google.');
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
        width: 320,
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
      setError(err.message || 'No se pudo activar el administrador inicial.');
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
      setError(err.message || 'El código de invitación no es válido o expiró.');
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

      <div className="admin-auth-card">
        <div className="admin-auth-header">
          <img
            src={logoWine}
            alt="AMF Firma Legal"
            className="admin-auth-logo"
          />
          <span className="badge badge-wine">
            <Lock size={14} />
            <span>Portal Administrativo</span>
          </span>
          <h1
            className="text-serif"
            style={{ fontSize: '1.6rem', color: 'var(--color-wine)', marginTop: '0.85rem' }}
          >
            {phase === 'google' && 'Ingreso con Google'}
            {phase === 'bootstrap' && 'Activación de Administrador Inicial'}
            {phase === 'invite' && 'Registro con Código de Invitación'}
          </h1>
        </div>

        <div className="admin-auth-body">
          <div className="admin-privacy-pill">
            <ShieldCheck size={18} className="text-gold" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              Autenticación 100% con Google ID (<code>sub</code>). El sistema{' '}
              <strong>no almacena correos ni contraseñas</strong> en la base de datos.
            </span>
          </div>

          {error && (
            <div className="admin-alert-error" role="alert">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {checkingSession ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--color-wine)' }}>
              <Loader2 size={28} className="aniv-spin" style={{ margin: '0 auto 0.5rem auto' }} />
              <p style={{ fontSize: '0.9rem' }}>Verificando estado de autenticación...</p>
            </div>
          ) : phase === 'google' ? (
            <>
              {effectiveClientId ? (
                <>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    {authConfig?.requiresBootstrap
                      ? 'Aún no hay administradores registrados. Inicia sesión con Google para vincular al primer Super Administrador.'
                      : 'Inicia sesión con tu cuenta de Google autorizada o ingresa con un código de invitación.'}
                  </p>
                  <div className="admin-google-btn-wrap" ref={googleButtonRef} />
                  {submitting && (
                    <p style={{ textAlign: 'center', fontSize: '0.86rem', color: 'var(--color-wine)' }}>
                      Verificando identidad con Google...
                    </p>
                  )}
                </>
              ) : (
                <div
                  style={{
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #F59E0B',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem',
                    fontSize: '0.86rem',
                    color: '#92400E',
                    lineHeight: '1.5',
                  }}
                >
                  <strong>Falta configurar Google Client ID:</strong> define{' '}
                  <code>GOOGLE_CLIENT_ID</code> en el backend (Render) y{' '}
                  <code>VITE_GOOGLE_CLIENT_ID</code> en el frontend (Cloudflare Pages).
                </div>
              )}
            </>
          ) : phase === 'bootstrap' ? (
            <form onSubmit={handleBootstrapSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Cuenta de Google verificada. Ingresa el código maestro inicial definido en{' '}
                <code>ADMIN_BOOTSTRAP_CODE</code>. Al completar este paso, el código maestro inicial
                queda destruido de forma irreversible.
              </p>

              <div>
                <label className="admin-detail-label" htmlFor="nombreInterno">
                  Nombre o Alias Interno *
                </label>
                <input
                  id="nombreInterno"
                  type="text"
                  required
                  value={nombreInterno}
                  onChange={(e) => setNombreInterno(e.target.value)}
                  placeholder="Ej. Socio Director Bogotá"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-detail-label" htmlFor="bootstrapCode">
                  Código Maestro Inicial *
                </label>
                <input
                  id="bootstrapCode"
                  type="password"
                  required
                  value={bootstrapCode}
                  onChange={(e) => setBootstrapCode(e.target.value)}
                  placeholder="Código maestro de servidor"
                  className="admin-input"
                />
              </div>

              <button type="submit" disabled={submitting} className="btn btn-gold">
                <KeyRound size={17} />
                <span>{submitting ? 'Vinculando cuenta...' : 'Activar Super Administrador'}</span>
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
            <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Tu Google ID aún no está vinculado. Ingresa el código de invitación único entregado
                por el administrador principal.
              </p>

              <div>
                <label className="admin-detail-label" htmlFor="invitationCode">
                  Código de Invitación *
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
                <span>{submitting ? 'Validando código...' : 'Vincular Google ID y Entrar'}</span>
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
                Cambiar cuenta de Google
              </button>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.86rem',
                color: 'var(--color-wine)',
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={15} />
              <span>Volver al sitio web público</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
