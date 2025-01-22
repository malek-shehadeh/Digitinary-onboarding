import React, { useState } from 'react';
import styles from './Step2Content.module.scss';
import QuestionComponent from './QuestionComponent';
import Timer from '../../components/Timer';

interface Step2ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

// Questions specific to Step 2 - Business Requirements
const step2Questions = [
  {
    question: 'What is the primary focus of business requirements?',
    options: [
      { value: 'scalability', label: 'Scalability and modularity' },
      { value: 'objectives', label: 'Defining business objectives' },
      { value: 'debugging', label: 'Easier debugging' },
    ],
    correctAnswer: 'objectives',
  },
  {
    question: 'Which document outlines the key business requirements?',
    options: [
      { value: 'business-docs', label: 'Business Docs Link 1' },
      { value: 'technical-docs', label: 'Technical Docs Link 2' },
      { value: 'event-bus', label: 'Event Bus' },
    ],
    correctAnswer: 'business-docs',
  },
  {
    question: 'What is the purpose of business requirements?',
    options: [
      { value: 'consistency', label: 'Maintain consistency across modules' },
      { value: 'performance', label: 'Improve performance' },
      { value: 'objectives', label: 'Define project objectives' },
    ],
    correctAnswer: 'objectives',
  },
];

const Step2Content: React.FC<Step2ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    Math.floor(Math.random() * step2Questions.length)
  );
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

  const handleTryAgain = () => {
    const newIndex = Math.floor(Math.random() * step2Questions.length);
    setCurrentQuestionIndex(newIndex);
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
      setIncorrectAttempts(0);
      setShowTimer(false);
      onAnswerCorrect(true);
    }
  };

  const handleTimerEnd = () => {
    setIncorrectAttempts(0);
    setShowTimer(false);
    const newIndex = Math.floor(Math.random() * step2Questions.length);
    setCurrentQuestionIndex(newIndex);
  };

  return (
    <div className={styles.step2Content}>
      <h2>Step 2: Business Requirements</h2>

      {/* Business Requirements Section */}
      <div className={styles.card}>
        <h3>1. Business Requirements</h3>
        <div className={styles.overview}>
          <h4>Overview:</h4>
          <p>
            A description of the key business requirements and objectives for the project.
          </p>
        </div>
        <div className={styles.resources}>
          <h4>Resources:</h4>
          <p>
            Refer to the following links for more details:
          </p>
          <ul>
            <li>
              <a href="https://asana.com/resources/business-requirements-document-template" target="_blank" rel="noopener noreferrer">
                Business Docs Link 1
              </a>
            </li>
            <li>
              <a href="https://asana.com/resources/business-requirements-document-template" target="_blank" rel="noopener noreferrer">
                Business Docs Link 2
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Question Section */}
      <div className={styles.card}>
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
            question={step2Questions[currentQuestionIndex].question}
            options={step2Questions[currentQuestionIndex].options}
            correctAnswer={step2Questions[currentQuestionIndex].correctAnswer}
            onAnswerCorrect={handleAnswerCorrect}
            onTryAgain={handleTryAgain}
          />
        )}
      </div>
    </div>
  );
};

// Add static questions property for reference
Step2Content.questions = step2Questions;

export default Step2Content;