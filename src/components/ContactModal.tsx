import { useState } from 'react';
import styles from './ContactModal.module.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'es' | 'en';
}

export function ContactModal({ isOpen, onClose, language }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const getValidationMessage = (type: 'required' | 'email') => {
    if (language === 'en') {
      return type === 'email' 
        ? 'Please enter a valid email address.' 
        : 'Please fill out this field.';
    }
    return type === 'email' 
      ? 'Por favor, introduce un correo electrónico válido.' 
      : 'Por favor, completa este campo.';
  };

  const handleInvalid = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'required' | 'email' = 'required') => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    target.setCustomValidity(getValidationMessage(type));
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    target.setCustomValidity(''); // Resetea el mensaje personalizado al escribir para permitir el envío
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "TU_ACCESS_KEY_AQUI"); 
    formData.append("subject", "Nuevo mensaje desde el Portfolio BLIC");
    formData.append("from_name", "Portfolio BLIC");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert(language === 'en' 
          ? "There was an error sending the message. Please try again." 
          : "Hubo un error al enviar el mensaje. Inténtalo de nuevo."
        );
      }
    } catch (error) {
      alert(language === 'en' 
        ? "Connection error. Please check your network." 
        : "Error de conexión. Revisa tu red."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        {!submitted ? (
          <>
            <span className={styles.tag}>
              {language === 'en' ? 'Direct Inquiry' : 'Atención Directa'}
            </span>
            <h2 className={styles.title}>
              {language === 'en' ? 'Contact the Studio' : 'Contacto Directo'}
            </h2>
            <p className={styles.subtitle}>
              {language === 'en' 
                ? 'Send us a message and we will get back to you as soon as possible.' 
                : 'Envíanos tu consulta. Recibirás una confirmación en tu correo de inmediato.'}
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <input type="checkbox" name="botcheck" className={styles.honeypot} style={{ display: 'none' }} />

              <div className={styles.inputGroup}>
                <label>{language === 'en' ? 'Your Email' : 'Tu Correo Electrónico'}</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="ejemplo@correo.com"
                  onInvalid={(e) => handleInvalid(e, 'email')}
                  onInput={handleInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>{language === 'en' ? 'Subject' : 'Asunto'}</label>
                <input 
                  type="text" 
                  name="subject_custom" 
                  required 
                  placeholder={language === 'en' ? 'e.g. Interiorism project' : 'ej. Consulta de proyecto'} 
                  onInvalid={(e) => handleInvalid(e, 'required')}
                  onInput={handleInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>{language === 'en' ? 'Message' : 'Mensaje / Descripción'}</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  required 
                  placeholder={language === 'en' ? 'Tell us about your space or ideas...' : 'Cuéntanos sobre tu espacio, ubicación o dudas...'} 
                  onInvalid={(e) => handleInvalid(e, 'required')}
                  onInput={handleInput}
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (language === 'en' ? 'Sending...' : 'Enviando...') 
                  : (language === 'en' ? 'SEND MESSAGE' : 'ENVIAR MENSAJE')}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h3>{language === 'en' ? 'Message Sent!' : '¡Mensaje Enviado!'}</h3>
            <p>
              {language === 'en'
                ? 'Thank you for reaching out. We have sent a confirmation email to your inbox and will respond personally as soon as possible.'
                : 'Gracias por escribirnos. Te hemos enviado un correo de confirmación y responderemos a tu consulta a la mayor brevedad posible.'}
            </p>
            <button className={styles.submitBtn} onClick={handleReset}>
              {language === 'en' ? 'Close' : 'Cerrar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}