import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';


interface StyleCardProps {
  index: number;
  images: string[];
  category: string;
  title: string;
  quote: string;
  description: string;
  alignment: 'left' | 'right';
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
        description: 'Uso profundo de maderas exóticas certificadas, fibras naturales trenzadas a mano y presencia de piedra volcánica escultórica.'
      },
      {
        category: 'Colección Pureza',
        title: 'Minimalismo Cálido',
        quote: '“Reducir a lo esencial para hallar la calma absoluta, esculpiendo el espacio a través de la luz y los materiales crudos.”',
        description: 'Ausencia de ornamentos innecesarios en favor de geometrías puras, morteros de cal y paletas tonales en gamas suaves.'
      },
      {
        category: 'Colección Urbana',
        title: 'Industrial Orgánico',
        quote: '“El carácter de la estructura vista y el metal, suavizado por la calidez texturizada de la madera recuperada.”',
        description: 'Elementos estructurales honestos como hormigón o hierro forjado, contrastados estratégicamente con maderas nobles y vegetación.'
      },
      {
        category: 'Colección Vanguardia',
        title: 'Línea Contemporánea',
        quote: '“El reflejo del diseño actual. Espacios sofisticados donde conviven piezas icónicas de arte con molduras clásicas.”',
        description: 'Espacios donde conviven acabados modernos, mármoles de vetas muy marcadas y una paleta cromática audaz y equilibrada.'
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
    stickyCtaBtn: 'Contacta'
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
        description: 'Deep use of certified exotic woods, hand-woven natural fibers, and sculptural volcanic stone.'
      },
      {
        category: 'Purity Collection',
        title: 'Warm Minimalism',
        quote: '“Reducing to the essential to find absolute calm, sculpting space through light and raw materials.”',
        description: 'Absence of unnecessary ornament in favor of pure geometry, lime mortars, and soft bone color palettes.'
      },
      {
        category: 'Urban Collection',
        title: 'Organic Industrial',
        quote: '“The character of exposed structure and metal, softened by the textured warmth of reclaimed wood.”',
        description: 'Honest structural elements like concrete or wrought iron, strategically balanced with noble woods and greenery.'
      },
      {
        category: 'Vanguard Collection',
        title: 'Contemporary Line',
        quote: '“The reflection of current design. Sophisticated spaces where iconic art pieces meet classic moldings.”',
        description: 'Spaces where modern finishes, bold marble veining, and a balanced color palette coexist seamlessly.'
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
        title: 'Atelier Concept Store',
        subtitle: 'Commercial Architecture & Lighting'
      }
    ],

    moreStylesLabel: 'Limitless Versatility',
    moreStylesTitle: 'Every space demands a unique identity',
    moreStylesText: 'These four design lines represent only a part of what we do. We tailor every detail to match your vision, lifestyle, and architectural requirements.',
    moreStylesCta: 'Explore All Completed Projects →',

    stickyCtaText: 'Have a space you wish to transform?',
    stickyCtaBtn: "Let's Talk"
  }
};

function StyleCard({ index, images, category, title, quote, description, alignment }: StyleCardProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const alignmentClass = alignment === 'right' ? styles.alignRight : styles.alignLeft;
  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <div className={`${styles.styleFloatingCard} ${alignmentClass}`}>
      <div className={styles.styleCardContent}>
        <div className={styles.carouselContainer}>
          <div 
            className={styles.carouselTrack} 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, imgIdx) => (
              <img 
                key={imgIdx} 
                src={img} 
                alt={`${title} ${imgIdx + 1}`} 
                className={styles.carouselImage} 
              />
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
                    onClick={() => setCurrentIndex(dotIdx)}
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
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroCard}>
          <img 
            src={isDark ? '/logo_portada_oscuro.jpeg' : '/logo_portada_claro.jpeg'} 
            alt="Logo BLIC" 
            className={styles.heroImage} 
          />
        </div>

        <a href="#videoSection" className={styles.scrollArrow} aria-label="Bajar a contenido">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M12 6v12"/>
          </svg>
        </a>
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
            src="/marco.png" 
            alt="Líneas de Diseño de Autor" 
            className={styles.introHeaderImage}
          />
        </div>

        {t.cards.map((card, idx) => (
          <StyleCard 
            key={idx}
            index={idx}
            alignment={idx % 2 === 0 ? 'left' : 'right'}
            category={card.category}
            title={card.title}
            quote={card.quote}
            description={card.description}
            images={imagesList[idx]}
          />
        ))}
      </section>

      {/* 4. PROYECTOS DESTACADOS */}
      <section className={styles.featuredProjectsSection}>
        <div className={styles.featuredHeader}>
          <span>{t.featuredLabel}</span>
          <h2>{t.featuredTitle}</h2>
          <p>{t.featuredSubtitle}</p>
        </div>

        <div className={styles.projectsGrid}>
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

      {/* 6. BARRA FLOTANTE DE CONTACTO ("HABLEMOS") */}
      <div className={styles.stickyContactBar}>
        <span>{t.stickyCtaText}</span>
        <Link to="/contacto" className={styles.talkButton}>
          {t.stickyCtaBtn}
        </Link>
      </div>
    </div>
  );
}

export default Home;