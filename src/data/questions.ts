export const questions = {
  1: [
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
  ],
  2: [
    {
      question: 'What is the primary purpose of Business Requirements Document?',
      options: [
        { value: 'technical', label: 'Define technical architecture' },
        { value: 'requirements', label: 'Capture business needs and objectives' },
        { value: 'budget', label: 'Set project budget' },
      ],
      correctAnswer: 'requirements',
    },
  ],
  3: [
    {
      question: 'Which repository is required for the core container of the project?',
      options: [
        { value: 'c360', label: 'c360' },
        { value: 'container', label: 'container' },
        { value: 'common-layout', label: 'common-layout' },
      ],
      correctAnswer: 'container',
    },
  ],
  4: [
    {
      question: 'Which environment is used for ongoing development?',
      options: [
        { value: 'Develop', label: 'Develop' },
        { value: 'Test', label: 'Test' },
        { value: 'Production', label: 'Production' },
      ],
      correctAnswer: 'Develop',
    },
  ],
  5: [
    {
      question: 'What is the key consideration when creating a custom module?',
      options: [
        { value: 'reusability', label: 'Reusability and maintainability' },
        { value: 'speed', label: 'Development speed' },
        { value: 'cost', label: 'Development cost' },
      ],
      correctAnswer: 'reusability',
    },
  ],
} as const; 