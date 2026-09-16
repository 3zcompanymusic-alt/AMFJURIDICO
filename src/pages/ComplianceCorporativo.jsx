import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Building2,
  FileCheck2,
  SearchCheck,
  AlertTriangle,
  Scale,
  CheckCircle2,
  ArrowRight,
  Send,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { whatsappLink, WA_MESSAGES } from '../config/siteConfig';
import './ComplianceCorporativo.css';

export const ComplianceCorporativo = () => {
  const navigate = useNavigate();

  // Estado del formulario de diagnóstico interactivo
  const [formData, setFormData] = useState({
    empresa: '',
    sector: '',
    tamano: 'Mediana (50 - 200 empleados)',
    preocupacion: 'Actualización Circular 100-000020 (SAGRILAFT/PTEE 2026)',
    contacto: '',
    telefono: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmitDiagnostic = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const textMsg = `*Diagnóstico Corporativo Web AMF Firma Legal*\n\n` +
      `• *Empresa:* ${formData.empresa || 'No especificada'}\n` +
      `• *Sector:* ${formData.sector || 'General'}\n` +
      `• *Tamaño:* ${formData.tamano}\n` +
      `• *Prioridad:* ${formData.preocupacion}\n` +
      `• *Contacto:* ${formData.contacto}\n` +
      `• *Teléfono:* ${formData.telefono}`;
    
    setTimeout(() => {
      window.open(whatsappLink(undefined, textMsg), '_blank');
    }, 400);
  };

  return (
    <main>
      <SEOHead pageKey="compliance" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": "Compliance & Penal Corporativo | AMF Firma Legal",
          "description": "Prevención penal empresarial, investigaciones internas y adecuación a la Circular Externa 100-000020 de 2026 de la Superintendencia de Sociedades.",
          "serviceType": [
            "Prevención Penal Corporativa",
            "Implementación SAGRILAFT y PTEE",
            "Investigaciones Internas Empresariales",
            "Debida Diligencia de Contrapartes",
            "Defensa Penal de Administradores"
          ],
          "provider": {
            "@type": "LegalService",
            "name": "AMF Firma Legal",
            "url": "https://amfjuridico.com"
          }
        })}</script>
      </Helmet>

      {/* 1. HERO CORPORATIVO */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)', paddingTop: '2.5rem', paddingBottom: '3.2rem' }}>
        <div className="container text-center" style={{ maxWidth: '840px', margin: '0 auto' }}>
          <span className="badge badge-wine" style={{ marginBottom: '1rem' }}>
            <Building2 size={16} />
            <span>COMPLIANCE EMPRESARIAL &amp; PENAL CORPORATIVO</span>
          </span>
          <h1 className="text-serif" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', color: 'var(--color-wine)', marginBottom: '1rem' }}>
            Blindaje Penal Corporativo &amp; Gestión Integral de Riesgos
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '1.8rem' }}>
            Protegemos a empresas, directivos y juntas directivas en Colombia. Un enfoque pragmático con <strong>capacidad de reacción penal real</strong>, investigaciones internas confidenciales y adaptación a la normativa vigente de la Superintendencia de Sociedades.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <a
              href="#diagnostico"
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.6rem' }}
            >
              <span>Diagnóstico de Riesgo Gratuito</span>
              <ArrowRight size={18} />
            </a>
            <button
              onClick={() => window.open(whatsappLink(undefined, WA_MESSAGES.COMPLIANCE_INVESTIGACIONES), '_blank')}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <WhatsAppIcon size={18} />
              <span>Consulta Confidencial</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. ALERTA NORMATIVA 2026: CIRCULAR EXTERNA 100-000020 */}
      <section className="section" style={{ backgroundColor: 'var(--color-paper)', paddingBottom: '3.5rem', paddingTop: '3.5rem' }}>
        <div className="container">
          <div className="compliance-circular-box">
            <div className="circular-icon-col">
              <AlertTriangle size={42} className="text-gold" />
            </div>
            <div className="circular-content-col">
              <div className="circular-tag">ACTUALIZACIÓN NORMATIVA OBLIGATORIA 2026</div>
              <h2 className="text-serif" style={{ fontSize: '1.5rem', color: 'var(--color-wine)', margin: '0.5rem 0' }}>
                Circular Externa 100-000020 de la Superintendencia de Sociedades
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: '1.6' }}>
                La Superintendencia de Sociedades unificó los regímenes de <strong>SAGRILAFT</strong> (prevención de lavado de activos y financiamiento del terrorismo) y <strong>PTEE</strong> (Programa de Transparencia y Ética Empresarial) en un único <strong>Sistema Integral de Autocontrol y Gestión de Riesgos</strong>.
              </p>
              <div className="circular-keypoints">
                <div className="keypoint-item">
                  <CheckCircle2 size={18} className="text-gold" />
                  <span>Unificación de matrices de riesgo LA/FT con riesgos de corrupción y soborno transnacional.</span>
                </div>
                <div className="keypoint-item">
                  <CheckCircle2 size={18} className="text-gold" />
                  <span>Nuevos deberes y responsabilidad patrimonial / penal para Representantes Legales y Oficiales de Cumplimiento.</span>
                </div>
                <div className="keypoint-item">
                  <CheckCircle2 size={18} className="text-gold" />
                  <span>Debida diligencia reforzada en contratación pública, intermediarios y contrapartes de alto riesgo.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LÍNEAS DE ACCIÓN PENAL CORPORATIVO */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem auto' }}>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', color: 'var(--color-wine)', marginBottom: '0.8rem' }}>
              Servicios Estratégicos para el Sector Empresarial
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              No vendemos manuales genéricos en papel. Estructuramos defensas preventivas y litigio penal para resguardar la continuidad de tu negocio.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '2rem' }}>
            {/* Tarjeta 1 */}
            <div className="card compliance-service-card">
              <div className="service-icon-wrapper">
                <ShieldAlert size={30} className="text-gold" />
              </div>
              <h3 className="text-serif" style={{ fontSize: '1.35rem', color: 'var(--color-wine)', margin: '1rem 0 0.5rem 0' }}>
                Prevención Penal de Administradores &amp; Directivos
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                Blindaje frente a investigaciones penales por delitos económicos, fraude, administración desleal, delitos tributarios, ambientales y contra la administración pública. Diseñamos la exclusión de responsabilidad penal de la persona jurídica (Ley 2195 de 2022).
              </p>
              <ul className="service-checklist">
                <li>Defensa en indagaciones previas ante la Fiscalía General de la Nación.</li>
                <li>Estrategia procesal integral para Juntas Directivas y Gerencias.</li>
                <li>Acompañamiento en diligencias judiciales, allanamientos e inspecciones.</li>
              </ul>
            </div>

            {/* Tarjeta 2 */}
            <div className="card compliance-service-card">
              <div className="service-icon-wrapper">
                <SearchCheck size={30} className="text-gold" />
              </div>
              <h3 className="text-serif" style={{ fontSize: '1.35rem', color: 'var(--color-wine)', margin: '1rem 0 0.5rem 0' }}>
                Investigaciones Internas &amp; Reacción Inmediata
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                Cuando se detectan fraudes internos, desvío de fondos, colusión de empleados o fuga de información confidencial, actuamos con total reserva bajo secreto profesional de abogado para investigar, custodiar evidencia digital y presentar las denuncias pertinentes.
              </p>
              <ul className="service-checklist">
                <li>Auditoría forense legal y cadena de custodia de evidencia.</li>
                <li>Entrevistas corporativas con observancia del debido proceso laboral.</li>
                <li>Formulación de querellas y denuncias penales como víctimas.</li>
              </ul>
            </div>

            {/* Tarjeta 3 */}
            <div className="card compliance-service-card">
              <div className="service-icon-wrapper">
                <FileCheck2 size={30} className="text-gold" />
              </div>
              <h3 className="text-serif" style={{ fontSize: '1.35rem', color: 'var(--color-wine)', margin: '1rem 0 0.5rem 0' }}>
                Adecuación Sistema Integral (Circular 100-000020)
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                Diagnóstico de obligatoriedad, actualización y auditoría de cumplimiento frente al nuevo marco de la Superintendencia de Sociedades para SAGRILAFT y PTEE unificados.
              </p>
              <ul className="service-checklist">
                <li>Estructuración de Matrices de Riesgo por factores (clientes, jurisdicciones, canales).</li>
                <li>Capacitación certificada a directivos, empleados y órganos de control.</li>
                <li>Respuesta técnica a requerimientos y pliegos de la Superintendencia.</li>
              </ul>
            </div>

            {/* Tarjeta 4 */}
            <div className="card compliance-service-card">
              <div className="service-icon-wrapper">
                <Scale size={30} className="text-gold" />
              </div>
              <h3 className="text-serif" style={{ fontSize: '1.35rem', color: 'var(--color-wine)', margin: '1rem 0 0.5rem 0' }}>
                Debida Diligencia Reforzada (KYC / AML / PEPs)
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                Prevención de contaminación en la cadena de suministro y en contratistas estatales (SECOP). Filtramos a terceros en listas restrictivas vinculantes y bases de datos sancionatorias.
              </p>
              <ul className="service-checklist">
                <li>Cláusulas contractuales de prevención penal y resolución inmediata.</li>
                <li>Verificación de beneficiarios finales reales (UBO).</li>
                <li>Protocolos seguros para contratistas en licitaciones públicas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FORMULARIO DE DIAGNÓSTICO INTERACTIVO */}
      <section id="diagnostico" className="section section-dark" style={{ position: 'relative' }}>
        <div className="container">
          <div className="compliance-diagnostic-wrapper">
            <div className="diagnostic-text-col">
              <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
                EVALUACIÓN PRELIMINAR CONFIDENCIAL
              </span>
              <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: 'var(--color-paper)', marginBottom: '1rem' }}>
                Solicita un Diagnóstico de Riesgo para tu Compañía
              </h2>
              <p style={{ color: 'var(--color-text-on-dark-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Completa este breve formulario y uno de nuestros abogados especialistas en derecho penal corporativo y auditoría financiera analizará el nivel de exposición de tu empresa sin costo inicial.
              </p>

              <div className="diagnostic-guarantees">
                <div className="guarantee-item">
                  <CheckCircle2 size={20} className="text-gold" />
                  <span>Amparado bajo reserva legal y secreto profesional.</span>
                </div>
                <div className="guarantee-item">
                  <CheckCircle2 size={20} className="text-gold" />
                  <span>Respuesta técnica en menos de 24 horas hábiles.</span>
                </div>
                <div className="guarantee-item">
                  <CheckCircle2 size={20} className="text-gold" />
                  <span>Atención presencial en Bogotá, Cali y Medellín o virtual nacional.</span>
                </div>
              </div>
            </div>

            <div className="diagnostic-form-col">
              <form onSubmit={handleSubmitDiagnostic} className="compliance-form-box">
                <h3 className="text-serif" style={{ fontSize: '1.3rem', color: 'var(--color-wine)', marginBottom: '1.2rem' }}>
                  Datos Básicos de la Empresa
                </h3>

                <div className="form-group-field">
                  <label>Razón Social o Nombre de la Empresa</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Inversiones &amp; Logística S.A.S."
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group-field">
                    <label>Sector de Actividad</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Transporte, Salud, Comercio"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    />
                  </div>
                  <div className="form-group-field">
                    <label>Tamaño / Empleados</label>
                    <select
                      value={formData.tamano}
                      onChange={(e) => setFormData({ ...formData, tamano: e.target.value })}
                    >
                      <option>Menos de 20 empleados</option>
                      <option>20 - 50 empleados</option>
                      <option>50 - 200 empleados</option>
                      <option>Más de 200 empleados</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-field">
                  <label>Asunto o Prioridad Inmediata</label>
                  <select
                    value={formData.preocupacion}
                    onChange={(e) => setFormData({ ...formData, preocupacion: e.target.value })}
                  >
                    <option>Actualización Circular 100-000020 (SAGRILAFT/PTEE 2026)</option>
                    <option>Investigación interna por fraude o fuga de datos</option>
                    <option>Requerimiento de la Fiscalía o Superintendencia</option>
                    <option>Defensa penal de directivos / socios</option>
                    <option>Debida diligencia para licitaciones y contratos</option>
                  </select>
                </div>

                <div className="form-group-row">
                  <div className="form-group-field">
                    <label>Nombre del Contacto</label>
                    <input
                      type="text"
                      required
                      placeholder="Nombre y cargo"
                      value={formData.contacto}
                      onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                    />
                  </div>
                  <div className="form-group-field">
                    <label>Teléfono o Celular WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 310 123 4567"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{ width: '100%', marginTop: '0.8rem', padding: '0.95rem' }}
                >
                  <Send size={18} />
                  <span>Enviar Diagnóstico vía WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN ARTÍCULOS Y GUÍAS DE COMPLIANCE */}
      <section className="section" style={{ backgroundColor: 'var(--color-paper)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>
              <BookOpen size={14} /> CENTRO JURÍDICO CORPORATIVO
            </span>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', color: 'var(--color-wine)', marginBottom: '0.8rem' }}>
              Guías Normativas &amp; Blindaje de Directivos
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
              Análisis técnico sobre las nuevas exigencias de la Superintendencia de Sociedades y la jurisprudencia penal sobre la posición de garante gerencial.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '2rem' }}>
            <div className="card" style={{ backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  REGULACIÓN SUPERSOCIEDADES 2026
                </span>
                <h3 className="text-serif" style={{ fontSize: '1.35rem', color: 'var(--color-wine)', margin: '0.6rem 0 0.8rem 0' }}>
                  Circular 100-000020 de 2026: Sistema Integral SAGRILAFT y PTEE
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Unificación normativa de prevención de lavado de activos y transparencia empresarial. Umbrales de obligatoriedad, plazos perentorios y cómo estructurar matrices de riesgo a la medida.
                </p>
              </div>
              <Link
                to="/centro-juridico/circular-100-000020-supersociedades-nuevo-sistema-riesgos-sagrilaft-ptee"
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Leer Análisis Normativo</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  DERECHO PENAL ECONÓMICO
                </span>
                <h3 className="text-serif" style={{ fontSize: '1.35rem', color: 'var(--color-wine)', margin: '0.6rem 0 0.8rem 0' }}>
                  Responsabilidad penal de directivos y representantes legales
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  ¿Cuándo respondes penalmente por delitos de la empresa o proveedores? Posición de garante, delitos tributarios, lavado por omisión y cómo opera el compliance como eximente de dolo.
                </p>
              </div>
              <Link
                to="/centro-juridico/responsabilidad-penal-representantes-legales-administradores-colombia"
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Leer Análisis Normativo</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PREGUNTAS FRECUENTES CORPORATIVAS */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="text-serif" style={{ fontSize: '2.2rem', color: 'var(--color-wine)' }}>
              Preguntas Frecuentes sobre Compliance y Penal Corporativo
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="card" style={{ backgroundColor: '#FFF', padding: '1.6rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-wine)', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>
                ¿Cuál es la diferencia entre un asesor de compliance y una firma penal corporativa?
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Un asesor tradicional se enfoca únicamente en diseñar formatos y manuales documentales. AMF Firma Legal combina el diseño preventivo con capacidad de litigio en estrados judiciales: si ocurre un hecho delictivo en la empresa, nuestros abogados penalistas lideran la defensa, representan a la sociedad como víctima y protegen penalmente a los administradores.
              </p>
            </div>

            <div className="card" style={{ backgroundColor: '#FFF', padding: '1.6rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-wine)', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>
                ¿Qué sanciones puede recibir mi empresa si no cumple con la Circular 100-000020 de 2026?
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                La Superintendencia de Sociedades tiene la potestad de imponer multas sucesivas que pueden superar los 200 salarios mínimos mensuales legales vigentes, además de ordenar la remoción de administradores y oficiales de cumplimiento. En el plano penal, la ausencia de debida diligencia puede involucrar a la empresa en investigaciones por omisión de control de lavado de activos.
              </p>
            </div>

            <div className="card" style={{ backgroundColor: '#FFF', padding: '1.6rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-wine)', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>
                ¿Cómo protegen la confidencialidad de la información interna de la empresa?
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Toda comunicación, análisis y hallazgo se realiza bajo el estricto amparo del <strong>secreto profesional de abogado</strong> (Art. 74 de la Constitución Política de Colombia). Esto impide que las autoridades puedan incautar o utilizar las comunicaciones entre la empresa y su equipo legal como prueba en su contra.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => navigate('/equipo')}
              className="btn btn-primary"
            >
              <span>Conoce a nuestro equipo de abogados y especialistas</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
