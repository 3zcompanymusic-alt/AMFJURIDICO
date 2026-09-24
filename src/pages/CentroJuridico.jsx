import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Search, Scale, ShieldCheck, Building2,
  Clock, ArrowRight, UserCheck, ChevronRight
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ARTICLES_DATA } from '../data/articlesData';
import './CentroJuridico.css';

const AREAS = [
  { id: 'todos', label: 'Todos los temas', icon: null, description: 'Todo el repositorio juridico' },
  { id: 'penal', label: 'Derecho Penal', description: 'Proceso penal, prueba, delitos y defensa estrategica' },
  { id: 'disciplinario', label: 'Derecho Disciplinario', description: 'Fuerza Publica y servidores del Estado' },
  { id: 'compliance', label: 'Compliance', description: 'Compliance penal empresarial y contratacion estatal' }
];

const QUICK_QUESTIONS = [
  { q: 'Me denunciaron penalmente, que hago?', slug: 'me-denunciaron-penalmente-no-me-llama-la-fiscalia', area: 'penal' },
  { q: 'Tengo que ir con abogado a la Fiscalia?', slug: 'me-llamo-la-fiscalia-tengo-que-ir-con-abogado', area: 'penal' },
  { q: 'Puedo guardar silencio si me investigan?', slug: 'puedo-guardar-silencio-si-me-estan-investigando', area: 'penal' },
  { q: 'No pagar una deuda es estafa?', slug: 'no-pagar-deuda-es-estafa-colombia', area: 'penal' },
  { q: 'Me abrieron investigacion disciplinaria', slug: 'soy-militar-o-policia-me-abrieron-investigacion-disciplinaria-que-hago', area: 'disciplinario' },
  { q: 'Respondo por mis empleados como gerente?', slug: 'representante-legal-responde-penalmente-por-empleados', area: 'compliance' },
  { q: 'Encontraron un arma cerca de mi', slug: 'encontraron-un-arma-cerca-de-mi-pero-no-era-mia-pueden-condenarme', area: 'penal' },
  { q: 'Me encontraron droga, es trafico?', slug: 'me-encontraron-droga-es-trafico-de-estupefacientes', area: 'penal' },
  { q: 'Una irregularidad de funcionario es delito?', slug: 'toda-irregularidad-funcionario-publico-es-delito', area: 'penal' },
  { q: 'Mi empresa contrata con el Estado', slug: 'empresa-contrata-con-estado-que-riesgos-controlar', area: 'compliance' },
  { q: 'Me denunciaron por un delito sexual', slug: 'me-denunciaron-por-delito-sexual-que-hacer-primero', area: 'penal' },
  { q: 'Una decision equivocada es prevaricato?', slug: 'decision-equivocada-funcionario-es-prevaricato', area: 'penal' }
];

const AREA_COLORS = {
  penal: { bg: 'rgba(123,26,26,0.08)', border: 'rgba(123,26,26,0.3)', text: '#7b1a1a' },
  disciplinario: { bg: 'rgba(26,58,92,0.08)', border: 'rgba(26,58,92,0.3)', text: '#1a3a5c' },
  compliance: { bg: 'rgba(26,74,46,0.08)', border: 'rgba(26,74,46,0.3)', text: '#1a4a2e' }
};

