import React, { useState, useEffect, useRef } from 'react';
import styles from '../Style/arena.module.scss';
import StepsProgress from './StepsProgress/StepsProgress';
import Step1Content from './StepsProgress/Step1Content';
import Step2Content from './StepsProgress/Step2Content';
import Step3Content from './StepsProgress/Step3Content';
import Step4Content from './StepsProgress/Step4Content';
import Step5Content from './StepsProgress/Step5Content';
import { Button } from "@/components/ui/button"
const ArenaPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const pageRef = useRef<HTMLDivElement>(null);
  const [stepCorrectness, setStepCorrectness] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // Improved scroll handling
  useEffect(() => {
    if (pageRef.current) {
      const yOffset = -80; // Adjust this value to account for any fixed headers
      const y = pageRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerCorrect = (step: number, isCorrect: boolean) => {
    setStepCorrectness((prev) => ({
      ...prev,
      [step]: isCorrect,
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(1, isCorrect)} />;
      case 2:
        return <Step2Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(2, isCorrect)} />;
      case 3:
        return <Step3Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(3, isCorrect)} />;
      case 4:
        return <Step4Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(4, isCorrect)} />;
      case 5:
        return <Step5Content onAnswerCorrect={(isCorrect) => handleAnswerCorrect(5, isCorrect)} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div ref={pageRef} className={styles.arenaPage}>
        <h1>Welcome to the Arena Project</h1>
        <StepsProgress currentStep={currentStep} />
        {renderStepContent()}
        <div className={styles.navigationButtons}>
          <Button 
            onClick={handlePrevious} 
            disabled={currentStep === 1}
            className="mr-2 bg-gray-200 disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === 5 || !stepCorrectness[currentStep]}
            className="bg-blue-500 text-white disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArenaPage;