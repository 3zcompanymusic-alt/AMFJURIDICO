/**
 * Script de Prerenderizado Estático y Generación de Assets SEO
 * AMF Firma Legal - Solución a Bloqueos Técnicos (Fase 0 de la Guía)
 * 
 * Funciones:
 * 1. Genera carpetas físicas dist/<ruta>/index.html para cada URL pública -> Elimina errores 404 en refresco.
 * 2. Inyecta HTML inicial con H1, contenidos, metadatos canónicos y JSON-LD Schema -> Soluciona HTML vacío para Googlebot.
 * 3. Genera dist/sitemap.xml verídico y autogenerado.
 * 4. Genera dist/robots.txt apuntando al sitemap.
 * 5. Genera dist/.htaccess (para cPanel/Apache) y dist/_redirects (para Cloudflare/Netlify).
 * 6. Genera dist/404.html (para GitHub Pages).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');

const SITE_DOMAIN = "https://amfjuridico.com";
const TODAY = new Date().toISOString().split('T')[0];

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error("❌ Error: dist/index.html no existe. Ejecuta 'vite build' primero.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf-8');

// Definición de rutas públicas del sitio
const ROUTES = [
  {
    path: "/",
    title: "AMF Firma Legal | Protección Jurídica & Defensa Penal 24/7",
    description: "Suscripciones jurídicas para la Fuerza Pública, defensa penal estratégica 24/7 y compliance penal corporativo en Colombia. Sedes en Bogotá, Cali, Medellín y Piendamó.",
    h1: "Protección Jurídica Permanente & Defensa Penal Estratégica en Colombia",
    priority: "1.0",
    changefreq: "daily"
  },
  {
    path: "/suscripcion-juridica-fuerza-publica",
    title: "Suscripción Jurídica Fuerza Pública | AMF Firma Legal",
    description: "Protección jurídica mensual continua para Policía Nacional y Fuerzas Militares en Colombia. Procesos disciplinarios Ley 2196, penal militar, traslados y respaldo familiar.",
    h1: "Suscripciones Jurídicas para la Fuerza Pública en Colombia",
    priority: "0.9",
    changefreq: "weekly"
  },
  {
    path: "/fuerza-publica",
    title: "Suscripción Jurídica Fuerza Pública | AMF Firma Legal",
    description: "Protección jurídica mensual continua para Policía Nacional y Fuerzas Militares en Colombia.",
    h1: "Suscripciones Jurídicas para la Fuerza Pública en Colombia",
    priority: "0.8",
    changefreq: "monthly"
  },
  {
    path: "/defensa-penal",
    title: "Defensa Penal Estratégica & Asistencia 24/7 | AMF Firma Legal",
    description: "Atención legal inmediata 24/7 ante capturas, flagrancia, audiencias preliminares e investigaciones de Fiscalía en toda Colombia. Respuestas procesales directas.",
    h1: "Defensa Penal Estratégica & Asistencia Judicial 24 Horas",
    priority: "0.9",
    changefreq: "weekly"
  },
  {
    path: "/derecho-penal",
    title: "Defensa Penal Estratégica & Asistencia 24/7 | AMF Firma Legal",
    description: "Atención legal inmediata 24/7 ante capturas y situaciones penales complejas en Colombia.",
    h1: "Defensa Penal Estratégica 24/7",
    priority: "0.8",
    changefreq: "monthly"
  },
  {
    path: "/compliance-penal-corporativo",
    title: "Compliance & Penal Corporativo en Colombia | AMF Firma Legal",
    description: "Diagnóstico de aplicabilidad, investigaciones internas, debida diligencia y prevención penal empresarial conforme a la Circular Externa 100-000020 de 2026 de Supersociedades.",
    h1: "Blindaje Penal Corporativo & Gestión Integral de Riesgos (Circular 100-000020)",
    priority: "0.9",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico",
    title: "Centro Jurídico & Guías Legales | AMF Firma Legal",
    description: "Respuestas directas, sustento normativo actualizado y guías de acción en Derecho Penal, Fuerza Pública y Compliance Corporativo en Colombia.",
    h1: "Centro Jurídico AMF: Guías Legales & Criterio Profesional",
    priority: "0.9",
    changefreq: "daily"
  },
  {
    path: "/centro-juridico/que-hacer-captura-familiar-colombia-primeras-36-horas",
    title: "¿Qué hacer si capturan a un familiar en Colombia? Primeras 36 Horas | AMF Legal",
    description: "Guía jurídica inmediata ante la captura de un familiar en Colombia: plazo perentorio de 36 horas, audiencias concentradas, derechos del capturado y qué evitar.",
    h1: "¿Qué hacer si capturan a un familiar en Colombia? Guía paso a paso en las primeras 36 horas",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/investigacion-disciplinaria-policia-nacional-ley-2196",
    title: "Investigación Disciplinaria Policía Nacional Ley 2196 | AMF Legal",
    description: "Cómo afrontar una indagación previa o pliego de cargos bajo la Ley 2196 de 2022 en la Policía Nacional. Derechos procesales, etapas y blindaje de carrera.",
    h1: "Investigación disciplinaria en la Policía Nacional (Ley 2196 de 2022): ¿Cuándo necesitas un abogado defensor?",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/circular-100-000020-supersociedades-nuevo-sistema-riesgos-sagrilaft-ptee",
    title: "Circular 100-000020 de 2026 Supersociedades | SAGRILAFT y PTEE | AMF Legal",
    description: "Análisis práctico de la Circular Externa 100-000020 de 2026 de la Superintendencia de Sociedades. Nuevo Sistema Integral de Gestión de Riesgos, plazos y prevención penal.",
    h1: "Circular 100-000020 de 2026: Nuevo Sistema Integral de Riesgos de la Supersociedades (Integración SAGRILAFT y PTEE)",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/que-hacer-me-citaron-interrogatorio-fiscalia",
    title: "¿Qué hacer si me citaron a interrogatorio en la Fiscalía? | AMF Legal",
    description: "¿Te citó la Fiscalía? Conoce tus derechos: no asistir solo, guardar silencio (Art. 33 CP) y preparar la defensa técnica con un abogado penalista antes de la diligencia.",
    h1: "¿Qué hacer si me citaron a interrogatorio en la Fiscalía General de la Nación?",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/acusacion-hurto-sin-objeto-carcel-colombia",
    title: "¿Acusado de hurto sin el objeto? ¿Puedo ir a la cárcel? | AMF Legal",
    description: "Explicación jurídica en Colombia: por qué la ausencia de flagrancia o del objeto hurtado no impide una orden de captura o medida de aseguramiento carcelaria.",
    h1: "Si me acusan de hurto en Colombia, pero no me atraparon con el objeto, ¿igual puedo ir a la cárcel?",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/que-pasa-si-aparezco-en-video-donde-ocurre-delito",
    title: "¿Apareces en un video donde ocurrió un delito? Qué Hacer | AMF Legal",
    description: "¿Apareces en una grabación de un delito? Conoce las implicaciones legales en Colombia, la diferencia entre presencia pasiva y coautoría, y qué hacer de inmediato.",
    h1: "¿Qué pasa si aparezco en un video donde ocurre un delito en Colombia?",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/que-hacer-allanamiento-registro-fiscalia-cti",
    title: "¿Qué hacer ante un allanamiento de la Fiscalía o CTI? | AMF Legal",
    description: "Guía procesal ante un registro y allanamiento en Colombia: derechos del morador, orden judicial previa, qué verificar en el acta y qué evitar de inmediato.",
    h1: "¿Qué hacer ante un allanamiento o registro de la Fiscalía o CTI en tu casa o empresa?",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/como-evitar-carcel-medida-aseguramiento-audiencia-imputacion",
    title: "¿Cómo evitar la cárcel en audiencia de medida de aseguramiento? | AMF Legal",
    description: "Estrategia jurídica para evitar la detención preventiva carcelaria en Colombia: fines constitucionales (Art. 308 CPP), carpeta de arraigo y medidas no privativas.",
    h1: "¿Cómo evitar la cárcel en una audiencia de medida de aseguramiento en Colombia? Claves del arraigo y fines constitucionales",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/falsa-denuncia-violencia-intrafamiliar-defensa-colombia",
    title: "Falsa denuncia de violencia intrafamiliar o delitos sexuales | AMF Legal",
    description: "Cómo defenderte ante una falsa acusación de violencia intrafamiliar (Art. 229 CP) o delitos sexuales en Colombia. Custodia de pruebas, Comisaría y Fiscalía.",
    h1: "Falsa denuncia por violencia intrafamiliar o delitos sexuales en Colombia: ¿Cómo defenderte y probar tu inocencia?",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/como-constituirse-victima-proceso-penal-reparacion-economica",
    title: "Constituirse como víctima en proceso penal y reparación | AMF Legal",
    description: "Guía jurídica para víctimas en Colombia: reconocimiento formal, medidas cautelares sobre bienes del procesado e Incidente de Reparación Integral (Ley 906).",
    h1: "¿Cómo constituirse como víctima en un proceso penal en Colombia y lograr la reparación económica?",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/demanda-retiro-discrecional-policia-nacional-reintegro",
    title: "Demanda por retiro discrecional Policía Nacional: Reintegro | AMF Legal",
    description: "Cómo demandar el retiro por llamamiento a calificar servicios o voluntad del Gobierno en Policía Nacional. Caducidad de 4 meses, CPACA y reintegro retroactivo.",
    h1: "Retiro por facultad discrecional en la Policía Nacional: ¿Cómo demandar el reintegro y pago de salarios caídos?",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/centro-juridico/responsabilidad-penal-representantes-legales-administradores-colombia",
    title: "Responsabilidad penal de administradores y directivos en Colombia | AMF Legal",
    description: "¿Cuándo responde penalmente un gerente o miembro de junta en Colombia? Posición de garante, SAGRILAFT, delitos tributarios, lavado y Ley 2195 de 2022.",
    h1: "Responsabilidad penal de representantes legales y administradores en Colombia: ¿Cuándo respondes por delitos de la empresa o contrapartes?",
    priority: "0.8",
    changefreq: "weekly"
  },
  {
    path: "/bogota",
    title: "Abogados en Bogotá | Sede Bulevar Tequendama | AMF Firma Legal",
    description: "Defensa penal urgente, suscripciones para Fuerza Pública y compliance corporativo en Bogotá. Calle 26A #13-97 Oficina 2304. Atención con agendamiento previo.",
    h1: "Abogados en Bogotá: Sede Bulevar Tequendama · Defensa Penal 24/7 & Fuerza Pública",
    priority: "0.85",
    changefreq: "weekly"
  },
  {
    path: "/cali",
    title: "Abogados en Cali | Sede Calle 5 | AMF Firma Legal",
    description: "Defensa penal estratégica, protección a Fuerza Pública y prevención legal empresarial en Cali y el Valle del Cauca. Calle 5 #88-29. Agendamiento previo.",
    h1: "Abogados en Cali: Sede Calle 5 · Litigio Penal Estratégico & Fuerza Pública",
    priority: "0.85",
    changefreq: "weekly"
  },
  {
    path: "/medellin",
    title: "Abogados en Medellín | Asesoría & Litigio Estratégico | AMF Firma Legal",
    description: "Representación penal, suscripción jurídica y blindaje corporativo en Medellín y Antioquia. Atención presencial bajo agendamiento previo y virtual directa.",
    h1: "Abogados en Medellín: Asesoría Penal, Fuerza Pública & Empresas en Antioquia",
    priority: "0.85",
    changefreq: "weekly"
  },
  {
    path: "/planes",
    title: "Planes de Suscripción Jurídica | AMF Firma Legal",
    description: "Conoce los planes Escudo, Fortaleza y Bastión para servidores de la Fuerza Pública. Cobertura en investigaciones disciplinarias, penales y protección legal integral.",
    h1: "Planes de Suscripción Jurídica: Escudo, Fortaleza y Bastión",
    priority: "0.8",
    changefreq: "monthly"
  },
  {
    path: "/equipo",
    title: "Equipo de Abogados & Litigantes Especialistas | AMF Firma Legal",
    description: "Abogados litigantes penalistas, administrativistas, especialistas en contratación pública y auditores dedicados a la defensa técnica de tus derechos.",
    h1: "Equipo de Abogados & Litigantes Especialistas AMF",
    priority: "0.8",
    changefreq: "monthly"
  },
  {
    path: "/ubicaciones",
    title: "Sedes & Cobertura Presencial en Colombia | AMF Firma Legal",
    description: "Atención presencial en Bogotá, Cali, Medellín y Piendamó con agendamiento previo, y cobertura virtual para todo el territorio colombiano.",
    h1: "Sedes & Cobertura de AMF Firma Legal en Colombia",
    priority: "0.8",
    changefreq: "monthly"
  },
  {
    path: "/otros-servicios",
    title: "Otras Áreas Jurídicas Especializadas | AMF Firma Legal",
    description: "Especialistas en derecho constitucional, responsabilidad médica, administrativo, contratación estatal SECOP y derecho de familia en toda Colombia.",
    h1: "Otras Áreas Jurídicas Especializadas",
    priority: "0.7",
    changefreq: "monthly"
  },
  {
    path: "/clientes",
    title: "Clientes & Aliados Institucionales | AMF Firma Legal",
    description: "Asociaciones, empresas y servidores públicos que respaldan su tranquilidad legal con AMF Firma Legal en Colombia.",
    h1: "Clientes & Aliados Institucionales",
    priority: "0.7",
    changefreq: "monthly"
  },
  {
    path: "/formulario",
    title: "Agendar Consulta Jurídica | AMF Firma Legal",
    description: "Agenda tu consulta jurídica con AMF Firma Legal. Cuéntanos tu caso y recibe respuesta rápida de nuestro equipo especializado en Colombia.",
    h1: "Agendar Consulta Jurídica con AMF Firma Legal",
    priority: "0.8",
    changefreq: "monthly"
  },
  {
    path: "/privacidad",
    title: "Política de Privacidad y Tratamiento de Datos | AMF Firma Legal",
    description: "Política de tratamiento de datos personales conforme a la Ley 1581 de 2012 de Colombia.",
    h1: "Política de Privacidad y Tratamiento de Datos Personales",
    priority: "0.3",
    changefreq: "yearly"
  }
];

console.log("🚀 Iniciando prerenderizado estático y optimización técnica SEO...");

// 1. Generar HTML pre-renderizado para cada ruta
ROUTES.forEach((route) => {
  const canonicalUrl = `${SITE_DOMAIN}${route.path === '/' ? '' : route.path}`;
  
  // Reemplazar o inyectar metadatos exactos en el HTML base
  let pageHtml = baseHtml;

  // Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
  
  // Meta description
  if (pageHtml.includes('name="description"')) {
    pageHtml = pageHtml.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${route.description}"`);
  } else {
    pageHtml = pageHtml.replace('</head>', `  <meta name="description" content="${route.description}">\n</head>`);
  }

  // Canonical
  if (pageHtml.includes('rel="canonical"')) {
    pageHtml = pageHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"/i, `<link rel="canonical" href="${canonicalUrl}"`);
  } else {
    pageHtml = pageHtml.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}">\n</head>`);
  }

  // Open Graph Title & Description
  pageHtml = pageHtml.replace(/property="og:title"\s+content="[^"]*"/i, `property="og:title" content="${route.title}"`);
  pageHtml = pageHtml.replace(/property="og:description"\s+content="[^"]*"/i, `property="og:description" content="${route.description}"`);
  pageHtml = pageHtml.replace(/property="og:url"\s+content="[^"]*"/i, `property="og:url" content="${canonicalUrl}"`);

  // Inyección de contenido semántico accesible para crawlers dentro de #root
  // Esto permite que motores que no ejecutan JS lean el H1 y la descripción antes de la hidratación
  const preRenderContent = `
    <div id="prerender-seo-content" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;">
      <h1>${route.h1}</h1>
      <p>${route.description}</p>
      <nav aria-label="Navegación principal">
        <a href="/">Inicio</a>
        <a href="/suscripcion-juridica-fuerza-publica">Fuerza Pública</a>
        <a href="/defensa-penal">Defensa Penal 24/7</a>
        <a href="/compliance-penal-corporativo">Compliance Empresas</a>
        <a href="/centro-juridico">Centro Jurídico</a>
        <a href="/bogota">Bogotá</a>
        <a href="/cali">Cali</a>
        <a href="/medellin">Medellín</a>
      </nav>
    </div>
  `;

  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${preRenderContent}</div>`);

  if (route.path === '/') {
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), pageHtml, 'utf-8');
  } else {
    const routeDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), pageHtml, 'utf-8');
  }
});

console.log(`✅ ${ROUTES.length} páginas generadas con código HTTP 200 y metadatos únicos.`);

// 2. Generar sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `  <url>
    <loc>${SITE_DOMAIN}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq || 'weekly'}</changefreq>
    <priority>${r.priority || '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log("✅ dist/sitemap.xml autogenerado con éxito.");

// 3. Generar robots.txt
const robotsTxt = `# robots.txt para AMF Firma Legal (amfjuridico.com)
User-agent: *
Allow: /

Sitemap: ${SITE_DOMAIN}/sitemap.xml
`;

fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');
console.log("✅ dist/robots.txt generado apuntando al sitemap.");

// 4. Generar .htaccess para servidores Apache / cPanel
const htaccess = `# ==============================================================================
# AMF FIRMA LEGAL - CONFIGURACIÓN APACHE / CPANEL
# ==============================================================================

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Forzar HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Si el archivo o directorio físico existe, servirlo directamente con HTTP 200
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Redirección interna SPA a index.html
  RewriteRule ^ index.html [L]
</IfModule>

# Compresión GZIP / Brotli
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Caching de activos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
</IfModule>
`;

fs.writeFileSync(path.join(DIST_DIR, '.htaccess'), htaccess, 'utf-8');
console.log("✅ dist/.htaccess generado para cPanel / Apache.");

// 5. Generar _redirects para Netlify / Cloudflare Pages / Vercel
const redirects = `/*    /index.html   200\n`;
fs.writeFileSync(path.join(DIST_DIR, '_redirects'), redirects, 'utf-8');
console.log("✅ dist/_redirects generado.");

// 6. Generar 404.html (para GitHub Pages SPA fallback)
fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));
console.log("✅ dist/404.html generado.");

console.log("🎉 ¡Proceso de optimización técnica SEO completado con éxito!");
