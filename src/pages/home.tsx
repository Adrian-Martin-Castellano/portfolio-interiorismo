import { Link } from 'react-router-dom';
import styles from './Home.module.css';

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
    </div>
  );
}

export default Home;