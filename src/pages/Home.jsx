import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import { SEOHead } from '../components/SEOHead';
import {
  ShieldCheck,
  Scale,
  MapPin,
  CreditCard,
  FileText,
  Building2,
  MessageSquare,
  ChevronRight,
  PhoneCall,
  ArrowRight,
  Gavel,
  HeartPulse,
  Landmark,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { InteractiveCarousel } from '../components/InteractiveCarousel';
import { whatsappLink, WA_MESSAGES, getAssetUrl } from '../config/siteConfig';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

const ColombiaFlagIcon = ({ width = 34, height = 22 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 36 24"
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.35)',
      flexShrink: 0
    }}
  >
    <rect x="0" y="0" width="36" height="12" fill="#FCD116" />
    <rect x="0" y="12" width="36" height="6" fill="#003893" />
    <rect x="0" y="18" width="36" height="6" fill="#CE1126" />
  </svg>
);

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <SEOHead pageKey="home" />

      {/* 1. HERO PRINCIPAL CON EL CARRUSEL LIMPIO SIN MARCO */}
      <section className="hero-wrapper" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="container">

          {/* Carrusel Limpio Minimalista */}
          <InteractiveCarousel />

          {/* Barra inferior de Sedes / Señal de Confianza */}
          <div
            style={{
              marginTop: '3rem',
              paddingTop: '1.8rem',
              borderTop: '1px solid rgba(253, 249, 242, 0.15)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-gold)', fontWeight: 600, fontSize: '0.95rem' }}>
              <MapPin size={18} />
              <span>Bogotá · Cali · Medellín · Piendamó · Atención virtual nacional</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-on-dark-muted)', opacity: 0.9 }}>
              * Atención presencial siempre mediante agendamiento previo.
            </span>
          </div>

        </div>
      </section>

      {/* 2. RESUMEN COMBINADO DE ÁREAS Y SERVICIOS AMF (BASADO EN BRIEF) */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container">

          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--color-wine)', marginBottom: '0.6rem' }}>
              Servicios & Cobertura AMF Legal
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              Respaldo legal estructurado tanto para prevención permanente como para respuesta estratégica inmediata en Colombia.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '1.8rem' }}>

            {/* 1. Suscripciones Fuerza Pública */}
            <div
              className="card"
              onClick={() => navigate('/suscripcion-juridica-fuerza-publica')}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFF' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <ShieldCheck size={36} className="text-gold" />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>
                  Suscripciones Fuerza Pública
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Protección mensual continua para Policía Nacional, Ejército, Armada y FAC. Investigaciones disciplinarias (Ley 2196), penal militar y respaldo familiar.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.95rem' }}>
                <span>Ver suscripciones →</span>
              </div>
            </div>

            {/* 2. Defensa Penal 24/7 */}
            <div
              className="card"
              onClick={() => navigate('/defensa-penal')}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFF' }}
            >
              <div>
                <Scale size={36} className="text-gold" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>
                  Defensa Penal Estratégica 24/7
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Respuesta inmediata ante capturas, flagrancia, citaciones de Fiscalía, audiencias de control de garantías y litigio penal complejo en Colombia.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.95rem' }}>
                <span>Ver asistencia penal →</span>
              </div>
            </div>

            {/* 3. Compliance & Penal Corporativo */}
            <div
              className="card"
              onClick={() => navigate('/compliance-penal-corporativo')}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFF' }}
            >
              <div>
                <Building2 size={36} className="text-gold" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>
                  Compliance &amp; Penal Corporativo
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Blindaje para empresas y directivos. Circular 100-000020 de 2026 de Supersociedades (SAGRILAFT/PTEE), investigaciones internas y prevención penal.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.95rem' }}>
                <span>Ver compliance corporativo →</span>
              </div>
            </div>

            {/* 4. Justicia Penal Militar & Policial */}
            <div
              className="card"
              onClick={() => navigate('/otros-servicios')}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFF' }}
            >
              <div>
                <Gavel size={36} className="text-gold" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>
                  Justicia Penal Militar & Policial
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Representación especializada en fuero militar, investigaciones operacionales y actos vinculados al cumplimiento del deber.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.95rem' }}>
                <span>Conocer cobertura →</span>
              </div>
            </div>

            {/* 5. Protección Constitucional & Familiar */}
            <div
              className="card"
              onClick={() => navigate('/otros-servicios')}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFF' }}
            >
              <div>
                <HeartPulse size={36} className="text-gold" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>
                  Protección Constitucional & Salud
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Acciones de tutela, derechos de petición, reclamos de salud, debido proceso y seguridad social para ti y tu grupo familiar.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.95rem' }}>
                <span>Ver derechos fundamentales →</span>
              </div>
            </div>

            {/* 6. Disciplinario, Administrativo & Civil */}
            <div
              className="card"
              onClick={() => navigate('/otros-servicios')}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFF' }}
            >
              <div>
                <Landmark size={36} className="text-gold" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>
                  Disciplinario & Administrativo
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Defensa integral para servidores públicos ante la Procuraduría, Personerías y oficinas de control interno disciplinario.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.95rem' }}>
                <span>Ver defensa disciplinaria →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GRAN CTA FINAL (TRÍPODE COMERCIAL) */}
      <section className="section section-dark" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          <h2 className="text-serif" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', color: 'var(--color-paper)', marginBottom: '1.2rem' }}>
            No necesitas saber qué tipo de abogado necesitas.<br />
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Solo cuéntanos qué está pasando.</span>
          </h2>

          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-on-dark-muted)', marginBottom: '2.5rem', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
            En AMF escuchamos tu situación, evaluamos tus riesgos y te damos una solución jurídica clara de inmediato.
          </p>

          <div className="grid-3" style={{ gap: '1.8rem', maxWidth: '1180px', margin: '0 auto' }}>

            {/* Tarjeta 1: Fuerza Pública */}
            <div
              className="card card-dark"
              style={{
                padding: '2rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundImage: `linear-gradient(135deg, rgba(20, 1, 4, 0.88) 0%, rgba(53, 1, 8, 0.84) 50%, rgba(10, 0, 2, 0.94) 100%), url("${getAssetUrl('/assets/BACKGROUNDS/FUERZAS ARMADAS.png')}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid var(--color-border-gold)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CARRERA &amp; FAMILIA</span>
                  <ColombiaFlagIcon width={34} height={22} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-paper)', margin: '0.5rem 0 0.8rem 0', fontFamily: 'var(--font-serif)' }}>
                  Soy integrante de la Fuerza Pública
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-on-dark-muted)', marginBottom: '1.8rem', lineHeight: '1.55' }}>
                  Policía Nacional, Ejército Nacional, Armada de Colombia, Fuerza Aeroespacial Colombiana e INPEC. Planes jurídicos con consultas ilimitadas y defensa disciplinaria incluida.
                </p>
              </div>
              <button
                onClick={() => navigate('/suscripcion-juridica-fuerza-publica')}
                className="btn btn-gold"
                style={{ width: '100%', fontSize: '0.95rem' }}
              >
                Conocer planes y coberturas
              </button>
            </div>

            {/* Tarjeta 2: Defensa Penal */}
            <div
              className="card card-dark"
              style={{
                padding: '2rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundImage: `linear-gradient(135deg, rgba(29, 3, 4, 0.92) 0%, rgba(29, 3, 4, 0.88) 50%, rgba(15, 1, 2, 0.95) 100%), url("${getAssetUrl('/assets/BACKGROUNDS/JUSTICIA PENAL ESTRATEGICA.png')}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#1d0304',
                border: '1px solid var(--color-border-gold)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LIBERTAD &amp; URGENCIAS</span>
                  <Scale size={26} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-paper)', margin: '0.5rem 0 0.8rem 0', fontFamily: 'var(--font-serif)' }}>
                  Tengo una urgencia penal
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-on-dark-muted)', marginBottom: '1.8rem', lineHeight: '1.55' }}>
                  Capturas, primeras 36 horas, audiencias concentradas y citaciones de Fiscalía 24/7.
                </p>
              </div>
              <button
                onClick={() => window.open(whatsappLink(undefined, WA_MESSAGES.DESDE_PENAL), '_blank')}
                className="btn btn-gold"
                style={{ width: '100%', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <WhatsAppIcon size={18} />
                <span>Hablar con Penalista 24/7 →</span>
              </button>
            </div>

            {/* Tarjeta 3: Compliance Empresarial */}
            <div
              className="card card-dark"
              style={{
                padding: '2rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, rgba(20, 1, 4, 0.94) 0%, rgba(45, 2, 7, 0.9) 100%)',
                border: '1px solid var(--color-border-gold)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMPRESA &amp; DIRECTIVOS</span>
                  <Building2 size={26} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-paper)', margin: '0.5rem 0 0.8rem 0', fontFamily: 'var(--font-serif)' }}>
                  Represento a una empresa
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-on-dark-muted)', marginBottom: '1.8rem', lineHeight: '1.55' }}>
                  Prevención penal corporativa, Circular 100-000020 de 2026 e investigaciones internas.
                </p>
              </div>
              <button
                onClick={() => navigate('/compliance-penal-corporativo')}
                className="btn btn-gold"
                style={{ width: '100%', fontSize: '0.95rem' }}
              >
                Ver blindaje empresarial →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. CENTRO JURÍDICO: GUÍAS & RESPUESTAS INMEDIATAS */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>
              <BookOpen size={14} /> CONOCIMIENTO JURÍDICO PRÁCTICO
            </span>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', color: 'var(--color-wine)', marginBottom: '0.8rem' }}>
              Centro Jurídico AMF: Respuestas Claras a Dudas Reales
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              Artículos prácticos estructurados en 10 pasos con sustento legal, casos reales y qué hacer de inmediato para no perjudicar tu situación.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '1.8rem' }}>
            {/* Guía 1 */}
            <div className="card" style={{ backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.8rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-wine)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  URGENCIA PENAL 24/7
                </span>
                <h3 className="text-serif" style={{ fontSize: '1.25rem', color: 'var(--color-wine)', margin: '0.5rem 0 0.8rem 0' }}>
                  ¿Qué hacer si capturan a un familiar en Colombia? Guía de las primeras 36 horas
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                  Término perentorio del Artículo 28 constitucional, audiencias concentradas preliminares y el papel decisivo del arraigo familiar y laboral.
                </p>
              </div>
              <Link
                to="/centro-juridico/que-hacer-captura-familiar-colombia-primeras-36-horas"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.75rem 1rem', fontSize: '0.92rem' }}
              >
                <span>Leer guía completa</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Guía 2 */}
            <div className="card" style={{ backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.8rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-wine)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  INDAGACIÓN PREVIA
                </span>
                <h3 className="text-serif" style={{ fontSize: '1.25rem', color: 'var(--color-wine)', margin: '0.5rem 0 0.8rem 0' }}>
                  ¿Qué hacer si me citaron a interrogatorio en la Fiscalía General de la Nación?
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                  Por qué nunca debes acudir solo ni rendir declaraciones informales. Derecho fundamental a guardar silencio (Art. 33 CP) y defensa técnica.
                </p>
              </div>
              <Link
                to="/centro-juridico/que-hacer-me-citaron-interrogatorio-fiscalia"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.75rem 1rem', fontSize: '0.92rem' }}
              >
                <span>Leer guía completa</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Guía 3 */}
            <div className="card" style={{ backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.8rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-wine)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  FUERZA PÚBLICA
                </span>
                <h3 className="text-serif" style={{ fontSize: '1.25rem', color: 'var(--color-wine)', margin: '0.5rem 0 0.8rem 0' }}>
                  Investigación disciplinaria en la Policía Nacional (Ley 2196 de 2022)
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                  Cuándo requieres abogado particular, cómo solicitar pruebas técnicas y cómo blindar tu ascenso y estabilidad económica.
                </p>
              </div>
              <Link
                to="/centro-juridico/investigacion-disciplinaria-policia-nacional-ley-2196"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.75rem 1rem', fontSize: '0.92rem' }}
              >
                <span>Leer guía completa</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Guía 4 */}
            <div className="card" style={{ backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.8rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-wine)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  COMPLIANCE EMPRESARIAL
                </span>
                <h3 className="text-serif" style={{ fontSize: '1.25rem', color: 'var(--color-wine)', margin: '0.5rem 0 0.8rem 0' }}>
                  Circular 100-000020 de 2026: Nuevo Sistema Integral de Riesgos (SAGRILAFT/PTEE)
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                  Análisis práctico de la unificación normativa de Supersociedades, debida diligencia de contrapartes y prevención penal directiva.
                </p>
              </div>
              <Link
                to="/centro-juridico/circular-100-000020-supersociedades-nuevo-sistema-riesgos-sagrilaft-ptee"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.75rem 1rem', fontSize: '0.92rem' }}
              >
                <span>Leer guía completa</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => navigate('/centro-juridico')}
              className="btn btn-primary"
            >
              <span>Explorar todos los artículos en el Centro Jurídico</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
};
