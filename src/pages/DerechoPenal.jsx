import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import './DerechoPenal.css';
import { SEOHead } from '../components/SEOHead';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  Scale,
  PhoneCall,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  X,
  BookOpen,
  HelpCircle,
  MapPin
} from 'lucide-react';
import { whatsappLink, WA_MESSAGES } from '../config/siteConfig';

export const DerechoPenal = () => {
  const navigate = useNavigate();
  const [selectedSituation, setSelectedSituation] = useState(null);

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedSituation(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 8 Situaciones Penales Reales con Protocolos de Acción Inmediata
  const situacionesPenales = [
    {
      id: 'captura-familiar',
      badge: 'URGENCIA CRÍTICA (36 HORAS)',
      title: '🚨 Capturaron a un familiar en Colombia',
      question: '¿Qué hacer en las primeras horas para evitar que vaya a prisión?',
      desc: 'El plazo de 36 horas ante el Juez de Control de Garantías es perentorio. Asistencia presencial en URIs y juzgados.',
      slug: 'que-hacer-captura-familiar-colombia-primeras-36-horas',
      dos: [
        'Exigir constancia del lugar de reclusión y fecha/hora exacta de ingreso oficial.',
        'Hacer valer el derecho constitucional a la llamada telefónica inmediata con un familiar o abogado.',
        'Acudir a la URI o estación y designar abogado defensor particular antes de instalar la audiencia.',
        'Recopilar soportes de arraigo urgente: cédula, contrato laboral, recibos de servicios o escrituras.'
      ],
      donts: [
        'NUNCA permitir que el capturado declare o rinda entrevistas ante la policía o fiscalía sin su abogado.',
        'NUNCA firmar actas en blanco, inventarios alterados o aceptación de cargos bajo intimidación.',
        'NO entregar dinero a intermediarios o falsos tramitadores fuera de juzgados o URIs.',
        'NO publicar detalles del caso en redes sociales ni intentar contactar a la presunta víctima.'
      ],
      waMessage: 'Hola, capturaron a un familiar en Colombia y necesito asistencia penal urgente dentro de las primeras 36 horas.'
    },
    {
      id: 'citacion-fiscalia',
      badge: 'INDAGACIÓN PENAL PREVIA',
      title: '📞 Me citaron a interrogatorio en la Fiscalía',
      question: '¿Qué hacer si recibo una boleta de citación del CTI o Fiscalía?',
      desc: 'No significa condena, pero confirma que eres indiciado. Asistir sin abogado puede destruir tu defensa.',
      slug: 'que-hacer-me-citaron-interrogatorio-fiscalia',
      dos: [
        'Verificar el número único de noticia criminal (SPOA de 21 dígitos) y el fiscal a cargo.',
        'Nombrar un abogado penalista particular para que examine el expediente antes de la diligencia.',
        'Solicitar aplazamiento formal si tu defensor no ha tenido tiempo de conocer las evidencias.',
        'Ejercer el derecho fundamental a guardar silencio (Art. 33 CP) si la estrategia técnica lo aconseja.'
      ],
      donts: [
        'NUNCA asistas a la Fiscalía solo "a ver qué quieren saber" pensando que por ser inocente no corres peligro.',
        'NUNCA entregues tu celular, claves de acceso o computadores de manera "voluntaria" sin orden judicial.',
        'NO intentes buscar a la persona que te denunció para pedirle que retire la denuncia.',
        'NO inventes versiones improvisadas ante los investigadores del CTI.'
      ],
      waMessage: 'Hola, me citaron a interrogatorio en la Fiscalía y requiero orientación y defensa técnica penal antes de asistir.'
    },
    {
      id: 'hurto-sin-objeto',
      badge: 'DELITOS CONTRA EL PATRIMONIO',
      title: '💰 Me acusan de hurto sin haberme hallado nada',
      question: 'Si no me atraparon con el objeto hurtado, ¿igual puedo ir a la cárcel?',
      desc: 'La Fiscalía puede intentar una medida de aseguramiento carcelaria basada en indicios, videos o testigos.',
      slug: 'acusacion-hurto-sin-objeto-carcel-colombia',
      dos: [
        'Reconstruir de inmediato tu línea de tiempo: dónde estabas, con quién y qué hacías a la hora de los hechos.',
        'Aportar pruebas de geolocalización: cámaras privadas, recibos bancarios, peajes o registros de trabajo.',
        'Exigir a tu abogado que solicite la cadena de custodia íntegra del video y peritaje biométrico facial.',
        'Acreditar arraigo familiar y laboral sólido para controvertir la necesidad de medida carcelaria.'
      ],
      donts: [
        'NUNCA confrontes ni reclames al denunciante; el fiscal lo presentará como amenaza u obstrucción judicial.',
        'NO borres chats, llamadas ni fotos de tu teléfono si demuestran tu ubicación inocente.',
        'NO aceptes cargos en la audiencia de imputación sin que tu abogado haya examinado la evidencia.'
      ],
      waMessage: 'Hola, me están acusando de hurto sin haberme encontrado ningún elemento y necesito defensa penal técnica.'
    },
    {
      id: 'aparezco-en-video',
      badge: 'EVIDENCIA DIGITAL & VIDEOS',
      title: '📹 Aparezco en un video donde ocurrió un delito',
      question: '¿Qué pasa si aparezco en una grabación viral o de cámara de seguridad?',
      desc: 'La presencia pasiva de espectador no es delito. Se debe demostrar la falta de dolo y evitar una captura.',
      slug: 'que-pasa-si-aparezco-en-video-donde-ocurre-delito',
      dos: [
        'Consultar de inmediato a un penalista para presentar un memorial voluntario informando tu arraigo.',
        'Obtener la grabación completa (antes y después) para demostrar que no existió coordinación ni dolo.',
        'Identificar testigos presenciales que certifiquen tu reacción de sorpresa o distanciamiento.',
        'Acreditar tu conducta atípica: la presencia circunstancial en la escena no configura coautoría.'
      ],
      donts: [
        'NUNCA publiques videos explicativos, justificaciones o cartas en redes sociales.',
        'NO intentes huir ni cambiar de domicilio; la Fiscalía lo usará para pedir orden de captura por fuga.',
        'NO modifiques testimonios ni coordines versiones falsas con otras personas presentes.'
      ],
      waMessage: 'Hola, aparezco en un video donde ocurrió un hecho delictivo y requiero asesoría técnica para blindar mi situación.'
    },
    {
      id: 'allanamiento-cti',
      badge: 'OPERATIVO POLICÍA JUDICIAL',
      title: '🚪 Allanamiento de la Fiscalía o CTI en tu inmueble',
      question: '¿Qué hacer si agentes armados llegan con una orden de registro?',
      desc: 'Inviolabilidad del domicilio y control de 36 horas. Errores de los agentes pueden anular las pruebas.',
      slug: 'que-hacer-allanamiento-registro-fiscalia-cti',
      dos: [
        'Exigir la exhibición de la orden judicial escrita y constatar que la dirección exacta coincida.',
        'Comunicarte de inmediato con tu abogado penalista particular para que asista o vigile la diligencia.',
        'Exigir que un testigo (morador o vecino) acompañe a los funcionarios en cada habitación.',
        'Leer minuciosamente el acta de incautación y dejar constancia escrita de cualquier irregularidad.'
      ],
      donts: [
        'NUNCA uses la fuerza física ni obstruyas materialmente la labor de los funcionarios judiciales.',
        'NUNCA des explicaciones informales ni admitas procedencia de bienes durante la inspección.',
        'NO permitas que registren inmuebles o dependencias no autorizadas en la orden escrita.',
        'NO firmes el acta si tiene tachones, espacios en blanco o bienes que no estaban en el lugar.'
      ],
      waMessage: 'Hola, miembros de la policía judicial están realizando o acaban de realizar un allanamiento y requiero auxilio penal urgente.'
    },
    {
      id: 'audiencia-imputacion',
      badge: 'CONTROL DE GARANTÍAS',
      title: '⚖️ Tengo audiencia de imputación o medida carcelaria',
      question: '¿Cómo evitar la detención preventiva en centro penitenciario?',
      desc: 'El debate no es de culpabilidad, sino de necesidad de encierro. Una carpeta de arraigo salva tu libertad.',
      slug: 'como-evitar-carcel-medida-aseguramiento-audiencia-imputacion',
      dos: [
        'Diseñar la estrategia probatoria con tu abogado antes de la instalación de la audiencia.',
        'Aportar certificados de arraigo familiar (hijos, padres a cargo), laboral y habitacional comprobable.',
        'Controvertir la necesidad y proporcionalidad de la medida carcelaria (Art. 308 del CPP).',
        'Solicitar medidas no privativas de la libertad o detención domiciliaria en caso subsidiario.'
      ],
      donts: [
        'NO acudas sin haber revisado con tu defensor los elementos materiales probatorios de la Fiscalía.',
        'NO admitas cargos sin calcular con exactitud la dosificación de la pena y pérdida de beneficios.',
        'NO interrumpas al juez ni a la fiscalía sin indicación previa de tu abogado defensor.'
      ],
      waMessage: 'Hola, tengo una audiencia penal programada (imputación / medida de aseguramiento) y requiero defensa técnica.'
    },
    {
      id: 'falsa-denuncia',
      badge: 'CONFLICTO FAMILIAR & PENAL',
      title: '💔 Falsa denuncia por violencia intrafamiliar o delito sexual',
      question: '¿Cómo defenderme si inventaron acusaciones en mi contra?',
      desc: 'Medidas de protección de desalojo y riesgo de captura. Custodia urgente de chats y peritaje forense.',
      slug: 'falsa-denuncia-violencia-intrafamiliar-defensa-colombia',
      dos: [
        'Hacer copia de seguridad y peritaje forense de chats completos de WhatsApp, audios y llamadas.',
        'Acreditar con geolocalización GPS y testigos que no te encontrabas en el lugar de los hechos alegados.',
        'Comparecer con tu abogado penalista a la audiencia en Comisaría de Familia y radicar memorial en Fiscalía.',
        'Mantener estricto distanciamiento físico y de comunicación con la persona denunciante.'
      ],
      donts: [
        'NUNCA envíes mensajes, audios ni reclames por ningún medio a la persona denunciante.',
        'NUNCA acudas al domicilio del cual fuiste desalojado cautelarmente (incurrirías en fraude a resolución judicial).',
        'NO borres conversaciones del celular ni confíes en que el caso se archivará sin aportar pruebas de descargo.'
      ],
      waMessage: 'Hola, enfrento una denuncia de violencia intrafamiliar / delito sexual que considero falsa y requiero defensa penal urgente.'
    },
    {
      id: 'servidor-publico',
      badge: 'DERECHO DISCIPLINARIO & PENAL',
      title: '🏛️ Soy servidor público o policía investigado',
      question: '¿Cómo blindar mi carrera ante investigaciones paralelas?',
      desc: 'Articulación integral entre Ley 2196 de 2022, fuero penal militar y fiscalía ordinaria para proteger tu hoja de vida.',
      slug: 'investigacion-disciplinaria-policia-nacional-ley-2196',
      dos: [
        'Articular la defensa técnica penal con la disciplinaria (Ley 2196) para mantener coherencia procesal.',
        'Recopilar minutas de guardia, órdenes de operaciones, grabaciones de cámaras corporales y bitácoras.',
        'Solicitar la nulidad de actuaciones si se violaron las garantías del debido proceso o el fuero especial.',
        'Proteger tu folio de vida y estabilidad salarial antes de la formulación de pliego de cargos.'
      ],
      donts: [
        'NO rindas versión libre sin conocer la totalidad del expediente y las quejas obrantes.',
        'NO confíes en defensas de oficio que deban responder a los intereses del mando institucional.',
        'NO admitas faltas disciplinarias creyendo que "solo será una sanción leve"; te afectará el ascenso.'
      ],
      waMessage: 'Hola, soy servidor público / policía y requiero evaluación penal y disciplinaria reservada de mi situación.'
    },
    {
      id: 'representacion-victima',
      badge: 'REPRESENTACIÓN PENAL DE VÍCTIMAS',
      title: '👤 Soy víctima de un delito y la Fiscalía no avanza',
      question: '¿Cómo impulsar activamente el caso y lograr reparación económica?',
      desc: 'No te limites a esperar a que el fiscal actúe solo. Representación judicial activa con medidas cautelares.',
      slug: 'como-constituirse-victima-proceso-penal-reparacion-economica',
      dos: [
        'Constituirse formalmente como víctima mediante apoderado judicial para tener voz en el proceso.',
        'Aportar elementos materiales probatorios independientes (auditorías forenses, peritajes, testigos).',
        'Solicitar medidas cautelares sobre los bienes del victimario para garantizar la indemnización.',
        'Radicar derechos de petición e insistencias para evitar la prescripción de la acción penal.'
      ],
      donts: [
        'NO te limites a esperar a que la Fiscalía investigue por sí sola; los despachos están saturados.',
        'NO pactes arreglos informales sin respaldo judicial que dejen desprotegidos tus derechos patrimoniales.',
        'NO divulgues información reservada de la investigación en medios o redes sin aval legal.'
      ],
      waMessage: 'Hola, soy víctima de un delito y solicito representación penal activa con AMF Firma Legal.'
    }
  ];

  return (
    <main>
      <SEOHead pageKey="derechoPenal" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Cómo defenderme si inventaron una acusación falsa de violencia intrafamiliar o delito sexual en mi contra en Colombia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Debes actuar de inmediato: en Colombia la violencia intrafamiliar (Art. 229 Código Penal) no es desistible ni conciliable. Es indispensable preservar de urgencia la cadena de custodia de chats de WhatsApp, audios, correos y geolocalizaciones GPS mediante peritaje informático forense, no enviar mensajes de reclamo a la denunciante y radicar memorial técnico ante el fiscal solicitando el archivo o preclusión de la investigación."
              }
            },
            {
              "@type": "Question",
              "name": "¿Qué hacer si capturan a un familiar en flagrancia en Colombia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Existen 36 horas improrrogables para que la Fiscalía presente al capturado ante un Juez de Control de Garantías para legalización de captura, imputación y medida de aseguramiento. Se debe verificar la línea de tiempo estricta, no declarar sin abogado de confianza y solicitar medidas no privativas de la libertad."
              }
            },
            {
              "@type": "Question",
              "name": "¿Qué hago si me cita la Fiscalía a interrogatorio o entrevista?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Antes de rendir interrogatorio debes conocer si asistes en calidad de indiciado o testigo. Tienes derecho constitucional a guardar silencio, a no autoincriminarte y a estar asistido por un abogado penalista particular en todo momento."
              }
            },
            {
              "@type": "Question",
              "name": "¿Qué derechos tengo durante un allanamiento y registro de la Policía o Fiscalía?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Tienes derecho a exigir la orden judicial del fiscal, a verificar la fecha de vigencia, a que esté presente el morador o un testigo hábil, a no entregar contraseñas de dispositivos móviles sin orden judicial específica y a exigir copia fiel del acta de incautación."
              }
            },
            {
              "@type": "Question",
              "name": "¿Tienen asistencia penal 24 horas los 7 días de la semana en Colombia?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí. AMF Firma Legal cuenta con línea de guardia penal 24/7 para atender capturas en flagrancia, audiencias concentradas, allanamientos y traslados a URI o estaciones de policía en todo el territorio colombiano."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cómo defenderse de una investigación por delitos económicos o empresariales?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "La defensa técnica debe desvirtuar el dolo penal demostrando mediante auditoría forense y peritaje contable que se trata de una controversia contractual civil o comercial y no de una estafa o defraudación punible."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cómo actuar ante una investigación disciplinaria o penal militar siendo miembro de la Fuerza Pública?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Se debe contar con defensa técnica independiente que separe la defensa penal (Justicia Penal Militar u ordinaria) de la disciplinaria (Ley 2196 de 2021) sin subordinación a la línea de mando de la institución."
              }
            }
          ]
        })}</script>
      </Helmet>

      {/* 1. HERO DEFENSAS PENAL */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)', paddingTop: '2.5rem', paddingBottom: '3.2rem' }}>
        <div className="container text-center" style={{ maxWidth: '840px', margin: '0 auto' }}>
          <span className="badge badge-wine" style={{ marginBottom: '1rem' }}>
            <Scale size={16} />
            <span>DEFENSA PENAL ESTRATÉGICA &amp; ASISTENCIA 24/7</span>
          </span>
          <h1 className="text-serif" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', color: 'var(--color-wine)', marginBottom: '1rem' }}>
            No te preguntamos el artículo del Código Penal.<br />
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Dinos qué situación estás enfrentando hoy.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
            Selecciona la situación que estás viviendo para ver de inmediato el <strong>protocolo de qué hacer para no empeorar tu situación jurídica</strong> y cómo podemos intervenir a tiempo:
          </p>
        </div>
      </section>

      {/* 2. SECCIÓN INTERACTIVA: SITUACIONES PENALES */}
      <section className="section" style={{ backgroundColor: 'var(--color-paper)' }}>
        <div className="container">

          <div className="grid-2" style={{ gap: '1.8rem' }}>
            {situacionesPenales.map((sit) => (
              <div
                key={sit.id}
                className="card situation-interactive-card"
                onClick={() => setSelectedSituation(sit)}
              >
                <div>
                  <div className="situation-card-header">
                    <span className="situation-badge">{sit.badge}</span>
                    <span className="situation-click-hint">Clic para ver qué hacer →</span>
                  </div>
                  <h3 className="text-serif situation-card-title">
                    {sit.title}
                  </h3>
                  <p className="situation-card-question">
                    <strong>Duda crítica:</strong> {sit.question}
                  </p>
                  <p className="situation-card-desc">
                    {sit.desc}
                  </p>
                </div>

                <div className="situation-card-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSituation(sit);
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.65rem 1.2rem', fontSize: '0.88rem' }}
                  >
                    <span>Ver qué hacer para no empeorar</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(whatsappLink(undefined, sit.waMessage), '_blank');
                    }}
                    className="btn btn-gold"
                    style={{ padding: '0.65rem 1rem', fontSize: '0.88rem' }}
                    title="Hablar con penalista por WhatsApp"
                  >
                    <WhatsAppIcon size={16} />
                    <span>Auxilio 24/7</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MODAL / DRAWER INTERACTIVO: PROTOCOLO DE EMERGENCIA */}
      {selectedSituation && (
        <div className="situation-modal-backdrop" onClick={() => setSelectedSituation(null)}>
          <div className="situation-modal-card" onClick={(e) => e.stopPropagation()}>

            {/* Botón cerrar */}
            <button
              className="situation-modal-close"
              onClick={() => setSelectedSituation(null)}
              title="Cerrar ventana (Esc)"
            >
              <X size={22} />
            </button>

            {/* Header del Modal */}
            <div className="situation-modal-header">
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                {selectedSituation.badge}
              </span>
              <h2 className="text-serif situation-modal-title">
                {selectedSituation.title}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', fontStyle: 'italic' }}>
                {selectedSituation.question}
              </p>
            </div>

            {/* Protocolo de Dos y Don'ts */}
            <div className="situation-modal-body">
              <div className="protocol-grid">

                {/* Columna Lo que debes hacer */}
                <div className="protocol-col protocol-dos">
                  <div className="protocol-col-header">
                    <CheckCircle2 size={20} className="text-success" />
                    <span>QUÉ DEBES HACER PARA NO EMPEORAR TU SITUACIÓN</span>
                  </div>
                  <ul>
                    {selectedSituation.dos.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Columna Lo que NUNCA debes hacer */}
                <div className="protocol-col protocol-donts">
                  <div className="protocol-col-header">
                    <XCircle size={20} className="text-danger" />
                    <span>LO QUE NUNCA DEBES HACER (ERRORES FATALES)</span>
                  </div>
                  <ul>
                    {selectedSituation.donts.map((item, idx) => (
                      <li key={idx}>
                        <XCircle size={16} style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Botones de acción del Modal */}
              <div className="situation-modal-actions">
                <button
                  onClick={() => window.open(whatsappLink(undefined, selectedSituation.waMessage), '_blank')}
                  className="btn btn-gold"
                  style={{ flex: 1, padding: '0.9rem', fontSize: '1rem' }}
                >
                  <WhatsAppIcon size={18} />
                  <span>Hablar con Penalista de Guardia 24/7</span>
                </button>
                <button
                  onClick={() => {
                    const targetSlug = selectedSituation.slug;
                    setSelectedSituation(null);
                    navigate(`/centro-juridico/${targetSlug}`);
                  }}
                  className="btn btn-outline-light"
                  style={{ color: 'var(--color-wine)', borderColor: 'var(--color-wine)', padding: '0.9rem 1.4rem' }}
                >
                  <BookOpen size={18} />
                  <span>Leer Guía Jurídica Completa →</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 3. CLÚSTER DE BÚSQUEDAS & DIRECTORIO PENAL (Inspirado en Referencia SEO) */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.6rem' }}>
              DIRECTORIO DE ESPECIALIDADES &amp; BÚSQUEDAS FRECUENTES
            </span>
            <h2 className="text-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--color-wine)' }}>
              Cobertura Penal Especializada en Colombia
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>
              Encuentra la orientación y defensa penal según la etapa procesal, tipo de conducta o sede de atención.
            </p>
          </div>

          <div className="penal-seo-directory-grid">

            {/* Columna 1 */}
            <div className="penal-seo-col">
              <h4 className="penal-seo-col-title">
                <AlertTriangle size={18} className="text-gold" />
                <span>Urgencias Procesales</span>
              </h4>
              <ul className="penal-seo-list">
                <li><Link to="/centro-juridico/que-hacer-captura-familiar-colombia-primeras-36-horas">Legalización de capturas dentro de 36 horas</Link></li>
                <li><Link to="/centro-juridico/que-hacer-me-citaron-interrogatorio-fiscalia">Citación a interrogatorio en la Fiscalía (Art. 282)</Link></li>
                <li><Link to="/centro-juridico/que-hacer-allanamiento-registro-fiscalia-cti">Registro y allanamiento CTI / SIJIN</Link></li>
                <li><Link to="/centro-juridico/como-evitar-carcel-medida-aseguramiento-audiencia-imputacion">Audiencia de medida de aseguramiento: evitar cárcel</Link></li>
                <li><Link to="/defensa-penal">Solicitud de libertad por vencimiento de términos</Link></li>
                <li><Link to="/defensa-penal">Acción constitucional de Habeas Corpus</Link></li>
              </ul>
            </div>

            {/* Columna 2 */}
            <div className="penal-seo-col">
              <h4 className="penal-seo-col-title">
                <ShieldAlert size={18} className="text-gold" />
                <span>Delitos Comunes &amp; Complejos</span>
              </h4>
              <ul className="penal-seo-list">
                <li><Link to="/centro-juridico/acusacion-hurto-sin-objeto-carcel-colombia">Defensa en acusación de hurto sin objeto material</Link></li>
                <li><Link to="/centro-juridico/que-pasa-si-aparezco-en-video-donde-ocurre-delito">Aparición en videograbaciones de delitos</Link></li>
                <li><Link to="/centro-juridico/falsa-denuncia-violencia-intrafamiliar-defensa-colombia">Falsa denuncia por violencia intrafamiliar o delito sexual</Link></li>
                <li><Link to="/centro-juridico/como-constituirse-victima-proceso-penal-reparacion-economica">Representación de víctimas y reparación económica</Link></li>
                <li><Link to="/compliance-penal-corporativo">Delitos financieros, estafa y fraude procesal</Link></li>
                <li><Link to="/defensa-penal">Homicidio, lesiones personales y legítima defensa</Link></li>
                <li><Link to="/defensa-penal">Extorsión y constreñimiento ilegal</Link></li>
                <li><Link to="/compliance-penal-corporativo">Delitos informáticos y evidencia digital</Link></li>
              </ul>
            </div>

            {/* Columna 3 */}
            <div className="penal-seo-col">
              <h4 className="penal-seo-col-title">
                <Scale size={18} className="text-gold" />
                <span>Fuerza Pública &amp; Estado</span>
              </h4>
              <ul className="penal-seo-list">
                <li><Link to="/centro-juridico/investigacion-disciplinaria-policia-nacional-ley-2196">Investigaciones disciplinarias Ley 2196 (Policía)</Link></li>
                <li><Link to="/suscripcion-juridica-fuerza-publica">Justicia Penal Militar y Policial</Link></li>
                <li><Link to="/otros-servicios">Delitos contra la administración pública</Link></li>
                <li><Link to="/planes">Planes de protección jurídica mensual (Escudo, Bastión)</Link></li>
                <li><Link to="/suscripcion-juridica-fuerza-publica">Defensa por uso legítimo de la fuerza y armas</Link></li>
              </ul>
            </div>

            {/* Columna 4 */}
            <div className="penal-seo-col">
              <h4 className="penal-seo-col-title">
                <MapPin size={18} className="text-gold" />
                <span>Abogados por Ubicación</span>
              </h4>
              <ul className="penal-seo-list">
                <li><Link to="/bogota">Abogados penalistas en Bogotá (Bulevar Tequendama)</Link></li>
                <li><Link to="/cali">Abogados penalistas en Cali (Sede Calle 5)</Link></li>
                <li><Link to="/medellin">Abogados penalistas en Medellín (Área Metropolitana)</Link></li>
                <li><Link to="/ubicaciones">Sede Piendamó y departamento del Cauca</Link></li>
                <li><Link to="/ubicaciones">Atención virtual para audiencias en toda Colombia</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. POSICIONAMIENTO & MÉTODO AMF */}
      <section className="section" style={{ backgroundColor: 'var(--color-paper)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem auto' }}>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-wine)', marginBottom: '1rem' }}>
              Estrategia. Orden. Defensa.
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
              No prometemos resultados milagrosos ni salidas mágicas. Prometemos lo que sí depende de nuestra firma: estudiar seriamente el expediente, controvertir la legalidad probatoria, acreditar arraigo y construir una teoría del caso firme.
            </p>
          </div>

          <div className="grid-4">
            <div className="card" style={{ textAlign: 'center', backgroundColor: '#FFF' }}>
              <span className="text-serif" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-gold)' }}>01</span>
              <h4 style={{ color: 'var(--color-wine)', margin: '0.5rem 0' }}>Entendemos</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Escuchamos el trasfondo de los hechos de manera objetiva y reservada.</p>
            </div>
            <div className="card" style={{ textAlign: 'center', backgroundColor: '#FFF' }}>
              <span className="text-serif" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-gold)' }}>02</span>
              <h4 style={{ color: 'var(--color-wine)', margin: '0.5rem 0' }}>Analizamos</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Estudiamos la evidencia, videos y la validez de los elementos de Fiscalía.</p>
            </div>
            <div className="card" style={{ textAlign: 'center', backgroundColor: '#FFF' }}>
              <span className="text-serif" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-gold)' }}>03</span>
              <h4 style={{ color: 'var(--color-wine)', margin: '0.5rem 0' }}>Estrategia</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Establecemos la teoría del caso y las metas procesales viables.</p>
            </div>
            <div className="card" style={{ textAlign: 'center', backgroundColor: '#FFF' }}>
              <span className="text-serif" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-gold)' }}>04</span>
              <h4 style={{ color: 'var(--color-wine)', margin: '0.5rem 0' }}>Actuamos</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Representamos técnicamente en audiencias de control y juicio oral.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN ECONOMÍA & CONTACTO */}
      <section className="section section-dark text-center" style={{ position: 'relative' }}>
        <div className="container container-narrow">
          <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--color-paper)', marginBottom: '1rem' }}>
            Necesitas defensa. El pago también necesita una solución.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-on-dark-muted)', marginBottom: '2rem' }}>
            Los honorarios penales se adaptan a la etapa de cada caso. Pregunta con total tranquilidad por las alternativas de pago y cuotas disponibles para tu situación.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.open(whatsappLink(undefined, WA_MESSAGES.DESDE_PENAL), '_blank')}
              className="btn btn-gold"
              style={{ fontSize: '1.05rem', padding: '0.95rem 2rem' }}
            >
              <WhatsAppIcon size={18} />
              <span>Hablar con Penalista de Guardia 24/7</span>
            </button>
            <button
              onClick={() => navigate('/centro-juridico')}
              className="btn btn-outline-light"
              style={{ fontSize: '1.05rem', padding: '0.95rem 1.8rem' }}
            >
              <BookOpen size={18} />
              <span>Ver todas las guías del Centro Jurídico</span>
            </button>
          </div>
        </div>
      </section>

    </main>
  );
};
