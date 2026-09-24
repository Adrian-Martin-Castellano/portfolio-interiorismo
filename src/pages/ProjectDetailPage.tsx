import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import styles from './ProjectDetailPage.module.css';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { theme } = useTheme(); 
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = PROJECTS_DATA.find((p) => p.id === id);

  if (!project) {
    return (
      <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`} style={{ textAlign: 'center' }}>
        <h2>Proyecto no encontrado</h2>
        <button className={styles.backButton} onClick={() => navigate('/proyectos')}>
          ← Volver a proyectos
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : styles.light}`}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← VOLVER
      </button>

      <header className={styles.header}>
        <span className={styles.category}>{project.category[language]}</span>
        <h1 className={styles.title}>{project.title[language]}</h1>
        <p className={styles.description}>{project.description[language]}</p>
      </header>

      <section className={styles.gallery}>
        {project.images.map((img, idx) => (
          <div key={idx} className={styles.imageWrapper}>
            <img 
              src={img} 
              alt={`${project.title[language]} - Vista ${idx + 1}`} 
              className={styles.projectImage} 
            />
          </div>
        ))}
      </section>
    </div>
  );
}