import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  PhoneCall,
  ShieldCheck,
  Scale,
  Building2,
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { whatsappLink, WA_MESSAGES } from '../config/siteConfig';
import './LocalCity.css';

const CITY_DETAILS = {
  bogota: {
    cityName: "Bogotá D.C.",
    seoKey: "bogota",
    slug: "bogota",
    heroSubtitle: "Sede Bulevar Tequendama · Cobertura Penal 24/7 & Suscripciones",
    headline: "Abogados en Bogotá: Defensa Penal Estratégica, Fuerza Pública & Compliance",
    description: "Atención presencial en nuestra sede de Bulevar Tequendama con agendamiento previo y línea directa de urgencias penales 24 horas ante URIs y juzgados de Bogotá.",
    address: "Calle 26A #13-97 · Oficina 2304, Edificio Bulevar Tequendama",
    locality: "Bogotá D.C., Cundinamarca",
    hoursPresential: "Lunes a Viernes: 8:00 AM – 6:00 PM (Bajo agendamiento)",
    hoursUrgent: "Urgencias Penales & Capturas: 24 Horas / 7 Días",
    waMessage: WA_MESSAGES.SEDE_BOGOTA,
    geo: { lat: "4.6146", lng: "-74.0704" },
    highlights: [
      "Acompañamiento inmediato en URIs Paloquemao, Engativá, Kennedy, Ciudad Bolívar y Puente Aranda.",
      "Defensa disciplinaria ante la Dirección General de la Policía y comandos de Cundinamarca.",
      "Asesoría corporativa y compliance para juntas directivas en el centro y norte financiero."
    ],
    faqs: [
      {
        q: "¿Cómo agendo una consulta presencial en la sede de Bogotá?",
        a: "Puedes solicitarla directamente a través de nuestro botón de WhatsApp o llamando a nuestra línea. Coordinamos la fecha y hora en nuestra oficina de Bulevar Tequendama (Oficina 2304)."
      },
      {
        q: "¿Tienen abogados penalistas disponibles en la noche o fines de semana en Bogotá?",
        a: "Sí. AMF cuenta con turno de guardia permanente para atender capturas en flagrancia, legalizaciones y allanamientos en cualquier URI o juzgado de control de garantías de Bogotá."
      }
    ]
  },
  cali: {
    cityName: "Cali",
    seoKey: "cali",
    slug: "cali",
    heroSubtitle: "Sede Calle 5 · Litigio Estratégico & Fuerza Pública",
    headline: "Abogados en Cali: Defensa Penal 24 Horas & Protección Jurídica en el Valle",
    description: "Presencia sólida en la capital del Valle del Cauca. Litigio penal ante juzgados municipales y de circuito, defensa disciplinaria policial y blindaje empresarial.",
    address: "Calle 5 #88-29",
    locality: "Santiago de Cali, Valle del Cauca",
    hoursPresential: "Lunes a Viernes: 8:00 AM – 6:00 PM (Bajo agendamiento)",
    hoursUrgent: "Urgencias Penales: 24 Horas / 7 Días",
    waMessage: WA_MESSAGES.SEDE_CALI,
    geo: { lat: "3.4516", lng: "-76.5320" },
    highlights: [
      "Atención inmediata en la URI de la Fiscalía General y juzgados de control de garantías en Cali.",
      "Representación técnica para miembros de la Policía Metropolitana de Cali y Tercera Brigada del Ejército.",
      "Asesoría contable y legal especializada para empresas del Valle del Cauca."
    ],
    faqs: [
      {
        q: "¿Dónde queda la oficina de AMF Legal en Cali?",
        a: "Estamos ubicados sobre el corredor principal de la Calle 5 #88-29, con fácil acceso y estacionamiento cercano. La atención presencial se realiza previa coordinación de agenda."
      },
      {
        q: "¿Qué cobertura tienen para uniformados en el Valle del Cauca?",
        a: "Cubrimos Cali, Palmira, Buga, Tuluá, Jamundí y municipios aledaños tanto en investigaciones disciplinarias (Ley 2196) como en la Justicia Penal Militar u ordinaria."
      }
    ]
  },
  medellin: {
    cityName: "Medellín",
    seoKey: "medellin",
    slug: "medellin",
    heroSubtitle: "Atención Presencial Bajo Agendamiento Previo & Cobertura Virtual",
    headline: "Abogados en Medellín: Asesoría Penal, Fuerza Pública & Empresas en Antioquia",
    description: "Representación jurídica especializada para clientes particulares, servidores de la Fuerza Pública y directivos empresariales en el Área Metropolitana del Valle de Aburrá.",
    address: "Atención Presencial Exclusiva Bajo Agendamiento Previo",
    locality: "Medellín, Antioquia",
    hoursPresential: "Lunes a Viernes: Según franja de cita concertada",
    hoursUrgent: "Línea Penal Urgente: 24 Horas / 7 Días",
    waMessage: WA_MESSAGES.SEDE_MEDELLIN,
    geo: { lat: "6.2442", lng: "-75.5812" },
    highlights: [
      "Atención presencial en Medellín concertada de manera anticipada para máxima confidencialidad.",
      "Respaldo en procesos penales ante juzgados de control de garantías y conocimiento de Medellín.",
      "Suscripciones jurídicas mensuales activas para miembros de la Policía Metropolitana del Valle de Aburrá (MEVAL) y Cuarta Brigada."
    ],
    faqs: [
      {
        q: "¿Cómo funciona la atención presencial en Medellín?",
        a: "Por protocolo de seguridad y agenda de nuestros socios litigantes, la atención física en Medellín se realiza exclusivamente mediante agendamiento previo. Puedes reservar tu cita virtual o presencial vía WhatsApp."
      },
      {
        q: "¿Atienden audiencias virtuales en juzgados de Medellín y Antioquia?",
        a: "Sí, representamos clientes en diligencias y audiencias concentradas en todo el departamento de Antioquia con total soporte técnico y procesal."
      }
    ]
  }
};

