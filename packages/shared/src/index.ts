export type MessageType = "text" | "file";

export interface ChatUser {
  id: string;
  displayName: string;
  isGuest: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  content: string | null;
  fileUrl: string | null;
  createdAt: string;
}
