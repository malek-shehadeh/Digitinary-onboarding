import { ResponseNode } from './types';

export const chatbotResponses: { [key: string]: ResponseNode } = {
  greeting: {
    content: "Hello! Which project would you like to explore?",
    quickReplies: [
      { id: '1', text: 'D-Gate Project', action: 'dgate' },
      { id: '2', text: 'Arena Project', action: 'arena' },
      { id: '3', text: 'KNET Project', action: 'knet' },
      { id: '4', text: 'Get Help', action: 'help' },
    ],
  },
  help: {
    content: "I can help you with the following:",
    quickReplies: [
      { id: '5', text: 'Show All Projects', action: 'greeting' },
      { id: '6', text: 'How to Navigate', action: 'navigation' },
      { id: '7', text: 'Contact Support', action: 'support' },
    ],
  },
  dgate: {
    content: "D-Gate is our configuration and deployment management system. What would you like to do?",
    route: '/frontend/DGatePage',
    quickReplies: [
      { id: '8', text: 'Go to D-Gate', action: 'navigate_dgate' },
      { id: '9', text: 'Learn More', action: 'dgate_info' },
      { id: '10', text: 'Back to Projects', action: 'greeting' },
    ],
  },
  dgate_info: {
    content: "D-Gate provides:\n• Project configuration\n• Deployment management\n• System setup\n• Technical verification\n\nWould you like to access it?",
    quickReplies: [
      { id: '11', text: 'Open D-Gate', action: 'navigate_dgate' },
      { id: '12', text: 'Back to Projects', action: 'greeting' },
    ],
  },
  arena: {
    content: "Arena is our project management and collaboration platform. What would you like to do?",
    route: '/frontend/arena',
    quickReplies: [
      { id: '13', text: 'Go to Arena', action: 'navigate_arena' },
      { id: '14', text: 'Learn More', action: 'arena_info' },
      { id: '15', text: 'Back to Projects', action: 'greeting' },
    ],
  },
  arena_info: {
    content: "Arena offers:\n• Project tracking\n• Team collaboration\n• Resource management\n• Progress monitoring\n\nWould you like to access it?",
    quickReplies: [
      { id: '16', text: 'Open Arena', action: 'navigate_arena' },
      { id: '17', text: 'Back to Projects', action: 'greeting' },
    ],
  },
  knet: {
    content: "KNET is our network management and monitoring system. What would you like to do?",
    route: '/frontend/knet',
    quickReplies: [
      { id: '18', text: 'Go to KNET', action: 'navigate_knet' },
      { id: '19', text: 'Learn More', action: 'knet_info' },
      { id: '20', text: 'Back to Projects', action: 'greeting' },
    ],
  },
  knet_info: {
    content: "KNET provides:\n• Network monitoring\n• Performance tracking\n• System analytics\n• Real-time alerts\n\nWould you like to access it?",
    quickReplies: [
      { id: '21', text: 'Open KNET', action: 'navigate_knet' },
      { id: '22', text: 'Back to Projects', action: 'greeting' },
    ],
  },
  navigation: {
    content: "You can navigate through the system by:\n1. Using the quick reply buttons\n2. Clicking on project links\n\nWhat would you like to do?",
    quickReplies: [
      { id: '23', text: 'Show Projects', action: 'greeting' },
      { id: '24', text: 'Get More Help', action: 'help' },
    ],
  },
  support: {
    content: "Need help? You can:\n• Use quick replies for navigation\n• Ask questions about specific projects\n• Return to main menu anytime",
    quickReplies: [
      { id: '25', text: 'Back to Main Menu', action: 'greeting' },
      { id: '26', text: 'Show All Projects', action: 'greeting' },
    ],
  },
};

// Navigation mapping for the chatbot
export const navigationMap: { [key: string]: string } = {
  'navigate_dgate': '/frontend/DGatePage',
  'navigate_arena': '/frontend/arena',
  'navigate_knet': '/frontend/knet',
};

// Get default response when no match is found
export const getDefaultResponse = (): ResponseNode => ({
  content: "I'm not sure I understand. Would you like to:",
  quickReplies: [
    { id: 'default_1', text: 'See All Projects', action: 'greeting' },
    { id: 'default_2', text: 'Get Help', action: 'help' },
  ],
});