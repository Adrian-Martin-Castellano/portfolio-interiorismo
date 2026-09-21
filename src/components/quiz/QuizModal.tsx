import React, { useEffect, useRef, useState } from 'react'; 
import { QUIZ_QUESTIONS, ALL_QUIZ_IMAGES } from './quizData';
import type { QuizOption } from './quizData';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { preloadImages } from '../../utils/preloadImages'; 
import styles from './QuizModal.module.css';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [sliderValues, setSliderValues] = useState<Record<number, Record<string, number>>>({});
  const [isFinished, setIsFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && ALL_QUIZ_IMAGES && ALL_QUIZ_IMAGES.length > 0) {
      preloadImages(ALL_QUIZ_IMAGES);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('quiz-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('quiz-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('quiz-open');
    };
  }, [isOpen]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [currentStep, isFinished]);

  if (!isOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  if (!currentQuestion && !isFinished) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <p style={{ textAlign: 'center', padding: '20px' }}>No hay preguntas disponibles.</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }

  const currentSelections = currentQuestion ? answers[currentQuestion.id] || [] : [];

  const getCurrentSliders = (): Record<string, number> => {
    if (!currentQuestion) return {};
    
    if (sliderValues[currentQuestion.id]) {
      return sliderValues[currentQuestion.id];
    }
    if (currentQuestion.type === 'slider_group' && currentQuestion.sliders) {
      const defaults: Record<string, number> = {};
      currentQuestion.sliders.forEach((s) => {
        defaults[s.id] = s.defaultValue ?? 10;
      });
      return defaults;
    }

    return {};
  };

  const currentSliders = getCurrentSliders();

  const handleSelectOption = (option: QuizOption) => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;

    if (currentQuestion.type === 'single') {
      setAnswers((prev) => ({ ...prev, [qId]: [option.id] }));
    } else {
      const max = currentQuestion.maxSelections || 3;
      const exists = currentSelections.includes(option.id);

      if (exists) {
        setAnswers((prev) => ({
          ...prev,
          [qId]: currentSelections.filter((id) => id !== option.id),
        }));
      } else if (currentSelections.length < max) {
        setAnswers((prev) => ({
          ...prev,
          [qId]: [...currentSelections, option.id],
        }));
      }
    }
  };

  const handleSliderChange = (
    sliderId: string,
    value: number,
    _calculatedStyles: Record<string, number>
  ) => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    setSliderValues((prev) => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || currentSliders),
        [sliderId]: value,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const isNextDisabled = () => {
    if (!currentQuestion) return true;
    if (currentQuestion.type === 'slider_group') {
      return false;
    }
    return currentSelections.length === 0;
  };

  const handleClose = () => {
    setCurrentStep(0);
    setAnswers({});
    setSliderValues({});
    setIsFinished(false);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer} ref={containerRef}>
        {!isFinished && (
          <button 
            className={styles.closeBtn} 
            onClick={handleClose}
            aria-label="Cerrar test"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        {!isFinished ? (
          <>
            <QuizQuestion
              question={currentQuestion}
              selectedOptions={currentSelections}
              onSelectOption={handleSelectOption}
              sliderValues={currentSliders}
              onSliderChange={handleSliderChange}
            />

            <div className={styles.navigationFooter}>
              {currentStep > 0 && (
                <button className={styles.prevBtn} onClick={handlePrev}>
                  Anterior
                </button>
              )}
              <button
                className={styles.nextBtn}
                onClick={handleNext}
                disabled={isNextDisabled()}
              >
                {currentStep === QUIZ_QUESTIONS.length - 1 ? 'Ver Resultado' : 'Siguiente'}
              </button>
            </div>
          </>
        ) : (
          <QuizResult answers={answers} sliderValues={sliderValues} onClose={handleClose} />
        )}
      </div>
    </div>
  );
};