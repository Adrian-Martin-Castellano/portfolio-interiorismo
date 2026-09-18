import React from 'react';
import type { Question, QuizOption } from './quizData';
import styles from './QuizModal.module.css';
import { useLanguage } from '../../context/LanguageContext';

interface QuizQuestionProps {
  question: Question;
  selectedOptions: string[];
  onSelectOption: (option: QuizOption) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedOptions,
  onSelectOption
}) => {
  const { language } = useLanguage();
  const lang = (language === 'en' ? 'en' : 'es') as 'es' | 'en';

  return (
    <div className={styles.questionContainer}>
      <span className={styles.questionStep}>
        {lang === 'en' ? `Question ${question.id} of 10` : `Pregunta ${question.id} de 10`}
      </span>
      <h3 className={styles.questionTitle}>{question.title[lang]}</h3>
      <p className={styles.questionSubtitle}>{question.subtitle[lang]}</p>

      {question.type === 'multiple' && question.options[0].hex ? (
        <div className={styles.colorGrid}>
          {question.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <button
                key={option.id}
                className={`${styles.colorCard} ${isSelected ? styles.selectedColor : ''}`}
                onClick={() => onSelectOption(option)}
              >
                <span className={styles.colorCircle} style={{ backgroundColor: option.hex }} />
                <span className={styles.colorLabel}>{option.label[lang]}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className={styles.optionsGrid}>
          {question.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <div
                key={option.id}
                className={`${styles.optionCard} ${isSelected ? styles.selectedCard : ''}`}
                onClick={() => onSelectOption(option)}
              >
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.label[lang]}
                    loading="lazy"
                    decoding="async"
                    className={styles.optionImage}
                  />
                )}
                <div className={styles.optionInfo}>
                  <h4>{option.label[lang]}</h4>
                  {option.sublabel && <p>{option.sublabel[lang]}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};