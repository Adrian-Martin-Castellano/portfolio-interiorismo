import React from 'react';
import { QUIZ_QUESTIONS } from './quizData';
import styles from './QuizModal.module.css';
import { useLanguage } from '../../context/LanguageContext';

interface QuizResultProps {
  answers: Record<number, string[]>;
  onClose: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ answers, onClose }) => {
  const { language } = useLanguage();
  const lang = (language === 'en' ? 'en' : 'es') as 'es' | 'en';

  const calculateWinnerStyle = () => {
    const styleScores: Record<string, number> = {};

    Object.entries(answers).forEach(([questionId, selectedOptionIds]) => {
      const question = QUIZ_QUESTIONS.find((q) => q.id === Number(questionId));
      if (!question) return;

      selectedOptionIds.forEach((optionId) => {
        const option = question.options.find((opt) => opt.id === optionId);
        if (!option || !option.styles) return;

        Object.entries(option.styles).forEach(([styleName, score]) => {
          styleScores[styleName] = (styleScores[styleName] || 0) + score;
        });
      });
    });

    let winner = 'minimal';
    let maxScore = -1;

    Object.entries(styleScores).forEach(([styleName, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winner = styleName;
      }
    });

    return winner;
  };

  const winnerStyle = calculateWinnerStyle();

  const styleDetails: Record<
    string,
    {
      title: { es: string; en: string };
      subtitle: { es: string; en: string };
      description: { es: string; en: string };
      image: string;
      highlights: {
        materials: { es: string; en: string };
        palette: { es: string; en: string };
        vibe: { es: string; en: string };
      };
    }
  > = {
    minimal: {
      title: { es: "Línea Minimalista Pure", en: "Pure Minimalist Line" },
      subtitle: { es: "Pureza, orden y elegancia atemporal", en: "Purity, order, and timeless elegance" },
      description: {
        es: "Tu visión prioriza la amplitud espacial, la luz natural y una paleta limpia donde cada elemento cumple una función esencial.",
        en: "Your vision prioritizes spaciousness, natural light, and a clean palette where every element serves a true purpose."
      },
      image: "/assets/quiz/results/minimal.jpg",
      highlights: {
        materials: { es: "Microcemento, cristal, acero pulido", en: "Microcement, glass, polished steel" },
        palette: { es: "Blancos puros, marfil, grises suaves", en: "Pure whites, ivory, soft greys" },
        vibe: { es: "Serenidad, orden absoluto, amplitud", en: "Serenity, absolute order, spaciousness" }
      }
    },
    japandi: {
      title: { es: "Línea Japandi Calm", en: "Calm Japandi Line" },
      subtitle: { es: "Serenidad nórdica y artesanía japonesa", en: "Nordic serenity meets Japanese craft" },
      description: {
        es: "Buscas un refugio de paz. Un equilibrio perfecto entre la funcionalidad escandinava, las maderas claras y la sobriedad oriental.",
        en: "You look for a peaceful sanctuary. A subtle balance between Scandinavian functionality, light woods, and Asian minimalism."
      },
      image: "/assets/quiz/results/japandi.jpg",
      highlights: {
        materials: { es: "Madera de roble claro, papel de arroz, bambú", en: "Light oak wood, rice paper, bamboo" },
        palette: { es: "Lino, arena, beige y pinceladas negras", en: "Linen, sand, beige, and black accents" },
        vibe: { es: "Paz mental, calidez orgánica, sobriedad", en: "Peace of mind, organic warmth, subtlety" }
      }
    },
    balines: {
      title: { es: "Línea Balinesa Orgánica", en: "Organic Balinese Line" },
      subtitle: { es: "Texturas artesanales y conexión terrenal", en: "Handcrafted textures and earthy connection" },
      description: {
        es: "Conectas profundamente con la madera vista, las fibras naturales y una arquitectura sensorial que traslada la naturaleza al interior.",
        en: "You deeply connect with exposed wood, natural fibers, and a sensory architecture that brings nature indoors."
      },
      image: "/assets/quiz/results/balines.jpg",
      highlights: {
        materials: { es: "Teca, ratán, piedra volcánica, yute", en: "Teak, rattan, volcanic stone, jute" },
        palette: { es: "Verdes vegetación, tonos canela, madera oscura", en: "Botanical greens, cinnamon tones, dark wood" },
        vibe: { es: "Exotismo, relax absoluto, naturaleza", en: "Exoticism, pure relaxation, nature" }
      }
    },
    mediterraneo: {
      title: { es: "Línea Mediterránea Cálida", en: "Warm Mediterranean Line" },
      subtitle: { es: "Luz solar, tonos barro y arquitectura viva", en: "Sunlight, earthy clay, and living architecture" },
      description: {
        es: "Te inspiran los ambientes fluidos, la calidez de la arcilla, el lino y las tonalidades solares que evocan la costa y el bienestar.",
        en: "You are inspired by fluid spaces, warm terracotta, linen, and sun-kissed hues evoking coastal ease and well-being."
      },
      image: "/assets/quiz/results/mediterraneo.jpg",
      highlights: {
        materials: { es: "Barro cocido, cal, madera lavada, lino", en: "Terracotta clay, whitewash, weathered wood, linen" },
        palette: { es: "Terracota, blanco cálido, azul cobalto", en: "Terracotta, warm white, cobalt blue" },
        vibe: { es: "Luz marina, frescura, calidez artesanal", en: "Sea breeze, freshness, artisanal warmth" }
      }
    },
    industrial: {
      title: { es: "Línea Industrial Loft", en: "Industrial Loft Line" },
      subtitle: { es: "Carácter urbano, contraste y fuerza estructural", en: "Urban character, contrast, and raw strength" },
      description: {
        es: "Prefieres espacios con personalidad marcada, donde el hormigón, el acero negro y las estructuras vistas toman el protagonismo.",
        en: "You prefer bold spaces with distinct character, featuring raw concrete, black steel, and exposed structural features."
      },
      image: "/assets/quiz/results/industrial.jpg",
      highlights: {
        materials: { es: "Hormigón visto, vigas de hierro, ladrillo, cuero", en: "Exposed concrete, iron beams, brick, leather" },
        palette: { es: "Gris grafito, negro mate, óxido, cuero envejecido", en: "Graphite grey, matte black, rust, aged leather" },
        vibe: { es: "Carácter, sofisticación urbana, contraste", en: "Character, urban sophistication, contrast" }
      }
    },
    contemporaneo: {
      title: { es: "Línea Contemporánea Luxury", en: "Contemporary Luxury Line" },
      subtitle: { es: "Sofisticación vanguardista y riqueza de matices", en: "Cutting-edge sophistication and rich textures" },
      description: {
        es: "Tu estilo destaca por la combinación de tonos profundos, contrastes elegantes y piezas de autor con una estética muy cuidada.",
        en: "Your style stands out through deep color palettes, elegant contrasts, and signature pieces with refined aesthetics."
      },
      image: "/assets/quiz/results/contemporaneo.jpg",
      highlights: {
        materials: { es: "Mármol ahumado, nogal, detalles dorados, terciopelo", en: "Smoked marble, walnut, brass details, velvet" },
        palette: { es: "Azul noche, nogal profundo, detalles en latón", en: "Midnight blue, deep walnut, brass accents" },
        vibe: { es: "Elegancia nocturna, exclusividad, vanguardia", en: "Night elegance, exclusivity, avant-garde" }
      }
    },
    wabi_sabi: {
      title: { es: "Línea Wabi-Sabi Essentia", en: "Wabi-Sabi Essentia Line" },
      subtitle: { es: "La elegancia de lo imperfecto y lo orgánico", en: "The elegance of imperfection and nature" },
      description: {
        es: "Aprecias la belleza en las texturas rugosas, la piedra natural, el yeso artesanal y los elementos con historia y textura.",
        en: "You value beauty in unrefined textures, raw stone, handcrafted plaster, and elements that tell an authentic story."
      },
      image: "/assets/quiz/results/wabi_sabi.jpg",
      highlights: {
        materials: { es: "Yeso a la cal, piedra sin pulir, madera recuperada", en: "Lime plaster, unpolished stone, reclaimed wood" },
        palette: { es: "Tono ceniza, tierra cruda, blanco roto", en: "Ash grey, raw earth, off-white" },
        vibe: { es: "Autenticidad, calma orgánica, textura", en: "Authenticity, organic calm, raw texture" }
      }
    },
    escandinavo: {
      title: { es: "Línea Escandinava Luminosa", en: "Luminous Scandinavian Line" },
      subtitle: { es: "Confort, funcionalidad y máxima luminosidad", en: "Cozy comfort, functionality, and maximum light" },
      description: {
        es: "Priorizas los espacios acogedores (concepto Hygge), las maderas claras de roble y una iluminación envolvente y natural.",
        en: "You focus on cozy living (Hygge concept), light oak woods, and soft, natural, enveloping lighting."
      },
      image: "/assets/quiz/results/escandinavo.jpg",
      highlights: {
        materials: { es: "Roble claro, lana, cerámica, algodón", en: "Light oak, wool, ceramics, cotton" },
        palette: { es: "Blanco nieve, verde salvia, tonos pastel", en: "Snow white, sage green, soft pastels" },
        vibe: { es: "Hygge (confort), luminosidad, calidez", en: "Hygge (coziness), brightness, warmth" }
      }
    },
    art_deco: {
      title: { es: "Línea Neo Art Déco", en: "Neo Art Deco Line" },
      subtitle: { es: "Detalles dorados, geometría y glamour moderno", en: "Brass details, geometry, and modern glamour" },
      description: {
        es: "Atraen tu atención los toques metalizados en latón, los mármoles vetados y las líneas geométricas que aportan elegancia exclusiva.",
        en: "You are drawn to brass metallic accents, veined marbles, and geometric lines that create exclusive, sophisticated spaces."
      },
      image: "/assets/quiz/results/art_deco.jpg",
      highlights: {
        materials: { es: "Latón cepillado, mármol calacatta, espejos, sedas", en: "Brushed brass, calacatta marble, mirrors, silk" },
        palette: { es: "Dorado, negro brillante, verde esmeralda, marfil", en: "Gold, glossy black, emerald green, ivory" },
        vibe: { es: "Glamour, geometría, lujo distintivo", en: "Glamour, geometry, distinctive luxury" }
      }
    },
    rustico: {
      title: { es: "Línea Rústico Moderno", en: "Modern Rustic Line" },
      subtitle: { es: "Calidez de hogar con acabados contemporáneos", en: "Homely warmth with contemporary touches" },
      description: {
        es: "Buscas el refugio perfecto combinando la nobleza de la madera maciza y la piedra con la comodidad y amplitud del diseño moderno.",
        en: "You seek the ultimate cozy home by blending noble solid wood and stone with modern comfort and spatial freedom."
      },
      image: "/assets/quiz/results/rustico.jpg",
      highlights: {
        materials: { es: "Vigas de madera maciza, piedra mampostería, lino pesado", en: "Solid timber beams, masonry stone, heavy linen" },
        palette: { es: "Tonos roble, ocre, terracota suave, crema", en: "Oak tones, ochre, soft terracotta, cream" },
        vibe: { es: "Refugio cálido, solidez, confort atemporal", en: "Warm refuge, solidity, timeless comfort" }
      }
    }
  };

  const result = styleDetails[winnerStyle] || styleDetails.minimal;

  return (
    <div className={styles.resultContainer}>
      {/* Banner con imagen del estilo */}
      <div className={styles.resultHeaderImage}>
        <img 
          src={result.image} 
          alt={result.title[lang]} 
          onError={(e) => {
            // Fallback por si la imagen aún no existe en el proyecto
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className={styles.resultImageOverlay} />
        <div className={styles.resultHeaderContent}>
          <span className={styles.resultMatchBadge}>
            ✨ {lang === 'en' ? '98% Style Match' : '98% de Coincidencia'}
          </span>
          <span className={styles.resultTag}>
            {lang === 'en' ? 'YOUR DESIGN DIAGNOSTIC' : 'TU DIAGNÓSTICO DE DISEÑO'}
          </span>
        </div>
      </div>

      <div className={styles.resultBody}>
        <h2 className={styles.resultTitle}>{result.title[lang]}</h2>
        <h3 className={styles.resultSubtitle}>{result.subtitle[lang]}</h3>
        <p className={styles.resultDescription}>{result.description[lang]}</p>

        {/* Bloque de características clave */}
        <div className={styles.highlightsGrid}>
          <div className={styles.highlightCard}>
            <span className={styles.highlightIcon}>🧱</span>
            <div>
              <strong>{lang === 'en' ? 'Key Materials' : 'Materiales Clave'}</strong>
              <p>{result.highlights.materials[lang]}</p>
            </div>
          </div>

          <div className={styles.highlightCard}>
            <span className={styles.highlightIcon}>🎨</span>
            <div>
              <strong>{lang === 'en' ? 'Color Palette' : 'Paleta de Color'}</strong>
              <p>{result.highlights.palette[lang]}</p>
            </div>
          </div>

          <div className={styles.highlightCard}>
            <span className={styles.highlightIcon}>✨</span>
            <div>
              <strong>{lang === 'en' ? 'Sensorial Atmosphere' : 'Atmósfera Sensorial'}</strong>
              <p>{result.highlights.vibe[lang]}</p>
            </div>
          </div>
        </div>

        <div className={styles.resultActions}>
          <button onClick={onClose} className={styles.primaryResultBtn}>
            {lang === 'en' ? 'Return to Website' : 'Volver a la web'}
          </button>
        </div>
      </div>
    </div>
  );
};