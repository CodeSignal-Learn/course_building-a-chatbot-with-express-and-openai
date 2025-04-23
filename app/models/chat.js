class ChatManager {
  constructor() {
    this.chats = {};  // user_id -> chat_id -> chat_data
  }

  createChat(userId, chatId, systemPrompt) {
    if (!this.chats[userId]) {
      this.chats[userId] = {};
    }

    this.chats[userId][chatId] = {
      systemPrompt: systemPrompt,
      messages: []
    };
  }

  getChat(userId, chatId) {
    return this.chats[userId] ? this.chats[userId][chatId] : undefined;
  }

  addMessage(userId, chatId, role, content) {
    const chat = this.getChat(userId, chatId);
    if (chat) {
      chat.messages.push({ role, content });
    }
  }

  getConversation(userId, chatId) {
    const chat = this.getChat(userId, chatId);
    if (chat) {
      return [
        { role: "system", content: chat.systemPrompt }
      ].concat(chat.messages);
    }
    return [];
  }
}

module.exports = ChatManager;
