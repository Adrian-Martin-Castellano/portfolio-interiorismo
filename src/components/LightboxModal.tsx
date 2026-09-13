import { useEffect } from 'react';
import styles from '../pages/Home.module.css';
import type { StyleDetails } from './StyleCard';

export interface LightboxModalProps {
  isOpen: boolean;
  images: string[];
  index: number;
  title: string;
  category: string;
  details: StyleDetails | null;
  styleIndex: number;
  totalStyles: number;
  onClose: () => void;
  onNextImage: (e?: React.MouseEvent) => void;
  onPrevImage: (e?: React.MouseEvent) => void;
  onNextStyle: () => void;
  onPrevStyle: () => void;
}

export function LightboxModal({
  isOpen,
  images,
  index,
  title,
  category,
  details,
  styleIndex,
  totalStyles,
  onClose,
  onNextImage,
  onPrevImage,
  onNextStyle,
  onPrevStyle
}: LightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNextImage();
      if (e.key === 'ArrowLeft') onPrevImage();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNextImage, onPrevImage, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <div className={styles.lightboxHeader} onClick={(e) => e.stopPropagation()}>
        {/* Selector / Conmutador entre Estilos */}
        <div className={styles.styleSwitchNav}>
          <button className={styles.styleNavBtn} onClick={onPrevStyle} title="Estilo anterior">
            ← Estilo anterior
          </button>
          <span className={styles.styleNavCounter}>
            Estilo {String(styleIndex + 1).padStart(2, '0')} / {String(totalStyles).padStart(2, '0')}
          </span>
          <button className={styles.styleNavBtn} onClick={onNextStyle} title="Siguiente estilo">
            Siguiente estilo →
          </button>
        </div>

        <div className={styles.lightboxHeaderTitles}>
          <span className={styles.lightboxCategory}>{category}</span>
          <h2 className={styles.lightboxTitle}>{title}</h2>
        </div>

        <button className={styles.lightboxCloseBtn} onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
      </div>

      <div className={styles.lightboxMainLayout} onClick={(e) => e.stopPropagation()}>
        {/* Visor de imágenes */}
        <div className={styles.lightboxStage}>
          <img src={images[index]} alt={title} className={styles.lightboxImage} />

          {images.length > 1 && (
            <>
              <button className={`${styles.lightboxArrow} ${styles.lightboxPrev}`} onClick={onPrevImage}>
                ‹
              </button>
              <button className={`${styles.lightboxArrow} ${styles.lightboxNext}`} onClick={onNextImage}>
                ›
              </button>
            </>
          )}

          <div className={styles.lightboxImgCounter}>
            Foto {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </div>

        {/* Panel de detalles */}
        {details && (
          <div className={styles.lightboxDetailsPanel}>
            <div className={styles.detailsSection}>
              <p className={styles.extendedDescription}>{details.extendedText}</p>
            </div>

            <div className={styles.detailsSection}>
              <h4>Paleta Cromática</h4>
              <div className={styles.colorSwatches}>
                {details.palette.map((color, cIdx) => (
                  <div key={cIdx} className={styles.swatchItem}>
                    <span className={styles.colorCircle} style={{ backgroundColor: color }} />
                    <span className={styles.colorCode}>{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.detailsSection}>
              <h4>Materiales Clave</h4>
              <ul className={styles.materialsList}>
                {details.materials.map((mat, mIdx) => (
                  <li key={mIdx}>{mat}</li>
                ))}
              </ul>
            </div>

            <div className={styles.detailsSection}>
              <h4>Iluminación</h4>
              <p className={styles.lightingText}>{details.lighting}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}