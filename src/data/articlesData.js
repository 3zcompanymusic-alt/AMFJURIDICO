/**
 * Repositorio de Artículos del Centro Jurídico de AMF Firma Legal
 * Implementa la Plantilla Estándar de 10 Pasos de la Guía de Arquitectura SEO:
 * 1. Título y H1 como pregunta exacta del usuario
 * 2. Respuesta corta inicial (40-80 palabras)
 * 3. Ejemplo cotidiano / Caso práctico
 * 4. Explicación jurídica con sustento normativo
 * 5. Checklist de acción (Qué hacer / Qué evitar)
 * 6. FAQs relacionadas (3 a 6)
 * 7. CTA adaptado al caso
 * 8. Autoridad E-E-A-T (Abogado autor/revisor con enlace a perfil)
 * 9. Enlaces internos (pilar, ciudad, temas vinculados)
 * 10. Datos estructurados Schema (Article, BreadcrumbList)
 */

export const ARTICLES_DATA = [
  {
    slug: "que-hacer-captura-familiar-colombia-primeras-36-horas",
    category: "penal",
    categoryLabel: "Defensa Penal 24/7",
    title: "¿Qué hacer si capturan a un familiar en Colombia? Guía paso a paso en las primeras 36 horas",
    metaTitle: "¿Qué hacer si capturan a un familiar en Colombia? Primeras 36 Horas | AMF Legal",
    metaDescription: "Guía jurídica inmediata ante la captura de un familiar en Colombia: plazo perentorio de 36 horas, audiencias concentradas, derechos del capturado y qué evitar.",
    readTime: "6 min de lectura",
    publishDate: "2026-08-10",
    updateDate: "2026-09-12",
    author: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Especialista en Derecho Penal",
      slug: "jorge-florez",
      avatar: "/assets/Equipo fotos/Jorge Florez.png",
      credentials: "Ex funcionario judicial de la Rama Judicial en Juzgados Penales Municipales de Control de Garantías y Circuito en Cali."
    },
    reviewer: {
      name: "Esteban Ávila Meneses",
      role: "Socio Fundador – Especialista en Derecho Procesal Penal",
      slug: "esteban-avila",
      credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia."
    },
    quickAnswer: "Las primeras 36 horas tras una captura son definitivas en Colombia. La Fiscalía General de la Nación debe presentar al detenido ante un Juez Penal con Función de Control de Garantías para legalizar la captura, formular imputación y solicitar medida de aseguramiento. No permitas que el detenido rinda entrevistas ni interrogatorios sin abogado defensor de confianza, exige el acta de derechos del capturado y contacta de inmediato defensa técnica calificada.",
    example: "Imagina que un familiar es detenido a las 11:00 p.m. en un puesto de control en Bogotá o Cali bajo el argumento de una orden judicial previa o una presunta flagrancia. La familia entra en pánico, se traslada a la URI y personas externas les ofrecen supuestos 'arreglos rápidos'. Si la familia espera hasta el día siguiente para buscar un penalista, el capturado puede llegar a la audiencia preliminar sin pruebas de arraigo ni control sobre posibles irregularidades policiales en el procedimiento.",
    legalExplanation: `
      En el sistema penal acusatorio colombiano (Ley 906 de 2004), la privación de la libertad tiene límites constitucionales infranqueables:

      1. **El término perentorio de 36 horas (Artículo 28 de la Constitución Política y Artículo 297 del CPP):** La persona capturada debe ser puesta a disposición del juez de control de garantías dentro de las 36 horas siguientes al momento exacto de la retención material. Si se supera este tiempo sin justificación legal insuperable, la captura deviene en ilegal y el juez debe ordenar la libertad inmediata.
      2. **Las tres audiencias concentradas preliminares:**
         - **Legalización de captura:** Se examina si se respetaron los derechos fundamentales, si hubo o no maltrato físico, y si la flagrancia (Art. 301 CPP) o la orden judicial cumplieron los requisitos de ley.
         - **Formulación de imputación:** La Fiscalía comunica formalmente los cargos que atribuye. En este punto el defensor asesora sobre allanamiento o no allanamiento.
         - **Medida de aseguramiento:** La Fiscalía sustenta si solicita detención en establecimiento carcelario, detención domiciliaria o libertad con restricciones. Aquí la defensa técnica es vital para controvertir la necesidad, adecuación y proporcionalidad de la medida.
      3. **La importancia del arraigo:** Para evitar que el juez imponga medida intramural, la defensa debe aportar certificados laborales, contratos de arrendamiento o escrituras, certificados de convivencia y antecedentes limpios que demuestren que el capturado no representa peligro para la comunidad ni riesgo de fuga.
    `,
    checklist: {
      dos: [
        "Anotar hora exacta, lugar y unidad policial que realizó la captura.",
        "Acudir de inmediato a la URI o estación y confirmar que se registró el ingreso oficial.",
        "Solicitar copia legible del acta de derechos del capturado y verificar si tiene firmas bajo presión.",
        "Designar un abogado penalista particular antes de la instalación de las audiencias.",
        "Reunir documentos de arraigo urgente: cédula, contrato laboral, recibos públicos y cartas de recomendación."
      ],
      donts: [
        "Nunca permitir que el capturado rinda entrevistas o interrogatorios sin su abogado defensor.",
        "No entregar dinero a intermediarios o falsos tramitadores fuera de juzgados o URIs.",
        "No firmar actas en blanco ni aceptar acusaciones preliminares sin asesoría técnica.",
        "No esperar a que se cumplan las 36 horas para buscar representación legal."
      ]
    },
    faqs: [
      {
        question: "¿Qué pasa si pasan más de 36 horas y no han llevado al capturado ante el juez?",
        answer: "La captura se torna ilegal por vencimiento del plazo constitucional. El abogado defensor debe solicitar la declaratoria de ilegalidad de la captura y la consecuente orden de libertad inmediata ante el Juez de Control de Garantías."
      },
      {
        question: "¿Es obligatorio aceptar cargos en la audiencia de imputación?",
        answer: "No. Aceptar cargos es una decisión voluntaria y estratégica que debe ser analizada rigurosamente con el abogado defensor. Una vez aceptados los cargos, no hay retractación y se pasa directamente a la dosificación de la pena."
      },
      {
        question: "¿El capturado tiene derecho a una llamada telefónica?",
        answer: "Sí. Es un derecho fundamental consagrado en el Código de Procedimiento Penal. La autoridad de policía debe facilitar la comunicación inmediata con un familiar o con su abogado de confianza."
      },
      {
        question: "¿AMF Firma Legal atiende audiencias de captura en cualquier ciudad?",
        answer: "Sí. Contamos con atención 24/7 presencial en sedes principales (Bogotá, Cali, Medellín) y cobertura virtual para audiencias ante jueces de control de garantías en todo el territorio colombiano."
      }
    ],
    cta: {
      badge: "Emergencia Penal 24 Horas",
      title: "¿Tu familiar se encuentra detenido en este momento?",
      text: "Cada minuto dentro de las 36 horas cuenta para acreditar arraigo y controvertir la legalidad de la captura. Habla directamente con un abogado penalista de guardia en AMF.",
      buttonText: "Atención Penal Urgente 24/7",
      waMessage: "Hola, me comunico con AMF Firma Legal. Requiero asistencia urgente por la captura de un familiar dentro de las 36 horas."
    },
    internalLinks: [
      { text: "Servicios de Defensa Penal Estratégica 24/7", url: "/defensa-penal" },
      { text: "Atención penal de urgencias en Bogotá", url: "/bogota" },
      { text: "Atención penal de urgencias en Cali", url: "/cali" },
      { text: "Conoce al equipo penalista de AMF", url: "/equipo" }
    ]
  },
  {
    slug: "investigacion-disciplinaria-policia-nacional-ley-2196",
    category: "fuerza-publica",
    categoryLabel: "Fuerza Pública",
    title: "Investigación disciplinaria en la Policía Nacional (Ley 2196 de 2022): ¿Cuándo necesitas un abogado defensor?",
    metaTitle: "Investigación Disciplinaria Policía Nacional Ley 2196 | AMF Legal",
    metaDescription: "Cómo afrontar una indagación previa o pliego de cargos bajo la Ley 2196 de 2022 en la Policía Nacional. Derechos procesales, etapas y blindaje de carrera.",
    readTime: "7 min de lectura",
    publishDate: "2026-08-15",
    updateDate: "2026-09-14",
    author: {
      name: "Steven Alegrías Bolaños",
      role: "Abogado Especialista en Derecho Administrativo y Disciplinario",
      slug: "steven-alegrias",
      avatar: "/assets/Equipo fotos/Steven Alegrias.png",
      credentials: "Especialista de la Universidad del Cauca con amplia trayectoria en asesoría institucional y derecho sancionatorio público."
    },
    reviewer: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Litigante",
      slug: "jorge-florez",
      credentials: "Sólida experiencia en litigio contencioso administrativo y disciplinario."
    },
    quickAnswer: "Necesitas un abogado defensor desde el momento exacto en que te notifican el auto de apertura de indagación previa o investigación disciplinaria bajo la Ley 2196 de 2022. Esperar al pliego de cargos o a la citación a audiencia de juzgamiento deja pasar la oportunidad de solicitar pruebas técnicas, controvertir testimonios y desvirtuar la tipicidad de la falta antes de que se afecte tu hoja de vida o tu ascenso.",
    example: "Un comandante de patrulla atiende un procedimiento de orden público que es grabado de manera parcial por ciudadanos y publicado en redes sociales. La oficina de control interno disciplinario de la unidad inicia apertura de oficio. El uniformado rinde versión libre sin asesoría jurídica, comete imprecisiones terminológicas sobre el uso de la fuerza y termina vinculado formalmente a un proceso por presunta falta gravísima que pone en riesgo su permanencia en la institución.",
    legalExplanation: `
      La Ley 2196 de 2022 expidió el Estatuto Disciplinario Policial, endureciendo causales y creando nuevos tipos disciplinarios. Claves procesales que todo uniformado debe conocer:

      1. **Diferencia entre Indagación Previa e Investigación Disciplinaria:** La indagación previa busca verificar la ocurrencia de la conducta y la identidad del autor. Una vez individualizado el uniformado, se abre formal investigación disciplinaria. Es en esta fase de instrucción donde se deben aportar las minutas de servicio, grabaciones de cámaras corporales (bodycam) y testimonios de la patrulla.
      2. **Faltas Gravísimas vs. Faltas Graves:** La Ley 2196 contempla sanciones que van desde la suspensión e inhabilidad especial hasta la destitución e inhabilidad general por 10 a 20 años. Faltas relacionadas con el servicio, porte de armas, custodia de bienes incautados o procedimientos mediáticos son tipificadas con alta rigurosidad.
      3. **Garantía del Debido Proceso Policial:** Todo uniformado investigado goza de presunción de inocencia, derecho a guardar silencio sin que ello se use en su contra, y derecho irrestricto a ser defendido por un abogado particular en todas las diligencias.
    `,
    checklist: {
      dos: [
        "Exigir copia íntegra del expediente disciplinario y de los elementos materiales probatorios al momento de la notificación.",
        "Solicitar asesoría técnica de tu firma legal antes de rendir cualquier versión libre.",
        "Asegurar de inmediato la minuta de guardia, órdenes de servicio y grabaciones operacionales del turno.",
        "Vigilar los términos procesales de caducidad y prescripción de la acción disciplinaria.",
        "Contar con una suscripción jurídica mensual activa para respaldo permanente sin gastos imprevistos."
      ],
      donts: [
        "No acudir a rendir versión libre 'a ver qué dicen' sin haber revisado previamente el expediente.",
        "No asumir que la defensa institucional o de oficio priorizará tu interés personal por encima del mando.",
        "No omitir las fechas de notificación personal o por estado.",
        "No firmar notificaciones con fechas retroactivas o alteradas."
      ]
    },
    faqs: [
      {
        question: "¿Una investigación disciplinaria me suspende automáticamente el sueldo?",
        answer: "No automáticamente. Solo en faltas gravísimas muy cualificadas el funcionario competente puede solicitar la suspensión provisional en el cargo mientras dura el proceso, pero debe estar debidamente motivada y tiene consulta obligatoria ante el superior funcional."
      },
      {
        question: "¿Puedo tener el mismo abogado para el proceso penal militar y el disciplinario?",
        answer: "Sí. En AMF Firma Legal coordinamos la defensa integral: la estrategia en el proceso disciplinario policial (Ley 2196) se articula con la eventual investigación en Justicia Penal Militar o Fiscalía Ordinaria para no contradecir posturas fácticas."
      },
      {
        question: "¿Qué cubren los planes de suscripción de AMF para uniformados?",
        answer: "Los planes Escudo, Fortaleza y Bastión cubren la representación técnica en investigaciones disciplinarias, asesoría continua ilimitada en servicio y acciones constitucionales familiares según el plan elegido."
      }
    ],
    cta: {
      badge: "Protección a tu Carrera Policial y Militar",
      title: "¿Tienes un llamado o notificación de Control Disciplinario?",
      text: "Protege tu ascenso, tu estabilidad económica y tu buen nombre. Afíliate a los planes de suscripción de AMF Firma Legal con cobertura jurídica especializada en toda Colombia.",
      buttonText: "Conocer Planes de Suscripción",
      waMessage: "Hola, soy miembro de la Fuerza Pública y requiero asesoría por una investigación disciplinaria bajo la Ley 2196."
    },
    internalLinks: [
      { text: "Suscripción Jurídica para Fuerza Pública", url: "/suscripcion-juridica-fuerza-publica" },
      { text: "Conoce los Planes Escudo, Fortaleza y Bastión", url: "/planes" },
      { text: "Consultas presenciales en sedes AMF", url: "/ubicaciones" }
    ]
  },
  {
    slug: "circular-100-000020-supersociedades-nuevo-sistema-riesgos-sagrilaft-ptee",
    category: "compliance",
    categoryLabel: "Compliance & Penal Corporativo",
    title: "Circular 100-000020 de 2026: Nuevo Sistema Integral de Riesgos de la Supersociedades (Integración SAGRILAFT y PTEE)",
    metaTitle: "Circular 100-000020 de 2026 Supersociedades | SAGRILAFT y PTEE | AMF Legal",
    metaDescription: "Análisis práctico de la Circular Externa 100-000020 de 2026 de la Superintendencia de Sociedades. Nuevo Sistema Integral de Gestión de Riesgos, plazos y prevención penal.",
    readTime: "8 min de lectura",
    publishDate: "2026-08-22",
    updateDate: "2026-09-15",
    author: {
      name: "Juan Gregorio Minda Cerón",
      role: "Contador Público y Abogado – Especialista en Finanzas y Auditoría",
      slug: "juan-minda",
      avatar: "/assets/Equipo fotos/Juan Gregorio.png",
      credentials: "Especialista en Finanzas y Derecho Procesal Penal, integrando la visión financiera, contable y sancionatoria en empresas."
    },
    reviewer: {
      name: "David Fernando Pechené Torres",
      role: "Abogado Especialista y Magíster",
      slug: "david-pechene",
      credentials: "Magíster en Contratación Estatal e Infraestructura Pública."
    },
    quickAnswer: "La Circular Externa 100-000020 de 2026 de la Superintendencia de Sociedades transformó el régimen de cumplimiento corporativo en Colombia, unificando el SAGRILAFT (prevención de lavado de activos y financiación del terrorismo) y el PTEE (Programa de Transparencia y Ética Empresarial) en un único 'Sistema Integral de Autocontrol y Gestión de Riesgos'. Las empresas obligadas deben actualizar matrices de riesgos, debida diligencia de contrapartes y designar oficiales de cumplimiento acreditados para mitigar riesgos penales y cuantiosas multas.",
    example: "Una empresa del sector logístico o comercial supera los umbrales de ingresos fijados por la Superintendencia al corte del ejercicio anterior. Continúa operando con formatos genéricos de debida diligencia de hace cinco años. Tras un operativo aduanero o judicial que involucra a uno de sus proveedores de transporte en lavado de activos, la empresa recibe pliego de cargos de la Supersociedades y una orden de inspección judicial de la Fiscalía por no contar con una matriz de riesgos adaptada a la normativa vigente.",
    legalExplanation: `
      El compliance corporativo en Colombia ha dejado de ser una simple carpeta de documentos para convertirse en una barrera real de exclusión de responsabilidad penal y administrativa:

      1. **Unificación Normativa 2026:** La Circular Externa 100-000020 supera la dispersión que existía entre los Capítulos X (SAGRILAFT) y XIII (PTEE) de la Circular Básica Jurídica, exigiendo un enfoque holístico de prevención que abarca:
         - Lavado de activos, financiación del terrorismo y proliferación de armas de destrucción masiva (LA/FT/FPADM).
         - Soborno transnacional, corrupción interna y pública (Ley 2195 de 2022).
      2. **Responsabilidad de Administradores y Oficial de Cumplimiento:** Los representantes legales y miembros de junta directiva responden administrativa y penalmente si se demuestra omisión en el deber de supervisión y debida diligencia frente a terceros y socios.
      3. **Enfoque Pragmático con Capacidad Penal:** AMF Firma Legal no aborda el compliance como un paquete teórico de papelería, sino como un blindaje penal corporativo: estructuramos protocolos de investigación interna que permiten a la empresa detectar irregularidades a tiempo y presentar denuncias oportunas ante la Fiscalía con blindaje de secreto profesional.
    `,
    checklist: {
      dos: [
        "Verificar si la empresa cumple los umbrales de activos o ingresos brutos fijados en la Circular 100-000020.",
        "Actualizar los manuales de prevención integrando las matrices de LA/FT con las de corrupción y soborno.",
        "Implementar debida diligencia reforzada sobre contrapartes, contratistas y Personas Expuestas Políticamente (PEP).",
        "Capacitar anualmente a directivos y empleados con certificación verificable.",
        "Estructurar canales de denuncia seguros y protocolos para investigaciones internas ante contingencias."
      ],
      donts: [
        "No utilizar plantillas 'copia y pega' descargadas de internet sin adecuación al objeto social ni a la operación real.",
        "No mantener un oficial de cumplimiento que tenga conflictos de interés con áreas comerciales o de tesorería.",
        "No desatender los requerimientos de la Superintendencia de Sociedades; las multas pueden superar los 200 SMMLV.",
        "No esperar a recibir una orden de allanamiento o vinculación de la Fiscalía para revisar las contrapartes de la compañía."
      ]
    },
    faqs: [
      {
        question: "¿Qué empresas están obligadas a adoptar el nuevo Sistema Integral de Riesgos?",
        answer: "Las empresas vigiladas o controladas por la Supersociedades que superen los umbrales de ingresos o activos brutos al 31 de diciembre del año anterior, así como sectores especiales (inmobiliario, comercialización de metales preciosos, servicios contables y jurídicos, transporte y construcción)."
      },
      {
        question: "¿Se siguen utilizando las siglas SAGRILAFT y PTEE?",
        answer: "Sí, orgánicamente y en la práctica empresarial se siguen utilizando como referencia histórica, pero formalmente la Circular 100-000020 de 2026 las unifica bajo el Sistema Integral de Autocontrol y Gestión de Riesgos."
      },
      {
        question: "¿Cómo apoya AMF Firma Legal a las empresas?",
        answer: "Realizamos diagnósticos de aplicabilidad, estructuración de manuales a la medida, debida diligencia de contrapartes de alto riesgo, capacitaciones certificadas y liderazgo en investigaciones internas y representación penal de administradores."
      }
    ],
    cta: {
      badge: "Blindaje Penal y Corporativo",
      title: "¿Tu empresa está al día con la Circular 100-000020 de 2026?",
      text: "Evita sanciones administrativas y blinda a tus administradores frente a contingencias penales. Solicita un diagnóstico preliminar de riesgos con el equipo corporativo de AMF.",
      buttonText: "Solicitar Diagnóstico Corporativo",
      waMessage: "Hola, me comunico desde la página web de AMF Firma Legal. Deseamos solicitar un diagnóstico de cumplimiento normativo y prevención penal corporativa para nuestra empresa."
    },
    internalLinks: [
      { text: "Compliance & Penal Corporativo AMF", url: "/compliance-penal-corporativo" },
      { text: "Equipo de abogados litigantes y auditores", url: "/equipo" },
      { text: "Agendamiento para juntas y directivos en Bogotá", url: "/bogota" }
    ]
  },
  {
    slug: "que-hacer-me-citaron-interrogatorio-fiscalia",
    category: "penal",
    categoryLabel: "Defensa Penal 24/7",
    title: "¿Qué hacer si me citaron a interrogatorio en la Fiscalía General de la Nación?",
    metaTitle: "¿Qué hacer si me citaron a interrogatorio en la Fiscalía? | AMF Legal",
    metaDescription: "¿Te citó la Fiscalía? Conoce tus derechos: no asistir solo, guardar silencio (Art. 33 CP) y preparar la defensa técnica con un abogado penalista antes de la diligencia.",
    readTime: "6 min de lectura",
    publishDate: "2026-08-28",
    updateDate: "2026-09-16",
    author: {
      name: "Esteban Ávila Meneses",
      role: "Socio Fundador – Especialista en Derecho Procesal Penal",
      slug: "esteban-avila",
      avatar: "/assets/Equipo fotos/Esteban Avila.png",
      credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia."
    },
    reviewer: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Especialista en Derecho Penal",
      slug: "jorge-florez",
      credentials: "Ex funcionario judicial de la Rama Judicial en Juzgados de Garantías y Circuito en Cali."
    },
    quickAnswer: "Una citación a interrogatorio no es una condena, pero confirma formalmente que eres indiciado en una investigación penal en Colombia (Art. 282 CPP). Nunca asistas solo ni rindas declaraciones sin un abogado defensor particular que haya examinado previamente el expediente. Tienes el derecho fundamental a guardar silencio (Art. 33 de la Constitución Política) sin que ello constituya indicio de culpabilidad en tu contra.",
    example: "Un ciudadano recibe una boleta de citación del CTI convocándolo al búnker de la Fiscalía para rendir interrogatorio en una investigación por presunto fraude o lesiones. Confiado en que 'quien nada debe, nada teme', acude solo a dar explicaciones informales. El fiscal registra cada palabra, encuentra contradicciones con testimonios previos y, con base en sus propias declaraciones espontáneas, solicita orden de captura e imputación de cargos días después.",
    legalExplanation: `
      El interrogatorio al indiciado está rigurosamente reglado en la Ley 906 de 2004:
      
      1. **Diferencia entre Entrevista e Interrogatorio (Arts. 206 vs. 282 CPP):** La entrevista se recibe a testigos o víctimas. El interrogatorio se realiza exclusivamente a quien tiene la calidad de indiciado (sospechoso de la conducta).
      2. **Presencia Obligatoria del Defensor:** El interrogatorio practicado sin la presencia física y activa de un abogado defensor carece de toda validez probatoria en el juicio oral y viola el debido proceso.
      3. **El Derecho Fundamental a Guardar Silencio (Art. 33 Constitución Política):** Nadie puede ser obligado a declarar contra sí mismo, contra su cónyuge, compañero permanente o parientes dentro del cuarto grado de consanguinidad. Guardar silencio es un acto legítimo de estrategia de defensa, no una aceptación de culpa.
      4. **Acceso al Expediente antes de la Diligencia:** Tu abogado tiene la facultad de solicitar copias de la noticia criminal (SPOA) y de las evidencias recaudadas antes de decidir si es conveniente que declares o ejerzas el silencio.
    `,
    checklist: {
      dos: [
        "Verificar el número único de noticia criminal (SPOA de 21 dígitos) y el fiscal de conocimiento.",
        "Designar de inmediato un abogado defensor penal particular que se presente formalmente en el proceso.",
        "Solicitar el aplazamiento de la diligencia si tu abogado aún no ha tenido tiempo de examinar el expediente.",
        "Definir con tu defensor si estratégicamente conviene responder o acogerse al derecho a guardar silencio.",
        "Reunir pruebas de descargo y documentos que sustenten tu versión antes de acudir."
      ],
      donts: [
        "Nunca asistas a la Fiscalía solo 'a ver qué quieren saber'.",
        "No entregues tu teléfono celular, claves o computadores de manera 'voluntaria' sin orden judicial previa.",
        "No firmes actas de renuncia a derechos ni acuerdos verbales con investigadores del CTI o policía judicial.",
        "No intentes contactar a la persona denunciante para pedirle que retire la denuncia (puede tipificar constreñimiento o fraude procesal)."
      ]
    },
    faqs: [
      {
        question: "¿Qué pasa si no asisto a la citación de la Fiscalía?",
        answer: "La Fiscalía puede reiterar la citación. Si la conducta investigada admite detención preventiva y advierte renuencia o peligro de fuga, el fiscal puede solicitar al juez una orden de captura para comparecencia forzosa. Por ello, nunca se debe ignorar la citación: tu abogado debe radicar un memorial formal justificando la reprogramación."
      },
      {
        question: "¿Me pueden capturar durante el interrogatorio?",
        answer: "Si acudes voluntariamente a una citación, la Fiscalía generalmente no ejecuta captura en ese acto a menos que exista una orden judicial previa emitida por un juez de control de garantías que decidan hacer efectiva."
      },
      {
        question: "¿Puedo cambiar de abogado después del interrogatorio?",
        answer: "Sí. El derecho a la defensa técnica permite sustituir o revocar el poder en cualquier etapa del proceso penal."
      }
    ],
    cta: {
      badge: "Asistencia Penal Previa a la Diligencia",
      title: "¿Recibiste una citación de la Fiscalía?",
      text: "No cometas el error de asistir sin preparación probatoria. Habla de inmediato con nuestros penalistas para examinar el expediente y definir la estrategia.",
      buttonText: "Preparar mi Defensa ante Fiscalía",
      waMessage: "Hola, me citaron a interrogatorio en la Fiscalía y requiero defensa penal estratégica antes de la diligencia."
    },
    internalLinks: [
      { text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" },
      { text: "¿Qué hacer en una captura? Primeras 36 horas", url: "/centro-juridico/que-hacer-captura-familiar-colombia-primeras-36-horas" },
      { text: "Atención presencial en Bogotá (Bulevar Tequendama)", url: "/bogota" }
    ]
  },
  {
    slug: "acusacion-hurto-sin-objeto-carcel-colombia",
    category: "penal",
    categoryLabel: "Defensa Penal 24/7",
    title: "Si me acusan de hurto en Colombia, pero no me atraparon con el objeto, ¿igual puedo ir a la cárcel?",
    metaTitle: "¿Acusado de hurto sin el objeto? ¿Puedo ir a la cárcel? | AMF Legal",
    metaDescription: "Explicación jurídica en Colombia: por qué la ausencia de flagrancia o del objeto hurtado no impide una orden de captura o medida de aseguramiento carcelaria.",
    readTime: "7 min de lectura",
    publishDate: "2026-09-02",
    updateDate: "2026-09-16",
    author: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Especialista en Derecho Penal",
      slug: "jorge-florez",
      avatar: "/assets/Equipo fotos/Jorge Florez.png",
      credentials: "Ex funcionario judicial de la Rama Judicial en Juzgados de Garantías y Circuito en Cali."
    },
    reviewer: {
      name: "Esteban Ávila Meneses",
      role: "Socio Fundador – Litigante",
      slug: "esteban-avila",
      credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia."
    },
    quickAnswer: "Sí, es jurídicamente posible ser procesado e incluso recibir medida de aseguramiento en establecimiento carcelario aunque no te hayan atrapado con el objeto del hurto. La Fiscalía en Colombia no depende exclusivamente de la flagrancia material: puede construir una imputación mediante indicios concordantes, testimonios presenciales, peritajes a grabaciones de cámaras y reconocimientos en fila de personas (Arts. 239, 240 y 382 CPP).",
    example: "Una persona es vinculada formalmente a un proceso por hurto calificado en un almacén o residencia porque un testigo afirmó verla en los alrededores y una cámara exterior registró su paso minutos después. Al momento de la captura, meses más tarde, no se le halla ningún elemento del botín. Sin embargo, en la audiencia concentrada la Fiscalía sostiene que existe 'inferencia razonable de autoría' y solicita detención preventiva alegando la gravedad de la pena y peligro para la comunidad.",
    legalExplanation: `
      En el Derecho Penal colombiano, la materialidad de la conducta y la responsabilidad se rigen por principios técnicos:
      
      1. **Hurto Simple vs. Hurto Calificado y Agravado (Arts. 239, 240 y 241 Código Penal):** Si el hurto presuntamente se cometió con violencia sobre las cosas o las personas, destreza, en la noche o con concurso de personas, la pena mínima se incrementa sustancialmente, lo que habilita la detención intramural (Art. 313 CPP).
      2. **La Inferencia Razonable de Autoría (Art. 308 CPP):** Para imponer medida de aseguramiento, el juez no exige certeza absoluta (que se requiere en el juicio oral), sino una sospecha fundada respaldada por elementos materiales probatorios o evidencia física.
      3. **La Fuerza y Debilidad de la Prueba Indiciaria:** La ausencia del objeto hurtado es un argumento poderoso para la defensa si se demuestra que la evidencia en video es ambigua, que no hubo cotejo morfológico facial científico, o que el señalamiento del testigo estuvo viciado por inducción policial.
      4. **El Acreditamiento de Coartadas y Arraigo:** Si la defensa aporta pruebas de que el indiciado se encontraba en otro lugar trabajando o conviviendo, se destruye el nexo de causalidad temporal exigido por la ley.
    `,
    checklist: {
      dos: [
        "Reconstruir de inmediato dónde te encontrabas el día y hora exactos de los hechos imputados.",
        "Aportar pruebas objetivas de geolocalización: recibos con hora, registros de asistencia laboral, peajes, cámaras privadas o transacciones bancarias.",
        "Solicitar a tu abogado que exija la cadena de custodia íntegra y el video original sin cortes ni ediciones.",
        "Radicar soportes de arraigo familiar, habitacional y laboral para controvertir cualquier medida carcelaria."
      ],
      donts: [
        "No confrontar a la persona que te acusa; cualquier reclamo será presentado por la Fiscalía como amenaza u obstrucción a la justicia.",
        "No deshacerte de tu teléfono o ropa; una actitud de ocultamiento genera inferencia de culpabilidad ante el juez.",
        "No aceptar cargos ni preacuerdos sin que tu defensor haya revisado la solidez de las evidencias de la Fiscalía."
      ]
    },
    faqs: [
      {
        question: "¿Puedo tener detención domiciliaria si me acusan de hurto?",
        answer: "Depende de la modalidad. En hurtos agravados existen prohibiciones legales expresas para conceder prisión domiciliaria en ciertas circunstancias, pero un defensor técnico puede solicitar libertades provisionales o medidas no privativas de la libertad desvirtuando los fines constitucionales de la medida."
      },
      {
        question: "¿Qué valor tiene un video borroso de una cámara de seguridad?",
        answer: "Un video sin resolución suficiente, sin cadena de custodia o sin peritaje de biometría facial no puede fundamentar por sí solo una condena. La defensa técnica puede tacharlo o controvertir su idoneidad identificatoria."
      }
    ],
    cta: {
      badge: "Defensa Técnica ante Imputaciones",
      title: "¿Te acusan de un delito sin haberte hallado nada?",
      text: "La Fiscalía no puede basar una privación de libertad en meras suposiciones. Diseñamos la estrategia técnica para desvirtuar la acusación y proteger tu libertad.",
      buttonText: "Consultar mi Caso de Hurto",
      waMessage: "Hola, me están acusando de hurto sin haberme encontrado ningún elemento y necesito defensa penal técnica urgente."
    },
    internalLinks: [
      { text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" },
      { text: "¿Qué pasa si aparezco en un video de un delito?", url: "/centro-juridico/que-pasa-si-aparezco-en-video-donde-ocurre-delito" },
      { text: "Atención penal en Cali (Calle 5)", url: "/cali" }
    ]
  },
  {
    slug: "que-pasa-si-aparezco-en-video-donde-ocurre-delito",
    category: "penal",
    categoryLabel: "Defensa Penal 24/7",
    title: "¿Qué pasa si aparezco en un video donde ocurre un delito en Colombia?",
    metaTitle: "¿Apareces en un video donde ocurrió un delito? Qué Hacer | AMF Legal",
    metaDescription: "¿Apareces en una grabación de un delito? Conoce las implicaciones legales en Colombia, la diferencia entre presencia pasiva y coautoría, y qué hacer de inmediato.",
    readTime: "6 min de lectura",
    publishDate: "2026-09-08",
    updateDate: "2026-09-16",
    author: {
      name: "Esteban Ávila Meneses",
      role: "Socio Fundador – Especialista en Derecho Procesal Penal",
      slug: "esteban-avila",
      avatar: "/assets/Equipo fotos/Esteban Avila.png",
      credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia."
    },
    reviewer: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Especialista en Derecho Penal",
      slug: "jorge-florez",
      credentials: "Litigante con amplia experiencia en controversia probatoria y evidencia digital."
    },
    quickAnswer: "Aparecer en un video de seguridad o grabación aficionada donde se comete un delito no te convierte automáticamente en autor ni en cómplice. El Código Penal colombiano exige demostrar dolo (conocimiento y voluntad de delinquir) y un aporte causal a la conducta. La presencia meramente circunstancial, pasiva o de espectador es atípica (no es delito). Sin embargo, ante el riesgo de viralización o de una orden de captura preventiva, debes actuar de inmediato con un penalista.",
    example: "Un joven acompaña a dos compañeros a un establecimiento. De repente, uno de ellos saca un arma y comete una extorsión o atraco. Las cámaras graban al joven retrocediendo desconcertado, pero el fiscal interpreta preliminarmente que 'cumplía funciones de vigilancia o campanero'. El video circula en redes sociales y la policía judicial inicia labores de individualización para capturarlo.",
    legalExplanation: `
      La jurisprudencia de la Sala de Casación Penal de la Corte Suprema de Justicia es enfática sobre la responsabilidad en grabaciones:
      
      1. **Presencia Circunstancial vs. Coautoría Funcional (Art. 29 Código Penal):** La coautoría requiere un acuerdo previo o concomitante y la división del trabajo criminal con dominio funcional del hecho. Quien solo se encuentra en el lugar por azar, curiosidad o cercanía temporal sin prestar auxilio no responde penalmente.
      2. **Complicidad (Art. 30 Código Penal):** Solo existe si la persona contribuye conscientemente a la realización del delito o presta ayuda posterior por concierto previo.
      3. **Cadena de Custodia y Metadatos de la Evidencia Digital (Arts. 275 y 277 CPP):** Los videos editados, recortados o extraídos sin procedimiento técnico pericial pierden confiabilidad y pueden ser excluidos como prueba ilícita o impertinente.
      4. **Presentación Voluntaria con Abogado:** Para frenar una orden de captura por alarma pública, tu defensor puede radicar un memorial informando al fiscal la plena identidad del ciudadano, su arraigo y su absoluta disposición para comparecer.
    `,
    checklist: {
      dos: [
        "Buscar inmediatamente asesoría de un abogado penalista que represente tus intereses de manera individual.",
        "Obtener la grabación completa desde los minutos previos hasta los posteriores para demostrar que no existió coordinación con los agresores.",
        "Recopilar testimonios de personas que presenciaron tu reacción de sorpresa o alejamiento.",
        "Radicar un memorial formal informando tu disposición de comparecer para evitar que la Fiscalía argumente que estás 'ocultándote'."
      ],
      donts: [
        "No publiques videos explicativos, justificaciones o cartas abiertas en redes sociales (pueden ser tomadas como confesiones fuera de contexto).",
        "No borres mensajes, llamadas ni registros de tu celular si demuestran tu inocencia; la eliminación voluntaria puede alegarse como destrucción de evidencia.",
        "No huyas de tu lugar de residencia ni de tu trabajo."
      ]
    },
    faqs: [
      {
        question: "¿Qué pasa si el video fue grabado sin mi consentimiento?",
        answer: "En espacios públicos (calles, comercios abiertos al público), las grabaciones de seguridad son lícitas para investigaciones penales. Sin embargo, en recintos estrictamente privados se requiere orden judicial previa del fiscal para que no constituyan prueba ilícita."
      },
      {
        question: "¿Me pueden judicializar solo por mirar un delito sin intervenir?",
        answer: "El ciudadano particular no tiene deber general de garante de evitar delitos ajenos que pongan en riesgo su propia integridad, salvo delitos muy específicos frente a personas bajo su custodia o desamparadas (omisión de socorro). Mirar pasivamente no te hace cómplice del delito principal."
      }
    ],
    cta: {
      badge: "Blindaje ante Evidencia Digital",
      title: "¿Apareces en una grabación y temes repercusiones?",
      text: "La Fiscalía no puede convertir a un espectador en coautor de un delito. Intervenimos a tiempo para demostrar tu ajenidad y frenar capturas injustificadas.",
      buttonText: "Hablar con un Abogado Penalista",
      waMessage: "Hola, aparezco en un video donde ocurrió un delito y requiero asesoría técnica para blindar mi situación jurídica."
    },
    internalLinks: [
      { text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" },
      { text: "¿Qué hacer si te citan a interrogatorio?", url: "/centro-juridico/que-hacer-me-citaron-interrogatorio-fiscalia" },
      { text: "Sede de AMF en Medellín (Bajo Agendamiento)", url: "/medellin" }
    ]
  },
  {
    slug: "que-hacer-allanamiento-registro-fiscalia-cti",
    category: "penal",
    categoryLabel: "Defensa Penal 24/7",
    title: "¿Qué hacer ante un allanamiento o registro de la Fiscalía o CTI en tu casa o empresa?",
    metaTitle: "¿Qué hacer ante un allanamiento de la Fiscalía o CTI? | AMF Legal",
    metaDescription: "Guía procesal ante un registro y allanamiento en Colombia: derechos del morador, orden judicial previa, qué verificar en el acta y qué evitar de inmediato.",
    readTime: "7 min de lectura",
    publishDate: "2026-09-10",
    updateDate: "2026-09-16",
    author: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Especialista en Derecho Penal",
      slug: "jorge-florez",
      avatar: "/assets/Equipo fotos/Jorge Florez.png",
      credentials: "Ex funcionario judicial de la Rama Judicial en Santiago de Cali."
    },
    reviewer: {
      name: "Steven Alegrías Bolaños",
      role: "Abogado Litigante",
      slug: "steven-alegrias",
      credentials: "Especialista en derecho administrativo y sancionatorio."
    },
    quickAnswer: "Si servidores de la Fiscalía, CTI o policía judicial se presentan para allanar tu domicilio o empresa, mantén la serenidad y exige de inmediato la exhibición de la orden escrita expedida por el fiscal (Art. 219 CPP). Verifica que la dirección y la fecha sean exactas (vigencia máxima de 30 días). Tienes derecho a que un testigo presencie toda la diligencia, a comunicarte con tu abogado penalista de confianza y a no firmar el acta de incautación si no refleja con fidelidad lo ocurrido.",
    example: "A las 5:30 AM agentes armados del CTI realizan un operativo en un inmueble familiar. En medio de la zozobra y la confusión, ingresan a todas las habitaciones, incautan computadores personales, dinero en efectivo y documentación de familiares que nada tienen que ver con el indiciado. Los moradores, intimidados, firman el acta de incautación sin verificar si los números de serie o montos están correctamente relacionados.",
    legalExplanation: `
      El derecho a la inviolabilidad del domicilio (Art. 28 de la Constitución) solo puede ser restringido bajo estrictas garantías de la Ley 906 de 2004:
      
      1. **Requisitos de la Orden de Registro y Allanamiento (Art. 221 y 222 CPP):** Debe estar fundamentada en motivos razonablemente fundados, especificar con claridad el lugar que se allanará, el objetivo de la búsqueda y la fecha de expedición.
      2. **Horario de los Allanamientos (Art. 225 CPP):** Por regla general deben practicarse entre las 6:00 AM y las 6:00 PM, salvo que por la naturaleza del hecho o motivos fundados se requiera ingresar en horario nocturno con expresa autorización del fiscal.
      3. **Acta de la Diligencia (Art. 228 CPP):** Es un documento fundamental donde se consigna la hora de inicio y término, la relación exhaustiva de bienes incautados con su rotulado de cadena de custodia, y las observaciones que el morador desee dejar por escrito.
      4. **Control Posterior de Legalidad ante el Juez (Art. 237 CPP):** Dentro de las 36 horas siguientes al allanamiento, la Fiscalía debe presentar la diligencia y la evidencia ante un Juez de Control de Garantías. Si hubo excesos, vulneración de derechos o allanamiento fuera de los límites de la orden, el juez declarará la ilegalidad y la evidencia no podrá usarse en el proceso.
    `,
    checklist: {
      dos: [
        "Solicitar ver y leer la orden de allanamiento antes de permitir el ingreso forzado.",
        "Verificar que la dirección coincida al milímetro con tu inmueble (carrera, calle, número de casa/apartamento).",
        "Llamar inmediatamente a tu abogado penalista para que se desplace al lugar o preste asistencia telefónica.",
        "Designar a una persona de confianza como testigo para acompañar el registro habitación por habitación.",
        "Exigir copia legible del acta final y constatar que cada bien incautado tenga descripción y número de serie exactos."
      ],
      donts: [
        "Nunca utilices la fuerza física ni obstruyas materialmente la labor de los funcionarios judiciales.",
        "No rindas declaraciones, confesiones ni explicaciones espontáneas sobre la procedencia de los bienes durante el registro.",
        "No permitas que registren inmuebles o dependencias no autorizadas en la orden judicial escrita.",
        "No firmes el acta si tiene tachones, espacios en blanco o bienes que no fueron encontrados en el lugar."
      ]
    },
    faqs: [
      {
        question: "¿La policía puede allanar una casa sin orden de un fiscal?",
        answer: "Solo en situaciones muy excepcionales consagradas en el Art. 230 del CPP: mediando consentimiento expreso del morador, en flagrancia cuando el autor es perseguido y se refugia en el inmueble, o en situaciones de imperiosa necesidad para evitar la consumación de un delito grave."
      },
      {
        question: "¿Puedo recuperar los bienes incautados que no tienen que ver con el delito?",
        answer: "Sí. A través de tu abogado defensor se puede solicitar la devolución de elementos materiales probatorios ante el fiscal o en audiencia innominada ante el juez de control de garantías si se acredita que eres un tercero de buena fe."
      }
    ],
    cta: {
      badge: "Asistencia Inmediata en Allanamientos",
      title: "¿Allanamientos o incautaciones en curso?",
      text: "Cada irregularidad en la diligencia puede traducirse en la nulidad de las pruebas en la audiencia de control de 36 horas. Contacta a un penalista de guardia en AMF.",
      buttonText: "Atención Urgente por Allanamiento",
      waMessage: "Hola, miembros de la policía judicial están realizando o acaban de realizar un allanamiento en mi propiedad y necesito asistencia penal urgente."
    },
    internalLinks: [
      { text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" },
      { text: "¿Qué hacer en las primeras 36 horas de captura?", url: "/centro-juridico/que-hacer-captura-familiar-colombia-primeras-36-horas" },
      { text: "Atención penal de urgencias en Bogotá", url: "/bogota" }
    ]
  },
  {
    slug: "como-evitar-carcel-medida-aseguramiento-audiencia-imputacion",
    category: "penal",
    categoryLabel: "Defensa Penal 24/7",
    title: "¿Cómo evitar la cárcel en una audiencia de medida de aseguramiento en Colombia? Claves del arraigo y fines constitucionales",
    metaTitle: "¿Cómo evitar la cárcel en audiencia de medida de aseguramiento? | AMF Legal",
    metaDescription: "Estrategia jurídica para evitar la detención preventiva carcelaria en Colombia: fines constitucionales (Art. 308 CPP), carpeta de arraigo y medidas no privativas.",
    readTime: "7 min de lectura",
    publishDate: "2026-09-12",
    updateDate: "2026-09-16",
    author: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Especialista en Derecho Penal",
      slug: "jorge-florez",
      avatar: "/assets/Equipo fotos/Jorge Florez.png",
      credentials: "Ex funcionario judicial de la Rama Judicial en Juzgados Penales Municipales de Control de Garantías y Circuito en Cali."
    },
    reviewer: {
      name: "Esteban Ávila Meneses",
      role: "Socio Fundador – Especialista en Derecho Procesal Penal",
      slug: "esteban-avila",
      credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia."
    },
    quickAnswer: "Para evitar una medida de aseguramiento privativa de la libertad en establecimiento carcelario en Colombia, la defensa técnica debe desvirtuar los tres fines constitucionales del Artículo 308 de la Ley 906 de 2004: peligro para la comunidad, riesgo de obstrucción a la justicia y peligro de fuga. La clave determinante no es discutir la inocencia final del indiciado, sino aportar una carpeta de arraigo sólida (familiar, laboral y patrimonial) que demuestre que el procesado comparecerá a juicio sin necesidad de encierro preventivo.",
    example: "Un profesional es imputado por presunta estafa agravada o lesiones. La Fiscalía pide medida de aseguramiento en centro carcelario alegando la gravedad de la pena y peligro para la sociedad. Si la defensa acude sin documentos, el juez ordenará la cárcel. En cambio, si la defensa aporta certificado laboral vigente, escrituras públicas del domicilio, registros de nacimiento de hijos menores dependientes y antecedentes policiales y judiciales limpios, el juez desestima el encierro intramural y decreta libertad con presentaciones periódicas o, en su defecto, detención domiciliaria.",
    legalExplanation: `
      En la audiencia preliminar de solicitud de medida de aseguramiento no se decide si la persona es culpable o inocente (lo cual corresponde al juicio oral), sino si es estrictamente necesario privarla de su libertad mientras dura el proceso:

      1. **Los Tres Fines Constitucionales Exclusivos (Art. 308 del Código de Procedimiento Penal):**
         - Que la medida sea necesaria para evitar la obstrucción de la justicia (destrucción de pruebas o intimidación a testigos).
         - Que el imputado constituya un peligro para la seguridad de la sociedad o de la víctima (Art. 310 CPP).
         - Que resulte probable que el imputado no comparecerá al proceso o no cumplirá la sentencia (Art. 312 CPP).
      2. **Principio de Necesidad, Proporcionalidad y Razonabilidad (Art. 308 y Corte Constitucional C-469 de 2016):** La privación carcelaria es excepcionalísima. El fiscal debe demostrar por qué ninguna de las medidas no privativas (Art. 307 literal B) es suficiente para garantizar los fines del proceso.
      3. **La Fuerza Decisiva de la Carpeta de Arraigo:** La defensa debe presentar pruebas idóneas sobre:
         - **Arraigo Familiar:** Cédulas, registros de matrimonio o unión marital, registros civiles de nacimiento de hijos menores, padres de la tercera edad a cargo o condición de madre/padre cabeza de familia (Art. 314 CPP).
         - **Arraigo Laboral y Económico:** Contrato de trabajo vigente, desprendibles de pago, extractos bancarios, afiliación a seguridad social, RUT o cámara de comercio de su actividad independiente.
         - **Arraigo Domiciliario:** Certificado de tradición y libertad del inmueble, contrato de arrendamiento autenticado y recibos de servicios públicos domiciliarios recientes.
      4. **Medidas Sustitutivas y No Privativas (Art. 307 CPP):** Si el juez considera que existe algún riesgo mínimo, la defensa debe plantear subsidiariamente detención domiciliaria con brazalete electrónico, prohibición de salir del país o presentaciones periódicas quincenales, salvando al imputado del ingreso a una prisión.
    `,
    checklist: {
      dos: [
        "Reunir contra reloj toda la documentación de arraigo familiar, habitacional y laboral antes de la audiencia.",
        "Acreditar ausencia total de antecedentes penales o policivos vigentes.",
        "Presentar informes médicos o historia clínica si el imputado padece enfermedades crónicas graves o incompatibles con la reclusión.",
        "Solicitar de manera subsidiaria medidas no privativas de la libertad o prisión domiciliaria.",
        "Verificar que la Fiscalía demuestre con evidencias reales la urgencia de la medida y no con simples inferencias retóricas."
      ],
      donts: [
        "No desgastar la audiencia discutiendo el fondo del caso como si fuera el juicio oral definitivo.",
        "No interrumpir al fiscal ni al juez con reclamos personales sin coordinar con el abogado defensor.",
        "No allanarse a cargos a ciegas pensando que automáticamente le darán detención domiciliaria.",
        "No comparecer a la audiencia sin una carpeta física y digital organizada de soportes probatorios de arraigo."
      ]
    },
    faqs: [
      {
        question: "¿Qué es la detención domiciliaria y quiénes aplican en Colombia?",
        answer: "Es una medida sustitutiva a la prisión carcelaria (Art. 314 CPP) que se concede cuando la persona es mayor de 65 años, madre cabeza de familia con hijos menores o discapacitados a cargo, persona con enfermedad muy grave médicamente certificada, o cuando el juez considera que la privación en su hogar basta para proteger el proceso."
      },
      {
        question: "¿Cuánto tiempo puede durar una persona con medida de aseguramiento sin ir a juicio?",
        answer: "La Ley 1786 de 2016 establece que la detención preventiva carcelaria no puede exceder de un (1) año (prorrogable hasta por otro año en delitos de competencia de jueces de circuito especializado o más de tres procesados). Si transcurre ese plazo sin instalarse el juicio oral, procede la libertad inmediata por vencimiento de términos (Art. 317 CPP)."
      },
      {
        question: "¿Se puede apelar la orden de encarcelamiento del juez de garantías?",
        answer: "Sí. Contra la decisión que impone o niega la medida de aseguramiento procede el recurso de reposición y en subsidio apelación en el efecto devolutivo. El juez de segunda instancia (Juez Penal del Circuito) revisará la legalidad y necesidad de la medida."
      }
    ],
    cta: {
      badge: "Audiencia de Medida Inminente",
      title: "¿Tienes audiencia de medida de aseguramiento programada?",
      text: "Unas horas antes de la audiencia definen tu destino carcelario. Nuestro equipo estructura de inmediato tu carpeta de arraigo para mantener tu libertad.",
      buttonText: "Estructurar mi Defensa ante Medida",
      waMessage: "Hola, tengo audiencia de medida de aseguramiento programada y necesito estructurar urgentemente mi carpeta de arraigo para evitar la cárcel."
    },
    internalLinks: [
      { text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" },
      { text: "Guía de las Primeras 36 Horas de Captura", url: "/centro-juridico/que-hacer-captura-familiar-colombia-primeras-36-horas" },
      { text: "Atención penal de urgencia en Bogotá", url: "/bogota" },
      { text: "Atención penal de urgencia en Cali", url: "/cali" }
    ]
  },
  {
    slug: "falsa-denuncia-violencia-intrafamiliar-defensa-colombia",
    category: "penal",
    categoryLabel: "Defensa Penal 24/7",
    title: "Falsa denuncia por violencia intrafamiliar o delitos sexuales en Colombia: ¿Cómo defenderte y probar tu inocencia?",
    metaTitle: "Falsa denuncia de violencia intrafamiliar o delitos sexuales | AMF Legal",
    metaDescription: "Cómo defenderte ante una falsa acusación de violencia intrafamiliar (Art. 229 CP) o delitos sexuales en Colombia. Custodia de pruebas, Comisaría y Fiscalía.",
    readTime: "8 min de lectura",
    publishDate: "2026-09-13",
    updateDate: "2026-09-16",
    author: {
      name: "Esteban Ávila Meneses",
      role: "Socio Fundador – Especialista en Derecho Procesal Penal",
      slug: "esteban-avila",
      avatar: "/assets/Equipo fotos/Esteban Avila.png",
      credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia."
    },
    reviewer: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Litigante",
      slug: "jorge-florez",
      credentials: "Ex funcionario judicial de la Rama Judicial en Santiago de Cali."
    },
    quickAnswer: "Una falsa denuncia por violencia intrafamiliar (Art. 229 Código Penal) o delitos sexuales en Colombia no debe tomarse a la ligera: son delitos de oficio no desistibles que conllevan medidas cautelares inmediatas de desalojo y riesgo de captura. Para probar tu inocencia debes preservar de inmediato la evidencia digital (chats completos de WhatsApp, audios, correos, geolocalizaciones GPS), solicitar peritajes psicológicos forenses de credibilidad del testimonio y radicar memorial ante el fiscal solicitando la preclusión de la investigación por atipicidad o denuncia fraudulenta.",
    example: "En medio de una disputa por custodia de hijos menores y partición de bienes, una expareja radica denuncia penal en la Fiscalía e interpone medida de protección en Comisaría de Familia, inventando maltratos físicos y psicológicos. Si el indiciado reacciona con mensajes de reclamo o borra chats por disgusto, la fiscalía usará esos mensajes en su contra. Con asesoría de AMF, se realiza extracción forense y cotejo notarial de los chats donde la expareja lo extorsionaba textualmente con 'meterlo preso si no le cedía la propiedad', demostrando el móvil espurio y logrando el archivo del proceso penal.",
    legalExplanation: `
      En el ordenamiento jurídico colombiano, los delitos contra la armonía familiar y la integridad sexual tienen particularidades probatorias que deben ser abordadas con técnica rigurosa:

      1. **Naturaleza Oficiosa y No Conciliable (Art. 229 Código Penal y Ley 1959 de 2019):** La violencia intrafamiliar no admite conciliación ni desistimiento de la denunciante. Aunque la pareja decida arreglar sus diferencias y solicitar el cierre del caso, la Fiscalía está obligada por ley a continuar la acción penal hasta una sentencia o preclusión judicial.
      2. **Comisaría de Familia vs. Fiscalía General de la Nación:**
         - **Comisaría de Familia (Ley 2126 de 2021):** Proceso administrativo donde se emiten órdenes de alejamiento, desalojo del hogar conyugal y fijación provisional de alimentos.
         - **Fiscalía Penal (Ley 906 de 2004):** Proceso penal que busca sanción con penas de 4 a 8 años de prisión (aumentada de 6 a 14 si recae sobre menores o mujeres).
      3. **La Prueba Digital y su Cadena de Custodia (Arts. 275 y 277 CPP):** Capturas de pantalla simples pueden ser fácilmente tachadas de falsas en audiencia. Se requiere peritaje informático forense que certifique el código hash, los metadatos de hora y número de teléfono, acreditando que las conversaciones no fueron editadas ni descontextualizadas.
      4. **El Delito de Falsa Denuncia (Art. 435 del Código Penal):** Quien bajo juramento denuncie ante la autoridad una conducta punible que no ha cometido o simule pruebas contra otra persona, incurre en delito con pena de prisión de 1 a 2 años (o de 4 a 8 años si se imputa un delito grave). Esto habilita la contrademanda penal una vez desvirtuada la acusación falsa.
    `,
    checklist: {
      dos: [
        "Hacer una copia de seguridad y peritaje forense inmediato de todos los chats de WhatsApp, audios, correos y fotos.",
        "Obtener registros de geolocalización GPS y testimonios de terceros que demuestren que no estabas en el lugar de los supuestos hechos.",
        "Contratar un perito en psicología forense para realizar evaluación de credibilidad y afectación psicológica mutua.",
        "Comparecer asistido por tu abogado defensor a la audiencia en Comisaría de Familia y radicar memorial ante el fiscal del caso.",
        "Mantener estricto distanciamiento físico y de comunicación con la persona denunciante."
      ],
      donts: [
        "NUNCA enviar audios, textos o hacer llamadas de reclamo o súplica a la persona denunciante.",
        "NUNCA acudir al domicilio del cual se dictó medida de protección de desalojo; incurrirías en el delito de Fraude a Resolución Judicial (Art. 454 CP).",
        "NO borrar conversaciones ni historial de llamadas, incluso si contienen discusiones fuertes.",
        "NO confiar en que 'la verdad saldrá a la luz sola' sin aportar elementos materiales probatorios al fiscal."
      ]
    },
    faqs: [
      {
        question: "¿Me pueden desalojar de mi propia casa por una denuncia falsa?",
        answer: "Sí. Las Comisarías de Familia y los Jueces de Control de Garantías pueden emitir medidas de protección inmediatas que ordenan el desalojo del indiciado, independientemente de que sea el único dueño del inmueble, con el fin preventivo de salvaguardar a los miembros del grupo familiar mientras se esclarece el proceso."
      },
      {
        question: "¿Si la denunciante retira la denuncia o pide perdón, se acaba el proceso penal?",
        answer: "No. En Colombia la violencia intrafamiliar es un delito investigable de oficio y no es desistible. La Fiscalía mantiene la acción penal a menos que la defensa técnica demuestre atipicidad de la conducta, inexistencia del hecho o causal de preclusión ante el Juez de Conocimiento."
      },
      {
        question: "¿Puedo contrademandar penalmente a la persona que me denunció falsamente?",
        answer: "Sí. Una vez archivada la investigación o precluida a tu favor demostrando que los hechos nunca ocurrieron, se puede interponer denuncia penal por Falsa Denuncia contra Persona Determinada (Art. 436 CP) e iniciar demanda civil de responsabilidad extracontractual para el resarcimiento de los daños morales y económicos ocasionados."
      }
    ],
    cta: {
      badge: "Defensa Técnica ante Falsas Acusaciones",
      title: "¿Enfrentas una denuncia injusta por violencia intrafamiliar?",
      text: "Una acusación sin fundamento puede quitarte tu patrimonio, la custodia de tus hijos y tu libertad. Intervenimos técnicamente para demostrar la verdad probatoria.",
      buttonText: "Blindar mi Caso por Falsa Denuncia",
      waMessage: "Hola, estoy enfrentando una denuncia de violencia intrafamiliar / delito sexual que considero falsa y necesito defensa penal estratégica urgente."
    },
    internalLinks: [
      { text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" },
      { text: "¿Qué hacer si te citan a interrogatorio en Fiscalía?", url: "/centro-juridico/que-hacer-me-citaron-interrogatorio-fiscalia" },
      { text: "¿Apareces en un video donde ocurre un delito?", url: "/centro-juridico/que-pasa-si-aparezco-en-video-donde-ocurre-delito" },
      { text: "Atención penal presencial en Medellín", url: "/medellin" }
    ]
  },
  {
    slug: "como-constituirse-victima-proceso-penal-reparacion-economica",
    category: "penal",
    categoryLabel: "Defensa Penal 24/7",
    title: "¿Cómo constituirse como víctima en un proceso penal en Colombia y lograr la reparación económica?",
    metaTitle: "Constituirse como víctima en proceso penal y reparación | AMF Legal",
    metaDescription: "Guía jurídica para víctimas en Colombia: reconocimiento formal, medidas cautelares sobre bienes del procesado e Incidente de Reparación Integral (Ley 906).",
    readTime: "7 min de lectura",
    publishDate: "2026-09-14",
    updateDate: "2026-09-16",
    author: {
      name: "Esteban Ávila Meneses",
      role: "Socio Fundador – Especialista en Derecho Procesal Penal",
      slug: "esteban-avila",
      avatar: "/assets/Equipo fotos/Esteban Avila.png",
      credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia."
    },
    reviewer: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Especialista en Derecho Penal",
      slug: "jorge-florez",
      avatar: "/assets/Equipo fotos/Jorge Florez.png",
      credentials: "Ex funcionario judicial de la Rama Judicial en Santiago de Cali."
    },
    quickAnswer: "Para tener voz efectiva y lograr indemnización económica en un proceso penal en Colombia, la víctima debe solicitar su reconocimiento formal ante el juez mediante un abogado penalista particular (Arts. 132 a 137 CPP). La Fiscalía representa la acción punitiva del Estado, pero no siempre prioriza la restitución económica ni el embargo de bienes del victimario. Un apoderado de víctimas puede solicitar medidas cautelares patrimoniales (embargo y secuestro de vehículos, inmuebles y cuentas) e iniciar el Incidente de Reparación Integral una vez se emita fallo condenatorio.",
    example: "Una víctima de estafa millonaria o accidente de tránsito con lesiones graves radica la denuncia y espera pasivamente. Pasan dos años y el fiscal archiva preliminarmente por falta de gestión probatoria o el victimario traspasa todos sus bienes a terceros para declararse insolvente. Al contar con un apoderado de víctimas desde la formulación de imputación, se solicitaron medidas cautelares sobre las propiedades del investigado y se aportó un peritaje contable independiente, asegurando el pago integral de perjuicios materiales y morales.",
    legalExplanation: `
      En el sistema penal acusatorio colombiano (Ley 906 de 2004), la víctima no es un simple testigo o espectador:
      
      1. **Reconocimiento Formal de la Víctima (Art. 132 a 137 CPP):** La Corte Constitucional (Sentencia C-209 de 2007 y C-454 de 2006) reconoció a las víctimas el derecho de intervenir activamente en todas las audiencias preliminares y de juicio oral a través de su abogado de confianza, con facultades para oponerse a preacuerdos desventajosos, solicitar pruebas suplementarias e impugnar decisiones.
      2. **Medidas Cautelares Reales para Proteger el Patrimonio (Art. 92 del CPP):** Para evitar que el imputado oculte sus bienes durante el proceso, el apoderado de víctimas puede solicitar ante el Juez de Control de Garantías el embargo y secuestro preventivo de bienes muebles, inmuebles, acciones y cuentas bancarias del investigado dentro de los 60 días siguientes a la imputación.
      3. **El Incidente de Reparación Integral (Arts. 102 a 108 CPP):** Una vez emitido el sentido del fallo condenatorio, la víctima tiene 30 días para promover el incidente ante el mismo juez penal, tasando pericialmente:
         - **Daño Emergente:** Gastos médicos, reparaciones, pérdidas financieras directas.
         - **Lucro Cesante:** Ganancias y salarios dejados de percibir por la víctima presente y a futuro.
         - **Daño Moral:** Afectación emocional y al buen nombre tasada en salarios mínimos.
    `,
    checklist: {
      dos: [
        "Otorgar poder especial a un abogado penalista con experiencia en representación de víctimas.",
        "Solicitar el reconocimiento formal de víctima desde la primera audiencia preliminar ante el juez.",
        "Estructurar un dossier de pruebas periciales de daños económicos antes de que venza el término de medidas cautelares.",
        "Pedir el embargo y secuestro de bienes del imputado para garantizar que existan recursos al momento del fallo.",
        "Monitorear de cerca los términos para oponerse a preacuerdos perjudiciales o archivos arbitrarios."
      ],
      donts: [
        "No esperar a que la Fiscalía General resuelva sola la recuperación de tu dinero; su prioridad legal es la sanción penal, no la cobranza patrimonial.",
        "No aceptar acuerdos informales de pago verbales sin garantías hipotecarias o títulos ejecutivos reconocidos judicialmente.",
        "No dejar pasar los 30 días posteriores al sentido del fallo condenatorio para radicar el Incidente de Reparación Integral.",
        "No permitir que el investigado transfiera sus bienes a familiares sin denunciar alzamiento de bienes (Art. 253 CP)."
      ]
    },
    faqs: [
      {
        question: "¿La Fiscalía me cobra honorarios por representarme como víctima?",
        answer: "No. El Fiscal es un servidor público y su servicio no tiene costo, pero la Fiscalía representa el interés punitivo del Estado. Para solicitar medidas cautelares patrimoniales, presentar pruebas independientes y liquidar el incidente de reparación económica, es determinante contratar un apoderado penal de víctimas particular."
      },
      {
        question: "¿Qué pasa si el delincuente no tiene bienes a su nombre?",
        answer: "La defensa de víctimas rastrea patrimonios mediante cruce en Cámara de Comercio, Catastro, RUNT, centrales de riesgo y notarías. Si se demuestra que traspasó propiedades fraudulentamente tras cometer el delito, se puede revocar el traspaso por vía penal y civil (acción pauliana)."
      },
      {
        question: "¿Puedo oponerme si la Fiscalía negocia un preacuerdo con rebaja excesiva de pena?",
        answer: "Sí. La ley exige que en delitos con beneficio patrimonial (estafa, hurto, apropiación) el procesado debe reintegrar al menos el 50% de lo apropiado y asegurar el remanente para que el juez apruebe el preacuerdo. El apoderado de víctimas puede oponerse ante el juez de conocimiento si no se garantiza la reparación mínima."
      }
    ],
    cta: {
      badge: "Representación Judicial de Víctimas",
      title: "¿Fuiste víctima de un delito y buscas justicia y restitución económica?",
      text: "No permitas que tu caso quede en el olvido ni que el agresor oculte su patrimonio. Ejercemos la representación penal más combativa para asegurar tu reparación.",
      buttonText: "Representar mis Derechos como Víctima",
      waMessage: "Hola, soy víctima de un delito y requiero representación judicial activa con AMF Firma Legal para lograr justicia y reparación económica."
    },
    internalLinks: [
      { text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" },
      { text: "Servicios en Bulevar Tequendama Bogotá", url: "/bogota" },
      { text: "Servicios en Calle 5 Cali", url: "/cali" },
      { text: "Conoce al equipo de litigantes AMF", url: "/equipo" }
    ]
  },
  {
    slug: "demanda-retiro-discrecional-policia-nacional-reintegro",
    category: "fuerza-publica",
    categoryLabel: "Fuerza Pública",
    title: "Retiro por facultad discrecional en la Policía Nacional: ¿Cómo demandar el reintegro y pago de salarios caídos?",
    metaTitle: "Demanda por retiro discrecional Policía Nacional: Reintegro | AMF Legal",
    metaDescription: "Cómo demandar el retiro por llamamiento a calificar servicios o voluntad del Gobierno en Policía Nacional. Caducidad de 4 meses, CPACA y reintegro retroactivo.",
    readTime: "8 min de lectura",
    publishDate: "2026-09-14",
    updateDate: "2026-09-16",
    author: {
      name: "Steven Alegrías Bolaños",
      role: "Abogado Especialista en Derecho Administrativo y Disciplinario",
      slug: "steven-alegrias",
      avatar: "/assets/Equipo fotos/Steven Alegrias.png",
      credentials: "Especialista de la Universidad del Cauca con amplia trayectoria en asesoría institucional y derecho sancionatorio público."
    },
    reviewer: {
      name: "Jorge Ernesto Flórez Martínez",
      role: "Socio Fundador – Litigante",
      slug: "jorge-florez",
      credentials: "Sólida experiencia en litigio contencioso administrativo y disciplinario."
    },
    quickAnswer: "El retiro por facultad discrecional o por voluntad del Gobierno Nacional (Decreto Ley 1791 de 2000) no es un cheque en blanco de arbitrariedad institucional. Según el Consejo de Estado y la Corte Constitucional, la decisión debe obedecer a razones objetivas del servicio y contar con recomendación previa motivada de la Junta de Evaluación y Clasificación. Tienes un plazo perentorio de cuatro (4) meses desde la notificación del decreto o resolución para interponer el medio de control de Nulidad y Restablecimiento del Derecho (Ley 1437 CPACA) y solicitar el reintegro al cargo junto con el pago indexado de todos los salarios y prestaciones dejadas de percibir.",
    example: "Un oficial o suboficial de la Policía Nacional con hoja de vida intachable, excelentes calificaciones de desempeño y sin sanciones disciplinarias ejecutoriadas, es retirado sorpresivamente 'por voluntad del Gobierno'. Acude a AMF Firma Legal dentro de los primeros 60 días. Se radica solicitud de conciliación prejudicial ante la Procuraduría para suspender términos y se demanda ante el Tribunal Administrativo demostrando desviación de poder y falta de motivación técnica, logrando sentencia favorable de reintegro en el escalafón y reconocimiento retroactivo de sueldos.",
    legalExplanation: `
      La potestad discrecional del mando institucional en la Policía Nacional y Fuerzas Militares está sujeta a límites constitucionales estrictos:

      1. **Facultad Discrecional vs. Arbitrariedad (Decreto Ley 1791 de 2000, Art. 62):** Aunque la norma autoriza el retiro por voluntad del Gobierno para oficiales y del Director General para el nivel ejecutivo y suboficiales, la jurisprudencia unificada del Consejo de Estado (Sección Segunda) y la Corte Constitucional (Sentencia SU-053 de 2015) exige que el acto no responda al capricho o persecución personal, sino al mejoramiento indiscutible del servicio público policial.
      2. **Término Fatal de Caducidad de 4 Meses (Art. 164 del CPACA - Ley 1437 de 2011):** El medio de control de Nulidad y Restablecimiento del Derecho caduca inexorablemente a los cuatro (4) meses siguientes a la notificación del acto de retiro. Para interrumpir este término, es obligatorio radicar la solicitud de Conciliación Prejudicial en lo Contencioso Administrativo ante la Procuraduría General de la Nación.
      3. **Causales Frecuentes de Nulidad del Acto:**
         - **Falsa Motivación o Desviación de Poder:** Si el uniformado tenía un historial de felicitaciones y evaluaciones sobresalientes, el Estado no puede justificar abstractamente que el retiro era 'por necesidades del servicio'.
         - **Vicios en el Acta de la Junta de Evaluación:** Falta de análisis individualizado en las actas reservadas del comité clasificador.
      4. **Efectos del Fallo Favorable:** Declarada la nulidad, la Nación - Ministerio de Defensa - Policía Nacional es condenada al reintegro inmediato en el grado correspondiente, al pago indexado de todas las asignaciones salariales, primas, cesantías y cómputo del tiempo para efectos de asignación de retiro o pensión (sin solución de continuidad).
    `,
    checklist: {
      dos: [
        "Solicitar de inmediato copia íntegra del folio de vida, hoja de servicios, felicitaciones y calificaciones de desempeño.",
        "Pedir formalmente copia del acta reservada de la Junta de Evaluación y Clasificación que recomendó el retiro.",
        "Contactar a un abogado especialista en derecho administrativo de la Fuerza Pública de inmediato tras la notificación.",
        "Radicar la solicitud de conciliación prejudicial ante la Procuraduría antes del vencimiento del tercer mes.",
        "Acreditar la afectación moral y económica causada a tu núcleo familiar para la liquidación de perjuicios."
      ],
      donts: [
        "NUNCA dejar pasar los 4 meses pensando que con un derecho de petición o reclamo interno te van a reintegrar.",
        "NO aceptar asesorías de tramitadores no abogados que prometen 'favores políticos' para reintegrarte al servicio.",
        "NO dejar de cotizar en el sistema de seguridad social mientras se define el trámite judicial contencioso.",
        "NO destruir constancias de notificación ni desprendibles de pago de los últimos años de servicio activo."
      ]
    },
    faqs: [
      {
        question: "¿Si me reintegran, me pagan los sueldos del tiempo que estuve retirado?",
        answer: "Sí. La sentencia de nulidad y restablecimiento del derecho ordena pagar todas las sumas que legalmente hubieras percibido desde la fecha de desvinculación hasta la fecha efectiva del reintegro, con indexación conforme al IPC y sin deducción de lo que hayas ganado en el sector privado durante ese tiempo (jurisprudencia unificada del Consejo de Estado)."
      },
      {
        question: "¿Qué pasa si ya cumplí el tiempo para la asignación de retiro de CASUR o CREMIL?",
        answer: "El tiempo transcurrido durante el retiro injustificado se computa como tiempo de servicio activo para efectos del porcentaje de la asignación de retiro, lo que incrementa sustancialmente el monto mensual de tu pensión definitiva."
      },
      {
        question: "¿Puedo pedir una medida cautelar de reintegro provisional mientras dura el juicio?",
        answer: "Sí. El CPACA (Ley 1437) permite solicitar la suspensión provisional de los efectos del acto administrativo o una medida cautelar innominada si se evidencia una manifiesta infracción legal que amenace la subsistencia digna del uniformado y su familia."
      }
    ],
    cta: {
      badge: "Defensa de Carrera y Nulidad Administrativa",
      title: "¿Fuiste retirado de la Policía Nacional de manera injusta o discrecional?",
      text: "Tienes solo 4 meses para demandar tu reintegro y recuperar tu carrera con sueldos caídos. Evaluamos la viabilidad jurídica de tu expediente de inmediato.",
      buttonText: "Demandar mi Reintegro Policial",
      waMessage: "Hola, fui retirado de la Policía Nacional por facultad discrecional y deseo evaluar de inmediato la demanda de nulidad y restablecimiento del derecho con AMF."
    },
    internalLinks: [
      { text: "Suscripción Jurídica para Fuerza Pública", url: "/suscripcion-juridica-fuerza-publica" },
      { text: "Investigaciones Disciplinarias Ley 2196", url: "/centro-juridico/investigacion-disciplinaria-policia-nacional-ley-2196" },
      { text: "Planes Escudo, Fortaleza y Bastión", url: "/planes" }
    ]
  },
  {
    slug: "responsabilidad-penal-representantes-legales-administradores-colombia",
    category: "compliance",
    categoryLabel: "Compliance & Penal Corporativo",
    title: "Responsabilidad penal de representantes legales y administradores en Colombia: ¿Cuándo respondes por delitos de la empresa o contrapartes?",
    metaTitle: "Responsabilidad penal de administradores y directivos en Colombia | AMF Legal",
    metaDescription: "¿Cuándo responde penalmente un gerente o miembro de junta en Colombia? Posición de garante, SAGRILAFT, delitos tributarios, lavado y Ley 2195 de 2022.",
    readTime: "8 min de lectura",
    publishDate: "2026-09-15",
    updateDate: "2026-09-16",
    author: {
      name: "Juan Gregorio Minda Cerón",
      role: "Contador Público y Abogado – Especialista en Finanzas y Auditoría",
      slug: "juan-minda",
      avatar: "/assets/Equipo fotos/Juan Gregorio.png",
      credentials: "Especialista en Finanzas y Derecho Procesal Penal, integrando la visión contable, tributaria y penal en corporaciones."
    },
    reviewer: {
      name: "David Fernando Pechené Torres",
      role: "Abogado Especialista y Magíster",
      slug: "david-pechene",
      credentials: "Magíster en Contratación Estatal e Infraestructura Pública."
    },
    quickAnswer: "En Colombia, los representantes legales, gerentes y miembros de junta directiva responden penalmente a título personal cuando incurren en delitos cometidos en ejercicio de su cargo o por omisión de su posición de garante (Art. 25 y 29 Código Penal). Delitos como omisión de agente retenedor (Art. 402 CP), lavado de activos por no implementar controles debidos (Art. 323 y 325-A CP), fraude procesal o soborno (Ley 2195 de 2022) no pueden excusarse argumentando 'desconocimiento de las operaciones diarias'. La única defensa real es demostrar un compliance efectivo con matrices de riesgo actualizadas y debida diligencia de contrapartes.",
    example: "Una empresa constructora o comercializadora recibe facturas millonarias de proveedores que resultan ser empresas de papel vinculadas a lavado de activos o esquemas de evasión tributaria. La Fiscalía imputa concierto para delinquir y fraude tributario al representante legal. El directivo argumenta que el departamento contable manejaba esos pagos sin consultarle. Sin embargo, para la Fiscalía, la ausencia absoluta de manuales de debida diligencia y controles internos configura negligencia grave y dolo eventual, derivando en orden de captura preventiva y embargo de su patrimonio personal.",
    legalExplanation: `
      El Derecho Penal Económico moderno en Colombia no admite la ignorancia deliberada (Willful Blindness) como eximente de responsabilidad:

      1. **La Posición de Garante Empresarial (Art. 25 del Código Penal):** Quien asume la dirección y representación legal de una sociedad adquiere el deber jurídico de evitar la realización de conductas punibles en el seno de la actividad empresarial dentro de su ámbito de dominio. La inacción o desidia ante señales de alerta equivale penalmente a la comisión del delito.
      2. **Delitos de Mayor Incidencia en Administradores:**
         - **Omisión de Agente Retenedor o Recaudador (Art. 402 CP):** No consignar a la DIAN los dineros recaudados por IVA o retención en la fuente da prisión de 48 a 108 meses, no siendo eximente la falta de liquidez temporal de la empresa.
         - **Omisión de Control en LA/FT (Art. 325-A CP):** Quien estando obligado no implemente o eluda los controles del SAGRILAFT facilitando el lavado de activos.
         - **Administración Desleal y Corrupción Privada (Arts. 250A y 250B CP):** Beneficiar a terceros con contratos lesivos en perjuicio de los socios o de la empresa.
         - **Responsabilidad Administrativa Sancionatoria de Personas Jurídicas (Ley 2195 de 2022):** Multas de hasta 200.000 SMMLV, inhabilidad para contratar con el Estado y disolución de la sociedad.
      3. **El Compliance Penal como Causal Eximente o Atenuante:** Un Sistema Integral de Gestión de Riesgos efectivo (Circular Externa 100-000020 de 2026) demuestra que el administrador actuó con la diligencia de un buen hombre de negocios, rompiendo la imputación de dolo o culpa.
    `,
    checklist: {
      dos: [
        "Implementar y auditar anualmente el Sistema Integral de Autocontrol y Gestión de Riesgos (Circular 100-000020 de 2026).",
        "Efectuar debida diligencia reforzada de socios, clientes, proveedores y personas expuestas políticamente (PEPs).",
        "Establecer canales de denuncia interna y protocolos de reacción penal inmediata ante sospechas de fraude.",
        "Blindar las actas de Junta Directiva y Asamblea dejando constancia formal de desacuerdos u observaciones a operaciones dudosas.",
        "Priorizar el pago de obligaciones tributarias retenidas antes de distribuir utilidades o dividendos."
      ],
      donts: [
        "NUNCA aceptar ser representante legal suplente o 'de papel' en compañías donde no ejerces el control operativo real.",
        "NO firmar balances, declaraciones de renta o informes contables sin revisión previa y constancia del contador y revisor fiscal.",
        "NO ignorar las señales de alerta emitidas por el oficial de cumplimiento de la empresa.",
        "NO destruir documentación contable ni correos corporativos ante inspecciones de la DIAN, Supersociedades o CTI."
      ]
    },
    faqs: [
      {
        question: "¿Pueden embargar mis bienes personales por delitos cometidos por la empresa?",
        answer: "Sí. En el proceso penal, las medidas cautelares (embargo y secuestro de inmuebles, cuentas y vehículos) recaen directamente sobre el patrimonio personal del representante legal o administrador imputado para asegurar la futura indemnización de perjuicios del Estado o de las víctimas."
      },
      {
        question: "¿El representante legal suplente tiene la misma responsabilidad penal que el principal?",
        answer: "El representante legal suplente solo responde penalmente por los actos u omisiones cometidos durante los periodos en los cuales asumió de manera efectiva y material las funciones de representación por ausencia o encargo del titular."
      },
      {
        question: "¿Cómo protege una auditoría legal preventiva de AMF a los administradores?",
        answer: "AMF realiza diagnósticos de riesgos penales y tributarios, revisa contratos estratégicos, actualiza matrices de riesgo normativo y emite conceptos jurídicos vinculantes que amparan las decisiones de la gerencia bajo la regla del juicio empresarial (Business Judgment Rule)."
      }
    ],
    cta: {
      badge: "Protección Penal para Administradores",
      title: "¿Diriges una compañía y quieres blindar tu responsabilidad penal y civil?",
      text: "Las responsabilidades penales gerenciales no dan tregua. Diseñamos sistemas de prevención y defensa técnica ante investigaciones de la Fiscalía y Supersociedades.",
      buttonText: "Solicitar Diagnóstico Directivo",
      waMessage: "Hola, soy administrador / representante legal y requiero una asesoría para blindar la responsabilidad penal corporativa de mi gestión con AMF."
    },
    internalLinks: [
      { text: "Compliance & Penal Corporativo AMF", url: "/compliance-penal-corporativo" },
      { text: "Circular 100-000020 de 2026 Supersociedades", url: "/centro-juridico/circular-100-000020-supersociedades-nuevo-sistema-riesgos-sagrilaft-ptee" },
      { text: "Atención corporativa en Bogotá", url: "/bogota" },
      { text: "Atención corporativa en Medellín", url: "/medellin" }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // DERECHO PENAL – PROCESO PENAL Y PRUEBA
  // ─────────────────────────────────────────────────────────────
  {
    slug: "me-denunciaron-penalmente-no-me-llama-la-fiscalia",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "Me denunciaron penalmente, pero todavía no me llama la Fiscalía: ¿qué debo hacer?",
    metaTitle: "Me denunciaron penalmente y no me llama la Fiscalía: ¿qué hago? | AMF Legal",
    metaDescription: "Si te denunciaron penalmente pero aún no recibes citación de la Fiscalía, conviene verificar el estado del proceso y preservar evidencia desde ya. Guía AMF Legal.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", avatar: "/assets/Equipo fotos/Jorge Florez.png", credentials: "Ex funcionario judicial de la Rama Judicial en Juzgados Penales de Cali." },
    reviewer: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia." },
    quickAnswer: "Conviene verificar si existe actuación, su estado y la calidad en la que aparece la persona. También deben preservarse chats, documentos, videos y demás información relevante desde el primer momento, antes de que la Fiscalía se comunique.",
    example: "Una persona se entera por terceros de que su ex pareja la denunció por violencia intrafamiliar hace tres meses. No ha recibido citación alguna. Sin embargo, el proceso puede estar activo en el SPOA y su situación procesal ya puede estar definida. Actuar tarde puede costar la oportunidad de aportar pruebas favorables en la etapa de indagación.",
    legalExplanation: `El sistema penal acusatorio colombiano (Ley 906 de 2004) prevé una etapa de indagación previa que puede durar meses sin que el indiciado sea notificado formalmente:\n\n1. **Verificación del SPOA:** Mediante número de cédula o nombre, un abogado puede consultar si existe noticia criminal activa, el fiscal asignado y la etapa procesal.\n2. **Calidad procesal:** No es igual ser testigo, víctima o indiciado. La estrategia varía según la calidad asignada.\n3. **Preservación anticipada de pruebas:** Chats, correos, registros de ubicación, contratos, fotografías y videos deben asegurarse desde ya. La evidencia puede desaparecer o ser alterada con el tiempo.\n4. **Presentación voluntaria:** En algunos casos conviene presentarse ante el fiscal de conocimiento antes de recibir citación, lo que puede demostrar arraigo y buena fe.`,
    checklist: {
      dos: ["Consultar con un abogado si existe proceso activo en el SPOA.", "Preservar toda comunicación relevante sin alterarla.", "Documentar pruebas de arraigo y actividad laboral.", "Identificar testigos que puedan respaldar su versión."],
      donts: ["No contactar a quien denunció para reclamar o intentar convencerla.", "No eliminar conversaciones ni registros digitales.", "No esperar pasivamente la citación sin tomar medidas de defensa."]
    },
    faqs: [
      { question: "¿Cómo sé si la Fiscalía me tiene en la mira?", answer: "Un abogado puede consultar el Sistema Penal Oral Acusatorio (SPOA) con sus datos y verificar si existe noticia criminal activa, su estado y la calidad procesal asignada." },
      { question: "¿Puedo hacer algo antes de que me citen?", answer: "Sí. Puede preservar pruebas, identificar testigos, consultar el estado del proceso y preparar su defensa técnica antes de la primera diligencia." },
      { question: "¿Qué riesgo tiene no hacer nada?", answer: "El proceso puede avanzar sin su conocimiento. Si la Fiscalía decide imputar cargos, llegar sin defensa técnica preparada puede costar libertad y oportunidades procesales." }
    ],
    cta: { badge: "Defensa Penal Estratégica", title: "¿Te denunciaron y no sabes qué está pasando?", text: "Verificamos el estado del proceso, tu calidad procesal y diseñamos la estrategia de defensa desde el primer momento.", buttonText: "Consultar mi Situación Penal", waMessage: "Hola, me denunciaron penalmente pero no he recibido citación y quiero saber qué está pasando en el proceso." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "Centro Jurídico AMF", url: "/centro-juridico" }]
  },
  {
    slug: "me-llamo-la-fiscalia-tengo-que-ir-con-abogado",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "Me llamó la Fiscalía: ¿tengo que ir con abogado?",
    metaTitle: "Me llamó la Fiscalía: ¿debo ir con abogado? | AMF Legal",
    metaDescription: "Depende de la calidad de la citación. No es igual ser testigo que indiciado. Antes de declarar conviene conocer el objeto de la diligencia y los derechos aplicables.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", avatar: "/assets/Equipo fotos/Esteban Avila.png", credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia." },
    reviewer: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", credentials: "Ex funcionario judicial con amplia trayectoria en litigio penal." },
    quickAnswer: "Depende de la calidad de la citación. No es igual ser testigo que indiciado. Antes de asistir a cualquier diligencia, conviene conocer el objeto exacto de la misma y los derechos que aplican según su calidad procesal.",
    example: "Una persona recibe llamada del CTI citándola 'para rendir declaración'. Sin conocer su calidad —testigo o indiciado— acude sola y termina haciendo manifestaciones que el fiscal registra como indicios de responsabilidad.",
    legalExplanation: `La Ley 906 de 2004 distingue claramente entre diligencias según la calidad del citado:\n\n1. **Testigo vs. Indiciado:** El testigo puede ser citado a entrevista o declaración. El indiciado goza de derechos adicionales, entre ellos el derecho a no autoincriminarse y a contar con defensor.\n2. **Objeto de la diligencia:** Antes de asistir, es posible —y recomendable— que el abogado consulte con la Fiscalía el propósito exacto de la citación.\n3. **Presencia de defensor:** Si la persona es indiciada o puede llegar a serlo, la presencia de un abogado en la diligencia es indispensable para garantizar el debido proceso.`,
    checklist: {
      dos: ["Identificar si la citación es como testigo o como indiciado.", "Consultar con un abogado antes de acudir.", "Solicitar información sobre el objeto de la diligencia.", "Acudir acompañado de defensor técnico si existe cualquier duda."],
      donts: ["No acudir solo si sospecha que puede ser indiciado.", "No firmar actas sin haberlas leído con su abogado.", "No hacer declaraciones espontáneas antes de la diligencia."]
    },
    faqs: [
      { question: "¿Puedo pedir que me informen por qué me citan?", answer: "Sí. Su abogado puede contactar al fiscal de conocimiento para conocer el objeto de la diligencia antes de la fecha fijada." },
      { question: "¿Qué pasa si voy como testigo y terminan imputándome?", answer: "Si en el transcurso de la diligencia surge la calidad de indiciado, tiene derecho a suspender la actuación y solicitar un defensor antes de continuar." }
    ],
    cta: { badge: "Asesoría Previa a Diligencias", title: "¿Te citó la Fiscalía y no sabes por qué?", text: "Verificamos tu calidad procesal y te preparamos antes de cualquier diligencia para que no cometas errores que afecten tu defensa.", buttonText: "Preparar mi Asistencia a Fiscalía", waMessage: "Hola, me citó la Fiscalía y quiero saber si debo ir con abogado y cuál es mi calidad procesal." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "¿Qué hacer si me citaron a interrogatorio?", url: "/centro-juridico/que-hacer-me-citaron-interrogatorio-fiscalia" }]
  },
  {
    slug: "puedo-guardar-silencio-si-me-estan-investigando",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "¿Puedo guardar silencio si me están investigando?",
    metaTitle: "¿Puedo guardar silencio en una investigación penal en Colombia? | AMF Legal",
    metaDescription: "Sí. El derecho a no autoincriminarse es una garantía constitucional en Colombia. Guardar silencio no equivale a aceptar responsabilidad. Guía AMF Legal.",
    readTime: "4 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", avatar: "/assets/Equipo fotos/Jorge Florez.png", credentials: "Ex funcionario judicial de la Rama Judicial en Cali." },
    reviewer: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia." },
    quickAnswer: "Sí. El derecho a no autoincriminarse es una garantía constitucional (Art. 33 de la Constitución Política). Guardar silencio no equivale a aceptar responsabilidad y no puede utilizarse como indicio de culpabilidad en su contra.",
    example: "Una persona citada como indiciada decide declarar 'para aclarar las cosas' sin asesoría previa. Sus palabras, fuera de contexto, se convierten en el principal elemento de imputación. Ejercer el silencio habría protegido su posición procesal mientras el abogado preparaba la estrategia.",
    legalExplanation: `El artículo 33 de la Constitución Política y el artículo 282 del Código de Procedimiento Penal consagran el derecho al silencio:\n\n1. **Nadie puede ser obligado a declarar contra sí mismo:** Esta garantía aplica desde la primera diligencia hasta el juicio oral.\n2. **El silencio no es indicio de culpa:** La ley prohíbe expresamente que el ejercicio de este derecho sea presentado o interpretado como reconocimiento de responsabilidad.\n3. **Estrategia de defensa:** En muchos casos, guardar silencio mientras se recopila evidencia favorable es la decisión táctica más inteligente.`,
    checklist: {
      dos: ["Informar al fiscal que ejercerá su derecho a guardar silencio.", "Coordinar con su abogado qué información es estratégicamente conveniente revelar.", "Solicitar suspensión de la diligencia si no cuenta con abogado."],
      donts: ["No declarar espontáneamente antes de consultar con su defensor.", "No sentirse obligado a 'explicar todo' para parecer colaborador.", "No firmar actas de versión libre sin revisión previa."]
    },
    faqs: [
      { question: "¿El juez puede tomar el silencio como señal de culpa?", answer: "No. La ley prohíbe expresamente esta interpretación. El silencio es un derecho fundamental que no puede valorarse negativamente en ninguna etapa del proceso." },
      { question: "¿Cuándo conviene hablar y cuándo guardar silencio?", answer: "Esta decisión debe tomarse con el abogado defensor después de analizar el expediente, las pruebas existentes y la etapa procesal. No existe una respuesta universal." }
    ],
    cta: { badge: "Derechos del Investigado", title: "¿Te están investigando y no sabes cómo actuar?", text: "Le explicamos cuándo ejercer el silencio y cuándo declarar puede ser favorable. La estrategia correcta puede marcar la diferencia.", buttonText: "Consultar Estrategia de Defensa", waMessage: "Hola, estoy siendo investigado penalmente y quiero saber si debo guardar silencio o cómo actuar." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "Me llamó la Fiscalía, ¿qué hago?", url: "/centro-juridico/me-llamo-la-fiscalia-tengo-que-ir-con-abogado" }]
  },

  // ─────────────────────────────────────────────────────────────
  // DERECHO PENAL – DELITOS CONTRA LA ADMINISTRACIÓN PÚBLICA
  // ─────────────────────────────────────────────────────────────
  {
    slug: "toda-irregularidad-funcionario-publico-es-delito",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "¿Toda irregularidad cometida por un funcionario público es un delito?",
    metaTitle: "¿Toda irregularidad de un funcionario público es un delito? | AMF Legal",
    metaDescription: "No. Una irregularidad administrativa o disciplinaria no se convierte automáticamente en delito. Deben demostrarse todos los elementos del tipo penal. Guía AMF Legal.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", avatar: "/assets/Equipo fotos/Jorge Florez.png", credentials: "Ex funcionario judicial de la Rama Judicial en Cali." },
    reviewer: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia." },
    quickAnswer: "No. Una irregularidad administrativa o disciplinaria no se convierte automáticamente en delito. Para que exista responsabilidad penal deben demostrarse todos los elementos del tipo penal específico y la responsabilidad personal del funcionario.",
    example: "Un alcalde firma un decreto con un error de procedimiento que provoca la nulidad del acto administrativo. Un concejal eleva denuncia penal por prevaricato. Sin embargo, el error procedimental sin dolo ni manifiesta contrariedad al derecho no configura el delito.",
    legalExplanation: `El ordenamiento jurídico colombiano distingue claramente entre tres ámbitos de responsabilidad del funcionario público:\n\n1. **Responsabilidad disciplinaria:** Ante la Procuraduría o la oficina de control disciplinario por infracción de deberes funcionales.\n2. **Responsabilidad administrativa y civil:** Ante la jurisdicción contencioso-administrativa por daños causados al Estado o a particulares.\n3. **Responsabilidad penal:** Requiere la demostración de todos los elementos del tipo penal: conducta típica, antijurídica y culpable, con dolo o culpa según el delito específico.\n\nLa confusión entre estos ámbitos genera denuncias penales sin fundamento que afectan gravemente el buen nombre y la carrera de funcionarios que cometieron errores administrativos, no conductas delictivas.`,
    checklist: {
      dos: ["Analizar si la conducta cumple todos los elementos del tipo penal imputado.", "Revisar si existió dolo o si se trató de un error de procedimiento.", "Documentar la normativa aplicada y las razones de la decisión cuestionada.", "Diferencia entre el ámbito disciplinario y el penal desde el inicio."],
      donts: ["No asumir que una denuncia penal equivale a responsabilidad penal.", "No confundir irregularidad con delito.", "No responder sin asesoría jurídica especializada."]
    },
    faqs: [
      { question: "¿Puedo ser investigado por los mismos hechos en lo disciplinario y en lo penal?", answer: "Sí. Son ámbitos independientes. Los mismos hechos pueden generar actuaciones simultáneas en ambas instancias, con estrategias que deben coordinarse para evitar contradicciones." },
      { question: "¿Qué es el principio de legalidad en materia penal?", answer: "Exige que la conducta esté exactamente definida como delito en la ley antes de la comisión del hecho. Una irregularidad no tipificada penalmente no puede generar condena." }
    ],
    cta: { badge: "Defensa de Funcionarios Públicos", title: "¿Lo denunciaron penalmente por una decisión administrativa?", text: "Analizamos si la conducta configura realmente un delito o si se trata de una irregularidad que corresponde a otro ámbito. La diferencia es fundamental.", buttonText: "Consultar mi Caso como Funcionario", waMessage: "Hola, soy funcionario público y me denunciaron penalmente por una decisión administrativa. Quiero saber si realmente configura un delito." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "Centro Jurídico AMF", url: "/centro-juridico" }]
  },
  {
    slug: "un-alcalde-responde-penalmente-por-todo-lo-que-hacen-sus-funcionarios",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "¿Un alcalde, secretario o director responde penalmente por todo lo que hacen sus funcionarios?",
    metaTitle: "¿Un alcalde o director responde por todos sus funcionarios? | AMF Legal",
    metaDescription: "No. La responsabilidad penal es personal. Para imputar a un superior deben estudiarse competencias, delegaciones, conocimiento e intervención concreta. Guía AMF Legal.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", avatar: "/assets/Equipo fotos/Jorge Florez.png", credentials: "Ex funcionario judicial de la Rama Judicial en Cali." },
    reviewer: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", credentials: "Especialista en Derecho Procesal Penal." },
    quickAnswer: "No. La responsabilidad penal es estrictamente personal. Para que un superior jerárquico sea imputado por conductas de sus subalternos, deben estudiarse sus competencias específicas, delegaciones formales, conocimiento real de los hechos e intervención concreta en la conducta.",
    example: "Un director de contratación municipal es investigado porque un funcionario de su dependencia firmó un contrato irregular. El director puede demostrar que el trámite estaba completamente delegado, que no tuvo acceso al expediente y que no conocía las irregularidades.",
    legalExplanation: `El principio de responsabilidad penal personal impide la responsabilidad objetiva:\n\n1. **No hay responsabilidad por el solo cargo:** Ocupar un cargo de dirección no convierte automáticamente al superior en responsable de todos los actos de sus subordinados.\n2. **Posición de garante:** En algunos casos la ley exige que quien tiene la función de vigilar y controlar responda por las omisiones que permitieron el daño. Pero esta posición debe estar claramente definida en la ley o el reglamento.\n3. **Delegación formal:** Si la función fue válidamente delegada y el delegatario actuó por fuera de las instrucciones, la responsabilidad se concentra en quien actuó materialmente.`,
    checklist: {
      dos: ["Documentar las delegaciones formales y sus límites.", "Demostrar qué conocimiento real tenía el superior sobre los hechos imputados.", "Revisar los manuales de funciones y los actos administrativos de delegación.", "Aportar evidencia de controles ejercidos y alertas ignoradas por otros."],
      donts: ["No asumir responsabilidad por el solo hecho de ostentar el cargo directivo.", "No declarar sin revisar previamente qué dice el expediente sobre su intervención."]
    },
    faqs: [
      { question: "¿Qué es la autoría mediata y cómo aplica a directivos?", answer: "La autoría mediata existe cuando alguien utiliza a otro como instrumento para cometer el delito. Requiere demostrar control directo sobre la decisión y el resultado, no simplemente la jerarquía." },
      { question: "¿Puede un funcionario de menor jerarquía ser condenado sin involucrar al jefe?", answer: "Sí. La responsabilidad de cada persona se analiza individualmente. Un subalterno puede ser condenado sin que ello implique responsabilidad del superior si este no tuvo intervención ni conocimiento." }
    ],
    cta: { badge: "Defensa de Servidores Públicos", title: "¿Lo investigan por actos de sus subordinados?", text: "Analizamos si su intervención real configura responsabilidad penal o si se trata de una imputación por cargo sin sustento probatorio.", buttonText: "Consultar mi Caso", waMessage: "Hola, soy servidor público y me investigan por actos de mis funcionarios. Quiero saber si tengo responsabilidad penal." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "¿Toda irregularidad es un delito?", url: "/centro-juridico/toda-irregularidad-funcionario-publico-es-delito" }]
  },
  {
    slug: "decision-equivocada-funcionario-es-prevaricato",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "¿Una decisión equivocada de un funcionario es automáticamente prevaricato?",
    metaTitle: "¿Una decisión equivocada es prevaricato? | AMF Legal Colombia",
    metaDescription: "No. El error o desacuerdo jurídico no equivale automáticamente a prevaricato. Deben acreditarse los elementos específicos del tipo penal. Guía AMF Legal.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", avatar: "/assets/Equipo fotos/Jorge Florez.png", credentials: "Ex funcionario judicial de la Rama Judicial en Cali." },
    reviewer: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia." },
    quickAnswer: "No. El error jurídico o el desacuerdo con una decisión no equivale automáticamente a prevaricato. Deben acreditarse los elementos específicos del tipo penal: una resolución, dictamen u opinión manifiestamente contraria a la ley, con dolo del funcionario.",
    example: "Un juez niega una medida de aseguramiento que el fiscal solicitaba. El fiscal interpreta que la decisión fue injusta y eleva denuncia por prevaricato. Sin embargo, el desacuerdo jurídico y la simple equivocación —incluso grave— no configuran el delito si el funcionario actuó dentro de su margen de interpretación y sin dolo.",
    legalExplanation: `El delito de prevaricato (Art. 413 y siguientes del Código Penal) exige elementos específicos que van más allá del simple error:\n\n1. **Manifiesta contrariedad a la ley:** La decisión debe contradecir de forma evidente y grosera la norma aplicable, no simplemente ser discutible o incorrecta.\n2. **Dolo:** El funcionario debe conocer que su decisión es contraria a derecho y querer emitirla así. El error de buena fe excluye el dolo.\n3. **Margen de interpretación:** Los jueces y funcionarios gozan de un margen de autonomía interpretativa. Las decisiones dentro de ese margen, aunque equivocadas, no configuran prevaricato.\n4. **Diferencia con la tutela o el recurso:** El mecanismo correcto para corregir decisiones erróneas es la impugnación, no la denuncia penal.`,
    checklist: {
      dos: ["Analizar si la decisión era realmente manifiestamente contraria a la ley.", "Demostrar la fundamentación jurídica de la decisión cuestionada.", "Documentar el marco normativo y jurisprudencial que sustentó la decisión.", "Diferenciar el error jurídico del dolo necesario para el prevaricato."],
      donts: ["No confundir el desacuerdo jurídico con la comisión del delito.", "No aceptar responsabilidad sin análisis técnico previo."]
    },
    faqs: [
      { question: "¿Puede un funcionario ser condenado por prevaricato si hay jurisprudencia contradictoria?", answer: "La existencia de jurisprudencia contradictoria o debate doctrinal refuerza la posición de que la decisión no era manifiestamente contraria a la ley, lo que dificulta la configuración del delito." },
      { question: "¿Qué pasa si el superior jerárquico ordena una actuación que el subalterno considera irregular?", answer: "El subalterno debe analizar si la orden es manifiestamente ilegal. Si lo es, tiene el deber de abstenerse. Si es simplemente discutible, puede ejecutarla sin responsabilidad penal propia." }
    ],
    cta: { badge: "Defensa por Prevaricato", title: "¿Lo acusan de prevaricato por una decisión que tomó?", text: "Analizamos si su decisión configura realmente el tipo penal o si se trata de un error jurídico que no puede generar responsabilidad penal.", buttonText: "Consultar mi Defensa por Prevaricato", waMessage: "Hola, me acusan de prevaricato por una decisión que tomé como funcionario y quiero asesoría jurídica." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "¿Toda irregularidad es delito?", url: "/centro-juridico/toda-irregularidad-funcionario-publico-es-delito" }]
  },

  // ─────────────────────────────────────────────────────────────
  // DERECHO PENAL – DELITOS SEXUALES
  // ─────────────────────────────────────────────────────────────
  {
    slug: "me-denunciaron-por-delito-sexual-que-hacer-primero",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "Me denunciaron por un delito sexual: ¿qué debo hacer primero?",
    metaTitle: "Me denunciaron por un delito sexual: ¿qué hago primero? | AMF Legal",
    metaDescription: "Ante una denuncia por delito sexual: evite contactar al denunciante, preserve evidencia y estructure su defensa antes de declarar. Guía AMF Legal Colombia.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", avatar: "/assets/Equipo fotos/Jorge Florez.png", credentials: "Ex funcionario judicial de la Rama Judicial en Cali." },
    reviewer: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia." },
    quickAnswer: "Debe evitarse de inmediato todo contacto con quien denunció para reclamar o intentar modificar su versión. Conviene preservar chats, llamadas, ubicaciones, fotografías y videos, y estructurar la defensa técnica antes de hacer cualquier declaración.",
    example: "Una persona recibe notificación de que fue denunciada por un supuesto delito sexual ocurrido semanas antes. Su primer impulso es contactar a la persona denunciante para pedir explicaciones. Ese contacto puede interpretarse como obstrucción a la justicia y agravar su situación.",
    legalExplanation: `Los delitos sexuales generan procesos con características particulares que exigen una defensa técnica especializada desde el inicio:\n\n1. **Prohibición de contacto:** Cualquier comunicación con la persona denunciante puede tipificarse como constreñimiento, fraude procesal u obstaculización a la justicia.\n2. **Preservación de evidencia digital:** Chats, llamadas, ubicaciones y fotos pueden reconstruir el contexto y la secuencia de los hechos.\n3. **Defensa antes de declarar:** Nunca debe rendirse versión libre ni atenderse ninguna citación sin haber revisado el expediente con el abogado defensor.\n4. **Valoración del conjunto probatorio:** La condena en estos delitos exige prueba más allá de toda duda razonable, no solo el testimonio de la víctima.`,
    checklist: {
      dos: ["Consultar de inmediato con un abogado penalista especializado.", "Preservar toda comunicación previa con la denunciante.", "Documentar registros de ubicación en las fechas relevantes.", "Identificar testigos de los hechos o del contexto."],
      donts: ["No contactar a la persona que denunció bajo ninguna circunstancia.", "No hacer declaraciones públicas ni en redes sociales.", "No acudir a diligencias sin abogado defensor."]
    },
    faqs: [
      { question: "¿Una denuncia por delito sexual es suficiente para que me capturen?", answer: "No automáticamente. Para una medida de aseguramiento la Fiscalía debe demostrar inferencia razonable de autoría y al menos uno de los fines constitucionales: riesgo de fuga, peligro para la comunidad u obstaculización de la justicia." },
      { question: "¿El consentimiento puede demostrarse?", answer: "Sí. Puede reconstruirse mediante comunicaciones previas y posteriores, contexto de la relación, testimonios y otras evidencias. Este análisis es central en muchos casos de esta naturaleza." }
    ],
    cta: { badge: "Defensa en Delitos Sexuales", title: "¿Lo denunciaron por un delito sexual?", text: "En estos casos la defensa técnica especializada desde el primer momento es decisiva. No cometa errores que agraven su situación.", buttonText: "Hablar con un Abogado Penalista", waMessage: "Hola, me denunciaron por un delito sexual y necesito asesoría urgente sobre qué hacer primero." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "¿Puedo guardar silencio si me investigan?", url: "/centro-juridico/puedo-guardar-silencio-si-me-estan-investigando" }]
  },

  // ─────────────────────────────────────────────────────────────
  // DERECHO PENAL – ESTAFA, DEUDAS Y ABUSO DE CONFIANZA
  // ─────────────────────────────────────────────────────────────
  {
    slug: "no-pagar-deuda-es-estafa-colombia",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "¿No pagar una deuda es estafa en Colombia?",
    metaTitle: "¿No pagar una deuda es estafa en Colombia? | AMF Legal",
    metaDescription: "No automáticamente. El incumplimiento civil no equivale por sí mismo a estafa. Debe analizarse si existió engaño antecedente o concurrente. Guía AMF Legal.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", avatar: "/assets/Equipo fotos/Jorge Florez.png", credentials: "Ex funcionario judicial de la Rama Judicial en Cali." },
    reviewer: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia." },
    quickAnswer: "No automáticamente. El incumplimiento de una obligación civil no equivale por sí mismo a estafa. Para que exista el delito debe analizarse si hubo engaño antecedente o concurrente que indujo a error a la víctima y provocó una disposición patrimonial en su perjuicio.",
    example: "Una persona tomó un crédito en una cooperativa y no pudo pagarlo por dificultades económicas. La cooperativa la denuncia por estafa. El impago solo genera responsabilidad civil, no penal, a menos que se demuestre que desde el inicio la persona actuó con engaño para obtener el dinero sin intención de pagarlo.",
    legalExplanation: `El delito de estafa (Art. 246 del Código Penal) exige elementos objetivos y subjetivos que van más allá del simple incumplimiento:\n\n1. **Engaño:** Debe existir una conducta activa de inducción a error, no simplemente el incumplimiento posterior de una obligación.\n2. **Error en la víctima:** El engaño debe provocar una representación equivocada de la realidad en quien entrega el dinero o bien.\n3. **Disposición patrimonial:** La víctima debe haber entregado algo de valor como consecuencia directa del error provocado.\n4. **Perjuicio:** Debe causarse un daño patrimonial efectivo.\n5. **Dolo:** El engaño debe ser intencional y anterior o simultáneo a la obtención del dinero.`,
    checklist: {
      dos: ["Demostrar que las dificultades de pago son posteriores y no previstas al momento del crédito.", "Aportar evidencia de intentos de pago parcial o negociación.", "Demostrar que existía capacidad económica inicial y cambio de circunstancias.", "Distinguir el incumplimiento civil de la conducta engañosa propia del delito."],
      donts: ["No ignorar la denuncia penal aunque sea infundada.", "No confundir la obligación de pagar con responsabilidad penal."]
    },
    faqs: [
      { question: "¿Pueden arrestarme por no pagar una deuda?", answer: "No. La prisión por deudas está prohibida constitucionalmente en Colombia salvo en casos de obligaciones alimentarias. El incumplimiento de obligaciones civiles no genera privación de la libertad directa." },
      { question: "¿Qué diferencia existe entre estafa y abuso de confianza?", answer: "La estafa gira alrededor del engaño que produce error y disposición patrimonial. El abuso de confianza parte de determinadas formas de entrega de un bien ajeno y su posterior apropiación indebida." }
    ],
    cta: { badge: "Defensa en Casos de Estafa", title: "¿Lo denunciaron por estafa por no pagar una deuda?", text: "Analizamos si realmente existe el delito o si se trata de un incumplimiento civil mal tipificado penalmente. La diferencia puede significar su libertad.", buttonText: "Consultar mi Caso de Estafa", waMessage: "Hola, me denunciaron por estafa porque no pude pagar una deuda y quiero saber si realmente es un delito." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "Centro Jurídico AMF", url: "/centro-juridico" }]
  },

  // ─────────────────────────────────────────────────────────────
  // DERECHO PENAL – LAVADO DE ACTIVOS Y ENRIQUECIMIENTO ILÍCITO
  // ─────────────────────────────────────────────────────────────
  {
    slug: "recibi-dinero-en-mi-cuenta-de-actividad-ilegal-pueden-investigarme-por-lavado",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "Recibí dinero en mi cuenta y después descubrí que provenía de una actividad ilegal: ¿pueden investigarme por lavado?",
    metaTitle: "Recibí dinero ilegal en mi cuenta: ¿me investigan por lavado? | AMF Legal",
    metaDescription: "Recibir dinero no determina automáticamente responsabilidad por lavado de activos. Deben probarse los elementos objetivos y subjetivos del delito. Guía AMF Legal.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Juan Gregorio Minda Cerón", role: "Contador Público y Abogado – Especialista en Finanzas y Auditoría", slug: "juan-minda", avatar: "/assets/Equipo fotos/Juan Gregorio.png", credentials: "Especialista en Finanzas y Derecho Procesal Penal." },
    reviewer: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", credentials: "Ex funcionario judicial de la Rama Judicial en Cali." },
    quickAnswer: "Puede originarse una investigación, pero recibir dinero en la cuenta no determina automáticamente responsabilidad por lavado de activos. Deben probarse los elementos objetivos y subjetivos del delito, especialmente el conocimiento del origen ilícito de los recursos.",
    example: "Una persona recibe una transferencia de alguien que conoce ocasionalmente. Meses después, descubre que ese contacto era investigado por narcotráfico y que el dinero transferido provenía de esa actividad. La investigación que se origina no significa automáticamente que haya cometido lavado de activos.",
    legalExplanation: `El delito de lavado de activos (Art. 323 del Código Penal) exige elementos específicos:\n\n1. **Conocimiento del origen ilícito:** El elemento subjetivo más importante es que el sujeto sabía o podía inferir que los recursos provenían de actividades delictivas.\n2. **Conducta de legalización:** El delito requiere actos orientados a ocultar, encubrir o dar apariencia de legalidad a recursos de origen ilícito.\n3. **Autonomía del delito:** El lavado puede investigarse independientemente del delito fuente, pero igualmente deben demostrarse todos sus elementos.\n4. **Desconocimiento del origen:** Quien demuestra que no conocía ni podía razonablemente conocer el origen ilícito de los recursos tiene argumentos sólidos de defensa.`,
    checklist: {
      dos: ["Demostrar que desconocía el origen ilícito del dinero.", "Acreditar la existencia de una razón legítima para la transacción.", "Conservar toda documentación de la relación con quien envió los recursos.", "Reportar voluntariamente si descubrió la situación después de los hechos."],
      donts: ["No mover ni transferir los recursos si existe sospecha.", "No intentar devolver el dinero sin asesoría previa.", "No eliminar evidencia de la transacción."]
    },
    faqs: [
      { question: "¿El lavado de activos puede prescribir?", answer: "Sí. El término de prescripción depende de la pena máxima prevista para el delito. En lavado de activos los términos son amplios dado que las penas son elevadas." },
      { question: "¿Puedo ser investigado por lavado aunque no haya cometido el delito que produjo el dinero?", answer: "Sí. El lavado tiene autonomía propia. Sin embargo, igualmente deben acreditarse los presupuestos relativos al origen ilícito de los recursos y el conocimiento de ese origen." }
    ],
    cta: { badge: "Defensa en Lavado de Activos", title: "¿Lo investigan por dinero que recibió en su cuenta?", text: "Analizamos si existen los elementos del delito de lavado o si su situación puede defenderse demostrando desconocimiento del origen ilícito.", buttonText: "Consultar mi Caso de Lavado", waMessage: "Hola, recibí dinero en mi cuenta que resultó ser de origen ilícito y quiero saber si me pueden investigar por lavado de activos." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "Centro Jurídico AMF", url: "/centro-juridico" }]
  },

  // ─────────────────────────────────────────────────────────────
  // DERECHO PENAL – ARMAS DE FUEGO
  // ─────────────────────────────────────────────────────────────
  {
    slug: "encontraron-un-arma-cerca-de-mi-pero-no-era-mia-pueden-condenarme",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "Encontraron un arma cerca de mí, pero no era mía: ¿me pueden condenar?",
    metaTitle: "Encontraron un arma cerca de mí pero no era mía: ¿me condenan? | AMF Legal",
    metaDescription: "Hallazgo y atribución son problemas distintos. La Fiscalía debe demostrar las circunstancias que permiten relacionar materialmente el arma con la persona. Guía AMF.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", avatar: "/assets/Equipo fotos/Jorge Florez.png", credentials: "Ex funcionario judicial de la Rama Judicial en Cali." },
    reviewer: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia." },
    quickAnswer: "Hallazgo y atribución son problemas distintos. La Fiscalía debe demostrar las circunstancias concretas que permiten relacionar materialmente el arma con la persona. La proximidad física por sí sola no es suficiente para una condena.",
    example: "Durante un procedimiento de policía, encuentran un arma abandonada a tres metros de donde estaba parada una persona. Los agentes afirman que 'la vieron arrojar el arma', pero no hay video y otros testigos contradicen esa versión.",
    legalExplanation: `El porte ilegal de armas requiere demostrar la tenencia material o disposición del arma:\n\n1. **Hallazgo vs. atribución:** Que el arma esté cerca de alguien no prueba que la portara. La atribución requiere evidencia adicional.\n2. **Cadena de custodia:** El procedimiento de levantamiento, embalaje y rotulado del arma es crucial. Irregularidades pueden afectar el valor probatorio.\n3. **Versiones contradictorias:** Cuando policías y testigos civiles contradicen sus versiones, deben analizarse las condiciones de percepción, videos disponibles y la secuencia del procedimiento.\n4. **Huellas y ADN:** Pueden ser relevantes pero no son indispensables. La ausencia de huellas puede ser un argumento de defensa poderoso.`,
    checklist: {
      dos: ["Verificar inmediatamente la existencia de cámaras en el lugar del procedimiento.", "Identificar testigos presenciales y obtener sus datos.", "Revisar el procedimiento de cadena de custodia del arma.", "Solicitar análisis de huellas y ADN sobre el arma."],
      donts: ["No tocar el arma si aún está en el lugar.", "No declarar sobre la procedencia del arma sin asesoría previa."]
    },
    faqs: [
      { question: "¿Las huellas o el ADN son indispensables para demostrar el porte?", answer: "No necesariamente. Pueden ser relevantes, pero la responsabilidad se establece con el conjunto probatorio disponible. La ausencia de huellas puede ser un argumento de defensa." },
      { question: "¿Qué pasa si encuentran un arma en un carro donde viajamos varias personas?", answer: "La presencia en el vehículo no convierte automáticamente a todos en responsables. Importan la ubicación del arma, el acceso de cada persona, su disponibilidad, el conocimiento de su existencia y el demás material probatorio." }
    ],
    cta: { badge: "Defensa en Porte de Armas", title: "¿Lo acusan de portar un arma que no era suya?", text: "Analizamos el procedimiento policial, la cadena de custodia y la evidencia disponible para construir su defensa.", buttonText: "Consultar mi Caso de Armas", waMessage: "Hola, encontraron un arma cerca de mí pero no era mía y me acusan de porte ilegal. Necesito asesoría." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "Centro Jurídico AMF", url: "/centro-juridico" }]
  },

  // ─────────────────────────────────────────────────────────────
  // DERECHO PENAL – ESTUPEFACIENTES
  // ─────────────────────────────────────────────────────────────
  {
    slug: "me-encontraron-droga-es-trafico-de-estupefacientes",
    category: "penal",
    categoryLabel: "Derecho Penal",
    title: "Me encontraron droga: ¿eso significa automáticamente que cometí tráfico de estupefacientes?",
    metaTitle: "Me encontraron droga: ¿es automáticamente tráfico? | AMF Legal Colombia",
    metaDescription: "No. Que haya droga no concluye tráfico. Deben analizarse cantidad, circunstancias, finalidad y demás elementos del caso. Guía AMF Legal Colombia.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Especialista en Derecho Penal", slug: "jorge-florez", avatar: "/assets/Equipo fotos/Jorge Florez.png", credentials: "Ex funcionario judicial de la Rama Judicial en Cali." },
    reviewer: { name: "Esteban Ávila Meneses", role: "Socio Fundador – Especialista en Derecho Procesal Penal", slug: "esteban-avila", credentials: "Especialista en Derecho Procesal Penal de la Universidad Externado de Colombia." },
    quickAnswer: "No puede concluirse únicamente por la existencia material de la sustancia. Para determinar si hay tráfico de estupefacientes deben analizarse la cantidad encontrada, las circunstancias del hallazgo, la finalidad aparente y el conjunto de los elementos materiales probatorios.",
    example: "Una persona es detenida con una cantidad de sustancia que la policía clasifica como 'para tráfico'. Sin embargo, la cantidad puede corresponder al consumo personal según las circunstancias específicas del caso, y la defensa puede argumentar que no existía destinación comercial.",
    legalExplanation: `La Ley 30 de 1986 y la jurisprudencia de la Corte Suprema de Justicia establecen distintos marcos para el consumo personal y el tráfico:\n\n1. **Dosis mínima y consumo personal:** La Corte Constitucional ha reconocido que el consumo personal es una conducta protegida en determinadas circunstancias. La cantidad es un factor, pero no el único.\n2. **Finalidad:** La destinación de la sustancia —consumo propio o distribución— es determinante. La Fiscalía debe demostrar la finalidad de tráfico, no solo el hallazgo.\n3. **Circunstancias del hallazgo:** El lugar, la forma de empaque, los útiles asociados y el contexto general son indicios que se valoran junto con la cantidad.\n4. **Responsabilidad en espacios compartidos:** Si el arma o la droga se encuentran en un lugar que comparten varias personas, debe individualizarse la relación de cada una con la sustancia.`,
    checklist: {
      dos: ["Analizar la cantidad encontrada frente a los parámetros jurisprudenciales.", "Documentar cualquier circunstancia que indique consumo personal.", "Revisar el procedimiento policial y la cadena de custodia.", "Identificar si hubo testigos del procedimiento."],
      donts: ["No declarar sobre la procedencia o finalidad sin asesoría previa.", "No aceptar calificación de tráfico sin análisis técnico."]
    },
    faqs: [
      { question: "¿Qué pasa si encuentran droga en un carro donde viajamos varias personas?", answer: "El hallazgo no determina responsabilidad de todos. Debe individualizarse la relación de cada persona con la sustancia: quién la portaba, quién la conocía, dónde estaba exactamente y qué evidencia existe de esa relación." },
      { question: "¿Transportar un paquete sin saber que contiene droga genera responsabilidad?", answer: "El conocimiento es central. Debe establecerse qué sabía la persona sobre el contenido del paquete y qué circunstancias permiten inferirlo o descartarlo razonablemente." }
    ],
    cta: { badge: "Defensa en Casos de Estupefacientes", title: "¿Lo acusan de tráfico de estupefacientes?", text: "Analizamos las circunstancias del hallazgo, la cantidad, la cadena de custodia y los demás elementos para construir su defensa.", buttonText: "Consultar mi Caso de Drogas", waMessage: "Hola, me encontraron sustancias y me acusan de tráfico. Quiero saber si realmente configura ese delito." },
    internalLinks: [{ text: "Defensa Penal Estratégica 24/7", url: "/defensa-penal" }, { text: "Centro Jurídico AMF", url: "/centro-juridico" }]
  },

  // ─────────────────────────────────────────────────────────────
  // DERECHO DISCIPLINARIO
  // ─────────────────────────────────────────────────────────────
  {
    slug: "soy-militar-o-policia-me-abrieron-investigacion-disciplinaria-que-hago",
    category: "disciplinario",
    categoryLabel: "Derecho Disciplinario",
    title: "Soy militar o policía y me abrieron una investigación disciplinaria: ¿qué debo hacer?",
    metaTitle: "Me abrieron investigación disciplinaria: ¿qué hago? Militares y Policías | AMF",
    metaDescription: "Ante una investigación disciplinaria como militar o policía: identifique la etapa, revise los soportes y cuente con abogado antes de rendir explicaciones. AMF Legal.",
    readTime: "6 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Steven Alegrías Bolaños", role: "Abogado Especialista en Derecho Administrativo y Disciplinario", slug: "steven-alegrias", avatar: "/assets/Equipo fotos/Steven Alegrias.png", credentials: "Especialista de la Universidad del Cauca en asesoría institucional y derecho sancionatorio." },
    reviewer: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Litigante", slug: "jorge-florez", credentials: "Sólida experiencia en litigio contencioso administrativo y disciplinario." },
    quickAnswer: "Debe identificarse el hecho investigado, la etapa procesal y la calidad procesal asignada. Antes de rendir cualquier explicación conviene revisar informes, órdenes de servicio, videos, minutas y demás soportes disponibles con asesoría jurídica.",
    example: "Un patrullero recibe notificación de apertura de investigación disciplinaria por un procedimiento de uso de la fuerza. Sin revisar el expediente ni consultar un abogado, rinde versión libre con imprecisiones que la oficina disciplinaria utiliza para formular cargos graves.",
    legalExplanation: `El proceso disciplinario para la Fuerza Pública tiene características especiales según la institución y el régimen aplicable:\n\n1. **Estatuto disciplinario policial (Ley 2196 de 2022):** Aplica a la Policía Nacional con tipos disciplinarios específicos y sanciones que pueden llegar a la destitución.\n2. **Régimen disciplinario militar:** Aplica a las Fuerzas Militares con sus propias normas y procedimientos.\n3. **Etapas del proceso:** Indagación preliminar, investigación formal, formulación de cargos y juzgamiento. Cada etapa tiene oportunidades procesales propias.\n4. **Derechos del disciplinado:** Presunción de inocencia, derecho a guardar silencio, derecho a defensa técnica, derecho a aportar y solicitar pruebas.\n5. **Impacto en la carrera:** Las sanciones pueden incluir suspensión, multa, destitución e inhabilidad, lo que afecta directamente la carrera militar o policial.`,
    checklist: {
      dos: ["Exigir copia íntegra del expediente desde la notificación.", "Verificar los soportes documentales del hecho investigado.", "Consultar con abogado especializado antes de rendir versión.", "Vigilar los términos procesales para evitar preclusión de oportunidades."],
      donts: ["No rendir versión libre sin haber revisado el expediente.", "No asumir que la defensa institucional priorizará su interés personal.", "No firmar notificaciones con fechas retroactivas."]
    },
    faqs: [
      { question: "¿Una investigación disciplinaria puede afectar mi ascenso?", answer: "Puede producir consecuencias profesionales según el régimen, la etapa y el resultado de la actuación. En muchos regímenes, una investigación activa puede bloquear el ascenso hasta su terminación." },
      { question: "¿Puedo guardar silencio dentro de una actuación disciplinaria?", answer: "Las garantías dependen de la calidad procesal y del tipo de actuación. El riesgo de autoincriminación debe analizarse cuidadosamente con el abogado, especialmente si existen actuaciones penales paralelas." },
      { question: "¿Un mismo hecho puede generar proceso disciplinario y proceso penal?", answer: "Sí. Son ámbitos distintos que pueden tramitarse simultáneamente. Las estrategias deben coordinarse cuidadosamente para evitar contradicciones entre las dos actuaciones." }
    ],
    cta: { badge: "Protección de Carrera Militar y Policial", title: "¿Te abrieron investigación disciplinaria?", text: "En AMF nos especializamos en la defensa de uniformados ante procesos disciplinarios. Actuamos desde la notificación para proteger tu carrera.", buttonText: "Conocer Planes de Protección", waMessage: "Hola, soy militar/policía y me abrieron una investigación disciplinaria. Necesito asesoría para proteger mi carrera." },
    internalLinks: [{ text: "Planes para Uniformados", url: "/suscripcion-juridica-fuerza-publica" }, { text: "Investigación disciplinaria Policía Nacional", url: "/centro-juridico/investigacion-disciplinaria-policia-nacional-ley-2196" }]
  },
  {
    slug: "puedo-ser-investigado-disciplinariamente-por-uso-de-la-fuerza",
    category: "disciplinario",
    categoryLabel: "Derecho Disciplinario",
    title: "¿Puedo ser investigado disciplinariamente por el uso de la fuerza?",
    metaTitle: "¿Me pueden investigar disciplinariamente por el uso de la fuerza? | AMF Legal",
    metaDescription: "Sí puede haber revisión disciplinaria del uso de la fuerza. La situación enfrentada, la actuación concreta y los medios utilizados son determinantes. Guía AMF.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Steven Alegrías Bolaños", role: "Abogado Especialista en Derecho Administrativo y Disciplinario", slug: "steven-alegrias", avatar: "/assets/Equipo fotos/Steven Alegrias.png", credentials: "Especialista en derecho sancionatorio y asesoría institucional." },
    reviewer: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Litigante", slug: "jorge-florez", credentials: "Amplia experiencia en litigio disciplinario y penal." },
    quickAnswer: "Sí puede existir revisión disciplinaria del uso de la fuerza. Los factores determinantes son la situación concretamente enfrentada, la actuación desplegada, los medios utilizados y la evidencia disponible de todo el procedimiento.",
    example: "Un agente utiliza la fuerza para controlar una situación de orden público. Un video parcial publicado en redes muestra un tramo del procedimiento sin contexto. La oficina disciplinaria abre investigación. La defensa debe reconstruir la totalidad de la situación para demostrar que el uso de la fuerza fue necesario y proporcional.",
    legalExplanation: `El uso de la fuerza por parte de uniformados está reglado por normas nacionales e internacionales:\n\n1. **Principios del uso de la fuerza:** Necesidad, proporcionalidad y distinción son los principios que rigen la actuación. La investigación disciplinaria analizará si se respetaron.\n2. **Contexto completo:** Un video parcial puede distorsionar la realidad. La defensa debe aportar el contexto completo de la situación que motivó el uso de la fuerza.\n3. **Documentación del procedimiento:** Partes, informes, minutas, bodycams y otros registros son esenciales para la defensa.\n4. **Actuación conforme al entrenamiento:** Demostrar que el agente actuó conforme a su entrenamiento y a los protocolos institucionales es un argumento de defensa relevante.`,
    checklist: {
      dos: ["Asegurar inmediatamente grabaciones de bodycam y cámaras disponibles.", "Documentar el contexto previo de la situación que originó el uso de la fuerza.", "Identificar testigos del procedimiento completo.", "Consultar con abogado antes de rendir cualquier informe."],
      donts: ["No rendirse a rendir informes sin asesoría previa.", "No hacer declaraciones públicas sobre el procedimiento."]
    },
    faqs: [
      { question: "¿Un informe policial puede generar investigación disciplinaria aunque el procedimiento fuera correcto?", answer: "Sí. La investigación puede originarse en denuncias ciudadanas, videos en redes o de oficio. Lo importante es contar con la evidencia que demuestre la legalidad y proporcionalidad del procedimiento." },
      { question: "¿El derecho a la legítima defensa aplica en el contexto disciplinario?", answer: "Los institutos del derecho penal como la legítima defensa pueden ser analizados como causales de exclusión de responsabilidad disciplinaria, aunque con matices propios del régimen sancionatorio." }
    ],
    cta: { badge: "Defensa en Uso de la Fuerza", title: "¿Lo investigan por un procedimiento con uso de la fuerza?", text: "Reconstruimos el contexto completo del procedimiento y construimos su defensa con la evidencia disponible.", buttonText: "Consultar mi Caso Disciplinario", waMessage: "Hola, me investigan disciplinariamente por el uso de la fuerza en un procedimiento y necesito asesoría." },
    internalLinks: [{ text: "Planes para Uniformados", url: "/suscripcion-juridica-fuerza-publica" }, { text: "Investigación disciplinaria en la Policía", url: "/centro-juridico/investigacion-disciplinaria-policia-nacional-ley-2196" }]
  },
  {
    slug: "que-pasa-si-mi-superior-me-dio-una-orden-irregular-o-ilegal",
    category: "disciplinario",
    categoryLabel: "Derecho Disciplinario",
    title: "¿Qué pasa si mi superior me dio una orden que considero irregular o ilegal?",
    metaTitle: "Mi superior me dio una orden irregular: ¿qué hago? Militares y Policías | AMF",
    metaDescription: "La naturaleza de la orden, las funciones del subordinado y las circunstancias concretas determinan si debe cumplirse o si existe deber de abstención. Guía AMF Legal.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Steven Alegrías Bolaños", role: "Abogado Especialista en Derecho Administrativo y Disciplinario", slug: "steven-alegrias", avatar: "/assets/Equipo fotos/Steven Alegrias.png", credentials: "Especialista en derecho disciplinario y asesoría institucional." },
    reviewer: { name: "Jorge Ernesto Flórez Martínez", role: "Socio Fundador – Litigante", slug: "jorge-florez", credentials: "Amplia experiencia en litigio disciplinario y penal." },
    quickAnswer: "Debe analizarse la naturaleza específica de la orden, las funciones propias del cargo, las circunstancias concretas y las reglas propias del servicio antes de tomar cualquier decisión.",
    example: "Un suboficial recibe orden de su superior que considera contraria al reglamento. Si la cumple y resulta irregular, puede ser investigado por cumplir una orden ilegal. Si no la cumple, puede ser investigado por desobediencia. La distinción entre orden manifiestamente ilegal y orden simplemente discutible es crucial.",
    legalExplanation: `El régimen de obediencia debida en las instituciones castrenses y de policía tiene límites claros:\n\n1. **Obediencia reflexiva:** No existe obediencia ciega en el ordenamiento colombiano. El subordinado no puede eximir su responsabilidad simplemente alegando que cumplía órdenes.\n2. **Orden manifiestamente ilegal:** Existe un deber de abstención cuando la orden viola de forma flagrante la Constitución, la ley o los derechos humanos. En estos casos, cumplirla genera responsabilidad.\n3. **Orden simplemente irregular o discutible:** Puede cumplirse y la responsabilidad se concentra en quien la emite, siempre que el subordinado haga constar su disenso.\n4. **Deber de dejar constancia:** En situaciones de duda, dejar constancia escrita de la orden recibida y de la reserva del subordinado es una práctica defensiva esencial.`,
    checklist: {
      dos: ["Evaluar si la orden viola de forma evidente normas constitucionales o legales.", "Dejar constancia escrita de la orden recibida.", "Consultar con abogado si la ilegalidad de la orden no es clara.", "Documentar su posición frente a la orden."],
      donts: ["No cumplir ciegamente órdenes manifiestamente ilegales.", "No negarse a cumplir órdenes simplemente porque parezcan irregulares sin análisis previo."]
    },
    faqs: [
      { question: "¿Qué pasa si ejecuto una orden y después resulta que era ilegal?", answer: "Si la ilegalidad no era manifiesta, puede alegar que actuó de buena fe siguiendo instrucciones superiores. Si era manifiestamente ilegal, la responsabilidad puede distribuirse entre quien ordenó y quien ejecutó." },
      { question: "¿Puedo negarme a cumplir una orden sin consecuencias disciplinarias?", answer: "Depende de si la orden era manifiestamente ilegal. En ese caso, el deber de abstención lo protege. Si no era manifiestamente ilegal, la negativa puede generar responsabilidad disciplinaria." }
    ],
    cta: { badge: "Defensa ante Órdenes Irregulares", title: "¿Lo investigan por cumplir o negarse a cumplir una orden?", text: "Analizamos la naturaleza de la orden, sus obligaciones y la estrategia de defensa correcta para su caso.", buttonText: "Consultar mi Situación Disciplinaria", waMessage: "Hola, me investigan disciplinariamente por una situación relacionada con una orden de mi superior y necesito asesoría." },
    internalLinks: [{ text: "Planes para Uniformados", url: "/suscripcion-juridica-fuerza-publica" }, { text: "Soy militar o policía y me abrieron investigación", url: "/centro-juridico/soy-militar-o-policia-me-abrieron-investigacion-disciplinaria-que-hago" }]
  },

  // ─────────────────────────────────────────────────────────────
  // COMPLIANCE
  // ─────────────────────────────────────────────────────────────
  {
    slug: "representante-legal-responde-penalmente-por-empleados",
    category: "compliance",
    categoryLabel: "Compliance",
    title: "Soy representante legal: ¿respondo penalmente por todo lo que haga un empleado?",
    metaTitle: "¿El representante legal responde por todo lo que haga un empleado? | AMF Legal",
    metaDescription: "No. La responsabilidad penal es personal. Deben analizarse intervención, conocimiento y deberes concretos del representante. Guía AMF Legal Colombia.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Juan Gregorio Minda Cerón", role: "Contador Público y Abogado – Especialista en Finanzas y Auditoría", slug: "juan-minda", avatar: "/assets/Equipo fotos/Juan Gregorio.png", credentials: "Especialista en Finanzas y Derecho Procesal Penal." },
    reviewer: { name: "David Fernando Pechené Torres", role: "Abogado Especialista y Magíster", slug: "david-pechene", credentials: "Magíster en Contratación Estatal e Infraestructura Pública." },
    quickAnswer: "No. La responsabilidad penal es estrictamente personal. Para que el representante legal responda por conductas de un empleado deben analizarse su intervención concreta, el conocimiento que tenía de los hechos y los deberes específicos que le correspondían según su cargo.",
    example: "Un gerente firma contratos que un empleado de su área preparó con información falsa. La firma del gerente puede generar investigación, pero si demuestra que no conocía la falsedad, que actuó de buena fe y que ejerció los controles que le correspondían, puede excluir su responsabilidad penal.",
    legalExplanation: `La responsabilidad penal de los administradores empresariales requiere análisis de posición de garante:\n\n1. **Principio de responsabilidad personal:** Nadie responde penalmente por el solo hecho de ocupar un cargo directivo.\n2. **Posición de garante:** En determinados casos el representante tiene deberes de supervisión y control cuya omisión puede generar responsabilidad. Pero esa posición debe estar claramente establecida.\n3. **Conocimiento:** El representante solo responde si conocía o debía conocer los hechos irregulares y no actuó para impedirlos.\n4. **Programa de compliance:** Un programa de cumplimiento efectivo puede demostrar que el representante adoptó las medidas razonables de prevención, lo que refuerza su defensa.`,
    checklist: {
      dos: ["Implementar un programa de compliance que documente los controles adoptados.", "Establecer canales de reporte de irregularidades.", "Delimitar claramente las funciones y responsabilidades en manuales internos.", "Documentar las decisiones relevantes y las razones que las sustentaron."],
      donts: ["No firmar documentos sin revisión cuando existe obligación legal de verificar.", "No ignorar alertas o señales de irregularidades."]
    },
    faqs: [
      { question: "¿Para qué sirve realmente un programa de compliance?", answer: "Para identificar riesgos, establecer controles, detectar alertas, documentar decisiones y reaccionar organizadamente ante irregularidades. Un programa efectivo puede ser la principal línea de defensa del representante." },
      { question: "¿Qué debe hacer una empresa cuando descubre un posible fraude interno?", answer: "Preservar la evidencia disponible, impedir alteraciones, definir responsables de la investigación interna y establecer un método lícito de recopilación de información antes de tomar decisiones." }
    ],
    cta: { badge: "Compliance y Protección Directiva", title: "¿Su empresa necesita protección jurídica corporativa?", text: "Diseñamos programas de compliance que protegen a los representantes legales y establecen los controles necesarios para prevenir responsabilidad penal.", buttonText: "Consultar Compliance Corporativo", waMessage: "Hola, soy representante legal y quiero saber cómo protegerme penalmente de los actos de mis empleados mediante un programa de compliance." },
    internalLinks: [{ text: "Compliance & Penal Corporativo", url: "/compliance-penal-corporativo" }, { text: "Circular 100-000020 Supersociedades", url: "/centro-juridico/circular-100-000020-supersociedades-nuevo-sistema-riesgos-sagrilaft-ptee" }]
  },
  {
    slug: "empresa-contrata-con-estado-que-riesgos-controlar",
    category: "compliance",
    categoryLabel: "Compliance",
    title: "Mi empresa contrata con el Estado: ¿qué riesgos debe controlar?",
    metaTitle: "Empresa contratante con el Estado: ¿qué riesgos controlar? | AMF Legal",
    metaDescription: "Pagos, intermediarios, conflictos de interés, regalos y relaciones con funcionarios requieren controles y trazabilidad en la contratación estatal. Guía AMF Legal.",
    readTime: "6 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "David Fernando Pechené Torres", role: "Abogado Especialista y Magíster", slug: "david-pechene", avatar: "/assets/Equipo fotos/David Pechene.png", credentials: "Magíster en Contratación Estatal e Infraestructura Pública." },
    reviewer: { name: "Juan Gregorio Minda Cerón", role: "Contador Público y Abogado – Especialista en Finanzas", slug: "juan-minda", credentials: "Especialista en Finanzas y Derecho Procesal Penal." },
    quickAnswer: "Los pagos a intermediarios, los conflictos de interés, los regalos y hospitalidades a funcionarios, y las relaciones con personas expuestas políticamente son los principales riesgos que toda empresa contratante con el Estado debe controlar y documentar con trazabilidad.",
    example: "Una empresa de construcción contrata a un intermediario que 'gestiona' la relación con la entidad contratante. Ese intermediario resulta ser familiar de un funcionario clave. Si hay irregularidades en el contrato, la empresa puede quedar expuesta a investigaciones por corrupción aunque no haya participado directamente en el soborno.",
    legalExplanation: `La contratación estatal en Colombia genera riesgos penales específicos para las empresas privadas:\n\n1. **Ley 2195 de 2022 (anticorrupción):** Reforzó las obligaciones de las empresas privadas en materia de prevención de la corrupción y estableció sanciones para personas jurídicas.\n2. **Debida diligencia de intermediarios:** Antes de contratar a un agente o intermediario que interactúa con entidades estatales, la empresa debe verificar su perfil, sus relaciones y la legitimidad de los servicios que ofrece.\n3. **Registro de regalos e invitaciones:** Cualquier regalo, hospitalidad o invitación a funcionarios públicos debe registrarse, evaluarse frente a políticas internas y cumplir los límites legales y éticos.\n4. **Conflictos de interés:** Los vínculos entre empleados de la empresa y funcionarios de las entidades contratantes deben declararse y gestionarse.`,
    checklist: {
      dos: ["Implementar una política de regalos y hospitalidades con límites claros.", "Hacer debida diligencia sobre todos los intermediarios que interactúan con el sector público.", "Documentar todas las reuniones con funcionarios públicos.", "Declarar y gestionar conflictos de interés."],
      donts: ["No pagar comisiones sin contrato, servicio real y trazabilidad del beneficiario.", "No contratar intermediarios que ofrezcan 'contactos dentro de la entidad'."]
    },
    faqs: [
      { question: "¿Puedo invitar a comer o dar un regalo a un funcionario público?", answer: "Debe evaluarse el valor, la oportunidad, la frecuencia, la finalidad y la relación con decisiones oficiales. Lo que parece una cortesía puede convertirse en una señal de alerta de corrupción si no se gestiona correctamente." },
      { question: "¿Qué hago si un funcionario me pide dinero para ayudarme con un contrato?", answer: "La empresa no debe realizar el pago. Debe preservar la información disponible sobre el requerimiento y activar los mecanismos jurídicos y de compliance disponibles, incluida la posibilidad de denunciar." }
    ],
    cta: { badge: "Compliance en Contratación Estatal", title: "¿Su empresa contrata con el Estado?", text: "Implementamos controles, políticas y trazabilidad para proteger a su empresa y a sus directivos de riesgos de corrupción en la contratación estatal.", buttonText: "Consultar Compliance Estatal", waMessage: "Hola, mi empresa contrata con el Estado y quiero implementar controles para gestionar los riesgos de corrupción y proteger a los directivos." },
    internalLinks: [{ text: "Compliance & Penal Corporativo", url: "/compliance-penal-corporativo" }, { text: "Circular 100-000020 Supersociedades", url: "/centro-juridico/circular-100-000020-supersociedades-nuevo-sistema-riesgos-sagrilaft-ptee" }]
  },
  {
    slug: "como-debe-funcionar-un-canal-de-denuncias-interno",
    category: "compliance",
    categoryLabel: "Compliance",
    title: "¿Cómo debe funcionar un canal de denuncias interno en una empresa?",
    metaTitle: "¿Cómo funciona un canal de denuncias interno en una empresa? | AMF Legal",
    metaDescription: "Un canal efectivo permite reportes seguros, define responsables, documenta actuaciones y reduce riesgos de represalias. Guía de compliance AMF Legal Colombia.",
    readTime: "5 min de lectura",
    publishDate: "2026-09-20",
    updateDate: "2026-09-23",
    author: { name: "Juan Gregorio Minda Cerón", role: "Contador Público y Abogado – Especialista en Finanzas y Auditoría", slug: "juan-minda", avatar: "/assets/Equipo fotos/Juan Gregorio.png", credentials: "Especialista en Finanzas y Derecho Procesal Penal." },
    reviewer: { name: "David Fernando Pechené Torres", role: "Abogado Especialista y Magíster", slug: "david-pechene", credentials: "Magíster en Contratación Estatal e Infraestructura Pública." },
    quickAnswer: "Un canal de denuncias efectivo debe permitir reportes seguros —incluyendo la opción anónima—, tener responsables claramente definidos con independencia del reporte, documentar todas las actuaciones y contar con mecanismos efectivos para reducir el riesgo de represalias contra quien denuncia.",
    example: "Una empresa implementa un correo electrónico como 'canal de denuncias'. El correo lo administra el jefe del área donde se cometió la irregularidad. Un empleado que denuncia se expone directamente a quien denuncia. Este modelo no funciona como canal efectivo y genera responsabilidad para la empresa.",
    legalExplanation: `La Ley 2195 de 2022 y las guías de la Superintendencia de Sociedades establecen parámetros para canales de denuncias efectivos:\n\n1. **Independencia:** El canal debe ser administrado por una persona u órgano independiente del área denunciada, idealmente el oficial de cumplimiento o un comité de ética.\n2. **Confidencialidad y anonimato:** Debe garantizarse la posibilidad de reportar de forma anónima sin comprometer la identidad del denunciante.\n3. **Protocolo de investigación:** Cada denuncia debe seguir un protocolo documentado de investigación con plazos y responsables definidos.\n4. **Protección al denunciante:** La empresa debe establecer medidas concretas para proteger al denunciante de cualquier forma de represalia.`,
    checklist: {
      dos: ["Designar un responsable independiente del canal con autoridad real.", "Garantizar la opción de reporte anónimo.", "Documentar todas las denuncias y las actuaciones realizadas.", "Establecer plazos de respuesta y comunicación al denunciante."],
      donts: ["No permitir que el área denunciada administre el canal.", "No dejar denuncias sin respuesta ni seguimiento documentado."]
    },
    faqs: [
      { question: "¿Qué debe hacer una empresa cuando un trabajador denuncia corrupción?", answer: "Preservar la información, evaluar el riesgo, evitar represalias y definir una investigación independiente y documentada con el soporte jurídico necesario." },
      { question: "¿Una empresa está obligada a tener canal de denuncias?", answer: "Las empresas obligadas a implementar SAGRILAFT y PTEE bajo la Circular 100-000020 de 2026 de la Supersociedades deben contar con mecanismos de reporte internos. Para todas las demás, es una buena práctica que refuerza el programa de compliance." }
    ],
    cta: { badge: "Compliance Corporativo", title: "¿Su empresa necesita un canal de denuncias efectivo?", text: "Diseñamos e implementamos canales de denuncias con los estándares exigidos por la Supersociedades y las mejores prácticas de compliance.", buttonText: "Consultar Implementación", waMessage: "Hola, quiero implementar un canal de denuncias interno en mi empresa que cumpla con los estándares de compliance. Solicito orientación." },
    internalLinks: [{ text: "Compliance & Penal Corporativo", url: "/compliance-penal-corporativo" }, { text: "Circular 100-000020 Supersociedades", url: "/centro-juridico/circular-100-000020-supersociedades-nuevo-sistema-riesgos-sagrilaft-ptee" }]
  }
];

export const getArticleBySlug = (slug) => {
  return ARTICLES_DATA.find((art) => art.slug === slug);
};

export const getArticlesByCategory = (category) => {
  if (!category || category === 'todos') return ARTICLES_DATA;
  return ARTICLES_DATA.filter((art) => art.category === category);
};

