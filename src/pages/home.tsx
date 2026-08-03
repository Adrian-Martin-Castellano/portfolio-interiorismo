import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

interface StyleCardProps {
  index: number;
  images: string[];
  category: string;
  title: string;
  quote: string;
  description: string;
  alignment: 'left' | 'right';
}

function StyleCard({ index, images, category, title, quote, description, alignment }: StyleCardProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const alignmentClass = alignment === 'right' ? styles.alignRight : styles.alignLeft;
  // Formatear número a "01", "02", etc.
  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <div className={`${styles.styleFloatingCard} ${alignmentClass}`}>
      <div className={styles.styleCardContent}>
        <div className={styles.carouselContainer}>
          <div 
            className={styles.carouselTrack} 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, imgIdx) => (
              <img 
                key={imgIdx} 
                src={img} 
                alt={`${title} ${imgIdx + 1}`} 
                className={styles.carouselImage} 
              />
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
                    onClick={() => setCurrentIndex(dotIdx)}
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
        </div>

      </div>
    </div>
  );
}

function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroCard}>
          <h1>BLIC</h1>
          <p className={styles.subtitle}>Diseño que habla, ideas que inspiran</p>
          <Link to="/proyectos" className={styles.ctaButton}>
            Ver Proyectos
          </Link>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className={styles.videoHeader}>
          <span>Explora nuestro universo</span>
          <h2>Esencia en movimiento</h2>
        </div>
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video autoPlay muted loop playsInline className={styles.mainVideo}>
              <source src="/video-presentacion.mp4" type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
            <div className={styles.videoOverlay}></div>
          </div>
        </div>
      </section>

      <section className={styles.summarySection}>
        <div className={styles.summaryContent}>
          <h2>Espacios con alma</h2>
          <p>
            Especializado en proyectos de interiorismo que equilibran la estética contemporánea con la calidez natural. 
            Cada espacio está diseñado al detalle para reflejar la identidad y necesidades de quienes lo habitan.
          </p>
          <div className={styles.linksGrid}>
            <Link to="/sobre-mi" className={styles.secondaryLink}>→ Conoce el estudio</Link>
            <Link to="/contacto" className={styles.secondaryLink}>→ ¿Tienes una idea? Hablemos</Link>
          </div>
        </div>
      </section>

      <section className={styles.stylesSectionWrapper}>
        <div className={styles.stylesIntroHeader}>
          <span>Nuestra Identidad</span>
          <h2>Líneas de Diseño de Autor</h2>
        </div>

        <StyleCard 
          index={0}
          alignment="left"
          category="Colección Natura"
          title="Esencia Balinesa"
          quote="“Una oda a la desconexión tropical, donde la arquitectura se rinde ante la textura pura de la piedra y la teca.”"
          description="Uso profundo de maderas exóticas certificadas, fibras naturales trenzadas a mano (ratán, mimbre) y presencia de piedra volcánica escultórica. Una fusión orgánica constante entre el espacio interior y la naturaleza exótica."
          images={['/assets/balines-1.png', '/assets/balines-2.png', '/assets/balines-3.png']}
        />

        <StyleCard 
          index={1}
          alignment="right"
          category="Colección Pureza"
          title="Minimalismo Cálido"
          quote="“Reducir a lo esencial para hallar la calma absoluta, esculpiendo el espacio a través de la luz y los materiales crudos.”"
          description="Ausencia de ornamentos innecesarios en favor de geometrías puras. El diseño se enriquece con texturas rugosas de morteros de cal, paletas tonales en gamas suaves de beige, arena y hueso, junto a una iluminación indirecta que aporta serenidad."
          images={['/assets/minimal-1.png', '/assets/minimal-2.png', '/assets/minimal-3.png']}
        />

        <StyleCard 
          index={2}
          alignment="left"
          category="Colección Urbana"
          title="Industrial Orgánico"
          quote="“El carácter de la estructura vista y el metal, suavizado por la calidez texturizada de la madera recuperada.”"
          description="Elementos estructurales honestos como el hormigón o el hierro forjado, contrastados estratégicamente con grandes plantas de hoja verde, textiles naturales pesados y maderas nobles que transforman la rudeza en sofisticación."
          images={['/assets/industrial-1.png', '/assets/industrial-2.png', '/assets/industrial-3.png']}
        />

        <StyleCard 
          index={3}
          alignment="right"
          category="Colección Vanguardia"
          title="Línea Contemporánea"
          quote="“El reflejo del diseño actual. Espacios sofisticados donde conviven piezas icónicas de arte con molduras clásicas.”"
          description="Espacios donde conviven acabados modernos, mármoles de vetas muy marcadas y una paleta cromática audaz pero sumamente equilibrada. Una narrativa ecléctica pensada para perdurar en el tiempo."
          images={['/assets/contemporaneo-1.png', '/assets/contemporaneo-2.png', '/assets/contemporaneo-3.png']}
        />

        <div className={`${styles.styleFloatingCard} ${styles.othersCard}`}>
          <div className={styles.othersContent}>
            <h3>Explorando horizontes</h3>
            <p>Cada espacio posee sus propias reglas. Aunque estas cuatro líneas definen nuestra esencia, en BLIC desarrollamos proyectos eclécticos, clásicos renovados o de corte rústico moderno.</p>
            <Link to="/proyectos" className={styles.secondaryLink}>Ver galería completa de proyectos →</Link>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Home;