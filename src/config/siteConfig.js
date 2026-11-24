/**
 * Configuración global del sitio AMF Firma Legal S.A.S.
 */

export const WHATSAPP_NUMBER = "573013302160";
export const WHATSAPP_DISPLAY = "301 330 2160";
export const CONTACT_EMAIL = "notificaciones@amfjuridico.com";
export const MAIN_SITE_URL = "https://amfjuridico.com";

// API backend URL (Render en producción separada o vacío si usa proxy / mismo origen)
export const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export const buildApiUrl = (path) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

// Mantiene compatibilidad de referencia si alguna vista antigua la importaba
export const WEB3FORMS_ACCESS_KEY = "";

export const PAYMENT_LINKS = {
  escudo: "https://subscription-landing.epayco.co/plan/ab49ea65bc656146d052e87",
  fortaleza: "https://subscription-landing.epayco.co/plan/ab49ea65bc656146d052e87",
  bastion: "https://subscription-landing.epayco.co/plan/ab49ea65bc656146d052e87"
};

/**
 * Genera un enlace profundo (deep link) hacia WhatsApp con un mensaje prellenado.
 */
export const whatsappLink = (number = WHATSAPP_NUMBER, message = "") => {
  const cleanNumber = number.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
};

export const buildDiscountAdviceWhatsAppUrl = ({
  nombrePostulante = "",
  codigoPostulacion = "",
} = {}) => {
  const parts = [
    "Hola AMF Firma Legal S.A.S., acabo de registrar mi postulación gratuita por el aniversario de 1 año en Bogotá",
    codigoPostulacion ? `(Código: ${codigoPostulacion})` : "",
    nombrePostulante ? `a nombre de ${nombrePostulante}` : "",
    "y quiero acceder a la ASESORÍA PENAL POR VIDEOCONFERENCIA con el 60% de descuento ($60.000).",
  ].filter(Boolean);

  return whatsappLink(WHATSAPP_NUMBER, parts.join(" "));
};

/**
 * Resuelve rutas de archivos estáticos respetando la base del entorno.
 */
export const getAssetUrl = (path) => {
  if (!path) return '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${cleanPath}`;
};

/**
 * Mensajes prellenados de WhatsApp unificados por contexto
 */
export const WA_MESSAGES = {
  GENERAL_FLOATING: "Hola, me comunico desde la página web de AMF Firma Legal. Deseo recibir asesoría jurídica sobre mi caso.",
  FOOTER_CONTACT: "Hola, me comunico con AMF Firma Legal. Me gustaría consultar sobre sus servicios de defensa jurídica y asesoría.",
  HOME_CAROUSEL_FUERZA_PUBLICA: "Hola, soy miembro de la Fuerza Pública (Policía / FF.MM.) y deseo conocer la cobertura y afiliación a la suscripción jurídica de AMF.",
  DESDE_SUSCRIPCIONES: "Hola, soy miembro de la Fuerza Pública (Policía / FF.MM.) y deseo conocer la cobertura y afiliación a la suscripción jurídica de AMF.",
  PLAN_ESCUDO: "Hola, me interesa afiliarme al Plan Escudo ($59.900/mes) de AMF Firma Legal. ¿Cuáles son los pasos para iniciar mi protección jurídica?",
  PLAN_FORTALEZA: "Hola, deseo afiliarme al Plan Fortaleza ($79.900/mes) de AMF Firma Legal. ¿Me podrían indicar los pasos para activar mi cobertura?",
  PLAN_BASTION: "Hola, deseo afiliarme al Plan Bastión ($119.900/mes) de AMF Firma Legal. Solicito información para formalizar mi suscripción.",
  HOME_CAROUSEL_PENAL: "Hola, me comunico con AMF Firma Legal. Requiero atención prioritaria de un abogado penalista 24/7 para un caso urgente en Colombia.",
  DESDE_PENAL: "Hola, me comunico con AMF Firma Legal. Requiero atención prioritaria de un abogado penalista 24/7 para un caso urgente en Colombia.",
  SEDE_BOGOTA: "Hola, deseo agendar una consulta presencial en la sede de AMF Firma Legal en Bogotá. ¿Qué fechas y horarios tienen disponibles?",
  SEDE_CALI: "Hola, deseo agendar una consulta presencial en la sede de AMF Firma Legal en Cali. ¿Qué fechas y horarios tienen disponibles?",
  SEDE_PIENDAMO: "Hola, deseo agendar una consulta presencial en la sede de AMF Firma Legal en Piendamó. ¿Qué fechas y horarios tienen disponibles?",
  SEDE_MEDELLIN: "Hola, deseo agendar una consulta presencial en la sede de AMF Firma Legal en Medellín. ¿Qué fechas y horarios tienen disponibles?",
  ATENCION_VIRTUAL: "Hola, deseo programar una asesoría jurídica virtual con AMF Firma Legal. ¿Cómo es el proceso y qué disponibilidad tienen?",
  COMPLIANCE_DIAGNOSTICO: "Hola, me comunico desde la web de AMF Firma Legal en representación de una empresa. Solicito un diagnóstico de prevención penal y gestión de riesgos normativos.",
  COMPLIANCE_INVESTIGACIONES: "Hola, requerimos asesoría jurídica especializada de AMF para una investigación interna / contingencia penal corporativa.",
  ARTICULO_CONSULTA: "Hola, leí su artículo en el Centro Jurídico de AMF Firma Legal y requiero asesoría legal especializada sobre este tema."
};
