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
    }
  > = {
    minimal: {
      title: { es: "Línea Minimalista Calma", en: "Calm Minimalist Line" },
      subtitle: { es: "Pureza, orden y elegancia atemporal", en: "Purity, order, and timeless elegance" },
      description: {
        es: "Tu visión prioriza la amplitud espacial, la luz natural y una paleta sobria pero acogedora.",
        en: "Your vision prioritizes spaciousness, natural light, and a subtle yet welcoming palette."
      }
    },
    balines: {
      title: { es: "Línea Balinesa Orgánica", en: "Organic Balinese Line" },
      subtitle: { es: "Texturas naturales y conexión terrenal", en: "Natural textures and earthy connection" },
      description: {
        es: "Conectas profundamente con la madera vista, las fibras artesanales y una arquitectura que se integra con la naturaleza.",
        en: "You deeply connect with exposed wood, handcrafted fibers, and architecture seamlessly integrated with nature."
      }
    }
  };

  const result = styleDetails[winnerStyle] || styleDetails.minimal;

  return (
    <div className={styles.resultContainer}>
      <span className={styles.resultTag}>
        {lang === 'en' ? 'YOUR DESIGN DIAGNOSTIC' : 'TU DIAGNÓSTICO DE DISEÑO'}
      </span>
      
      <h2 className={styles.resultTitle}>{result.title[lang]}</h2>
      <h3 className={styles.resultSubtitle}>{result.subtitle[lang]}</h3>
      <p className={styles.resultDescription}>{result.description[lang]}</p>

      <div className={styles.resultActions}>
        <button onClick={onClose} className={styles.primaryResultBtn}>
          {lang === 'en' ? 'Return to Website' : 'Volver a la web'}
        </button>
      </div>
    </div>
  );
};