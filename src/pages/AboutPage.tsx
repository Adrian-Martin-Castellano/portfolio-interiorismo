import styles from './AboutPage.module.css';
import { useLanguage } from '../context/LanguageContext'; 

import profileImg from '../assets/perfil.jpeg'; 

function AboutPage() {
  const { language } = useLanguage(); 

  const content = {
    es: {
      badge: 'Sobre Mí',
      greeting: 'Hola, soy',
      name: '[Tu Nombre]',
      title: '[Tu Titulación / Profesión Principal]',
      bio: 'biografia descripcion',
      contactBtn: 'Contactar',
      cvBtn: 'Descargar CV',
      
      educationSectionTag: 'Formación & Experiencia',
      educationSectionTitle: 'Trayectoria Académica',
      education: [
        {
          degree: 'Máster / Postgrado en [Tu Especialidad]',
          institution: 'Universidad / Institución Educativa',
          period: '2022 - 2024',
          description: 'Especialización en [área clave]. Proyecto final centrado en [tema o logro destacado].',
        },
        {
          degree: 'Grado Universitario en [Tu Carrera]',
          institution: 'Nombre de la Universidad',
          period: '2018 - 2022',
          description: 'Formación integral en [materias principales]. Mención honorífica en [asignatura o proyecto].',
        },
        {
          degree: 'Certificación Profesional en [Área de Interés]',
          institution: 'Plataforma / Academia (ej. Google, Coursera)',
          period: '2023',
          description: 'Validación de competencias prácticas en [herramientas o metodologías].',
        },
      ],

      skillsSectionTag: 'Capacidades',
      skillsSectionTitle: 'Mis Habilidades',
      skillCategories: [
        {
          title: 'Habilidades Técnicas',
          skills: ['Especialidad 1', 'Especialidad 2', 'Especialidad 3', 'Metodología A', 'Análisis de datos'],
        },
        {
          title: 'Herramientas & Software',
          skills: ['Figma / Adobe XD', 'React / Next.js', 'Git / GitHub', 'Suite Office / Notion', 'Software X'],
        },
        {
          title: 'Habilidades Blandas',
          skills: ['Pensamiento Crítico', 'Comunicación Asertiva', 'Resolución de Problemas', 'Trabajo en Equipo', 'Gestión del Tiempo'],
        },
        {
          title: 'Idiomas',
          skills: ['Español (Nativo)', 'Inglés (C1 / Avanzado)', 'Francés (B1 / Intermedio)'],
        },
      ],

      philosophyTag: 'Filosofía Profesional',
      quote: '"La calidad no es un acto, es un hábito."',
      philosophyText: 'algo',
    },

    en: {
      badge: 'About Me',
      greeting: "Hello, I'm",
      name: '[Your Name]',
      title: '[Your Degree / Main Profession]',
      bio: 'biography description',
      contactBtn: 'Contact Me',
      cvBtn: 'Download CV',
      
      educationSectionTag: 'Background & Experience',
      educationSectionTitle: 'Academic Journey',
      education: [
        {
          degree: "Master's Degree / Postgraduate in [Your Specialty]",
          institution: 'University / Educational Institution',
          period: '2022 - 2024',
          description: 'Specialization in [key area]. Final project focused on [featured topic or achievement].',
        },
        {
          degree: "Bachelor's Degree in [Your Field]",
          institution: 'University Name',
          period: '2018 - 2022',
          description: 'Comprehensive training in [main subjects]. Honors in [subject or project].',
        },
        {
          degree: 'Professional Certification in [Area of Interest]',
          institution: 'Platform / Academy (e.g., Google, Coursera)',
          period: '2023',
          description: 'Validation of practical skills in [tools or methodologies].',
        },
      ],

      skillsSectionTag: 'Capacities',
      skillsSectionTitle: 'My Skills',
      skillCategories: [
        {
          title: 'Technical Skills',
          skills: ['Specialty 1', 'Specialty 2', 'Specialty 3', 'Methodology A', 'Data Analysis'],
        },
        {
          title: 'Tools & Software',
          skills: ['Figma / Adobe XD', 'React / Next.js', 'Git / GitHub', 'Office Suite / Notion', 'Software X'],
        },
        {
          title: 'Soft Skills',
          skills: ['Critical Thinking', 'Assertive Communication', 'Problem Solving', 'Teamwork', 'Time Management'],
        },
        {
          title: 'Languages',
          skills: ['Spanish (Native)', 'English (C1 / Advanced)', 'French (B1 / Intermediate)'],
        },
      ],

      philosophyTag: 'Professional Philosophy',
      quote: '"Quality is not an act, it is a habit."',
      philosophyText: 'Something',
    },
  };

  const t = content[language] || content.es;

  return (
    <div className={styles.aboutContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroCard}>
          <div className={styles.profileImageWrapper}>
            <img 
              src={profileImg} 
              alt={t.name} 
              className={styles.profileImage} 
            />
          </div>

          <div className={styles.heroInfo}>
            <span className={styles.badge}>{t.badge}</span>
            <h1>{t.greeting} <span className={styles.accentText}>{t.name}</span></h1>
            <h2>{t.title}</h2>
            <p className={styles.bio}>{t.bio}</p>
            
            <div className={styles.heroActions}>
              <a href="#contacto" className={styles.primaryBtn}>{t.contactBtn}</a>
              <a href="/tu-cv.pdf" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                {t.cvBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <span>{t.educationSectionTag}</span>
          <h2>{t.educationSectionTitle}</h2>
        </div>

        <div className={styles.timeline}>
          {t.education.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <span className={styles.period}>{item.period}</span>
                <h3>{item.degree}</h3>
                <h4 className={styles.institution}>{item.institution}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <span>{t.skillsSectionTag}</span>
          <h2>{t.skillsSectionTitle}</h2>
        </div>

        <div className={styles.skillsGrid}>
          {t.skillCategories.map((cat, idx) => (
            <div key={idx} className={styles.skillCard}>
              <h3>{cat.title}</h3>
              <div className={styles.tagsContainer}>
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.sectionWrapper}>
        <div className={styles.valuesCard}>
          <span>{t.philosophyTag}</span>
          <h2>{t.quote}</h2>
          <p>{t.philosophyText}</p>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;