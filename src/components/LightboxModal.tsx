import { useEffect } from 'react';
import styles from './LightboxModal.module.css'
import type { StyleDetails } from './StyleCard';
import { useLanguage } from '../context/LanguageContext';

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
  const { language } = useLanguage();
  const isEn = language === 'en';

  const prevLabel = isEn ? 'PREV' : 'ANT';
  const nextLabel = isEn ? 'NEXT' : 'SIG';
  const photoLabel = isEn ? 'Photo' : 'Foto';

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
      <div className={styles.lightboxContainer} onClick={(e) => e.stopPropagation()}>
        
        {/* CABECERA FIJA SUPERIOR */}
        <div className={styles.lightboxHeader}>
          <div className={styles.lightboxTopBar}>
            <span className={styles.styleBadgeCounter}>
              {String(styleIndex + 1).padStart(2, '0')} / {String(totalStyles).padStart(2, '0')}
            </span>

            <div className={styles.stylePillNav}>
              <button className={styles.stylePillBtn} onClick={onPrevStyle} title="Colección anterior">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>{prevLabel}</span>
              </button>
              <span className={styles.pillDivider}></span>
              <button className={styles.stylePillBtn} onClick={onNextStyle} title="Siguiente colección">
                <span>{nextLabel}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            <button className={styles.lightboxCloseBtn} onClick={onClose} aria-label="Cerrar modal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className={styles.lightboxTitleBlock}>
            <span className={styles.lightboxCategory}>{category}</span>
            <h2 className={styles.lightboxTitle}>{title}</h2>
          </div>
        </div>

        <div className={styles.lightboxMainLayout}>
          
          <div className={styles.lightboxStage}>
            <div className={styles.lightboxImgWrapper}>
              <img src={images[index]} alt={title} className={styles.lightboxImage} />

              {images.length > 1 && (
                <>
                  <button 
                    className={`${styles.lightboxArrow} ${styles.lightboxPrev}`} 
                    onClick={onPrevImage}
                    aria-label="Foto anterior"
                  >
                    ‹
                  </button>
                  <button 
                    className={`${styles.lightboxArrow} ${styles.lightboxNext}`} 
                    onClick={onNextImage}
                    aria-label="Siguiente foto"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div className={styles.lightboxImgCounter}>
              {photoLabel} {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
          </div>

          {details && (
            <div className={styles.lightboxDetailsPanel}>
              <div className={styles.detailsSection}>
                <p className={styles.extendedDescription}>{details.extendedText}</p>
              </div>

              <div className={styles.detailsSection}>
                <h4>{isEn ? 'Color Palette' : 'Paleta Cromática'}</h4>
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
                <h4>{isEn ? 'Key Materials' : 'Materiales Clave'}</h4>
                <ul className={styles.materialsList}>
                  {details.materials.map((mat, mIdx) => (
                    <li key={mIdx}>{mat}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.detailsSection}>
                <h4>{isEn ? 'Lighting' : 'Iluminación'}</h4>
                <p className={styles.lightingText}>{details.lighting}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}