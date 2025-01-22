interface Question {
  question: string;
  options: { value: string; label: string }[];
  correctAnswer: string;
}

interface StepContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

interface StepComponent extends React.FC<StepContentProps> {
  questions: Question[];
} 