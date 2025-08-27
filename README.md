# Simple Chat App

Beginner-friendly starter for a basic chat app. Add your own server and UI.

## Features

- Simple project setup
- Easy to extend for real-time chat

## Installation

Requirements: Node.js and Git.

Windows PowerShell:

```powershell
git clone https://github.com/Ikechukwu-Okwuchukwu-Amaechina/simple-chat-app.git
cd simple-chat-app
npm install
```

## Usage

- Add your server/client code (e.g., WebSocket, UI).
- Run your app (example):

```powershell
node index.js
```

## Technologies Used

- Node.js (CommonJS)
- JavaScript

## Author

Ikechukwu Okwuchukwu Amaechina

## App functionalities

- Join a named room with a username. The client sends a `join room` event with `{ username, room }` and the server adds the socket to that room.
- Send and receive real-time chat messages scoped to the joined room. Messages are emitted as `chat message` events and broadcast only to the room the user is in.
- Join/leave notifications are broadcast to the room (for example: `Alice joined Lobby Room` or `Bob left Lobby Room`).
- The server maintains a per-room user list and emits the list as a `room users` event whenever it changes so clients can display current participants.
- Static client files are served from the `public/` folder (`index.html`, `client.js`, `style.css`).
- Start the server with `npm start` (runs `server.js`). Requires Node.js and the project dependencies (Express and Socket.io).

How it works (short): the server uses Express to serve the static client and Socket.io to handle real-time events. Clients join rooms, send `chat message` events, and receive room-scoped messages and user-list updates.



## Run & use

Follow these steps to run the server and use the chat UI.

1. Run the server

```powershell
npm install
npm start
# opens server on http://localhost:3000 by default
```

2. Open the client

- Point your browser at http://localhost:3000

3. Join a room

- Enter a display name in the "Enter your name" field.
- Choose a room from the dropdown (`General`, `Sports`, `Tech`).
- Click the "Join Room" button. This emits a `join room` event to the server.

4. Send messages

- Type a message in the input labelled "Type a message..." and press the Send button (or Enter). The client emits `chat message` and the server broadcasts it only to your room.

5. See active users and notifications

- The sidebar shows the current room name and the list of active users (updated from the `room users` event).
- Join/leave notifications appear in the message area (e.g. `Alice joined General Room`, `Bob left General Room`).

Notes

- The server serves static files from the `public/` folder and uses Socket.io for real-time events.
- If you want to run on a different port, set the `PORT` environment variable before `npm start`.