export const CentroJuridico = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchesCategory = selectedCategory === 'todos' || art.category === selectedCategory;
      const matchesQuery = searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.quickAnswer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const counts = useMemo(() => {
    const c = { todos: ARTICLES_DATA.length, penal: 0, disciplinario: 0, compliance: 0 };
    ARTICLES_DATA.forEach(a => { if (c[a.category] !== undefined) c[a.category]++; });
    return c;
  }, []);

  const getColor = (cat) => AREA_COLORS[cat] || AREA_COLORS.penal;

  return (
    <main>
      <SEOHead pageKey="centroJuridico" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Centro Juridico AMF - Derecho Penal, Disciplinario y Compliance',
          description: 'Respuestas juridicas rigurosas a preguntas reales en Colombia.',
          url: 'https://amfjuridico.com/centro-juridico',
          provider: { '@type': 'LegalService', name: 'AMF Firma Legal' }
        })}</script>
      </Helmet>

      <section className="section" style={{ backgroundColor: 'var(--color-cream)', paddingTop: '2.5rem', paddingBottom: '0' }}>
        <div className="container text-center" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <span className="badge badge-wine" style={{ marginBottom: '1rem' }}>
            <BookOpen size={16} />
            <span>CENTRO JURIDICO - AMF FIRMA LEGAL</span>
          </span>
          <h1 className="text-serif" style={{ fontSize: 'clamp(2.2rem,4.5vw,3.2rem)', color: 'var(--color-wine)', marginBottom: '1rem', lineHeight: 1.2 }}>
            Tu problema no viene con un nombre juridico.{' '}
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Cuentanos que paso.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '1.5rem' }}>
            Identificamos el riesgo, te explicamos tus opciones y te indicamos con claridad cual puede ser el siguiente paso.
            Tres areas independientes: <strong>Derecho Penal</strong>, <strong>Derecho Disciplinario</strong> y <strong>Compliance</strong>.
          </p>
          <div className="cj-search-box" style={{ marginBottom: '0' }}>
            <Search size={20} className="cj-search-icon" />
            <input
              type="text"
              placeholder="Que esta pasando? Ej: me denunciaron, encontraron un arma, investigacion disciplinaria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cj-search-input"
              aria-label="Buscar en el Centro Juridico"
            />
          </div>
        </div>
      </section>

      {searchQuery.trim() === '' && selectedCategory === 'todos' && (
        <section style={{ backgroundColor: 'var(--color-cream)', paddingTop: '2rem', paddingBottom: '2.5rem' }}>
          <div className="container">
            <p style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: '1.2rem' }}>
              Situaciones frecuentes - Selecciona la que mas se parece a la tuya
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center', maxWidth: '960px', margin: '0 auto' }}>
              {QUICK_QUESTIONS.map((item) => {
                const c = getColor(item.area);
                return (
                  <button
                    key={item.slug}
                    onClick={() => navigate('/centro-juridico/' + item.slug)}
                    style={{
                      background: c.bg, border: '1.5px solid ' + c.border, color: c.text,
                      borderRadius: '999px', padding: '0.5rem 1.1rem', fontSize: '0.88rem',
                      fontWeight: 600, cursor: 'pointer', display: 'inline-flex',
                      alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <ChevronRight size={14} />
                    {item.q}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="cj-filters-bar">
        <div className="container">
          <div className="cj-categories-pills">
            <button onClick={() => setSelectedCategory('todos')} className={'cj-pill' + (selectedCategory === 'todos' ? ' active' : '')}>
              <BookOpen size={16} /><span>Todos los temas</span>
              <span style={{ marginLeft: '0.3rem', background: selectedCategory === 'todos' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)', borderRadius: '999px', padding: '0.05rem 0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>{counts.todos}</span>
            </button>
            <button onClick={() => setSelectedCategory('penal')} className={'cj-pill' + (selectedCategory === 'penal' ? ' active' : '')}>
              <Scale size={16} /><span>Derecho Penal</span>
              <span style={{ marginLeft: '0.3rem', background: selectedCategory === 'penal' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)', borderRadius: '999px', padding: '0.05rem 0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>{counts.penal}</span>
            </button>
            <button onClick={() => setSelectedCategory('disciplinario')} className={'cj-pill' + (selectedCategory === 'disciplinario' ? ' active' : '')}>
              <ShieldCheck size={16} /><span>Derecho Disciplinario</span>
              <span style={{ marginLeft: '0.3rem', background: selectedCategory === 'disciplinario' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)', borderRadius: '999px', padding: '0.05rem 0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>{counts.disciplinario}</span>
            </button>
            <button onClick={() => setSelectedCategory('compliance')} className={'cj-pill' + (selectedCategory === 'compliance' ? ' active' : '')}>
              <Building2 size={16} /><span>Compliance</span>
              <span style={{ marginLeft: '0.3rem', background: selectedCategory === 'compliance' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)', borderRadius: '999px', padding: '0.05rem 0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>{counts.compliance}</span>
            </button>
          </div>
          {selectedCategory !== 'todos' && (
            <div style={{ marginTop: '0.8rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                {AREAS.find(a => a.id === selectedCategory)?.description}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-paper)' }}>
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div className="text-center" style={{ padding: '4rem 1rem' }}>
              <h3 className="text-serif" style={{ color: 'var(--color-wine)', fontSize: '1.6rem' }}>No encontramos articulos que coincidan.</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.6rem' }}>Prueba con otros terminos o explora las areas juridicas.</p>
              <button onClick={() => { setSelectedCategory('todos'); setSearchQuery(''); }} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Ver todos los articulos</button>
            </div>
          ) : (
            <>
              <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Mostrando <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'articulo' : 'articulos'}
                {selectedCategory !== 'todos' && ' en ' + AREAS.find(a => a.id === selectedCategory)?.label}
                {searchQuery && ' para "' + searchQuery + '"'}
              </p>
              <div className="grid-3" style={{ gap: '2rem' }}>
                {filteredArticles.map((art) => {
                  const c = getColor(art.category);
                  return (
                    <article
                      key={art.slug}
                      className="card cj-article-card"
                      onClick={() => navigate('/centro-juridico/' + art.slug)}
                      style={{ cursor: 'pointer', '--card-accent': c.accent }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && navigate('/centro-juridico/' + art.slug)}
                    >
                      <div className="cj-card-body">
                        <div className="cj-card-meta">
                          <span className="cj-category-tag" style={{ background: c.bg, color: c.text, border: '1px solid ' + c.border }}>
                            {art.categoryLabel}
                          </span>
                          <div className="cj-readtime"><Clock size={14} /><span>{art.readTime}</span></div>
                        </div>
                        <h2 className="text-serif cj-card-title">{art.title}</h2>
                        <p className="cj-card-snippet">{art.quickAnswer?.substring(0, 140)}{art.quickAnswer?.length > 140 ? '...' : ''}</p>
                      </div>
                      <div className="cj-card-footer">
                        <div className="cj-author-info">
                          <div className="cj-author-avatar"><UserCheck size={18} className="text-gold" /></div>
                          <div>
                            <div className="cj-author-name">{art.author?.name}</div>
                            <div className="cj-author-role">{art.author?.role}</div>
                          </div>
                        </div>
                        <div className="cj-read-btn">
                          <span>Leer guía completa</span>
                          <ArrowRight size={17} className="cj-read-arrow" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-cream)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="text-serif" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', color: 'var(--color-wine)', marginBottom: '0.5rem' }}>Tres areas juridicas independientes</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>Cada una con preguntas, criterios y estrategias distintas</p>
          </div>
          <div className="grid-3" style={{ gap: '1.8rem' }}>
            <div className="card" onClick={() => setSelectedCategory('penal')} style={{ cursor: 'pointer', borderTop: '4px solid #7b1a1a', padding: '2rem' }}>
              <Scale size={36} style={{ color: '#7b1a1a', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>Derecho Penal</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                Proceso penal, prueba, delitos contra la administracion publica, armas, estupefacientes, lavado de activos, delitos sexuales y mas.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#7b1a1a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>Ver {counts.penal} articulos</span><ArrowRight size={14} />
              </div>
            </div>
            <div className="card" onClick={() => setSelectedCategory('disciplinario')} style={{ cursor: 'pointer', borderTop: '4px solid #1a3a5c', padding: '2rem' }}>
              <ShieldCheck size={36} style={{ color: '#1a3a5c', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>Derecho Disciplinario</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                Fuerza Publica y servidores del Estado. Investigaciones disciplinarias, Ley 2196 de 2022, uso de la fuerza y ordenes irregulares.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#1a3a5c', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>Ver {counts.disciplinario} articulos</span><ArrowRight size={14} />
              </div>
            </div>
            <div className="card" onClick={() => setSelectedCategory('compliance')} style={{ cursor: 'pointer', borderTop: '4px solid #1a4a2e', padding: '2rem' }}>
              <Building2 size={36} style={{ color: '#1a4a2e', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-wine)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>Compliance</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                Compliance penal empresarial, contratacion estatal, canales de denuncias y proteccion de representantes legales.
              </p>
              <div style={{ fontSize: '0.85rem', color: '#1a4a2e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>Ver {counts.compliance} articulos</span><ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark text-center" style={{ position: 'relative' }}>
        <div className="container container-narrow">
          <h2 className="text-serif" style={{ fontSize: '2.4rem', color: 'var(--color-paper)', marginBottom: '0.8rem' }}>Tu situacion no da espera?</h2>
          <p style={{ color: 'var(--color-text-on-dark-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            En AMF Firma Legal no solo explicamos la ley: la aplicamos en estrados judiciales y oficinas disciplinarias para defender tus derechos de inmediato.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/formulario')} className="btn btn-gold">
              <span>Consultar con un Abogado</span><ArrowRight size={18} />
            </button>
            <button onClick={() => navigate('/equipo')} className="btn btn-outline-light">
              <span>Conoce al Equipo Juridico</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
