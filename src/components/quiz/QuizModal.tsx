import React, { useEffect, useRef } from 'react'; // <-- 1. Importar useRef
import { QUIZ_QUESTIONS } from './quizData';
import type { QuizOption } from './quizData';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import styles from './QuizModal.module.css';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string[]>>({});
  const [isFinished, setIsFinished] = React.useState(false);

  // 2. Referencia para el contenedor escroleable
  const containerRef = useRef<HTMLDivElement>(null);

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

  // 3. Resetear el scroll hacia arriba cada vez que cambia la pregunta
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [currentStep, isFinished]);

  if (!isOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const currentSelections = answers[currentQuestion?.id] || [];

  const handleSelectOption = (option: QuizOption) => {
    const qId = currentQuestion.id;

    if (currentQuestion.type === 'single') {
      setAnswers((prev) => ({ ...prev, [qId]: [option.id] }));
    } else {
      const max = currentQuestion.maxSelections || 3;
      const exists = currentSelections.includes(option.id);

      if (exists) {
        setAnswers((prev) => ({
          ...prev,
          [qId]: currentSelections.filter((id) => id !== option.id)
        }));
      } else if (currentSelections.length < max) {
        setAnswers((prev) => ({
          ...prev,
          [qId]: [...currentSelections, option.id]
        }));
      }
    }
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

  return (
    <div className={styles.modalOverlay}>
      {/* 4. Asignar ref={containerRef} aquí */}
      <div className={styles.modalContainer} ref={containerRef}>
        {!isFinished && (
          <button 
            className={styles.closeBtn} 
            onClick={onClose}
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
                disabled={currentSelections.length === 0}
              >
                {currentStep === QUIZ_QUESTIONS.length - 1 ? 'Ver Resultado' : 'Siguiente'}
              </button>
            </div>
          </>
        ) : (
          <QuizResult answers={answers} onClose={onClose} />
        )}
      </div>
    </div>
  );
};