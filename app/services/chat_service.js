const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const OpenAI = require('openai');
const ChatManager = require('../models/chat');

class ChatService {
  constructor() {
    this.chatManager = new ChatManager();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.systemPrompt = this.loadSystemPrompt('app/data/system_prompt.txt');
  }

  loadSystemPrompt(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      console.error(`Error loading system prompt: ${e}`);
      return "You are a helpful assistant.";
    }
  }

  createChat(userId) {
    const chatId = uuidv4();
    this.chatManager.createChat(userId, chatId, this.systemPrompt);
    return chatId;
  }

  async processMessage(userId, chatId, message) {
    const chat = this.chatManager.getChat(userId, chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Add user message
    this.chatManager.addMessage(userId, chatId, "user", message);

    try {
      // Get AI response
      const conversation = this.chatManager.getConversation(userId, chatId);

      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: conversation,
        temperature: 0.7,
        max_tokens: 500
      });

      const aiMessage = response.choices[0].message.content;

      // Add AI response to chat history
      this.chatManager.addMessage(userId, chatId, "assistant", aiMessage);

      return aiMessage;

    } catch (e) {
      throw new Error(`Error getting AI response: ${e.message}`);
    }
  }
}

module.exports = ChatService;
