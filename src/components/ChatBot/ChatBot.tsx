
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Paper,
//   IconButton,
//   Typography,
//   Drawer,
//   useTheme,
//   useMediaQuery,
//   Fab,
// } from '@mui/material';
// import {
//   Close,
//   ChatBubble,
//   SmartToy,
// } from '@mui/icons-material';
// import { v4 as uuidv4 } from 'uuid';

// import ChatMessage from './ChatMessage';
// import { Message, ChatBotProps, QuickReply } from './types';
// import { 
//   chatbotResponses, 
//   navigationMap, 
//   getDefaultResponse 
// } from './chatbotLogic';

// import './chatbot.scss';

// const ChatBot: React.FC<ChatBotProps> = ({
//   isOpen: propIsOpen,
//   onClose,
// }) => {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     if (propIsOpen !== undefined) {
//       setIsOpen(propIsOpen);
//     }
//   }, [propIsOpen]);

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       const greeting = chatbotResponses.greeting;
//       const greetingMessage: Message = {
//         id: uuidv4(),
//         content: greeting.content,
//         sender: 'bot',
//         timestamp: new Date(),
//         quickReplies: greeting.quickReplies,
//       };
//       setMessages([greetingMessage]);
//     }
//   }, [isOpen, messages.length]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleNavigation = (action: string) => {
//     const route = navigationMap[action];
//     if (route) {
//       navigate(route);
//       setIsOpen(false);
//     }
//   };

//   const handleQuickReplyClick = (reply: QuickReply) => {
//     if (reply.action.startsWith('navigate_')) {
//       handleNavigation(reply.action);
//       return;
//     }

//     const userMessage: Message = {
//       id: uuidv4(),
//       content: reply.text,
//       sender: 'user',
//       timestamp: new Date(),
//     };
//     setMessages(prev => [...prev, userMessage]);

//     const response = chatbotResponses[reply.action] || getDefaultResponse();
//     const botMessage: Message = {
//       id: uuidv4(),
//       content: response.content,
//       sender: 'bot',
//       timestamp: new Date(),
//       quickReplies: response.quickReplies,
//     };

//     setTimeout(() => {
//       setMessages(prev => [...prev, botMessage]);
//     }, 500);
//   };

//   const toggleChat = () => {
//     setIsOpen(prev => !prev);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     onClose?.();
//   };

//   const chatContent = (
//     <div className="chatbot-content">
//       <div className="chatbot-header">
//         <div className="chatbot-header-title">
//           <SmartToy className="icon" />
//           <Typography variant="h6">Digitinary Chat</Typography>
//         </div>
//         <IconButton onClick={handleClose} className="close-button">
//           <Close />
//         </IconButton>
//       </div>

//       <div className="chatbot-messages">
//         {messages.map((message) => (
//           <ChatMessage
//             key={message.id}
//             message={message}
//             onQuickReplyClick={handleQuickReplyClick}
//           />
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {!isMobile ? (
//         <Paper className={`chatbot-container ${isOpen ? 'open' : ''}`}>
//           {isOpen ? (
//             chatContent
//           ) : (
//             <Fab
//               className="chatbot-fab"
//               onClick={toggleChat}
//             >
//               <ChatBubble />
//             </Fab>
//           )}
//         </Paper>
//       ) : (
//         <>
//           <Drawer
//             anchor="bottom"
//             open={isOpen}
//             onClose={handleClose}
//             PaperProps={{
//               sx: { height: '100%' },
//             }}
//           >
//             {chatContent}
//           </Drawer>
//           {!isOpen && (
//             <Fab
//               className="chatbot-fab"
//               onClick={toggleChat}
//               sx={{
//                 position: 'fixed',
//                 bottom: 20,
//                 right: 20,
//                 zIndex: 1000,
//               }}
//             >
//               <ChatBubble />
//             </Fab>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default ChatBot;

/// ChatBot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { X, Bot } from 'lucide-react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

import { Message, ChatBotProps, QuickReply } from './types';
import ChatMessage from './ChatMessage';
import ChatToggleButton from './ChatToggleButton';
import { 
  chatbotResponses, 
  navigationMap, 
  getDefaultResponse 
} from './chatbotLogic';

const ChatBot: React.FC<ChatBotProps> = ({
  isOpen: propIsOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = chatbotResponses.greeting;
      const greetingMessage: Message = {
        id: uuidv4(),
        content: greeting.content,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: greeting.quickReplies,
      };
      setMessages([greetingMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigation = (action: string) => {
    const route = navigationMap[action];
    if (route) {
      navigate(route);
      setIsOpen(false);
    }
  };

  const handleQuickReplyClick = (reply: QuickReply) => {
    if (reply.action.startsWith('navigate_')) {
      handleNavigation(reply.action);
      return;
    }

    const userMessage: Message = {
      id: uuidv4(),
      content: reply.text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    const response = chatbotResponses[reply.action] || getDefaultResponse();
    const botMessage: Message = {
      id: uuidv4(),
      content: response.content,
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: response.quickReplies,
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const chatContent = (
    <div className="flex flex-col h-full bg-background">
      <div className="border-b p-4 bg-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 p-1 rounded-full bg-primary-foreground/20" />
            <h2 className="text-lg font-semibold text-primary-foreground">Digitinary Chat</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onQuickReplyClick={handleQuickReplyClick}
          />
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom" className="h-full p-0">
            {chatContent}
          </SheetContent>
        </Sheet>
        {!isOpen && <ChatToggleButton onClick={toggleChat} />}
      </>
    );
  }

  return (
    <Card className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isOpen ? 'w-96 h-[600px]' : 'w-auto h-auto'
    }`}>
      {isOpen ? chatContent : <ChatToggleButton onClick={toggleChat} />}
    </Card>
  );
};

export default ChatBot;