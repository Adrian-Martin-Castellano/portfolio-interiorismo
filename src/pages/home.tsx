import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import backgroundImage from '../assets/hero-bg.png'; 

function Home() {
  return (
    <div className={styles.homeContainer}>
      <section 
        className={styles.heroSection} 
        style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.15)), url(${backgroundImage})` }}>
        
        <div className={styles.heroCard}>
          <h1>BLIC</h1>
          <p className={styles.subtitle}>Diseño que habla, ideas que inspiran</p>
          <Link to="/proyectos" className={styles.ctaButton}>
            Ver Proyectos
          </Link>
        </div>
      </section>

      <section className={styles.summarySection}>
        <div className={styles.summaryContent}>
          <h2>Espacios con alma</h2>
          <p>
            Especializado en proyectos de interiorismo que equilibran la estética contemporánea con la calidez natural. 
            Cada espacio está diseñado al detalle para reflejar la identidad y necesidades de quienes lo habitan, 
            utilizando paletas armónicas, texturas orgánicas y un enfoque minimalista.
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