const { v4: uuidv4 } = require('uuid');
const ChatService = require('../services/chat_service');

class ChatController {
  constructor() {
    this.chatService = new ChatService();
  }

  ensureUserSession(req) {
    if (!req.session.userId) {
      req.session.userId = uuidv4();
    }
    return req.session.userId;
  }

  createChat(req, res) {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Session expired' });
    }

    const chatId = this.chatService.createChat(userId);
    return res.json({
      chatId: chatId,
      message: 'Chat created successfully'
    });
  }

  async sendMessage(req, res) {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Session expired' });
    }

    const chatId = req.body.chatId;
    const userMessage = req.body.message;

    if (!chatId || !userMessage) {
      return res.status(400).json({ error: 'Missing chatId or message' });
    }

    try {
      const aiResponse = await this.chatService.processMessage(userId, chatId, userMessage);
      return res.json({ message: aiResponse });
    } catch (e) {
      if (e.message.includes('not found')) {
        return res.status(404).json({ error: e.message });
      }
      return res.status(500).json({ error: e.message });
    }
  }
}

module.exports = ChatController;
