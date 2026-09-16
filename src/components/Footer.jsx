import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Scale, Phone, ArrowUpRight } from 'lucide-react';
import { whatsappLink, WA_MESSAGES, getAssetUrl } from '../config/siteConfig';
import { WhatsAppIcon } from './WhatsAppIcon';
import './Footer.css';

const logoCrema = getAssetUrl('/assets/logos/Sin Fondo/AMF FIRMA LEGAL CREMA .png');

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-wine)', color: 'var(--color-paper)', paddingTop: '4rem', paddingBottom: '2.5rem', borderTop: '2px solid var(--color-gold)' }}>
      <div className="container">

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', marginBottom: '3.5rem' }}>

          {/* Column 1: Brand & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h3 className="text-serif" style={{ fontSize: '1.3rem', color: 'var(--color-gold)' }}>
              AMF FIRMA LEGAL
            </h3>
            <p style={{ color: 'var(--color-text-on-dark-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Protección jurídica permanente para Fuerza Pública y defensa penal estratégica 24/7 en Colombia. Respaldamos tus decisiones cuando realmente importa.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-gold)' }}>
              <MapPin size={16} />
              <span>Bogotá · Cali · Medellín · Piendamó · Virtual</span>
            </div>
          </div>

          {/* Column 2: Líneas de Negocio */}
          <div>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)' }}>
              Líneas de Atención
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <li>
                <Link to="/suscripcion-juridica-fuerza-publica" style={{ color: 'var(--color-text-on-dark-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFF'}>
                  Suscripciones Fuerza Pública
                </Link>
              </li>
              <li>
                <Link to="/defensa-penal" style={{ color: 'var(--color-text-on-dark-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFF'}>
                  Defensa Penal Estratégica 24/7
                </Link>
              </li>
              <li>
                <Link to="/compliance-penal-corporativo" style={{ color: 'var(--color-text-on-dark-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFF'}>
                  Compliance &amp; Penal Corporativo
                </Link>
              </li>
              <li>
                <Link to="/centro-juridico" style={{ color: 'var(--color-text-on-dark-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFF'}>
                  Centro Jurídico &amp; Guías Legales
                </Link>
              </li>
              <li>
                <Link to="/planes" style={{ color: 'var(--color-text-on-dark-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFF'}>
                  Planes (Escudo, Fortaleza, Bastión)
                </Link>
              </li>
              <li>
                <Link to="/clientes" style={{ color: 'var(--color-text-on-dark-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFF'}>
                  Clientes &amp; Aliados
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atención Presencial & Sedes Locales */}
          <div>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)' }}>
              Sedes &amp; Cobertura Local
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
              <li>
                <Link to="/bogota" style={{ color: 'var(--color-text-on-dark-muted)' }}>
                  • Abogados en Bogotá (Bulevar Tequendama)
                </Link>
              </li>
              <li>
                <Link to="/cali" style={{ color: 'var(--color-text-on-dark-muted)' }}>
                  • Abogados en Cali (Calle 5)
                </Link>
              </li>
              <li>
                <Link to="/medellin" style={{ color: 'var(--color-text-on-dark-muted)' }}>
                  • Abogados en Medellín (Agendamiento Previo)
                </Link>
              </li>
              <li>
                <Link to="/ubicaciones" style={{ color: 'var(--color-text-on-dark-muted)' }}>
                  • Todas las Sedes &amp; Piendamó
                </Link>
              </li>
            </ul>
            <p style={{ color: 'var(--color-text-on-dark-muted)', fontSize: '0.82rem', opacity: 0.85, lineHeight: '1.4' }}>
              * Atención presencial mediante agendamiento previo.
            </p>
          </div>

          {/* Column 4: Contacto Directo */}
          <div>
            <h4 style={{ color: 'var(--color-gold)', fontSize: '1.1rem', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)' }}>
              Contacto Inmediato
            </h4>
            <p style={{ color: 'var(--color-text-on-dark-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              ¿Tienes una urgencia o quieres afiliarte hoy mismo?
            </p>
            <a
              href={whatsappLink(undefined, WA_MESSAGES.FOOTER_CONTACT)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ width: '100%', fontSize: '0.9rem' }}
            >
              <WhatsAppIcon size={16} />
              <span>WhatsApp 24/7</span>
            </a>
          </div>

        </div>

        {/* Box dedicado para el logo centrado (penúltimo elemento del footer) */}
        <div className="footer-logo-box">
          <Link to="/" aria-label="AMF Firma Legal - Inicio">
            <img
              src={logoCrema}
              alt="AMF Firma Legal - Abogados en Colombia"
              loading="lazy"
              className="footer-centered-logo"
              width={360}
              height={90}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </Link>
        </div>

        {/* Legal Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(253, 249, 242, 0.15)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--color-text-on-dark-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} AMF Firma Legal. Todos los derechos reservados. Colombia.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span>* Las representaciones y servicios están sujetos a los términos de cada plan.</span>
            <Link to="/privacidad" style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>
              Política de Privacidad (Ley 1581)
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
