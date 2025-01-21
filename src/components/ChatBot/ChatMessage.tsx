


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
          <div className="w-8 h-8 flex-shrink-0">
            <Bot className="w-full h-full p-1 rounded-full bg-primary text-primary-foreground" />
          </div>
        )}
        <div className={`p-4 shadow-sm rounded-2xl transition-colors ${
          isBot
            ? 'bg-card text-card-foreground hover:bg-muted rounded-tl-sm'
            : 'bg-primary text-primary-foreground rounded-tr-sm'
        }`}>
          <p className="text-sm">{message.content}</p>
        </div>
        {!isBot && (
          <div className="w-8 h-8 flex-shrink-0">
            <User className="w-full h-full p-1 rounded-full bg-primary text-primary-foreground" />
          </div>
        )}
      </div>
     
      {message.quickReplies && (
        <div className={`flex flex-wrap gap-2 mt-2 max-w-[90%] ${
          isBot ? 'justify-start' : 'justify-end'
        }`}>
          {message.quickReplies.map((reply) => (
            <Button
              key={reply.id}
              variant="default"
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