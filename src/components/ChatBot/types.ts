// export interface Message {
//     id: string;
//     content: string;
//     sender: 'user' | 'bot';
//     timestamp: Date;
//     quickReplies?: QuickReply[];
//   }
  
//   export interface QuickReply {
//     id: string;
//     text: string;
//     action: string;
//   }
  
//   export interface ChatBotProps {
//     isOpen?: boolean;
//     onClose?: () => void;
//   }
//   export interface ResponseNode {
//     content: string;
//     quickReplies?: QuickReply[];
//     keywords?: string[];
//     route?: string;
//   }



///

// types.ts
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickReplies?: QuickReply[];
}

export interface QuickReply {
  id: string;
  text: string;
  action: string;
}

export interface ChatBotProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface ResponseNode {
  content: string;
  quickReplies?: QuickReply[];
  keywords?: string[];
  route?: string;
}