

// import React from 'react';
// import { Typography } from '@mui/material';
// import { SmartToy, Person } from '@mui/icons-material';
// import { Message, QuickReply } from './types';

// interface ChatMessageProps {
//   message: Message;
//   onQuickReplyClick?: (reply: QuickReply) => void;
// }

// const ChatMessage: React.FC<ChatMessageProps> = ({ message, onQuickReplyClick }) => {
//   const isBot = message.sender === 'bot';

//   return (
//     <div className="chatbot-message">
//       <div className="chatbot-message-content">
//         {isBot && (
//           <SmartToy className="chatbot-message-avatar" />
//         )}
//         <div className={`chatbot-message-bubble ${isBot ? 'bot' : 'user'}`}>
//           <Typography variant="body1">{message.content}</Typography>
//         </div>
//         {!isBot && (
//           <Person className="chatbot-message-avatar" />
//         )}
//       </div>

//       {message.quickReplies && (
//         <div className="chatbot-quick-replies" style={{ 
//           justifyContent: isBot ? 'flex-start' : 'flex-end' 
//         }}>
//           {message.quickReplies.map((reply) => (
//             <div
//               key={reply.id}
//               className="chatbot-quick-replies-chip"
//               onClick={() => onQuickReplyClick?.(reply)}
//             >
//               {reply.text}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatMessage;

///
// ChatMessage.tsx
import React from 'react';
import { Bot, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Message, QuickReply } from './types';

interface ChatMessageProps {
  message: Message;
  onQuickReplyClick?: (reply: QuickReply) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onQuickReplyClick }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex flex-col mb-4 ${isBot ? 'items-start' : 'items-end'}`}>
      <div className="flex items-end gap-2 max-w-[70%]">
        {isBot && (
          <Bot className="w-8 h-8 p-1 rounded-full bg-primary text-primary-foreground" />
        )}
        <div className={`p-4 shadow-sm rounded-2xl transition-colors ${
          isBot 
            ? 'bg-card text-card-foreground hover:bg-muted rounded-tl-sm' 
            : 'bg-primary text-primary-foreground rounded-tr-sm'
        }`}>
          <p className="text-sm">{message.content}</p>
        </div>
        {!isBot && (
          <User className="w-8 h-8 p-1 rounded-full bg-primary text-primary-foreground" />
        )}
      </div>
      
      {message.quickReplies && (
        <div className={`flex flex-wrap gap-2 mt-2 max-w-[90%] ${
          isBot ? 'justify-start' : 'justify-end'
        }`}>
          {message.quickReplies.map((reply) => (
            <Button
              key={reply.id}
              variant="outline"
              size="sm"
              className="rounded-full hover:bg-primary hover:text-primary-foreground"
              onClick={() => onQuickReplyClick?.(reply)}
            >
              {reply.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;