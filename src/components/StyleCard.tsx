import { useState } from 'react';
import styles from '../pages/Home.module.css';

export interface StyleDetails {
  palette: string[];
  materials: string[];
  lighting: string;
  extendedText: string;
}

interface StyleCardProps {
  index: number;
  images: string[];
  category: string;
  title: string;
  quote: string;
  description: string;
  alignment: 'left' | 'right';
  details: StyleDetails;
  learnMoreText: string;
  onOpenLightbox: (images: string[], initialIndex: number, title: string, category: string, details: StyleDetails) => void;
}

export function StyleCard({
  index,
  images,
  category,
  title,
  quote,
  description,
  alignment,
  details,
  learnMoreText,
  onOpenLightbox
}: StyleCardProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const alignmentClass = alignment === 'right' ? styles.alignRight : styles.alignLeft;
  const formattedNumber = String(index + 1).padStart(2, '0');

  const handleOpenDetails = () => {
    onOpenLightbox(images, currentIndex, title, category, details);
  };

  return (
    <div className={`${styles.styleFloatingCard} ${alignmentClass}`}>
      <div className={styles.styleCardContent}>
        <div 
          className={styles.carouselContainer} 
          onClick={handleOpenDetails}
        >
          <div 
            className={styles.carouselTrack} 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, imgIdx) => (
              <div key={imgIdx} className={styles.imageZoomWrapper}>
                <img 
                  src={img} 
                  alt={`${title} ${imgIdx + 1}`} 
                  className={styles.carouselImage} 
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button 
                className={`${styles.navButton} ${styles.prevBtn}`} 
                onClick={prevSlide}
                aria-label="Anterior"
              >
                ‹
              </button>
              <button 
                className={`${styles.navButton} ${styles.nextBtn}`} 
                onClick={nextSlide}
                aria-label="Siguiente"
              >
                ›
              </button>
              <div className={styles.carouselDots}>
                {images.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    className={`${styles.dot} ${dotIdx === currentIndex ? styles.activeDot : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(dotIdx);
                    }}
                    aria-label={`Ir a imagen ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.styleInfo}>
          <span className={styles.watermarkNumber}>{formattedNumber}</span>
          <span className={styles.projectCategory}>{category}</span>
          <h3>{title}</h3>
          <p className={styles.editorialQuote}>{quote}</p>
          <p className={styles.mainDescription}>{description}</p>

          <button 
            className={styles.learnMoreCardBtn}
            onClick={handleOpenDetails}
          >
            <span>{learnMoreText}</span>
            <span className={styles.btnArrow}></span>
          </button>
        </div>
      </div>
    </div>
  );
}