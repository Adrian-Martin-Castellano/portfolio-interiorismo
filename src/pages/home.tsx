import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface StyleDetails {
  palette: string[];
  materials: string[];
  lighting: string;
  extendedText: string;
}

interface StyleCardProps {
  index: number;
  images: string[];
  category: string;
  title: string;
  quote: string;
  description: string;
  alignment: 'left' | 'right';
  details: StyleDetails;
  onOpenLightbox: (images: string[], initialIndex: number, title: string, category: string, details: StyleDetails) => void;
}

const translations = {
  es: {
    heroCta: 'Ver Proyectos',
    videoTag: 'Filosofía Blic',
    videoTitle: 'Arquitectura del Alma',
    videoQuote: '“Creamos espacios donde el tiempo parece detenerse y la materia cobra vida.”',
    videoDescription: 'Nuestros proyectos no solo se diseñan: se habitan desde la emoción. A través de la luz natural, los materiales nobles y una cuidada selección textural, transformamos cualquier estructura en un refugio de diseño atemporal.',
    videoLabelStudio: 'Estudio',
    videoValueStudio: 'Interiorismo Boutique',
    videoLabelApproach: 'Enfoque',
    videoValueApproach: 'Proyectos A Medida',

    stylesLabel: 'Nuestra Identidad',
    stylesTitle: 'Líneas de Diseño de Autor',
    cards: [
      {
        category: 'Colección Natura',
        title: 'Esencia Balinesa',
        quote: '“Una oda a la desconexión tropical, donde la arquitectura se rinde ante la textura pura de la piedra y la teca.”',
        description: 'Uso profundo de maderas exóticas certificadas, fibras naturales trenzadas a mano y presencia de piedra volcánica escultórica.',
        details: {
          palette: ['#C3A27D', '#6B543D', '#2B2621', '#E8DEC9'],
          materials: ['Teca maciza', 'Piedra volcánica', 'Ratan trenzado', 'Mortero de cal beige'],
          lighting: 'Luz cálida tamizada mediante pantallas de fibras naturales y retroiluminación focal.',
          extendedText: 'Inspirado en los refugios tropicales del sudeste asiático, este estilo busca la simbiosis absoluta entre el interior y la naturaleza circundante. Los espacios fluidos y las texturas orgánicas promueven la serenidad interior y el ritmo pausado.'
        }
      },
      {
        category: 'Colección Pureza',
        title: 'Minimalismo Cálido',
        quote: '“Reducir a lo esencial para hallar la calma absoluta, esculpiendo el espacio a través de la luz y los materiales crudos.”',
        description: 'Ausencia de ornamentos innecesarios en favor de geometrías puras, morteros de cal y paletas tonales en gamas suaves.',
        details: {
          palette: ['#EBE7E0', '#D3C9BC', '#A89B8C', '#5C554E'],
          materials: ['Microcemento neutro', 'Roble blanqueado', 'Lino lavado', 'Cal hidráulica'],
          lighting: 'Grandes entradas de luz natural indirecta con cortinajes difusores de lino puro.',
          extendedText: 'Una interpretación sobria pero acogedora del diseño funcional. Eliminamos las distracciones visuales para acentuar el valor espacial, la serenidad del orden y la sutileza de los tonos neutros en armonía.'
        }
      },
      {
        category: 'Colección Urbana',
        title: 'Industrial Orgánico',
        quote: '“El carácter de la estructura vista y el metal, suavizado por la calidez texturizada de la madera recuperada.”',
        description: 'Elementos estructurales honestos como hormigón o hierro forjado, contrastados estratégicamente con maderas nobles y vegetación.',
        details: {
          palette: ['#3A3D40', '#8C857B', '#A66E4E', '#1F2022'],
          materials: ['Hierro negro mate', 'Hormigón visto', 'Madera recuperada', 'Cuero envejecido'],
          lighting: 'Focos direccionales tipo estudio, bombillas de filamento expuesto y baños de luz focalizados.',
          extendedText: 'Combina el carácter tectónico y vanguardista de la arquitectura contemporánea con toques de calidez orgánica. Es el equilibrio perfecto entre la solidez industrial y el bienestar táctil.'
        }
      },
      {
        category: 'Colección Vanguardia',
        title: 'Línea Contemporánea',
        quote: '“El reflejo del diseño actual. Espacios sofisticados donde conviven piezas icónicas de arte con molduras clásicas.”',
        description: 'Espacios donde conviven acabados modernos, mármoles de vetas muy marcadas y una paleta cromática audaz y equilibrada.',
        details: {
          palette: ['#1C1D21', '#E0D6C3', '#682D2B', '#8E9196'],
          materials: ['Mármol Calacatta', 'Detalles en latón cepillado', 'Terciopelo denso', 'Molduras contemporáneas'],
          lighting: 'Diseño lumínico escenográfico con candiles escultóricos y perfiles LED ocultos.',
          extendedText: 'La expresión máxima del lujo atemporal. Pensado para proyectos de alta gama que buscan proyectar personalidad, distinción y un diálogo sutil entre elementos clásicos revisados y diseño de autor.'
        }
      }
    ],

    featuredLabel: 'Selección de Obra',
    featuredTitle: 'Proyectos Destacados',
    featuredSubtitle: 'Una muestra de nuestras intervenciones más recientes y espacios de autor.',
    featuredProjects: [
      {
        category: 'Residencial · Madrid',
        title: 'Villa Casa Blanca',
        subtitle: 'Rehabilitación Integral & Interiorismo'
      },
      {
        category: 'Ático Boutique · Salamanca',
        title: 'Penthouse Recoletos',
        subtitle: 'Minimalismo Cálido & Mobiliario A Medida'
      },
      {
        category: 'Comercial · Barcelona',
        title: 'Atelier Concept Store',
        subtitle: 'Arquitectura Comercial & Iluminación'
      }
    ],

    moreStylesLabel: 'Versatilidad sin límites',
    moreStylesTitle: 'Cada espacio exige una identidad única',
    moreStylesText: 'Estas cuatro líneas son solo el punto de partida. Nos adaptamos a la personalidad de cada cliente y a las exigencias arquitectónicas de cada espacio para crear proyectos totalmente a medida.',
    moreStylesCta: 'Explorar Todos los Proyectos →',

    stickyCtaText: '¿Tienes un espacio que quieras transformar?',
    stickyCtaBtn: 'Contacta',
    learnMoreBtn: 'Saber Más'
  },
  en: {
    heroCta: 'View Projects',
    videoTag: 'Blic Philosophy',
    videoTitle: 'Architecture of the Soul',
    videoQuote: '“We create spaces where time seems to stand still and materials come alive.”',
    videoDescription: 'Our projects are not merely designed; they are lived through emotion. Through natural light, noble materials, and curated textures, we transform any structure into a sanctuary of timeless design.',
    videoLabelStudio: 'Studio',
    videoValueStudio: 'Boutique Interior Design',
    videoLabelApproach: 'Approach',
    videoValueApproach: 'Bespoke Projects',

    stylesLabel: 'Our Identity',
    stylesTitle: 'Signature Design Lines',
    cards: [
      {
        category: 'Natura Collection',
        title: 'Balinese Essence',
        quote: '“An ode to tropical retreat, where architecture yields to the pure texture of stone and teak.”',
        description: 'Deep use of certified exotic woods, hand-woven natural fibers, and sculptural volcanic stone.',
        details: {
          palette: ['#C3A27D', '#6B543D', '#2B2621', '#E8DEC9'],
          materials: ['Solid Teak', 'Volcanic Stone', 'Woven Rattan', 'Beige Lime Mortar'],
          lighting: 'Warm light filtered through woven shades and focal backlighting.',
          extendedText: 'Inspired by South East Asian tropical sanctuaries, this style creates seamless continuity between inside and outside living.'
        }
      },
      {
        category: 'Purity Collection',
        title: 'Warm Minimalism',
        quote: '“Reducing to the essential to find absolute calm, sculpting space through light and raw materials.”',
        description: 'Absence of unnecessary ornament in favor of pure geometry, lime mortars, and soft bone color palettes.',
        details: {
          palette: ['#EBE7E0', '#D3C9BC', '#A89B8C', '#5C554E'],
          materials: ['Neutral Microcement', 'Bleached Oak', 'Washed Linen', 'Hydraulic Lime'],
          lighting: 'Abundant indirect natural light softened by raw linen drapery.',
          extendedText: 'A welcoming approach to functional design, removing visual distractions to highlight spatial volume.'
        }
      },
      {
        category: 'Urban Collection',
        title: 'Organic Industrial',
        quote: '“The character of exposed structure and metal, softened by the textured warmth of reclaimed wood.”',
        description: 'Honest structural elements like concrete or wrought iron, strategically balanced with noble woods and greenery.',
        details: {
          palette: ['#3A3D40', '#8C857B', '#A66E4E', '#1F2022'],
          materials: ['Matte Black Iron', 'Exposed Concrete', 'Reclaimed Wood', 'Aged Leather'],
          lighting: 'Studio directional spotlights and focused washes of light.',
          extendedText: 'Combines structural architectural character with organic warmth for a tactile, grounded atmosphere.'
        }
      },
      {
        category: 'Vanguard Collection',
        title: 'Contemporary Line',
        quote: '“The reflection of current design. Sophisticated spaces where iconic art pieces meet classic moldings.”',
        description: 'Spaces where modern finishes, bold marble veining, and a balanced color palette coexist seamlessly.',
        details: {
          palette: ['#1C1D21', '#E0D6C3', '#682D2B', '#8E9196'],
          materials: ['Calacatta Marble', 'Brushed Brass Details', 'Rich Velvet', 'Contemporary Moldings'],
          lighting: 'Scenographic lighting design featuring sculptural fixtures and recessed LEDs.',
          extendedText: 'The ultimate expression of timeless luxury tailored for high-end bespoke residential projects.'
        }
      }
    ],

    featuredLabel: 'Curated Works',
    featuredTitle: 'Featured Projects',
    featuredSubtitle: 'A selection of our most recent interventions and signature spaces.',
    featuredProjects: [
      {
        category: 'Residential · Madrid',
        title: 'Villa Casa Blanca',
        subtitle: 'Comprehensive Renovation & Interior Design'
      },
      {
        category: 'Boutique Penthouse · Salamanca',
        title: 'Penthouse Recoletos',
        subtitle: 'Warm Minimalism & Bespoke Furniture'
      },
      {
        category: 'Commercial · Barcelona',
        title: 'Commercial Architecture & Lighting'
      }
    ],

    moreStylesLabel: 'Limitless Versatility',
    moreStylesTitle: 'Every space demands a unique identity',
    moreStylesText: 'These four design lines represent only a part of what we do. We tailor every detail to match your vision, lifestyle, and architectural requirements.',
    moreStylesCta: 'Explore All Completed Projects →',

    stickyCtaText: 'Have a space you wish to transform?',
    stickyCtaBtn: "Let's Talk",
    learnMoreBtn: 'Learn More'
  }
};

