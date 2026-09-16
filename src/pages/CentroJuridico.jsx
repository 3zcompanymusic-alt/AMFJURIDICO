import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Scale,
  ShieldCheck,
  Building2,
  Clock,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ARTICLES_DATA } from '../data/articlesData';
import { getAssetUrl } from '../config/siteConfig';
import './CentroJuridico.css';

export const CentroJuridico = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchesCategory =
        selectedCategory === 'todos' || art.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.quickAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main>
      <SEOHead pageKey="centroJuridico" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Centro Jurídico & Guías Legales | AMF Firma Legal",
          "description": "Repositorio editorial de guías legales, análisis normativos y respuestas a situaciones jurídicas reales en Colombia.",
          "url": "https://amfjuridico.com/centro-juridico",
          "provider": {
            "@type": "LegalService",
            "name": "AMF Firma Legal"
          }
        })}</script>
      </Helmet>

      {/* 1. HERO CENTRO JURÍDICO */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)', paddingTop: '2.5rem', paddingBottom: '3.2rem' }}>
        <div className="container text-center" style={{ maxWidth: '840px', margin: '0 auto' }}>
          <span className="badge badge-wine" style={{ marginBottom: '1rem' }}>
            <BookOpen size={16} />
            <span>CENTRO JURÍDICO &amp; CRITERIO LEGAL ESPECIALIZADO</span>
          </span>
          <h1 className="text-serif" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', color: 'var(--color-wine)', marginBottom: '1rem' }}>
            Centro Jurídico AMF
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '2rem' }}>
            Respuestas directas, sustento normativo riguroso y guías de acción ante urgencias penales, procedimientos disciplinarios de la Fuerza Pública y cumplimiento corporativo en Colombia.
          </p>

          {/* Buscador */}
          <div className="cj-search-box">
            <Search size={20} className="cj-search-icon" />
            <input
              type="text"
              placeholder="Buscar por delito, captura, Ley 2196, circular, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cj-search-input"
            />
          </div>
        </div>
      </section>

      {/* 2. FILTROS POR CATEGORÍA */}
      <section className="cj-filters-bar">
        <div className="container">
          <div className="cj-categories-pills">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`cj-pill ${selectedCategory === 'todos' ? 'active' : ''}`}
            >
              Todos los Artículos
            </button>
            <button
              onClick={() => setSelectedCategory('penal')}
              className={`cj-pill ${selectedCategory === 'penal' ? 'active' : ''}`}
            >
              <Scale size={16} />
              <span>Defensa Penal 24/7</span>
            </button>
            <button
              onClick={() => setSelectedCategory('fuerza-publica')}
              className={`cj-pill ${selectedCategory === 'fuerza-publica' ? 'active' : ''}`}
            >
              <ShieldCheck size={16} />
              <span>Fuerza Pública</span>
            </button>
            <button
              onClick={() => setSelectedCategory('compliance')}
              className={`cj-pill ${selectedCategory === 'compliance' ? 'active' : ''}`}
            >
              <Building2 size={16} />
              <span>Compliance Corporativo</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. GRILLA DE ARTÍCULOS */}
      <section className="section" style={{ backgroundColor: 'var(--color-paper)' }}>
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div className="text-center" style={{ padding: '4rem 1rem' }}>
              <h3 className="text-serif" style={{ color: 'var(--color-wine)', fontSize: '1.6rem' }}>
                No encontramos artículos que coincidan con tu búsqueda.
              </h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.6rem' }}>
                Prueba con otros términos o explora las categorías principales.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSearchQuery('');
                }}
                className="btn btn-primary"
                style={{ marginTop: '1.5rem' }}
              >
                Ver todos los artículos
              </button>
            </div>
          ) : (
            <div className="grid-3" style={{ gap: '2rem' }}>
              {filteredArticles.map((art) => (
                <article
                  key={art.slug}
                  className="card cj-article-card"
                  onClick={() => navigate(`/centro-juridico/${art.slug}`)}
                >
                  <div>
                    {/* Header tarjeta */}
                    <div className="cj-card-meta">
                      <span className="cj-category-tag">
                        {art.categoryLabel}
                      </span>
                      <div className="cj-readtime">
                        <Clock size={14} />
                        <span>{art.readTime}</span>
                      </div>
                    </div>

                    {/* Título H2 */}
                    <h2 className="text-serif cj-card-title">
                      {art.title}
                    </h2>

                    {/* Extracto de respuesta rápida */}
                    <p className="cj-card-snippet">
                      {art.quickAnswer}
                    </p>
                  </div>

                  {/* Footer con Autor E-E-A-T */}
                  <div className="cj-card-footer">
                    <div className="cj-author-info">
                      <div className="cj-author-avatar">
                        <UserCheck size={18} className="text-gold" />
                      </div>
                      <div>
                        <div className="cj-author-name">{art.author.name}</div>
                        <div className="cj-author-role">{art.author.role}</div>
                      </div>
                    </div>
                    <div className="cj-readmore-link">
                      <span>Leer guía</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. BANNER DE CONVERSIÓN */}
      <section className="section section-dark text-center" style={{ position: 'relative' }}>
        <div className="container container-narrow">
          <h2 className="text-serif" style={{ fontSize: '2.4rem', color: 'var(--color-paper)', marginBottom: '0.8rem' }}>
            ¿Tu situación no da espera?
          </h2>
          <p style={{ color: 'var(--color-text-on-dark-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            En AMF Firma Legal no solo explicamos la ley: la aplicamos en estrados judiciales y oficinas disciplinarias para defender tus derechos de inmediato.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/formulario')}
              className="btn btn-gold"
            >
              <span>Consultar con un Abogado</span>
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/equipo')}
              className="btn btn-outline-light"
            >
              <span>Conoce al Equipo Jurídico</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
