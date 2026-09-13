import styles from '../pages/Home.module.css';
import type { StyleDetails } from '../components/StyleCard';

interface LightboxModalProps {
  isOpen: boolean;
  images: string[];
  index: number;
  title: string;
  category: string;
  details: StyleDetails | null;
  onClose: () => void;
  onNext: (e?: React.MouseEvent) => void;
  onPrev: (e?: React.MouseEvent) => void;
}

export function LightboxModal({
  isOpen,
  images,
  index,
  title,
  category,
  details,
  onClose,
  onNext,
  onPrev
}: LightboxModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <div className={styles.lightboxHeader}>
        <div className={styles.lightboxHeaderTitles}>
          <span className={styles.lightboxCategory}>{category}</span>
          <h2 className={styles.lightboxTitle}>{title}</h2>
        </div>
        <button className={styles.lightboxCloseBtn} onClick={onClose}>✕</button>
      </div>

      <div className={styles.lightboxMainLayout} onClick={(e) => e.stopPropagation()}>
        <div className={styles.lightboxStage}>
          <img 
            src={images[index]} 
            alt={title} 
            className={styles.lightboxImage} 
          />

          {images.length > 1 && (
            <>
              <button className={`${styles.lightboxArrow} ${styles.lightboxPrev}`} onClick={onPrev}>
                ‹
              </button>
              <button className={`${styles.lightboxArrow} ${styles.lightboxNext}`} onClick={onNext}>
                ›
              </button>
            </>
          )}

          <div className={styles.lightboxImgCounter}>
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </div>

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