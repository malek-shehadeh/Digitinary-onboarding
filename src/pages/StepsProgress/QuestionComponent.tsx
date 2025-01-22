import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface QuestionComponentProps {
  question: string;
  options: { value: string; label: string }[];
  correctAnswer: string;
  onAnswerCorrect: (isCorrect: boolean) => void;
  onTryAgain: () => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  options,
  correctAnswer,
  onAnswerCorrect,
  onTryAgain,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    onAnswerCorrect(answer === correctAnswer);
  };

  return (
    <div className="question-component">
      <h3 className="text-lg font-semibold mb-4">{question}</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.value}
            className={`relative p-4 border rounded-lg cursor-pointer transition-all
              ${selectedAnswer === option.value ? 'border-primary' : 'border-gray-200 hover:border-gray-300'}
            `}
            onClick={() => handleAnswerSelect(option.value)}
          >
            {option.label}
            <AnimatePresence>
              {selectedAnswer === option.value && selectedAnswer === correctAnswer && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {showFeedback && selectedAnswer !== correctAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-center gap-2"
        >
          <AlertCircle className="h-4 w-4" />
          <span>Incorrect answer. Please try again.</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setSelectedAnswer(undefined);
              setShowFeedback(false);
              onTryAgain();
            }}
            className="ml-auto"
          >
            Try Again
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionComponent;