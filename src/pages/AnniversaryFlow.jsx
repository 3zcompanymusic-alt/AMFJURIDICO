import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ArrowDown,
  Video,
  Clock,
  Scale,
  Loader2,
  Check,
  RotateCcw,
  X,
} from 'lucide-react';
import {
  QUIEN_NECESITA_OPTIONS,
  OCURRIO_BOGOTA_OPTIONS,
  SITUACION_ACTUAL_OPTIONS,
} from '../../shared/constants';
import {
  validatePostulacionField,
  validateAndSanitizePostulacion,
} from '../../shared/validators';
import {
  WHATSAPP_DISPLAY,
  buildDiscountAdviceWhatsAppUrl,
  getAssetUrl,
} from '../config/siteConfig';
import {
  registerAniversarioBeneficio,
  submitAniversarioPostulacion,
} from '../services/formsApi';
import { SEOHead } from '../components/SEOHead';
import { PolicyModal } from '../components/PolicyModal';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import './AnniversaryFlow.css';

const heroBgImage = getAssetUrl('/assets/BACKGROUNDS/JUSTICIA PENAL ESTRATEGICA.png');

const INITIAL_FORM_STATE = {
  nombrePostulante: '',
  celularWhatsapp: '',
  quienNecesita: '',
  nombrePersona: '',
  ocurrioBogota: '',
  situacionActual: '',
  relatoCaso: '',
  aceptaDatos: false,
};

export const AnniversaryFlow = () => {
  const [step, setStep] = useState('form'); // 'form' | 'beneficio' | 'finalizado'
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);

  const [submissionRecord, setSubmissionRecord] = useState(null);
  const [benefitOpenedWhatsApp, setBenefitOpenedWhatsApp] = useState(false);

  const formSectionRef = useRef(null);
  const firstInputRef = useRef(null);

  // Temporizador automático de 10 segundos para el modal flotante de confirmación
  useEffect(() => {
    if (!showSuccessModal) return undefined;

    document.body.style.overflow = 'hidden';

    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          setShowSuccessModal(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSuccessModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showSuccessModal]);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 450);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasImmediateInputViolation = (name, value) => {
    if (typeof value !== 'string') return false;
    if ((name === 'nombrePostulante' || name === 'nombrePersona') && /[\d]/.test(value)) {
      return true;
    }
    if (name === 'celularWhatsapp' && /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(value)) {
      return true;
    }
    return false;
  };

  const updateField = (name, value) => {
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

    if (submitError) setSubmitError('');

    if (errors[name] || hasAttemptedSubmit || hasImmediateInputViolation(name, value)) {
      const err = validatePostulacionField(name, value, nextFormData);
      setErrors((prev) => {
        const next = { ...prev };
        if (err) {
          next[name] = err;
        } else {
          delete next[name];
        }
        if (name === 'quienNecesita') {
          const personErr = validatePostulacionField(
            'nombrePersona',
            nextFormData.nombrePersona,
            nextFormData,
          );
          if (personErr) {
            next.nombrePersona = personErr;
          } else {
            delete next.nombrePersona;
          }
        }
        return next;
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateField(name, type === 'checkbox' ? checked : value);
  };

  const handleFieldBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    const err = validatePostulacionField(name, val, formData);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) {
        next[name] = err;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const focusFirstError = (validationErrors) => {
    const firstKey = Object.keys(validationErrors)[0];
    if (!firstKey) return;
    const targetEl =
      document.querySelector(`[data-field-container="${firstKey}"]`) ||
      document.getElementsByName(firstKey)[0];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const inputEl = document.getElementsByName(firstKey)[0];
      inputEl?.focus?.();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setHasAttemptedSubmit(true);
    setSubmitError('');

    const { errors: validationErrors, sanitized } =
      validateAndSanitizePostulacion(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      focusFirstError(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await submitAniversarioPostulacion(sanitized);
      setSubmissionRecord({
        ...created,
        nombrePostulante: sanitized.nombrePostulante,
      });
      setStep('beneficio');
      setSecondsLeft(10);
      setShowSuccessModal(true);
      scrollToTop();
    } catch (err) {
      if (err.fieldErrors) {
        setErrors(err.fieldErrors);
        focusFirstError(err.fieldErrors);
      }
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleSelectDiscountAdvice = () => {
    setBenefitOpenedWhatsApp(true);
    if (submissionRecord?.id && submissionRecord?.submissionToken) {
      registerAniversarioBeneficio({
        id: submissionRecord.id,
        submissionToken: submissionRecord.submissionToken,
        decision: 'quiero_asesoria',
      });
    }
  };

  const handleDeclineDiscount = () => {
    if (submissionRecord?.id && submissionRecord?.submissionToken) {
      registerAniversarioBeneficio({
        id: submissionRecord.id,
        submissionToken: submissionRecord.submissionToken,
        decision: 'no_gracias',
      });
    }
    setStep('finalizado');
    scrollToTop();
  };

  const handleRestartFlow = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setHasAttemptedSubmit(false);
    setSubmitError('');
    setSubmissionRecord(null);
    setBenefitOpenedWhatsApp(false);
    setShowSuccessModal(false);
    setSecondsLeft(10);
    setStep('form');
    scrollToTop();
  };

  const whatsappDiscountUrl = buildDiscountAdviceWhatsAppUrl({
    nombrePostulante: submissionRecord?.nombrePostulante || formData.nombrePostulante,
    codigoPostulacion: submissionRecord?.codigoPostulacion || '',
  });

  // ============================================================================
  // PANTALLA DE BENEFICIO ADICIONAL (+ MODAL FLOTANTE DE CONFIRMACIÓN 10s)
  // ============================================================================
  if (step === 'beneficio') {
    return (
      <main className="aniv-stage-main">
        <SEOHead pageKey="aniversarioBogota" />
        <section className="section aniv-stage-section">
          <div className="container container-narrow">
            <div className="aniv-progress-pill">
              <span>Postulación confirmada · Beneficio especial de aniversario</span>
            </div>

            <div className="card aniv-result-card aniv-benefit-card">
              <span className="badge badge-wine aniv-benefit-eyebrow">
                <Sparkles size={15} />
                <span>BENEFICIO ESPECIAL DE ANIVERSARIO</span>
              </span>

              <h1 className="text-serif aniv-result-title">
                ¡TENEMOS ALGO MÁS PARA TI!
              </h1>

              <p className="aniv-benefit-question">
                ¿Necesitas hablar con un abogado sin esperar a que termine la selección?
              </p>

              <p className="aniv-benefit-intro">
                Si tu familiar fue capturado recientemente, tiene una audiencia próxima o necesitas
                saber qué hacer con su caso, tenemos un beneficio especial por nuestro aniversario.
              </p>

              <div className="aniv-offer-box">
                <div className="aniv-offer-header">
                  <Video size={22} className="text-gold" />
                  <h2 className="text-serif">ASESORÍA PENAL POR VIDEOLLAMADA</h2>
                </div>

                <div className="aniv-discount-badge">¡60 % DE DESCUENTO!</div>

                <div className="aniv-pricing-block">
                  <div className="aniv-price-normal">
                    Precio normal: <span>$150.000</span>
                  </div>
                  <div className="aniv-price-special">
                    PRECIO ESPECIAL: <strong>$60.000</strong>
                  </div>
                </div>

                <p className="aniv-offer-description">
                  Puedes contarle tu situación a uno de nuestros abogados penalistas, resolver tus
                  dudas y recibir orientación sobre los pasos que puedes seguir.
                </p>
              </div>

              <div className="aniv-benefit-actions">
                <a
                  href={whatsappDiscountUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSelectDiscountAdvice}
                  className="btn btn-whatsapp aniv-btn-lg aniv-btn-full"
                >
                  <WhatsAppIcon size={21} />
                  <span>QUIERO MI ASESORÍA POR $60.000</span>
                </a>
                <p className="aniv-wa-caption">
                  Este botón dirige a WhatsApp: <strong>{WHATSAPP_DISPLAY}</strong>.
                </p>

                {benefitOpenedWhatsApp && (
                  <div className="aniv-wa-opened-banner" role="status">
                    <CheckCircle2 size={18} />
                    <span>
                      ¡Listo! Se abrió WhatsApp con tu código{' '}
                      <strong>{submissionRecord?.codigoPostulacion}</strong> para agendar tu
                      asesoría por $60.000.
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleDeclineDiscount}
                  className="btn btn-outline-wine aniv-btn-full"
                >
                  <span>NO, GRACIAS. TERMINAR</span>
                </button>
              </div>

              <div className="aniv-benefit-footnotes">
                <p className="aniv-reassurance-box">
                  <ShieldCheck size={17} className="text-gold" />
                  <span>
                    Este beneficio es completamente opcional. Tu postulación gratuita ya quedó
                    registrada y no cambia si decides contratar o no la asesoría.
                  </span>
                </p>
                <p className="aniv-terms-note">
                  <Clock size={14} />
                  <span>
                    Promoción válida hasta el 29 de noviembre de 2026. Asesoría virtual sujeta a
                    disponibilidad; no incluye representación en audiencias.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {showSuccessModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="aniv-success-modal-title"
            className="aniv-success-modal-overlay"
            onClick={handleCloseSuccessModal}
          >
            <div
              className="aniv-success-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleCloseSuccessModal}
                aria-label="Cerrar confirmación"
                className="aniv-success-modal-close"
              >
                <X size={18} />
              </button>

              <div className="aniv-result-icon-wrap">
                <CheckCircle2 size={54} className="text-gold" />
              </div>

              {submissionRecord?.codigoPostulacion && (
                <div className="aniv-code-badge">
                  Código de registro: <strong>{submissionRecord.codigoPostulacion}</strong>
                </div>
              )}

              <h2 id="aniv-success-modal-title" className="text-serif aniv-success-modal-title">
                ¡LISTO! TU CASO YA ESTÁ POSTULADO.
              </h2>

              <p className="aniv-result-lead" style={{ marginBottom: '1rem' }}>
                <strong>¡Tu participación fue registrada con éxito!</strong>
              </p>

              <div className="aniv-result-copy" style={{ marginBottom: '1.25rem' }}>
                <p>
                  Gracias por hacer parte de la celebración de nuestro primer año en Bogotá.
                </p>
                <p>
                  En AMF Firma Legal revisaremos las postulaciones y seleccionaremos un caso para
                  brindar representación penal gratuita.
                </p>
                <p className="aniv-highlight-statement">
                  No tienes que pagar nada. Ya estás participando.
                </p>
              </div>

              <div className="aniv-trust-box" style={{ marginBottom: '1rem' }}>
                <Lock size={17} className="text-gold" />
                <span>Tu información será tratada con absoluta reserva y confidencialidad.</span>
              </div>

              <p className="aniv-disclaimer-text" style={{ marginBottom: '1.25rem' }}>
                La postulación no garantiza que el caso sea seleccionado ni significa que ya tengas
                un abogado asignado.
              </p>

              <div className="aniv-countdown-wrap">
                <div className="aniv-countdown-bar-track">
                  <div
                    className="aniv-countdown-bar-fill"
                    style={{ width: `${Math.max(0, Math.min(100, (secondsLeft / 10) * 100))}%` }}
                  />
                </div>
                <span className="aniv-countdown-text">
                  Este aviso se cerrará automáticamente en <strong>{secondsLeft}s</strong>
                </span>
              </div>

              <div className="aniv-result-actions">
                <button
                  type="button"
                  onClick={handleCloseSuccessModal}
                  className="btn btn-gold aniv-btn-lg"
                >
                  <span>CONTINUAR</span>
                  <ArrowRight size={19} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }

  // ============================================================================
  // PANTALLA DE CIERRE
  // ============================================================================
  if (step === 'finalizado') {
    return (
      <main className="aniv-stage-main">
        <SEOHead pageKey="aniversarioBogota" />
        <section className="section aniv-stage-section">
          <div className="container container-narrow">
            <div className="card aniv-result-card aniv-confirm-card">
              <div className="aniv-result-icon-wrap">
                <Scale size={52} className="text-gold" />
              </div>

              {submissionRecord?.codigoPostulacion && (
                <div className="aniv-code-badge">
                  Código de registro: <strong>{submissionRecord.codigoPostulacion}</strong>
                </div>
              )}

              <h1 className="text-serif aniv-result-title">
                ¡GRACIAS POR POSTULAR TU CASO!
              </h1>

              <div className="aniv-result-copy">
                <p>
                  Tu participación en la convocatoria de nuestro primer año en Bogotá quedó
                  guardada correctamente.
                </p>
                <p>
                  Nuestro equipo revisará los casos recibidos bajo estricta reserva y
                  confidencialidad.
                </p>
              </div>

              <div className="aniv-result-actions aniv-final-actions">
                <Link to="/" className="btn btn-primary">
                  <span>Conocer AMF Firma Legal S.A.S.</span>
                  <ArrowRight size={17} />
                </Link>
                <button
                  type="button"
                  onClick={handleRestartFlow}
                  className="btn btn-outline-wine"
                >
                  <RotateCcw size={16} />
                  <span>Registrar otra postulación</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ============================================================================
  // VISTA PRINCIPAL: HERO + FORMULARIO
  // ============================================================================
  return (
    <main>
      <SEOHead pageKey="aniversarioBogota" />

      <section className="aniv-hero">
        <div
          className="aniv-hero-bg-image"
          style={{ backgroundImage: `url("${heroBgImage}")` }}
          aria-hidden="true"
        />
        <div className="aniv-hero-overlay" aria-hidden="true" />

        <div className="container aniv-hero-inner">
          <div className="aniv-hero-content">
            <span className="badge badge-wine aniv-hero-badge">
              <Sparkles size={15} />
              <span>AMF FIRMA LEGAL S.A.S.</span>
            </span>

            <h1 className="text-serif aniv-hero-title">¡CUMPLIMOS UN AÑO EN BOGOTÁ!</h1>
            <p className="aniv-hero-subtitle">
              ¡Y queremos celebrarlo regalando una defensa penal!
            </p>

            <div className="aniv-hero-description">
              <p>
                Si tú, un familiar o un conocido necesitan un abogado penalista por un caso
                ocurrido en Bogotá, esta oportunidad es para ustedes.
              </p>
              <p>
                Cuéntanos qué pasó. Nuestro equipo revisará los casos y seleccionará uno para
                brindar defensa penal gratuita.
              </p>
            </div>

            <div className="aniv-hero-cta-wrap">
              <button
                type="button"
                onClick={scrollToForm}
                className="btn btn-primary aniv-hero-cta"
              >
                <span>QUIERO PARTICIPAR GRATIS</span>
                <ArrowDown size={19} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="formulario-postulacion"
        ref={formSectionRef}
        className="section aniv-form-section"
      >
        <div className="container container-narrow">
          <div className="card aniv-form-card">
            <form onSubmit={handleSubmit} noValidate className="aniv-form">
              {hasAttemptedSubmit && Object.keys(errors).length > 0 && (
                <div className="aniv-alert-error" role="alert">
                  <AlertCircle size={20} />
                  <span>
                    Por favor revisa y completa los campos señalados en rojo para poder registrar tu
                    postulación.
                  </span>
                </div>
              )}

              {submitError && (
                <div className="aniv-alert-error" role="alert">
                  <AlertCircle size={20} />
                  <span>{submitError}</span>
                </div>
              )}

              {/* ── SECCIÓN 1: CUÉNTANOS SOBRE TI ── */}
              <div className="aniv-form-group-block">
                <div className="aniv-section-heading">
                  <span className="aniv-section-step">Sección 1</span>
                  <h2 className="text-serif">CUÉNTANOS SOBRE TI</h2>
                </div>

                <div className="aniv-field" data-field-container="nombrePostulante">
                  <label
                    htmlFor="nombrePostulante"
                    className={`aniv-label ${errors.nombrePostulante ? 'aniv-label--error' : ''}`}
                  >
                    1. ¿Cómo te llamas? *
                  </label>
                  <p className="aniv-helper">Escribe tu nombre y apellido.</p>
                  <input
                    ref={firstInputRef}
                    id="nombrePostulante"
                    type="text"
                    name="nombrePostulante"
                    autoComplete="name"
                    maxLength={150}
                    value={formData.nombrePostulante}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Ej. Laura Camila Martínez"
                    className={`aniv-input ${errors.nombrePostulante ? 'aniv-input--error' : ''}`}
                  />
                  {errors.nombrePostulante && (
                    <span className="aniv-error-msg">
                      <AlertCircle size={14} />
                      <span>{errors.nombrePostulante}</span>
                    </span>
                  )}
                </div>

                <div className="aniv-field" data-field-container="celularWhatsapp">
                  <label
                    htmlFor="celularWhatsapp"
                    className={`aniv-label ${errors.celularWhatsapp ? 'aniv-label--error' : ''}`}
                  >
                    2. ¿Cuál es tu número de celular? *
                  </label>
                  <p className="aniv-helper">
                    Escribe tu número celular de 10 dígitos para contactarte por WhatsApp.
                  </p>
                  <input
                    id="celularWhatsapp"
                    type="tel"
                    inputMode="tel"
                    name="celularWhatsapp"
                    autoComplete="tel"
                    maxLength={18}
                    value={formData.celularWhatsapp}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Ej. 301 234 5678"
                    className={`aniv-input ${errors.celularWhatsapp ? 'aniv-input--error' : ''}`}
                  />
                  {errors.celularWhatsapp && (
                    <span className="aniv-error-msg">
                      <AlertCircle size={14} />
                      <span>{errors.celularWhatsapp}</span>
                    </span>
                  )}
                </div>

                <fieldset className="aniv-field aniv-fieldset" data-field-container="quienNecesita">
                  <legend
                    className={`aniv-label ${errors.quienNecesita ? 'aniv-label--error' : ''}`}
                  >
                    3. ¿Quién necesita el abogado? *
                  </legend>
                  <div className="aniv-options-grid aniv-options-grid--3">
                    {QUIEN_NECESITA_OPTIONS.map((option) => {
                      const isSelected = formData.quienNecesita === option;
                      return (
                        <label
                          key={option}
                          className={`aniv-option-card ${isSelected ? 'is-selected' : ''} ${
                            errors.quienNecesita ? 'has-error' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="quienNecesita"
                            value={option}
                            checked={isSelected}
                            onChange={handleInputChange}
                            className="aniv-radio-input"
                          />
                          <span className="aniv-radio-indicator" aria-hidden="true">
                            {isSelected && <Check size={13} strokeWidth={3} />}
                          </span>
                          <span className="aniv-option-label">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.quienNecesita && (
                    <span className="aniv-error-msg">
                      <AlertCircle size={14} />
                      <span>{errors.quienNecesita}</span>
                    </span>
                  )}
                </fieldset>

                <div className="aniv-field" data-field-container="nombrePersona">
                  <label
                    htmlFor="nombrePersona"
                    className={`aniv-label ${errors.nombrePersona ? 'aniv-label--error' : ''}`}
                  >
                    4. ¿Cómo se llama la persona que necesita el abogado?
                    {formData.quienNecesita && formData.quienNecesita !== 'Yo.' ? ' *' : ''}
                  </label>
                  <p className="aniv-helper">
                    Si eres tú, no necesitas escribir nuevamente tu nombre.
                  </p>
                  <input
                    id="nombrePersona"
                    type="text"
                    name="nombrePersona"
                    maxLength={150}
                    value={formData.nombrePersona}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder={
                      formData.quienNecesita === 'Yo.'
                        ? 'Opcional (seleccionaste "Yo.")'
                        : 'Ej. Carlos Andrés Martínez'
                    }
                    className={`aniv-input ${errors.nombrePersona ? 'aniv-input--error' : ''}`}
                  />
                  {errors.nombrePersona && (
                    <span className="aniv-error-msg">
                      <AlertCircle size={14} />
                      <span>{errors.nombrePersona}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* ── SECCIÓN 2: CUÉNTANOS SOBRE EL CASO ── */}
              <div className="aniv-form-group-block">
                <div className="aniv-section-heading">
                  <span className="aniv-section-step">Sección 2</span>
                  <h2 className="text-serif">CUÉNTANOS SOBRE EL CASO</h2>
                </div>

                <fieldset className="aniv-field aniv-fieldset" data-field-container="ocurrioBogota">
                  <legend
                    className={`aniv-label ${errors.ocurrioBogota ? 'aniv-label--error' : ''}`}
                  >
                    5. ¿Lo que pasó ocurrió en Bogotá? *
                  </legend>
                  <div className="aniv-options-grid aniv-options-grid--3">
                    {OCURRIO_BOGOTA_OPTIONS.map((option) => {
                      const isSelected = formData.ocurrioBogota === option;
                      return (
                        <label
                          key={option}
                          className={`aniv-option-card ${isSelected ? 'is-selected' : ''} ${
                            errors.ocurrioBogota ? 'has-error' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="ocurrioBogota"
                            value={option}
                            checked={isSelected}
                            onChange={handleInputChange}
                            className="aniv-radio-input"
                          />
                          <span className="aniv-radio-indicator" aria-hidden="true">
                            {isSelected && <Check size={13} strokeWidth={3} />}
                          </span>
                          <span className="aniv-option-label">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.ocurrioBogota && (
                    <span className="aniv-error-msg">
                      <AlertCircle size={14} />
                      <span>{errors.ocurrioBogota}</span>
                    </span>
                  )}
                </fieldset>

                <fieldset
                  className="aniv-field aniv-fieldset"
                  data-field-container="situacionActual"
                >
                  <legend
                    className={`aniv-label ${errors.situacionActual ? 'aniv-label--error' : ''}`}
                  >
                    6. ¿Cómo está esa persona hoy? *
                  </legend>
                  <div className="aniv-options-stack">
                    {SITUACION_ACTUAL_OPTIONS.map((option) => {
                      const isSelected = formData.situacionActual === option;
                      return (
                        <label
                          key={option}
                          className={`aniv-option-card ${isSelected ? 'is-selected' : ''} ${
                            errors.situacionActual ? 'has-error' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="situacionActual"
                            value={option}
                            checked={isSelected}
                            onChange={handleInputChange}
                            className="aniv-radio-input"
                          />
                          <span className="aniv-radio-indicator" aria-hidden="true">
                            {isSelected && <Check size={13} strokeWidth={3} />}
                          </span>
                          <span className="aniv-option-label">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.situacionActual && (
                    <span className="aniv-error-msg">
                      <AlertCircle size={14} />
                      <span>{errors.situacionActual}</span>
                    </span>
                  )}
                </fieldset>

                <div className="aniv-field" data-field-container="relatoCaso">
                  <label
                    htmlFor="relatoCaso"
                    className={`aniv-label ${errors.relatoCaso ? 'aniv-label--error' : ''}`}
                  >
                    7. Cuéntanos qué pasó y en qué va el caso. *
                  </label>
                  <p className="aniv-helper">
                    Escribe lo que sepas, con tus propias palabras. Por ejemplo: qué ocurrió, si ya
                    tuvo alguna audiencia o si está esperando un juicio.
                  </p>
                  <p className="aniv-helper-plain">No tienes que conocer palabras jurídicas.</p>
                  <textarea
                    id="relatoCaso"
                    name="relatoCaso"
                    rows={5}
                    value={formData.relatoCaso}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    placeholder="Cuéntanos con tus propias palabras qué ocurrió y cómo va el proceso..."
                    className={`aniv-textarea ${errors.relatoCaso ? 'aniv-input--error' : ''}`}
                  />
                  {errors.relatoCaso && (
                    <span className="aniv-error-msg">
                      <AlertCircle size={14} />
                      <span>{errors.relatoCaso}</span>
                    </span>
                  )}
                  <div className="aniv-confidential-inline">
                    <Lock size={15} className="text-gold" />
                    <span>
                      <strong>
                        Toda la información que nos compartas será manejada con estricta reserva y
                        confidencialidad.
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* ── SECCIÓN 3: ANTES DE ENVIAR ── */}
              <div className="aniv-form-group-block aniv-form-group-block--last">
                <div className="aniv-section-heading">
                  <span className="aniv-section-step">Sección 3</span>
                  <h2 className="text-serif">ANTES DE ENVIAR</h2>
                </div>

                <div
                  className={`aniv-datos-box ${
                    errors.aceptaDatos ? 'aniv-datos-box--error' : 'aniv-datos-box--normal'
                  }`}
                  data-field-container="aceptaDatos"
                >
                  <div className="aniv-datos-title">Permiso para utilizar tus datos</div>

                  <label htmlFor="aniv-aceptaDatos" className="aniv-datos-label">
                    <input
                      type="checkbox"
                      id="aniv-aceptaDatos"
                      name="aceptaDatos"
                      checked={formData.aceptaDatos}
                      onChange={handleInputChange}
                      className="aniv-checkbox"
                    />
                    <span className="aniv-datos-copy">
                      He leído la Política de Tratamiento de Datos Personales de AMF Firma Legal
                      S.A.S. y autorizo el uso de mis datos para revisar mi postulación y
                      contactarme.
                    </span>
                  </label>

                  <div className="aniv-datos-policy-link-wrap">
                    <button
                      type="button"
                      onClick={() => setShowPolicyModal(true)}
                      className="aniv-policy-trigger"
                    >
                      <BookOpen size={15} className="text-gold" />
                      <span>Leer Política de Tratamiento de Datos Personales</span>
                    </button>
                  </div>

                  {errors.aceptaDatos && (
                    <div className="aniv-datos-error">
                      <AlertCircle size={16} />
                      <span>{errors.aceptaDatos}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-gold aniv-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="aniv-spin" />
                      <span>Registrando tu caso...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={20} />
                      <span>ENVIAR MI CASO GRATIS</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <PolicyModal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        onAccept={() => updateField('aceptaDatos', true)}
      />
    </main>
  );
};
