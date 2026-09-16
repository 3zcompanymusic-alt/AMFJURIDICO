import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calendar,
  Clock,
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen
} from 'lucide-react';
import { getArticleBySlug, ARTICLES_DATA } from '../data/articlesData';
import { whatsappLink, getAssetUrl } from '../config/siteConfig';
import { SITE_DOMAIN } from '../config/seoConfig';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import './ArticuloDetalle.css';

export const ArticuloDetalle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <main className="section" style={{ minHeight: '60vh', textAlign: 'center', paddingTop: '6rem' }}>
        <div className="container container-narrow">
          <AlertCircle size={48} className="text-gold" style={{ margin: '0 auto 1rem auto' }} />
          <h1 className="text-serif" style={{ fontSize: '2rem', color: 'var(--color-wine)', marginBottom: '1rem' }}>
            Artículo no encontrado
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            El contenido que buscas no existe o ha sido reubicado en nuestro Centro Jurídico.
          </p>
          <button onClick={() => navigate('/centro-juridico')} className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Volver al Centro Jurídico</span>
          </button>
        </div>
      </main>
    );
  }

  const canonicalUrl = `https://amfjuridico.com/centro-juridico/${article.slug}`;

  // Schema.org Article & BreadcrumbList
  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "datePublished": article.publishDate,
    "dateModified": article.updateDate,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "AMF Firma Legal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://amfjuridico.com/assets/logos/Sin%20Fondo/AMF%20FIRMA%20LEGAL%20VINO%20TINTO.png"
      }
    }
  };

  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://amfjuridico.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Centro Jurídico",
        "item": "https://amfjuridico.com/centro-juridico"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <main className="art-page">
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishDate} />
        <meta property="article:modified_time" content={article.updateDate} />
        <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumbs)}</script>
      </Helmet>

      {/* 1. HEADER EDITORIAL */}
      <header className="art-header">
        <div className="container container-narrow">
          <button
            onClick={() => navigate('/centro-juridico')}
            className="art-back-btn"
          >
            <ArrowLeft size={16} />
            <span>Centro Jurídico / {article.categoryLabel}</span>
          </button>

          <div style={{ marginBottom: '1rem' }}>
            <span className="badge badge-wine">
              <BookOpen size={14} />
              <span>GUÍA LEGAL · {article.categoryLabel.toUpperCase()}</span>
            </span>
          </div>

          {/* PASO 1: Título y H1 como pregunta exacta del usuario */}
          <h1 className="text-serif art-main-title">
            {article.title}
          </h1>

          <div className="art-meta-bar">
            <div className="art-meta-item">
              <UserCheck size={16} className="text-gold" />
              <span>Por <strong>{article.author.name}</strong></span>
            </div>
            <div className="art-meta-item">
              <Calendar size={15} />
              <span>Actualizado: {article.updateDate}</span>
            </div>
            <div className="art-meta-item">
              <Clock size={15} />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* CUERPO DEL ARTÍCULO */}
      <section className="section" style={{ backgroundColor: 'var(--color-paper)', paddingTop: '2.5rem' }}>
        <div className="container container-narrow">

          {/* PASO 2: Respuesta corta inicial (40-80 palabras) */}
          <div className="art-quick-answer-card">
            <div className="art-quick-header">
              <BookOpen size={20} className="text-gold" />
              <span>RESPUESTA RÁPIDA &amp; CRITERIO AMF</span>
            </div>
            <p className="art-quick-text">
              {article.quickAnswer}
            </p>
          </div>

          {/* PASO 3: Ejemplo cotidiano / Caso práctico */}
          <div className="art-block">
            <h2 className="text-serif art-h2">
              Caso práctico: ¿Cómo ocurre en una situación real?
            </h2>
            <div className="art-example-box">
              <p>{article.example}</p>
            </div>
          </div>

          {/* PASO 4: Explicación jurídica y sustento normativo */}
          <div className="art-block">
            <h2 className="text-serif art-h2">
              Sustento normativo y etapas procesales en Colombia
            </h2>
            <div className="art-legal-content">
              {article.legalExplanation.split('\n\n').map((paragraph, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>
          </div>

          {/* PASO 5: Checklist de acción (Qué hacer / Qué evitar) */}
          <div className="art-block">
            <h2 className="text-serif art-h2">
              Checklist de acción: Qué hacer y qué evitar
            </h2>
            <div className="art-checklist-grid">
              {/* Columna Qué Hacer */}
              <div className="art-check-col art-check-dos">
                <div className="art-check-col-title">
                  <CheckCircle2 size={20} />
                  <span>Lo que debes hacer</span>
                </div>
                <ul>
                  {article.checklist.dos.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Columna Qué Evitar */}
              <div className="art-check-col art-check-donts">
                <div className="art-check-col-title">
                  <XCircle size={20} />
                  <span>Lo que debes evitar</span>
                </div>
                <ul>
                  {article.checklist.donts.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* PASO 6: Preguntas frecuentes relacionadas */}
          <div className="art-block">
            <h2 className="text-serif art-h2">
              Preguntas frecuentes complementarias
            </h2>
            <div className="art-faqs-container">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="card art-faq-card">
                  <h3 className="art-faq-q">
                    <HelpCircle size={18} className="text-gold" style={{ flexShrink: 0 }} />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="art-faq-a">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PASO 7: Llamado a la acción (CTA) adaptado */}
          <div className="art-cta-banner">
            <span className="badge badge-gold" style={{ marginBottom: '0.8rem' }}>
              {article.cta.badge}
            </span>
            <h3 className="text-serif art-cta-title">
              {article.cta.title}
            </h3>
            <p className="art-cta-text">
              {article.cta.text}
            </p>
            <button
              onClick={() => window.open(whatsappLink(undefined, article.cta.waMessage), '_blank')}
              className="btn btn-gold art-cta-button"
            >
              <WhatsAppIcon size={18} />
              <span>{article.cta.buttonText}</span>
            </button>
          </div>

          {/* PASO 8: Autoridad E-E-A-T del abogado revisor/autor */}
          <div className="art-eeat-card">
            <div className="art-eeat-header">
              <UserCheck size={24} className="text-gold" />
              <div>
                <span className="art-eeat-badge">REVISIÓN TÉCNICA E-E-A-T</span>
                <h4 className="text-serif art-eeat-name">{article.author.name}</h4>
                <div className="art-eeat-role">{article.author.role}</div>
              </div>
            </div>
            <p className="art-eeat-credentials">
              {article.author.credentials}
            </p>
            {article.reviewer && (
              <div className="art-reviewer-note">
                <strong>Supervisión jurídica:</strong> {article.reviewer.name} ({article.reviewer.credentials})
              </div>
            )}
            <div style={{ marginTop: '1.2rem' }}>
              <Link to="/equipo" className="art-eeat-link">
                <span>Ver perfil completo y credenciales del equipo</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* PASO 9: Enlaces internos a pilares y ciudades */}
          <div className="art-internallinks-box">
            <h4 className="text-serif" style={{ fontSize: '1.15rem', color: 'var(--color-wine)', marginBottom: '0.8rem' }}>
              Servicios y sedes relacionados
            </h4>
            <div className="art-links-pills">
              {article.internalLinks.map((link, idx) => (
                <Link key={idx} to={link.url} className="art-link-pill">
                  {link.text} →
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};
