import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { StyleCard } from '../components/StyleCard';
import { LightboxModal } from '../components/LightboxModal';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { translations } from '../data/translations';

const IMAGES_LIST = [
  ['/assets/balines-1.png', '/assets/balines-2.png', '/assets/balines-3.png'],
  ['/assets/minimal-1.png', '/assets/minimal-2.png', '/assets/minimal-3.png'],
  ['/assets/industrial-1.png', '/assets/industrial-2.png', '/assets/industrial-3.png'],
  ['/assets/contemporaneo-1.png', '/assets/contemporaneo-2.png', '/assets/contemporaneo-3.png']
];

const FEATURED_IMAGES = [
  '/assets/balines-1.png',
  '/assets/minimal-1.png',
  '/assets/contemporaneo-1.png'
];

function Home() {
  const { language } = useLanguage();
  const t = translations[language] || translations.es;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const stylesScrollRef = useRef<HTMLDivElement>(null);
  const featuredScrollRef = useRef<HTMLDivElement>(null);

  const stylesScroll = useHorizontalScroll(stylesScrollRef);
  const featuredScroll = useHorizontalScroll(featuredScrollRef);

  // Estado del Estilo Activo y Lightbox
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

  const getDynamicAsset = (folder: string, baseName: string, extension: string = 'png') => {
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

  // Navegación entre IMÁGENES del mismo estilo
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

  // Navegación entre ESTILOS (Colecciones)
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

  // Datos dinámicos del estilo actualmente visible en la modal
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
  src={getDynamicAsset('logos', 'logo_portada', 'jpeg')} 
  alt="Logo BLIC" 
  className={styles.heroImage} 
  onError={(e) => {
    // Si falla la extensión jpeg, intenta cambiarla a jpg
    const target = e.currentTarget;
    if (target.src.endsWith('.jpeg')) {
      target.src = target.src.replace('.jpeg', '.jpg');
    } else if (target.src.endsWith('.jpg')) {
      target.src = target.src.replace('.jpg', '.jpeg');
    }
  }}
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

      {/* 4. PROYECTOS DESTACADOS */}
      <section className={styles.featuredProjectsSection}>
        <div className={styles.stylesIntroHeaderScd}>
          <img 
            src={getDynamicAsset('marcos', 'marco_proyectos_destacados')}
            alt={t.featuredTitle} 
            className={styles.introHeaderImage}
          />
        </div>

        <div 
          ref={featuredScrollRef}
          className={styles.horizontalScrollContainer}
          onScroll={featuredScroll.handleScroll}
        >
          {t.featuredProjects.map((project, idx) => (
            <div key={idx} className={styles.projectCard}>
              <div className={styles.projectImageWrapper}>
                <img 
                  src={FEATURED_IMAGES[idx]} 
                  alt={project.title} 
                  className={styles.projectImage} 
                />
                <div className={styles.projectOverlay}>
                  <div className={styles.projectOverlayContent}>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectLocation}>{project.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.featuredCarouselNav}>
          <span className={styles.carouselCounter}>
            {String(Math.min(t.featuredProjects.length, Math.max(1, Math.ceil((featuredScroll.progress / 100) * t.featuredProjects.length)))).padStart(2, '0')}
            <span className={styles.counterDivider}>/</span>
            {String(t.featuredProjects.length).padStart(2, '0')}
          </span>

          <div className={styles.minimalProgressTrack}>
            <div 
              className={styles.minimalProgressFill} 
              style={{ width: `${Math.max(featuredScroll.progress, 10)}%` }}
            ></div>
          </div>

          <div className={styles.navArrowsInline}>
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
      </section>

      {/* 5. SECCIÓN MÁS ESTILOS -> PROYECTOS */}
      <section className={styles.moreStylesSection}>
        <div className={styles.moreStylesContent}>
          <span className={styles.moreStylesTag}>{t.moreStylesLabel}</span>
          <h2>{t.moreStylesTitle}</h2>
          <p>{t.moreStylesText}</p>
          <Link to="/proyectos" className={styles.moreStylesButton}>
            {t.moreStylesCta}
          </Link>
        </div>
      </section>

      {/* 6. BARRA FLOTANTE DE CONTACTO Y BOTÓN SUBIR */}
      <div className={styles.stickyContactBar}>
        <span>{t.stickyCtaText}</span>
        <Link to="/contacto" className={styles.talkButton}>
          {t.stickyCtaBtn}
        </Link>

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

      {/* 7. LIGHTBOX MODAL CON CAMBIO DE ESTILOS E IMÁGENES */}
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
    </div>
  );
}

export default Home;