function StyleCard({ index, images, category, title, quote, description, alignment, details, onOpenLightbox }: StyleCardProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { language } = useLanguage();
  const learnMoreText = translations[language]?.learnMoreBtn || 'Saber Más';

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const alignmentClass = alignment === 'right' ? styles.alignRight : styles.alignLeft;
  const formattedNumber = String(index + 1).padStart(2, '0');

  const handleOpenDetails = () => {
    onOpenLightbox(images, currentIndex, title, category, details);
  };

  return (
    <div className={`${styles.styleFloatingCard} ${alignmentClass}`}>
      <div className={styles.styleCardContent}>
        <div 
          className={styles.carouselContainer} 
          onClick={handleOpenDetails}
        >
          <div 
            className={styles.carouselTrack} 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, imgIdx) => (
              <div key={imgIdx} className={styles.imageZoomWrapper}>
                <img 
                  src={img} 
                  alt={`${title} ${imgIdx + 1}`} 
                  className={styles.carouselImage} 
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button 
                className={`${styles.navButton} ${styles.prevBtn}`} 
                onClick={prevSlide}
                aria-label="Anterior"
              >
                ‹
              </button>
              <button 
                className={`${styles.navButton} ${styles.nextBtn}`} 
                onClick={nextSlide}
                aria-label="Siguiente"
              >
                ›
              </button>
              <div className={styles.carouselDots}>
                {images.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    className={`${styles.dot} ${dotIdx === currentIndex ? styles.activeDot : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(dotIdx);
                    }}
                    aria-label={`Ir a imagen ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.styleInfo}>
          <span className={styles.watermarkNumber}>{formattedNumber}</span>
          <span className={styles.projectCategory}>{category}</span>
          <h3>{title}</h3>
          <p className={styles.editorialQuote}>{quote}</p>
          <p className={styles.mainDescription}>{description}</p>

          <button 
            className={styles.learnMoreCardBtn}
            onClick={handleOpenDetails}
          >
            <span>{learnMoreText}</span>
            <span className={styles.btnArrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { language } = useLanguage();
  const t = translations[language] || translations.es;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [stylesProgress, setStylesProgress] = useState(0);
  const [featuredProgress, setFeaturedProgress] = useState(0);

  // Lightbox Modal Data
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
    title: string;
    category: string;
    details: StyleDetails | null;
  }>({
    isOpen: false,
    images: [],
    index: 0,
    title: '',
    category: '',
    details: null
  });

  const stylesScrollRef = useRef<HTMLDivElement>(null);
  const featuredScrollRef = useRef<HTMLDivElement>(null);

  const getDynamicAsset = (folder: string, baseName: string, extension: string = 'png') => {
    const mode = isDark ? 'oscuro' : 'claro';
    const lang = language === 'en' ? '_en' : '';
    return `/assets/${folder}/${baseName}_${mode}${lang}.${extension}`;
  };

  const handleScrollContainer = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>, setProgress: (val: number) => void) => {
      if (ref.current) {
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll > 0) {
          const percentage = (scrollLeft / maxScroll) * 100;
          setProgress(Math.min(100, Math.max(0, percentage)));
        }
      }
    },
    []
  );

  const scrollByAmount = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openLightbox = (
    images: string[], 
    initialIndex: number, 
    title: string, 
    category: string, 
    details: StyleDetails
  ) => {
    setLightboxData({
      isOpen: true,
      images,
      index: initialIndex,
      title,
      category,
      details
    });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxData((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  };

  const nextLightboxImg = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxData((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length
    }));
  };

  const prevLightboxImg = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxData((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length
    }));
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

  const imagesList = [
    ['/assets/balines-1.png', '/assets/balines-2.png', '/assets/balines-3.png'],
    ['/assets/minimal-1.png', '/assets/minimal-2.png', '/assets/minimal-3.png'],
    ['/assets/industrial-1.png', '/assets/industrial-2.png', '/assets/industrial-3.png'],
    ['/assets/contemporaneo-1.png', '/assets/contemporaneo-2.png', '/assets/contemporaneo-3.png']
  ];

  const featuredImageAssets = [
    '/assets/balines-1.png',
    '/assets/minimal-1.png',
    '/assets/contemporaneo-1.png'
  ];

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
          onScroll={() => handleScrollContainer(stylesScrollRef, setStylesProgress)}
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
              images={imagesList[idx] || imagesList[0]}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>

        <div className={styles.stylesCarouselNav}>
          <span className={styles.carouselCounter}>
            {String(Math.min(t.cards.length, Math.max(1, Math.ceil((stylesProgress / 100) * t.cards.length)))).padStart(2, '0')}
            <span className={styles.counterDivider}>/</span>
            {String(t.cards.length).padStart(2, '0')}
          </span>

          <div className={styles.minimalProgressTrack}>
            <div 
              className={styles.minimalProgressFill} 
              style={{ width: `${Math.max(stylesProgress, 10)}%` }}
            ></div>
          </div>

          <div className={styles.navArrowsInline}>
            <button 
              className={`${styles.inlineArrow} ${stylesProgress <= 2 ? styles.arrowDisabled : ''}`}
              onClick={() => scrollByAmount(stylesScrollRef, 'left')}
              aria-label="Anterior"
              disabled={stylesProgress <= 2}
            >
              ←
            </button>
            <button 
              className={`${styles.inlineArrow} ${stylesProgress >= 98 ? styles.arrowDisabled : ''}`}
              onClick={() => scrollByAmount(stylesScrollRef, 'right')}
              aria-label="Siguiente"
              disabled={stylesProgress >= 98}
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
          onScroll={() => handleScrollContainer(featuredScrollRef, setFeaturedProgress)}
        >
          {t.featuredProjects.map((project, idx) => (
            <div key={idx} className={styles.projectCard}>
              <div className={styles.projectImageWrapper}>
                <img 
                  src={featuredImageAssets[idx]} 
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
            {String(Math.min(t.featuredProjects.length, Math.max(1, Math.ceil((featuredProgress / 100) * t.featuredProjects.length)))).padStart(2, '0')}
            <span className={styles.counterDivider}>/</span>
            {String(t.featuredProjects.length).padStart(2, '0')}
          </span>

          <div className={styles.minimalProgressTrack}>
            <div 
              className={styles.minimalProgressFill} 
              style={{ width: `${Math.max(featuredProgress, 10)}%` }}
            ></div>
          </div>

          <div className={styles.navArrowsInline}>
            <button 
              className={`${styles.inlineArrow} ${featuredProgress <= 2 ? styles.arrowDisabled : ''}`}
              onClick={() => scrollByAmount(featuredScrollRef, 'left')}
              aria-label="Anterior"
              disabled={featuredProgress <= 2}
            >
              ←
            </button>
            <button 
              className={`${styles.inlineArrow} ${featuredProgress >= 98 ? styles.arrowDisabled : ''}`}
              onClick={() => scrollByAmount(featuredScrollRef, 'right')}
              aria-label="Siguiente"
              disabled={featuredProgress >= 98}
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

      {/* 6. BARRA FLOTANTE DE CONTACTO Y BOTÓN SUBIR AL LOGO */}
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

      {/* 7. LIGHTBOX MODAL ENRIQUECIDO */}
      {lightboxData.isOpen && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <div className={styles.lightboxHeader}>
            <div className={styles.lightboxHeaderTitles}>
              <span className={styles.lightboxCategory}>{lightboxData.category}</span>
              <h2 className={styles.lightboxTitle}>{lightboxData.title}</h2>
            </div>
            <button className={styles.lightboxCloseBtn} onClick={closeLightbox}>✕</button>
          </div>

          <div className={styles.lightboxMainLayout} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxStage}>
              <img 
                src={lightboxData.images[lightboxData.index]} 
                alt={lightboxData.title} 
                className={styles.lightboxImage} 
              />

              {lightboxData.images.length > 1 && (
                <>
                  <button className={`${styles.lightboxArrow} ${styles.lightboxPrev}`} onClick={prevLightboxImg}>
                    ‹
                  </button>
                  <button className={`${styles.lightboxArrow} ${styles.lightboxNext}`} onClick={nextLightboxImg}>
                    ›
                  </button>
                </>
              )}

              <div className={styles.lightboxImgCounter}>
                {String(lightboxData.index + 1).padStart(2, '0')} / {String(lightboxData.images.length).padStart(2, '0')}
              </div>
            </div>

            {lightboxData.details && (
              <div className={styles.lightboxDetailsPanel}>
                <div className={styles.detailsSection}>
                  <p className={styles.extendedDescription}>{lightboxData.details.extendedText}</p>
                </div>

                <div className={styles.detailsSection}>
                  <h4>Paleta Cromática</h4>
                  <div className={styles.colorSwatches}>
                    {lightboxData.details.palette.map((color, cIdx) => (
                      <div key={cIdx} className={styles.swatchItem}>
                        <span className={styles.colorCircle} style={{ backgroundColor: color }} />
                        <span className={styles.colorCode}>{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.detailsSection}>
                  <h4>Materiales Clave</h4>
                  <ul className={styles.materialsList}>
                    {lightboxData.details.materials.map((mat, mIdx) => (
                      <li key={mIdx}>{mat}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.detailsSection}>
                  <h4>Iluminación</h4>
                  <p className={styles.lightingText}>{lightboxData.details.lighting}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;