export const LocalCity = ({ cityKey }) => {
  const navigate = useNavigate();
  const city = CITY_DETAILS[cityKey] || CITY_DETAILS.bogota;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `AMF Firma Legal - Abogados en ${city.cityName}`,
    "image": "https://amfjuridico.com/assets/logos/Sin%20Fondo/AMF%20FIRMA%20LEGAL%20VINO%20TINTO.png",
    "url": `https://amfjuridico.com/${city.slug}`,
    "telephone": "+573013302160",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": city.address,
      "addressLocality": city.cityName,
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.geo.lat,
      "longitude": city.geo.lng
    }
  };

  return (
    <main>
      <SEOHead pageKey={city.seoKey} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* 1. HERO DE CIUDAD */}
      <section className="city-hero">
        <div className="container text-center" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
            <MapPin size={16} />
            <span>SEDE &amp; COBERTURA EN {city.cityName.toUpperCase()}</span>
          </span>
          <h1 className="text-serif city-hero-title" style={{ margin: '0 auto 1.2rem auto' }}>
            {city.headline}
          </h1>
          <p className="city-hero-lead" style={{ margin: '0 auto 2rem auto' }}>
            {city.description}
          </p>

          <div className="city-hero-cta" style={{ justifyContent: 'center' }}>
            <button
              onClick={() => window.open(whatsappLink(undefined, city.waMessage), '_blank')}
              className="btn btn-gold"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <WhatsAppIcon size={18} />
              <span>Agendar en {city.cityName}</span>
            </button>
            <button
              onClick={() => navigate('/defensa-penal')}
              className="btn btn-outline-light"
            >
              <span>Urgencias Penales 24/7</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. DATOS COMPROBABLES DE SEDE & HORARIOS */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container">
          <div className="city-info-grid">
            
            {/* Tarjeta Dirección */}
            <div className="card city-detail-card">
              <div className="city-card-header">
                <MapPin size={24} className="text-gold" />
                <h3 className="text-serif" style={{ fontSize: '1.2rem', color: 'var(--color-wine)' }}>
                  Ubicación de la Sede
                </h3>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--color-ink)', fontSize: '1.05rem', margin: '0.6rem 0 0.3rem' }}>
                {city.address}
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                {city.locality}
              </p>
              <span className="city-appointment-notice">
                * Se requiere agendamiento previo para atención presencial.
              </span>
            </div>

            {/* Tarjeta Horarios */}
            <div className="card city-detail-card">
              <div className="city-card-header">
                <Clock size={24} className="text-gold" />
                <h3 className="text-serif" style={{ fontSize: '1.2rem', color: 'var(--color-wine)' }}>
                  Horarios de Atención
                </h3>
              </div>
              <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ fontSize: '0.92rem', color: 'var(--color-ink)' }}>
                  <strong>Consultas Presenciales:</strong><br />
                  <span style={{ color: 'var(--color-text-muted)' }}>{city.hoursPresential}</span>
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--color-wine)', fontWeight: 600 }}>
                  <strong>{city.hoursUrgent}</strong>
                </div>
              </div>
            </div>

            {/* Tarjeta Contacto Directo */}
            <div className="card city-detail-card">
              <div className="city-card-header">
                <PhoneCall size={24} className="text-gold" />
                <h3 className="text-serif" style={{ fontSize: '1.2rem', color: 'var(--color-wine)' }}>
                  Contacto Inmediato
                </h3>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: '0.6rem 0 1rem' }}>
                Comunícate con nuestro equipo jurídico asignado para {city.cityName}.
              </p>
              <button
                onClick={() => window.open(whatsappLink(undefined, city.waMessage), '_blank')}
                className="btn btn-secondary"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <WhatsAppIcon size={16} />
                <span>Escribir al WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. COBERTURA DESTACADA EN LA CIUDAD */}
      <section className="section" style={{ backgroundColor: 'var(--color-paper)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <h2 className="text-serif text-center" style={{ fontSize: '2.2rem', color: 'var(--color-wine)', marginBottom: '2rem' }}>
            Servicios Principales en {city.cityName}
          </h2>

          <div className="city-highlights-list">
            {city.highlights.map((item, idx) => (
              <div key={idx} className="city-highlight-item">
                <CheckCircle2 size={22} className="text-gold" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '1.05rem', color: 'var(--color-ink)', lineHeight: '1.6' }}>{item}</span>
              </div>
            ))}
          </div>

          <div className="grid-3" style={{ marginTop: '3rem', gap: '1.5rem' }}>
            <div className="card" onClick={() => navigate('/defensa-penal')} style={{ cursor: 'pointer', textAlign: 'center' }}>
              <Scale size={32} className="text-gold" style={{ margin: '0 auto 0.8rem auto' }} />
              <h4 style={{ color: 'var(--color-wine)', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>Defensa Penal</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Capturas, URI y audiencias preliminares en {city.cityName}.</p>
            </div>
            <div className="card" onClick={() => navigate('/suscripcion-juridica-fuerza-publica')} style={{ cursor: 'pointer', textAlign: 'center' }}>
              <ShieldCheck size={32} className="text-gold" style={{ margin: '0 auto 0.8rem auto' }} />
              <h4 style={{ color: 'var(--color-wine)', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>Fuerza Pública</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Planes de suscripción para uniformados en servicio activo.</p>
            </div>
            <div className="card" onClick={() => navigate('/compliance-penal-corporativo')} style={{ cursor: 'pointer', textAlign: 'center' }}>
              <Building2 size={32} className="text-gold" style={{ margin: '0 auto 0.8rem auto' }} />
              <h4 style={{ color: 'var(--color-wine)', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>Compliance</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Prevención de riesgos e investigaciones para empresas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PREGUNTAS FRECUENTES LOCALES */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <h3 className="text-serif text-center" style={{ fontSize: '1.8rem', color: 'var(--color-wine)', marginBottom: '2rem' }}>
            Dudas Frecuentes sobre la Atención en {city.cityName}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {city.faqs.map((faq, idx) => (
              <div key={idx} className="card" style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
                <h4 style={{ color: 'var(--color-wine)', fontSize: '1.1rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>
                  {faq.q}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => navigate('/ubicaciones')}
              className="btn btn-outline-light"
              style={{ color: 'var(--color-wine)', borderColor: 'var(--color-wine)' }}
            >
              <span>Ver todas las sedes nacionales de AMF</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
