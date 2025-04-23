const express = require('express');
const session = require('express-session');
const path = require('path');
const ChatController = require('./controllers/chat_controller');

// Initialize the Express application
const app = express();

// Set up middleware for parsing JSON requests
app.use(express.json());

// Set up session management
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create an instance of ChatController to handle chat operations
const chatController = new ChatController();

// Define a route for the index page that ensures a user session
app.get('/', (req, res) => {
  chatController.ensureUserSession(req);
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Define a route for creating a new chat session
app.post('/api/create_chat', (req, res) => {
  chatController.createChat(req, res);
});

// Define a route for sending a message in an existing chat session
app.post('/api/send_message', (req, res) => {
  chatController.sendMessage(req, res);
});

// Run the Express application
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
