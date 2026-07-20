export interface Order {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: "new" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

export interface AdminSettings {
  telegramBotToken: string;
  telegramChatId: string;
}
