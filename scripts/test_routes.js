import http from 'http';

const routes = [
  '/',
  '/suscripcion-juridica-fuerza-publica',
  '/fuerza-publica',
  '/defensa-penal',
  '/derecho-penal',
  '/compliance-penal-corporativo',
  '/centro-juridico',
  '/centro-juridico/que-hacer-captura-familiar-colombia-primeras-36-horas',
  '/centro-juridico/investigacion-disciplinaria-policia-nacional-ley-2196',
  '/centro-juridico/circular-100-000020-supersociedades-nuevo-sistema-riesgos-sagrilaft-ptee',
  '/centro-juridico/que-hacer-me-citaron-interrogatorio-fiscalia',
  '/centro-juridico/acusacion-hurto-sin-objeto-carcel-colombia',
  '/centro-juridico/que-pasa-si-aparezco-en-video-donde-ocurre-delito',
  '/centro-juridico/que-hacer-allanamiento-registro-fiscalia-cti',
  '/centro-juridico/como-evitar-carcel-medida-aseguramiento-audiencia-imputacion',
  '/centro-juridico/falsa-denuncia-violencia-intrafamiliar-defensa-colombia',
  '/centro-juridico/como-constituirse-victima-proceso-penal-reparacion-economica',
  '/centro-juridico/demanda-retiro-discrecional-policia-nacional-reintegro',
  '/centro-juridico/responsabilidad-penal-representantes-legales-administradores-colombia',
  '/bogota',
  '/cali',
  '/medellin',
  '/planes',
  '/equipo',
  '/ubicaciones',
  '/clientes',
  '/otros-servicios',
  '/formulario',
  '/privacidad'
];

console.log("🔍 Verificando código de estado HTTP 200 en preview server (localhost:4173)...");

let passed = 0;
let failed = 0;

for (const r of routes) {
  await new Promise((resolve) => {
    http.get(`http://localhost:4173${r}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const hasTitle = body.includes('<title>');
          const hasH1 = body.includes('<h1>');
          console.log(`✅ [${res.statusCode}] ${r} (Bytes: ${body.length}, Title: ${hasTitle}, H1: ${hasH1})`);
          passed++;
        } else {
          console.log(`❌ [${res.statusCode}] ${r}`);
          failed++;
        }
        resolve();
      });
    }).on('error', (err) => {
      console.log(`❌ Error al conectar a ${r}: ${err.message}`);
      failed++;
      resolve();
    });
  });
}

console.log(`\n🎯 Resultado: ${passed} exitosas, ${failed} fallidas.`);
