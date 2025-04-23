# Building a Chatbot with OpenAI and Node.js

This project demonstrates how to build an interactive chatbot using Express (Node.js web framework) and OpenAI's API. The chatbot can engage in conversations and provide responses using OpenAI's powerful language models.

## Features

- Interactive web-based chat interface
- Integration with OpenAI's API
- Real-time response generation
- Express backend server
- Simple and clean user interface

## Prerequisites

- Node.js 14 or higher
- npm (Node package manager)
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/CodeSignal-Learn/course_building-a-chatbot-with-express-and-openai
cd course_building-a-chatbot-with-express-and-openai
```

2. Install the required dependencies:
```bash
npm install
```

## Configuration

Before running the application, you need to set up your OpenAI API key. You can do this by exporting it as an environment variable:

For macOS/Linux:
```bash
export OPENAI_API_KEY='your-api-key-here'
```

For Windows (Command Prompt):
```cmd
set OPENAI_API_KEY=your-api-key-here
```

For Windows (PowerShell):
```powershell
$env:OPENAI_API_KEY='your-api-key-here'
```

## Running the Application

1. Start the Express development server:
```bash
node app/main.js
```

2. Open your web browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Once the application is running, you'll see a chat interface in your browser
2. Type your message in the input field
3. Press Enter or click the Send button to submit your message
4. The chatbot will process your input and provide a response

## Project Structure

```
.
├── README.md
├── package.json
└── app/
    ├── main.js           # Main Express application
    ├── public/           # Static files (CSS, HTML, JS)
    ├── services/         # Business logic services
    ├── controllers/      # Route controllers
    ├── models/           # Data models
    └── data/             # Data storage
```

The project follows an MVC (Model-View-Controller) architecture pattern:
- Controllers: Handle HTTP requests and responses
- Models: Define data structures
- Services: Contain business logic
- Public: Contains CSS, JavaScript, and other static assets
