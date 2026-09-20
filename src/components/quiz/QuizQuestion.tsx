import React from 'react';
import type { Question, QuizOption, SliderOption } from './quizData';
import styles from './QuizModal.module.css';
import { useLanguage } from '../../context/LanguageContext';

interface QuizQuestionProps {
  question: Question;
  selectedOptions: string[];
  onSelectOption: (option: QuizOption) => void;
  sliderValues?: Record<string, number>;
  onSliderChange?: (sliderId: string, value: number, styles: Record<string, number>) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedOptions,
  onSelectOption,
  sliderValues = {},
  onSliderChange
}) => {
  const { language } = useLanguage();
  const lang = (language === 'en' ? 'en' : 'es') as 'es' | 'en';

  const totalQuestions = 5;

  return (
    <div className={styles.questionContainer}>
      <span className={styles.questionStep}>
        {lang === 'en'
          ? `Question ${question.id} of ${totalQuestions}`
          : `Pregunta ${question.id} de ${totalQuestions}`}
      </span>
      <h3 className={styles.questionTitle}>{question.title[lang]}</h3>
      <p className={styles.questionSubtitle}>{question.subtitle[lang]}</p>

      {question.type === 'slider_group' && question.sliders ? (
        <div className={styles.sliderGroupContainer}>
          {question.sliders.map((slider: SliderOption) => {
            const currentValue = sliderValues[slider.id] ?? slider.defaultValue ?? 5;

            return (
              <div key={slider.id} className={styles.sliderCard}>
                <div className={styles.sliderHeader}>
                  <h4 className={styles.sliderLabel}>{slider.label[lang]}</h4>
                  <span className={styles.rangeBadge}>{currentValue}</span>
                </div>
                {slider.sublabel && (
                  <p className={styles.sliderSublabel}>{slider.sublabel[lang]}</p>
                )}

                <div className={styles.rangeWrapper}>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={currentValue}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const calculatedStyles = slider.getStyles(val);
                      if (onSliderChange) {
                        onSliderChange(slider.id, val, calculatedStyles);
                      }
                    }}
                    className={styles.rangeInput}
                  />
                </div>

                <div className={styles.sliderLabels}>
                  <span>{slider.minLabel[lang]}</span>
                  <span>{slider.maxLabel[lang]}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : question.type === 'multiple' && question.options?.[0]?.hex ? (
        <div className={styles.colorGrid}>
          {question.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                className={`${styles.colorCard} ${
                  isSelected ? styles.selectedColor : ''
                }`}
                onClick={() => onSelectOption(option)}
              >
                <span
                  className={styles.colorCircle}
                  style={{ backgroundColor: option.hex }}
                />
                <span className={styles.colorLabel}>{option.label[lang]}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className={styles.optionsGrid}>
          {question.options?.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <div
                key={option.id}
                className={`${styles.optionCard} ${
                  isSelected ? styles.selectedCard : ''
                }`}
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