import React, { useState, useEffect, useRef } from 'react';
import styles from '../Style/arena.module.scss';
import StepsProgress from './StepsProgress/StepsProgress';
import Step1Content from './StepsProgress/Step1Content';
import Step2Content from './StepsProgress/Step2Content';
import Step3Content from './StepsProgress/Step3Content';
import Step4Content from './StepsProgress/Step4Content';
import Step5Content from './StepsProgress/Step5Content';
import { Button } from "@/components/ui/button"

import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Timer from '@/components/Timer';
import QuestionComponent from './StepsProgress/QuestionComponent';
import { questions } from '../data/questions';

interface ExamContentProps {
  step: number;
  onComplete: (isCorrect: boolean) => void;
}

const ExamContent: React.FC<ExamContentProps> = ({ step, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  // Get one random question from each step
  const getCombinedQuestions = (stepNumber: number) => {
    const stepQuestions = questions[stepNumber as keyof typeof questions] || [];
    const componentQuestions = {
      1: Step1Content.questions || [],
      2: Step2Content.questions || [],
      3: Step3Content.questions || [],
      4: Step4Content.questions || [],
      5: Step5Content.questions || [],
    }[stepNumber] || [];

    // Combine all questions
    const combined = [...stepQuestions, ...componentQuestions];
    
    // Get one random question
    if (combined.length === 0) return [];
    
    const randomIndex = Math.floor(Math.random() * combined.length);
    return [combined[randomIndex]];
  };

  // Initialize question
  useEffect(() => {
    const combinedQuestions = getCombinedQuestions(step);
    setShuffledQuestions(combinedQuestions);
    setCurrentQuestionIndex(0);
    setIncorrectAttempts(0);
    setShowTimer(false);
    setIsCompleted(false);
  }, [step]);

  const handleTryAgain = () => {
    const combinedQuestions = getCombinedQuestions(step);
    setShuffledQuestions(combinedQuestions);
    setIncorrectAttempts(prev => prev + 1);
    if (incorrectAttempts >= 1) {
      setShowTimer(true);
    }
  };

  const handleAnswerCorrect = (isCorrect: boolean) => {
    if (!isCorrect) {
      setIncorrectAttempts(prev => prev + 1);
      if (incorrectAttempts + 1 >= 1) {
        setShowTimer(true);
      }
    } else {
      setIsCompleted(true);
      onComplete(step);
    }
  };

  const handleTimerEnd = () => {
    const combinedQuestions = getCombinedQuestions(step);
    setShuffledQuestions(combinedQuestions);
    setIncorrectAttempts(0);
    setShowTimer(false);
  };

  return (
    <div className="exam-content">
      <h2>Step {step} Exam</h2>
      
      {shuffledQuestions.length > 0 && !isCompleted && (
        <div className="question-section">
          {showTimer && (
            <Timer
              initialTime={15}
              incorrectAttempts={incorrectAttempts}
              maxAttempts={3}
              onTimeout={handleTimerEnd}
            />
          )}

          {incorrectAttempts < 3 && (
            <QuestionComponent
              key={currentQuestionIndex}
              question={shuffledQuestions[0].question}
              options={shuffledQuestions[0].options}
              correctAnswer={shuffledQuestions[0].correctAnswer}
              onAnswerCorrect={handleAnswerCorrect}
              onTryAgain={handleTryAgain}
            />
          )}
        </div>
      )}

      {isCompleted && (
        <div className="completion-message">
          <h3>Step {step} Completed!</h3>
          <p>You can now proceed to the next step.</p>
        </div>
      )}
    </div>
  );
};

const ArenaPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);
  const [stepCorrectness, setStepCorrectness] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [showExam, setShowExam] = useState(false);
  const [examStep, setExamStep] = useState<number | null>(null);

  const contentVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  useEffect(() => {
    if (pageRef.current) {
      const yOffset = -80;
      const y = pageRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 5) {
      setExamStep(currentStep);
      setShowExam(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    if (step === 1 || stepCorrectness[step - 1] || step === currentStep) {
      setCurrentStep(step);
    }
  };

  const handleAnswerCorrect = (step: number, isCorrect: boolean) => {
    setStepCorrectness(prev => ({
      ...prev,
      [step]: isCorrect,
    }));
    
    if (isCorrect) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };

  const renderStepContent = () => {
    const content = (() => {
      switch (currentStep) {
        case 1:
          return <Step1Content onAnswerCorrect={() => {}} hideExam={true} />;
        case 2:
          return <Step2Content onAnswerCorrect={() => {}} hideExam={true} />;
        case 3:
          return <Step3Content onAnswerCorrect={() => {}} hideExam={true} />;
        case 4:
          return <Step4Content onAnswerCorrect={() => {}} hideExam={true} />;
        case 5:
          return <Step5Content onAnswerCorrect={() => {}} hideExam={true} />;
        default:
          return null;
      }
    })();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full"
        >
          {content}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="app">
      <div ref={pageRef} className={styles.arenaPage}>
        <StepsProgress 
          currentStep={currentStep} 
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
          stepCorrectness={stepCorrectness}
        />
        {renderStepContent()}
        <motion.div 
          className={styles.navigationButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button 
            onClick={handlePrevious} 
            disabled={currentStep === 1}
            className="mr-2 bg-gray-200 disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === 5}
            className="bg-blue-500 text-white disabled:opacity-50"
          >
            {currentStep === 5 ? 'Finish' : 'Next'}
          </Button>
        </motion.div>

        <Dialog open={showExam} onOpenChange={setShowExam}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Complete the Quiz to Proceed
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <ExamContent 
                step={currentStep} 
                onComplete={(isCorrect) => {
                  if (isCorrect) {
                    setShowExam(false);
                    handleAnswerCorrect(currentStep, true);
                    setCurrentStep(currentStep + 1);
                  }
                }} 
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ArenaPage;