import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const [currentBalines, setCurrentBalines] = useState(0);
  const totalBalinesImages = 3; 

  const nextBalines = () => {
    setCurrentBalines((prev) => (prev + 1) % totalBalinesImages);
  };

  const prevBalines = () => {
    setCurrentBalines((prev) => (prev - 1 + totalBalinesImages) % totalBalinesImages);
  };
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
          <div className={`${styles.styleFloatingCard} ${styles.alignLeft} ${styles.editorialLayout}`}>
            <div className={styles.styleCardContent}>
              
              <div className={styles.carouselContainer}>
                <div 
                  className={styles.carouselTrack} 
                  style={{ transform: `translateX(-${currentBalines * 100}%)` }}
                >
                  <img src="/assets/balines-1.png" alt="Interior Balinés BLIC 1" className={styles.carouselImage} />
                  <img src="/assets/balines-2.png" alt="Interior Balinés BLIC 2" className={styles.carouselImage} />
                  <img src="/assets/balines-3.png" alt="Interior Balinés BLIC 3" className={styles.carouselImage} />
                </div>

                <button className={`${styles.navButton} ${styles.prevBtn}`} onClick={prevBalines}>‹</button>
            <button className={`${styles.navButton} ${styles.nextBtn}`} onClick={nextBalines}>›</button>
              </div>

              <div className={styles.styleInfo}>
                <span className={styles.projectCategory}>Colección Natura</span>
                <h3>Esencia Balinesa</h3>
                
                <p className={styles.editorialQuote}>
                  “Una oda a la desconexión tropical, donde la arquitectura se rinde ante la textura pura de la piedra y la teca.”
                </p>

                <p className={styles.mainDescription}>
                  Uso profundo de maderas exóticas certificadas, fibras naturales trenzadas a mano (ratán, mimbre) y presencia 
                  de piedra volcánica escultórica. Una fusión orgánica constante entre el espacio interior y la naturaleza exótica.
                </p>
              </div>

            </div>
          </div>

        <div className={`${styles.styleFloatingCard} ${styles.alignRight}`}>
          <div className={styles.styleCardContent}>
            <div className={styles.carouselContainer}>
              <div className={styles.carouselTrack}>
                <img src="/assets/minimal-1.jpg" alt="Estilo Minimalista 1" className={styles.carouselImage} />
                <img src="/assets/minimal-2.jpg" alt="Estilo Minimalista 2" className={styles.carouselImage} />
              </div>
              <div className={styles.carouselHint}>Desliza →</div>
            </div>
            <div className={styles.styleInfo}>
              <h3>Minimalismo Cálido</h3>
              <p>
                Reducción a lo esencial sin perder la hospitalidad. Líneas puras combinadas con texturas rugosas, 
                paletas tonales en gamas de beige y arena, y una iluminación indirecta que esculpe serenidad absoluta.
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.styleFloatingCard} ${styles.alignLeft}`}>
          <div className={styles.styleCardContent}>
            <div className={styles.carouselContainer}>
              <div className={styles.carouselTrack}>
                <img src="/assets/industrial-1.jpg" alt="Estilo Industrial 1" className={styles.carouselImage} />
                <img src="/assets/industrial-2.jpg" alt="Estilo Industrial 2" className={styles.carouselImage} />
              </div>
              <div className={styles.carouselHint}>Desliza →</div>
            </div>
            <div className={styles.styleInfo}>
              <h3>Industrial Orgánico</h3>
              <p>
                El carácter urbano suavizado por la naturaleza. Elementos estructurales vistos como el hormigón o el hierro forjado, 
                contrastados con grandes plantas de hoja verde, maderas recuperadas y textiles que aportan calidez al espacio texturizado.
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.styleFloatingCard} ${styles.alignRight}`}>
          <div className={styles.styleCardContent}>
            <div className={styles.carouselContainer}>
              <div className={styles.carouselTrack}>
                <img src="/assets/contemporaneo-1.jpg" alt="Estilo Contemporáneo 1" className={styles.carouselImage} />
                <img src="/assets/contemporaneo-2.jpg" alt="Estilo Contemporáneo 2" className={styles.carouselImage} />
              </div>
              <div className={styles.carouselHint}>Desliza →</div>
            </div>
            <div className={styles.styleInfo}>
              <h3>Línea Contemporánea</h3>
              <p>
                El reflejo del diseño actual. Espacios sofisticados donde conviven piezas de arte icónicas, molduras clásicas 
                con acabados modernos, mármoles con vetas marcadas y una paleta cromática audaz pero sumamente equilibrada.
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.styleFloatingCard} ${styles.othersCard}`}>
          <div className={styles.othersContent}>
            <h3>Explorando horizontes</h3>
            <p>
              Cada espacio posee sus propias reglas. Aunque estas cuatro líneas definen nuestra esencia, en BLIC desarrollamos 
              proyectos eclécticos, clásicos renovados o de corte rústico moderno. Nos adaptamos a la narrativa arquitectónica de tu espacio.
            </p>
            <Link to="/proyectos" className={styles.secondaryLink}>Ver galería completa de proyectos →</Link>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Home;