import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { useLanguage } from '../context/LanguageContext';

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
    heroTitle: 'BLIC',
    heroSubtitle: 'Diseño que habla, ideas que inspiran',
    heroCta: 'Ver Proyectos',
    videoLabel: 'Explora nuestro universo',
    videoTitle: 'Esencia en movimiento',
    summaryTitle: 'Espacios con alma',
    summaryText: 'Especializado en proyectos de interiorismo que equilibran la estética contemporánea con la calidez natural. Cada espacio está diseñado al detalle para reflejar la identidad y necesidades de quienes lo habitan.',
    linkAbout: '→ Conoce el estudio',
    linkContact: '→ ¿Tienes una idea? Hablemos',
    stylesLabel: 'Nuestra Identidad',
    stylesTitle: 'Líneas de Diseño de Autor',
    othersTitle: 'Explorando horizontes',
    othersText: 'Cada espacio posee sus propias reglas. Aunque estas cuatro líneas definen nuestra esencia, en BLIC desarrollamos proyectos eclécticos, clásicos renovados o de corte rústico moderno.',
    othersLink: 'Ver galería completa de proyectos →',
    cards: [
      {
        category: 'Colección Natura',
        title: 'Esencia Balinesa',
        quote: '“Una oda a la desconexión tropical, donde la arquitectura se rinde ante la textura pura de la piedra y la teca.”',
        description: 'Uso profundo de maderas exóticas certificadas, fibras naturales trenzadas a mano (ratán, mimbre) y presencia de piedra volcánica escultórica. Una fusión orgánica constante entre el espacio interior y la naturaleza exótica.'
      },
      {
        category: 'Colección Pureza',
        title: 'Minimalismo Cálido',
        quote: '“Reducir a lo esencial para hallar la calma absoluta, esculpiendo el espacio a través de la luz y los materiales crudos.”',
        description: 'Ausencia de ornamentos innecesarios en favor de geometrías puras. El diseño se enriquece con texturas rugosas de morteros de cal, paletas tonales en gamas suaves de beige, arena y hueso, junto a una iluminación indirecta que aporta serenidad.'
      },
      {
        category: 'Colección Urbana',
        title: 'Industrial Orgánico',
        quote: '“El carácter de la estructura vista y el metal, suavizado por la calidez texturizada de la madera recuperada.”',
        description: 'Elementos estructurales honestos como el hormigón o el hierro forjado, contrastados estratégicamente con grandes plantas de hoja verde, textiles naturales pesados y maderas nobles que transforman la rudeza en sofisticación.'
      },
      {
        category: 'Colección Vanguardia',
        title: 'Línea Contemporánea',
        quote: '“El reflejo del diseño actual. Espacios sofisticados donde conviven piezas icónicas de arte con molduras clásicas.”',
        description: 'Espacios donde conviven acabados modernos, mármoles de vetas muy marcadas y una paleta cromática audaz pero sumamente equilibrada. Una narrativa ecléctica pensada para perdurar en el tiempo.'
      }
    ]
  },
  en: {
    heroTitle: 'BLIC',
    heroSubtitle: 'Design that speaks, ideas that inspire',
    heroCta: 'View Projects',
    videoLabel: 'Explore our universe',
    videoTitle: 'Essence in motion',
    summaryTitle: 'Spaces with soul',
    summaryText: 'Specialized in interior design projects that balance contemporary aesthetics with natural warmth. Every space is crafted in detail to reflect the identity and needs of those who inhabit it.',
    linkAbout: '→ Discover the studio',
    linkContact: '→ Have an idea? Let\'s talk',
    stylesLabel: 'Our Identity',
    stylesTitle: 'Signature Design Lines',
    othersTitle: 'Exploring horizons',
    othersText: 'Every space has its own rules. Although these four lines define our essence, at BLIC we develop eclectic, classic modern, or rustic contemporary projects.',
    othersLink: 'View full project gallery →',
    cards: [
      {
        category: 'Natura Collection',
        title: 'Balinese Essence',
        quote: '“An ode to tropical retreat, where architecture yields to the pure texture of stone and teak.”',
        description: 'Deep use of certified exotic woods, hand-woven natural fibers (rattan, wicker) and sculptural volcanic stone. A continuous organic fusion between interior space and exotic nature.'
      },
      {
        category: 'Purity Collection',
        title: 'Warm Minimalism',
        quote: '“Reducing to the essential to find absolute calm, sculpting space through light and raw materials.”',
        description: 'Absence of unnecessary ornament in favor of pure geometry. Enriched with rough lime mortar textures, soft beige and bone color palettes, alongside indirect lighting.'
      },
      {
        category: 'Urban Collection',
        title: 'Organic Industrial',
        quote: '“The character of exposed structure and metal, softened by the textured warmth of reclaimed wood.”',
        description: 'Honest structural elements like concrete or wrought iron, strategically contrasted with lush green plants, heavy natural textiles, and noble woods that turn roughness into sophistication.'
      },
      {
        category: 'Vanguard Collection',
        title: 'Contemporary Line',
        quote: '“The reflection of current design. Sophisticated spaces where iconic art pieces meet classic moldings.”',
        description: 'Spaces where modern finishes, bold marble veining, and a balanced color palette coexist. An eclectic narrative designed to endure through time.'
      }
    ]
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
  const t = translations[language];

  const imagesList = [
    ['/assets/balines-1.png', '/assets/balines-2.png', '/assets/balines-3.png'],
    ['/assets/minimal-1.png', '/assets/minimal-2.png', '/assets/minimal-3.png'],
    ['/assets/industrial-1.png', '/assets/industrial-2.png', '/assets/industrial-3.png'],
    ['/assets/contemporaneo-1.png', '/assets/contemporaneo-2.png', '/assets/contemporaneo-3.png']
  ];

  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroCard}>
          <h1>{t.heroTitle}</h1>
          <p className={styles.subtitle}>{t.heroSubtitle}</p>
          <Link to="/proyectos" className={styles.ctaButton}>
            {t.heroCta}
          </Link>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className={styles.videoHeader}>
          <span>{t.videoLabel}</span>
          <h2>{t.videoTitle}</h2>
        </div>
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            <video autoPlay muted loop playsInline className={styles.mainVideo}>
              <source src="/video-presentacion.mp4" type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
            <div className={styles.videoOverlay}></div>
          </div>
        </div>
      </section>

      <section className={styles.summarySection}>
        <div className={styles.summaryContent}>
          <h2>{t.summaryTitle}</h2>
          <p>{t.summaryText}</p>
          <div className={styles.linksGrid}>
            <Link to="/sobre-mi" className={styles.secondaryLink}>{t.linkAbout}</Link>
            <Link to="/contacto" className={styles.secondaryLink}>{t.linkContact}</Link>
          </div>
        </div>
      </section>

      <section className={styles.stylesSectionWrapper}>
        <div className={styles.stylesIntroHeader}>
          <span>{t.stylesLabel}</span>
          <h2>{t.stylesTitle}</h2>
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

        <div className={`${styles.styleFloatingCard} ${styles.othersCard}`}>
          <div className={styles.othersContent}>
            <h3>{t.othersTitle}</h3>
            <p>{t.othersText}</p>
            <Link to="/proyectos" className={styles.secondaryLink}>{t.othersLink}</Link>
          </div>
        </div>

      </section>
    </div>
  );
}

export default Home;