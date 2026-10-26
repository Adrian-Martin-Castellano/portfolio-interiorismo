import React from 'react';
import styles from './AboutPage.module.css';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { aboutData } from '../data/aboutData';

import profileImg from '../assets/perfil.webp';

// Iconos vectoriales para la sección de contacto
const Icons = {
  Email: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  )
};

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

  const contactItems = [
    {
      label: 'Email',
      value: 'tu-email@ejemplo.com',
      href: 'mailto:tu-email@ejemplo.com',
      icon: <Icons.Email />
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/tu-perfil',
      href: 'https://linkedin.com/in/tu-perfil',
      icon: <Icons.LinkedIn />
    },
    {
      label: 'WhatsApp',
      value: '+34 600 000 000',
      href: 'https://wa.me/34600000000',
      icon: <Icons.WhatsApp />
    },
    {
      label: 'Instagram',
      value: '@tu_usuario',
      href: 'https://instagram.com/tu_usuario',
      icon: <Icons.Instagram />
    }
  ];

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