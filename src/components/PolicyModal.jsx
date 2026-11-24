import React, { useEffect } from 'react';
import { ShieldCheck, X, Check } from 'lucide-react';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from '../config/siteConfig';
import './PolicyModal.css';

export const PolicyModal = ({ isOpen, onClose, onAccept }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      className="policy-modal-overlay"
      onClick={onClose}
    >
      <div className="policy-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="policy-modal-header">
          <div>
            <div className="policy-modal-eyebrow">
              <ShieldCheck size={18} className="text-gold" />
              <span>Protección de Datos Personales · Habeas Data</span>
            </div>
            <h3 id="policy-modal-title" className="text-serif policy-modal-title">
              Política de Tratamiento de Datos Personales
            </h3>
            <p className="policy-modal-subtitle">
              AMF Firma Legal S.A.S. · Ley Estatutaria 1581 de 2012 y Decreto 1377 de 2013
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="policy-modal-close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="policy-modal-body">
          <div className="policy-modal-callout">
            <p>
              Al marcar la casilla de autorización y enviar tu postulación, autorizas de manera
              previa, expresa e informada a <strong>AMF FIRMA LEGAL S.A.S.</strong> para
              recolectar, almacenar y tratar los datos suministrados exclusivamente para revisar
              tu caso dentro de la convocatoria de aniversario y contactarte.
            </p>
          </div>

          <div>
            <h4>1. Responsable del Tratamiento</h4>
            <p>
              <strong>AMF FIRMA LEGAL S.A.S.</strong>, domiciliada en Calle 26A #13-97, Oficina
              2304, Bulevar Tequendama, Bogotá D.C., Colombia. Correo de notificaciones:{' '}
              <strong>{CONTACT_EMAIL}</strong> · Línea WhatsApp: <strong>{WHATSAPP_DISPLAY}</strong>.
            </p>
          </div>

          <div>
            <h4>2. Finalidades del Tratamiento</h4>
            <ul>
              <li>Recibir, estudiar y evaluar la postulación gratuita al aniversario en Bogotá.</li>
              <li>
                Contactarte vía WhatsApp o llamada telefónica para ampliar información del caso,
                comunicar resultados de la selección o coordinar asesoría jurídica si la solicitas.
              </li>
              <li>
                Resguardar la información bajo los estándares de confidencialidad y reserva
                profesional exigidos por la ley colombiana.
              </li>
            </ul>
          </div>

          <div>
            <h4>3. Secreto Profesional y Datos Sensibles</h4>
            <p>
              Conforme al <strong>artículo 74 de la Constitución Política de Colombia</strong> y la
              Ley 1123 de 2007, toda información sobre hechos o situaciones penales compartida en
              este formulario está amparada por estricta reserva y confidencialidad. AMF Firma Legal
              S.A.S. no vende, cede ni comercializa tus datos con terceros.
            </p>
          </div>

          <div>
            <h4>4. Derechos del Titular (Artículo 8, Ley 1581 de 2012)</h4>
            <p>
              Como titular tienes derecho a conocer, actualizar, rectificar y solicitar la
              supresión de tus datos, así como a revocar esta autorización escribiendo a{' '}
              <strong>{CONTACT_EMAIL}</strong>.
            </p>
          </div>
        </div>

        <div className="policy-modal-footer">
          <button type="button" onClick={onClose} className="btn btn-outline-wine policy-btn-sm">
            Cerrar
          </button>
          <button
            type="button"
            onClick={() => {
              onAccept();
              onClose();
            }}
            className="btn btn-gold policy-btn-sm"
          >
            <Check size={16} />
            <span>Aceptar y Continuar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
