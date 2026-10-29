import React, { useState } from 'react';
import styles from './AboutPage.module.css';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { aboutData } from '../data/aboutData';
import { FaPhone, FaInstagram, FaLinkedin, FaEnvelope, FaTimes } from 'react-icons/fa';

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

  // Estado para el modal de contacto
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <button 
                type="button" 
                className={styles.primaryBtn}
                onClick={() => setIsModalOpen(true)}
              >
                {t.contactBtn}
              </button>
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

      {/* 5. MODAL DE CONTACTO */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalCloseBtn} 
              onClick={() => setIsModalOpen(false)}
              aria-label="Cerrar"
            >
              <FaTimes />
            </button>

            <h3 className={styles.modalTitle}>
              {language === 'en' ? 'Contact Information' : 'Información de Contacto'}
            </h3>

            <div className={styles.modalContactList}>
              {/* 1. Teléfono primero */}
              <a href="tel:+34600000000" className={`${styles.modalContactItem} ${styles.phoneItem}`}>
                <div className={styles.modalIconWrapper}>
                  <FaPhone />
                </div>
                <div className={styles.modalItemText}>
                  <span className={styles.modalLabel}>{language === 'en' ? 'Phone' : 'Teléfono'}</span>
                  <span className={styles.modalValue}>+34 600 000 000</span>
                </div>
              </a>

              {/* 2. Email */}
              <a href="mailto:blicinteriorismo@gmail.com" className={styles.modalContactItem}>
                <div className={styles.modalIconWrapper}>
                  <FaEnvelope />
                </div>
                <div className={styles.modalItemText}>
                  <span className={styles.modalLabel}>Email</span>
                  <span className={styles.modalValue}>blicinteriorismo@gmail.com</span>
                </div>
              </a>

              {/* 3. Instagram */}
              <a 
                href="https://instagram.com/tu-usuario" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.modalContactItem}
              >
                <div className={styles.modalIconWrapper}>
                  <FaInstagram />
                </div>
                <div className={styles.modalItemText}>
                  <span className={styles.modalLabel}>Instagram</span>
                  <span className={styles.modalValue}>@tu-usuario</span>
                </div>
              </a>

              {/* 4. LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/jesus-izq-316a2a445" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.modalContactItem}
              >
                <div className={styles.modalIconWrapper}>
                  <FaLinkedin />
                </div>
                <div className={styles.modalItemText}>
                  <span className={styles.modalLabel}>LinkedIn</span>
                  <span className={styles.modalValue}>Belisario Jesús</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;