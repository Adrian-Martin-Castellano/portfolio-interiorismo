import React from 'react';
import styles from './AboutPage.module.css';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { aboutData } from '../data/aboutData';

import profileImg from '../assets/perfil.webp';

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  description: string;
  image?: string; 
}

interface SkillCategory {
  title: string;
  skills: string[];
}

interface AboutDataContent {
  badge: string;
  greeting: string;
  name: string;
  title: string;
  bio: string;
  contactBtn: string;
  cvBtn: string;
  education: EducationItem[];
  skillCategories: SkillCategory[];
  philosophyTag: string;
  quote: string;
  philosophyText: string;
}

const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const t: AboutDataContent = aboutData[language] || aboutData.es;

  const getDynamicAsset = (folder: string, baseName: string, extension: string = 'webp') => {
    const mode = isDark ? 'oscuro' : 'claro';
    const lang = language === 'en' ? '_en' : '';
    return `/assets/${folder}/${baseName}_${mode}${lang}.${extension}`;
  };

  return (
    <div className={styles.aboutContainer}>
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroCard}>
          <div className={styles.profileImageWrapper}>
            <img src={profileImg} alt={t.name} className={styles.profileImage} />
          </div>

          <div className={styles.heroInfo}>
            <h1 className={styles.heroTitle}>{t.badge}</h1>
            <h2 className={styles.heroName}>{t.name}</h2>
            <h3 className={styles.heroSubTitle}>{t.title}</h3>
            
            <p className={styles.bio}>{t.bio}</p>
            
            <div className={styles.heroActions}>
              <a href="#contacto-directo" className={styles.primaryBtn}>
                {t.contactBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRAYECTORIA ACADÉMICA */}
      <section className={styles.sectionWrapper}>
        <div className={styles.stylesIntroHeader5}>
          <img 
            src={getDynamicAsset('marcos', 'marco_trayectoria_academica')} 
            alt="Trayectoria Académica" 
            className={styles.introHeaderImage}
          />
        </div>

        <div className={styles.timeline}>
          {t.education.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <div className={styles.timelineImageWrapper}>
                  <img 
                    src={item.image || `/assets/educacion/edu_${index + 1}.webp`} 
                    alt={item.degree} 
                    className={styles.timelineImage} 
                  />
                </div>

                <div className={styles.timelineTextContent}>
                  <span className={styles.period}>{item.period}</span>
                  <h3>{item.degree}</h3>
                  <h4 className={styles.institution}>{item.institution}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MIS HABILIDADES */}
      <section className={styles.sectionWrapper}>
        <div className={styles.stylesIntroHeader5}>
          <img 
            src={getDynamicAsset('marcos', 'marco_mis_habilidades')} 
            alt="Mis Habilidades" 
            className={styles.introHeaderImage}
          />
        </div>

        <div className={styles.skillsGrid}>
          {t.skillCategories.map((cat, idx) => (
            <div key={idx} className={styles.skillCard}>
              <div className={styles.skillCardHeader}>
                <span className={styles.skillCardIcon}>❖</span>
                <h3>{cat.title}</h3>
              </div>
              <div className={styles.tagsContainer}>
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className={styles.skillTag}>
                    <span className={styles.bulletDot}></span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FILOSOFÍA / VALORES */}
      <section className={styles.sectionWrapper}>
        <div className={styles.valuesCard}>
          <div className={styles.quoteDecorativeIcon}>“</div>
          <span>{t.philosophyTag}</span>
          <h2>{t.quote}</h2>
          <p>{t.philosophyText}</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;