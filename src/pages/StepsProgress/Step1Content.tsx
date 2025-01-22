import React, { useState } from 'react';
import styles from './Step1Content.module.scss';
import microFrontEnd from '../../assets/MicroFrontEnd.png';
import { motion } from "framer-motion";
import Timer from '../../components/Timer';
import QuestionComponent from './QuestionComponent';

interface Step1ContentProps {
  onAnswerCorrect: (isCorrect: boolean) => void;
}

const Step1Content: React.FC<Step1ContentProps> = ({ onAnswerCorrect }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([0]);

  const questions = [
    {
      question: 'What is the main advantage of using Micro Frontend architecture?',
      options: [
        { value: 'scalability', label: 'Scalability and modularity' },
        { value: 'development', label: 'Faster development' },
        { value: 'debugging', label: 'Easier debugging' },
      ],
      correctAnswer: 'scalability',
    },
    {
      question: 'Which tool is commonly used for Micro Frontend communication?',
      options: [
        { value: 'redux', label: 'Redux' },
        { value: 'axios', label: 'Axios' },
        { value: 'event-bus', label: 'Event Bus' },
      ],
      correctAnswer: 'event-bus',
    },
    {
      question: 'What is the purpose of Digitinary-UI?',
      options: [
        { value: 'consistency', label: 'Maintain consistency across modules' },
        { value: 'performance', label: 'Improve performance' },
        { value: 'security', label: 'Enhance security' },
      ],
      correctAnswer: 'consistency',
    },
  ];

  const getRandomQuestion = () => {
    const availableQuestions = questions
      .map((_, index) => index)
      .filter(index => !usedQuestions.includes(index));

    if (availableQuestions.length === 0) {
      setUsedQuestions([]);
      return Math.floor(Math.random() * questions.length);
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const newQuestionIndex = availableQuestions[randomIndex];
    setUsedQuestions([...usedQuestions, newQuestionIndex]);
    return newQuestionIndex;
  };

  const handleTryAgain = () => {
    const newIndex = getRandomQuestion();
    setCurrentQuestionIndex(newIndex);
    
    if (incorrectAttempts >= 1) {
      setShowTimer(true);
    }
  };

  const handleAnswerCorrect = (isCorrect: boolean) => {
    if (!isCorrect) {
      setIncorrectAttempts(prev => prev + 1);
    } else {
      setIncorrectAttempts(0);
      setShowTimer(false);
    }
    onAnswerCorrect(isCorrect);
  };

  const handleTimerEnd = () => {
    setIncorrectAttempts(0);
    setShowTimer(false);
    const newIndex = getRandomQuestion();
    setCurrentQuestionIndex(newIndex);
  };

  const questionVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <motion.div 
      className={styles.step1Content}
      initial="hidden"
      animate="visible"
    >
      {/* Micro Frontend Section */}
      <motion.div 
        className={styles.card}
        variants={questionVariants}
        transition={{ delay: 0.2 }}
      >
        <h3>1. Micro Frontend Architecture</h3>
        <div className={styles.overview}>
          <h4>Overview:</h4>
          <p>
            A brief introduction to the micro-frontend architecture and its advantages. It allows independent teams to work on specific modules, ensuring scalability and modularity.
          </p>
        </div>
        <div className={styles.resources}>
          <h4>Resources:</h4>
          <p>
            Read the following documentation to understand our micro-frontend setup:
          </p>
          <ul>
            <li>
              <a href="https://www.aplyca.com/en/blog/micro-frontends-what-are-they-and-when-to-use-them" target="_blank" rel="noopener noreferrer">
                Micro Frontend Overview
              </a>
            </li>
            <li>
              <a href="https://medium.com/appfoster/a-comprehensive-guide-to-micro-frontend-architecture-cc0e31e0c053" target="_blank" rel="noopener noreferrer">
                Detailed Architecture
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.structure}>
          <h4>Structure:</h4>
          <div className={styles.imagePlaceholder}>
            <img src={microFrontEnd} alt="Micro Front End" className={styles.image} />
          </div>
        </div>
      </motion.div>

      {/* Digitinary-UI Section */}
      <motion.div 
        className={styles.card}
        variants={questionVariants}
        transition={{ delay: 0.4 }}
      >
        <h3>2. Digitinary-UI</h3>
        <div className={styles.overview}>
          <h4>Overview:</h4>
          <p>
            A UI library designed to maintain consistency across all modules with reusable components and styling.
          </p>
        </div>
        <div className={styles.resources}>
          <h4>Resources:</h4>
          <p>
            Learn more about Digitinary-UI at the following link:
          </p>
          <ul>
            <li>
              <a href="https://ui.shared.digitinary.net/overview" target="_blank" rel="noopener noreferrer">
                Digitinary-UI Documentation
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Question Section */}
      <motion.div className={styles.card}>
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
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            correctAnswer={questions[currentQuestionIndex].correctAnswer}
            onAnswerCorrect={handleAnswerCorrect}
            onTryAgain={handleTryAgain}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Step1Content;