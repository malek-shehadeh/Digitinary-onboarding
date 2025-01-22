// ChatToggleButton.tsx
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onClick }) => {
  return (
    <Button
      className="m-2 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
      onClick={onClick}
      size="icon"
    >
      <Bot className="h-6 w-6" />
    </Button>
  );
};

export default ChatToggleButton;