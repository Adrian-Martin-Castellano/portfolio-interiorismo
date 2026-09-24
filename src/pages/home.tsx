import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { StyleCard } from '../components/StyleCard';
import { LightboxModal } from '../components/LightboxModal';
import { QuizModal } from '../components/quiz/QuizModal';
import { ContactModal } from '../components/ContactModal';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { translations } from '../data/translations';

const IMAGES_LIST = [
  ['/assets/balines-1.webp', '/assets/balines-2.webp', '/assets/balines-3.webp'],
  ['/assets/minimal-1.webp', '/assets/minimal-2.webp', '/assets/minimal-3.webp'],
  ['/assets/industrial-1.webp', '/assets/industrial-2.webp', '/assets/industrial-3.webp'],
  ['/assets/contemporaneo-1.webp', '/assets/contemporaneo-2.webp', '/assets/contemporaneo-3.webp']
];

const FEATURED_IMAGES = [
  '/assets/balines-1.webp',
  '/assets/minimal-1.webp',
  '/assets/contemporaneo-1.webp'
];

function Home() {
  const { language } = useLanguage();
  const t = translations[language] || translations.es;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);

  const stylesScrollRef = useRef<HTMLDivElement>(null);
  const featuredScrollRef = useRef<HTMLDivElement>(null);

  const stylesScroll = useHorizontalScroll(stylesScrollRef);
  const featuredScroll = useHorizontalScroll(featuredScrollRef);

  const [currentStyleIndex, setCurrentStyleIndex] = useState<number>(0);
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageIndex: number;
  }>({
    isOpen: false,
    imageIndex: 0
  });

  useEffect(() => {
    if (lightboxData.isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('lightbox-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('lightbox-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('lightbox-open');
    };
  }, [lightboxData.isOpen]);

  const getDynamicAsset = (folder: string, baseName: string, extension: string = 'webp') => {
    const mode = isDark ? 'oscuro' : 'claro';
    const lang = language === 'en' ? '_en' : '';
    return `/assets/${folder}/${baseName}_${mode}${lang}.${extension}`;
  };

  const openLightbox = (styleIdx: number, initialImageIdx: number) => {
    setCurrentStyleIndex(styleIdx);
    setLightboxData({
      isOpen: true,
      imageIndex: initialImageIdx
    });
  };

  const closeLightbox = () => {
    setLightboxData((prev) => ({ ...prev, isOpen: false }));
  };

  const nextLightboxImg = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentImages = IMAGES_LIST[currentStyleIndex] || IMAGES_LIST[0];
    setLightboxData((prev) => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % currentImages.length
    }));
  };

  const prevLightboxImg = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentImages = IMAGES_LIST[currentStyleIndex] || IMAGES_LIST[0];
    setLightboxData((prev) => ({
      ...prev,
      imageIndex: (prev.imageIndex - 1 + currentImages.length) % currentImages.length
    }));
  };

  const nextStyle = () => {
    const totalStyles = t.cards.length;
    setCurrentStyleIndex((prev) => (prev + 1) % totalStyles);
    setLightboxData({ isOpen: true, imageIndex: 0 });
  };

  const prevStyle = () => {
    const totalStyles = t.cards.length;
    setCurrentStyleIndex((prev) => (prev - 1 + totalStyles) % totalStyles);
    setLightboxData({ isOpen: true, imageIndex: 0 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }

      setShowScrollTop(currentScroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const activeCard = t.cards[currentStyleIndex] || t.cards[0];
  const activeImages = IMAGES_LIST[currentStyleIndex] || IMAGES_LIST[0];

  return (
    <div className={styles.homeContainer}>
      <div 
        className={styles.editorialProgressBar} 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroCard}>
          <img 
            src={getDynamicAsset('logos', 'logo_portada', 'webp')} 
            alt="Logo BLIC" 
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* 2. VIDEO PRESENTACIÓN Y NARRATIVA */}
      <section id="videoSection" className={styles.videoSection}>
        <div className={styles.videoGrid}>
          <div className={styles.videoContainer}>
            <div className={styles.videoWrapper}>
              <video autoPlay muted loop playsInline className={styles.mainVideo}>
                <source src="/video-presentacion.mp4" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
          </div>

          <div className={styles.videoContent}>
            <span className={styles.videoTag}>{t.videoTag}</span>
            <h2>{t.videoTitle}</h2>

            <p className={styles.videoQuote}>{t.videoQuote}</p>
            <p className={styles.videoDescription}>{t.videoDescription}</p>

            <div className={styles.videoFooterDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{t.videoLabelStudio}</span>
                <span className={styles.detailValue}>{t.videoValueStudio}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{t.videoLabelApproach}</span>
                <span className={styles.detailValue}>{t.videoValueApproach}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LÍNEAS DE DISEÑO (ESTILOS) */}
      <section className={styles.stylesSectionWrapper}>
        <div className={styles.stylesIntroHeader}>
          <img 
            src={getDynamicAsset('marcos', 'marco_nuestra_identidad')}
            alt="Líneas de Diseño de Autor" 
            className={styles.introHeaderImage}
          />
        </div>

        <div className={styles.carouselOuterWrapper}>
          <button 
            className={`${styles.styleChangeBtn} ${styles.stylePrevBtn} ${stylesScroll.progress <= 2 ? styles.arrowDisabled : ''}`}
            onClick={() => stylesScroll.scrollByAmount('left')}
            aria-label="Estilo anterior"
            disabled={stylesScroll.progress <= 2}
          >
            &#8249;
          </button>
          <div 
            ref={stylesScrollRef}
            className={styles.horizontalScrollContainer}
            onScroll={stylesScroll.handleScroll}
          >
            {t.cards.map((card, idx) => (
              <StyleCard 
                key={idx}
                index={idx}
                alignment={idx % 2 === 0 ? 'left' : 'right'}
                category={card.category}
                title={card.title}
                quote={card.quote}
                description={card.description}
                details={card.details}
                images={IMAGES_LIST[idx] || IMAGES_LIST[0]}
                learnMoreText={t.learnMoreBtn}
                onOpenLightbox={(_, initialImgIdx) => openLightbox(idx, initialImgIdx)}
              />
            ))}
          </div>

          <button 
            className={`${styles.styleChangeBtn} ${styles.styleNextBtn} ${stylesScroll.progress >= 98 ? styles.arrowDisabled : ''}`}
            onClick={() => stylesScroll.scrollByAmount('right')}
            aria-label="Siguiente estilo"
            disabled={stylesScroll.progress >= 98}
          >
            &#8250;
          </button>
        </div>

        <div className={styles.stylesCarouselNav}>
          <span className={styles.carouselCounter}>
            {String(Math.min(t.cards.length, Math.max(1, Math.ceil((stylesScroll.progress / 100) * t.cards.length)))).padStart(2, '0')}
            <span className={styles.counterDivider}>/</span>
            {String(t.cards.length).padStart(2, '0')}
          </span>

          <div className={styles.minimalProgressTrack}>
            <div 
              className={styles.minimalProgressFill} 
              style={{ width: `${Math.max(stylesScroll.progress, 10)}%` }}
            ></div>
          </div>

          <div className={styles.navArrowsInline}>
            <button 
              className={`${styles.inlineArrow} ${stylesScroll.progress <= 2 ? styles.arrowDisabled : ''}`}
              onClick={() => stylesScroll.scrollByAmount('left')}
              aria-label="Anterior"
              disabled={stylesScroll.progress <= 2}
            >
              ←
            </button>
            <button 
              className={`${styles.inlineArrow} ${stylesScroll.progress >= 98 ? styles.arrowDisabled : ''}`}
              onClick={() => stylesScroll.scrollByAmount('right')}
              aria-label="Siguiente"
              disabled={stylesScroll.progress >= 98}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN QUIZ DE ESTILO INTERACTIVO */}
      <section className={styles.quizSection}>
        <div className={styles.stylesIntroHeaderthr}>
          <img 
            src={getDynamicAsset('marcos', 'marco_descubre_tu_estilo')} 
            alt="Descubre Tu Estilo"
            className={styles.introHeaderImage}
          />
        </div>

        <div className={styles.quizCard}>
          <div className={styles.quizCardMedia}>
            <img 
              src="/assets/iconos/icono_quiz_claro.webp" 
              alt="Diagnóstico de Estilo" 
              className={styles.quizCardImage}
            />
          </div>

          <div className={styles.quizCardContent}>
            <span className={styles.quizTag}>Diagnóstico de Interiorismo</span>
            <h2>Encuentra el alma de tu espacio</h2>
            <p>
              A través de una breve selección de atmósferas visuales, texturas y elementos arquitectónicos, analizaremos tus preferencias para definir la línea de diseño de autor que mejor se adapta a tu estilo de vida.
            </p>

            <div className={styles.quizFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureNumber}>10</span>
                <span className={styles.featureText}>Preguntas visuales</span>
              </div>
              <div className={styles.featureDivider}></div>
              <div className={styles.featureItem}>
                <span className={styles.featureNumber}>3 min</span>
                <span className={styles.featureText}>Tiempo estimado</span>
              </div>
              <div className={styles.featureDivider}></div>
              <div className={styles.featureItem}>
                <span className={styles.featureNumber}>100%</span>
                <span className={styles.featureText}>Paleta personalizada</span>
              </div>
            </div>
            
            <button className={styles.quizStartBtn} onClick={() => setShowQuizModal(true)}>
              COMENZAR DIAGNÓSTICO
            </button>
          </div>
        </div>
      </section>

      {/* 5. PROYECTOS DESTACADOS */}
      <section className={styles.featuredProjectsSection}>
        <div className={styles.stylesIntroHeaderThr}>
          <img 
            src={getDynamicAsset('marcos', 'marco_proyectos_destacados')}
            alt={t.featuredTitle} 
            className={styles.introHeaderImageThr}
          />
        </div>

        <div className={styles.desktopProjectsGrid}>
          {t.featuredProjects.slice(0, 3).map((project, idx) => (
            <div key={idx} className={styles.projectCardDesktop}>
              <img 
                src={FEATURED_IMAGES[idx]} 
                alt={project.title} 
                className={styles.projectImage} 
              />
              <div className={styles.projectOverlay}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectLocation}>{project.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.mobileCarouselWrapper}>
          <div 
            ref={featuredScrollRef}
            className={styles.horizontalScrollContainer}
            onScroll={featuredScroll.handleScroll}
          >
            {t.featuredProjects.map((project, idx) => (
              <div key={idx} className={styles.projectCardMobile}>
                <img 
                  src={FEATURED_IMAGES[idx]} 
                  alt={project.title} 
                  className={styles.projectImage} 
                />
                <div className={styles.projectOverlay}>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectLocation}>{project.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.featuredCarouselNav}>
            <span className={styles.carouselCounter2}>
              {String(Math.min(t.featuredProjects.length, Math.max(1, Math.ceil((featuredScroll.progress / 100) * t.featuredProjects.length)))).padStart(2, '0')}
              <span className={styles.counterDivider}>/</span>
              {String(t.featuredProjects.length).padStart(2, '0')}
            </span>

            <div className={styles.minimalProgressTrack2}>
              <div 
                className={styles.minimalProgressFill} 
                style={{ width: `${Math.max(featuredScroll.progress, 10)}%` }}
              ></div>
            </div>

            <div className={styles.navArrowsInline2}>
              <button 
                className={`${styles.inlineArrow} ${featuredScroll.progress <= 2 ? styles.arrowDisabled : ''}`}
                onClick={() => featuredScroll.scrollByAmount('left')}
                aria-label="Anterior"
                disabled={featuredScroll.progress <= 2}
              >
                ←
              </button>
              <button 
                className={`${styles.inlineArrow} ${featuredScroll.progress >= 98 ? styles.arrowDisabled : ''}`}
                onClick={() => featuredScroll.scrollByAmount('right')}
                aria-label="Siguiente"
                disabled={featuredScroll.progress >= 98}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECCIÓN MÁS ESTILOS -> PROYECTOS */}
      <section className={styles.moreStylesSection}>
        <div className={styles.moreStylesCard}>
          <div className={styles.moreStylesImageWrapper}>
            <img 
              src="/assets/iconos/more-styles-cover.webp" 
              alt="Diagnóstico de Estilo" 
              className={styles.moreStylesImage}
            />
            <div className={styles.moreStylesImageOverlay} />
          </div>

          <div className={styles.moreStylesContent}>
            <span className={styles.moreStylesTag}>{t.moreStylesLabel}</span>
            <h2>{t.moreStylesTitle}</h2>
            <p className={styles.moreStylesText}>{t.moreStylesText}</p>
            
            <div className={styles.moreStylesGrid}>
              <div className={styles.moreStylesGridItem}>
                <span className={styles.gridNumber}>01</span>
                <div>
                  <h4>{t.moreStylesFeature1Title}</h4>
                  <p>{t.moreStylesFeature1Desc}</p>
                </div>
              </div>

              <div className={styles.moreStylesGridItem}>
                <span className={styles.gridNumber}>02</span>
                <div>
                  <h4>{t.moreStylesFeature2Title}</h4>
                  <p>{t.moreStylesFeature2Desc}</p>
                </div>
              </div>
            </div>

            <Link to="/proyectos" className={styles.moreStylesButton}>
              {t.moreStylesCta} →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PROCESO DE TRABAJO */}
      <section className={styles.processSectionWrapper}>
        <div className={styles.stylesIntroHeader4}>
          <img 
            src={getDynamicAsset('marcos', 'marco_nuestro_proceso')} 
            alt="Proceso de diseño" 
            className={styles.introHeaderImage}
          />
        </div>
        <div className={styles.processGrid}>
          <div className={styles.processConnectorLine} />

          {t.processSteps.map((step, idx) => (
            <div key={idx} className={styles.processStep}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>{step.number}</span>
                <div className={styles.stepBadge}>Paso {idx + 1}</div>
              </div>

              <div className={styles.stepImageWrapper}>
                <img 
                  src={`/assets/iconos/proceso_paso_${idx + 1}.webp`} 
                  alt={step.title}
                  className={styles.stepImage}
                />
              </div>

              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.mobileProcessHint}>
          <span>Desliza para explorar el proceso</span>
          <div className={styles.swipeIndicator}>→</div>
        </div>
      </section>

      {/* 8. SECCIÓN PREGUNTAS FRECUENTES (FAQ) */}
      <section className={styles.faqSectionWrapper}>
        <div className={styles.stylesIntroHeader5}>
          <img 
            src={getDynamicAsset('marcos', 'marco_preguntas_frecuentes')} 
            alt="Preguntas Frecuentes" 
            className={styles.introHeaderImage}
          />
        </div>

        <div className={styles.faqContainer}>
          {t.faqList && t.faqList.map((faq, idx) => (
            <details key={idx} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span className={styles.faqIndex}>0{idx + 1}</span>
                <span className={styles.faqTitle}>{faq.question}</span>
                <span className={styles.faqIcon}>+</span>
              </summary>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 9. BARRA INFERIOR CON APERTURA DE MODAL */}
      <div className={styles.stickyContactBar}>
        <span>{t.stickyCtaText}</span>
        <button 
          onClick={() => setShowContactModal(true)} 
          className={styles.talkButton}
        >
          {t.stickyCtaBtn}
        </button>

        {showScrollTop && (
          <button 
            onClick={scrollToTop} 
            className={styles.scrollTopBtn} 
            aria-label="Volver arriba al inicio"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        )}
      </div>

      {/* MODALES */}
      <LightboxModal 
        isOpen={lightboxData.isOpen}
        images={activeImages}
        index={lightboxData.imageIndex}
        title={activeCard.title}
        category={activeCard.category}
        details={activeCard.details}
        styleIndex={currentStyleIndex}
        totalStyles={t.cards.length}
        onClose={closeLightbox}
        onNextImage={nextLightboxImg}
        onPrevImage={prevLightboxImg}
        onNextStyle={nextStyle}
        onPrevStyle={prevStyle}
      />

      <QuizModal 
        isOpen={showQuizModal} 
        onClose={() => setShowQuizModal(false)} 
      />

      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
        language={language}
      />
    </div>
  );
}

export default Home;