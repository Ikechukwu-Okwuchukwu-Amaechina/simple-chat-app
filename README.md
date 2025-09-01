## Simple Chat App

Real-time, room-based chat built with Node.js, Express, and Socket.IO. Users join a room with a display name, exchange messages scoped to that room, and see a live list of participants.

### Tech stack
- Node.js (CommonJS)
- Express (static hosting + small API)
- Socket.IO (real-time events)
- Vanilla JS, HTML, CSS (client in `public/`)

## Setup
Requirements: Git and Node.js 18+.

Windows PowerShell:

```powershell
git clone https://github.com/Ikechukwu-Okwuchukwu-Amaechina/simple-chat-app.git
cd simple-chat-app
npm install
npm start
```

Server will start on http://localhost:3000 (set a custom port with `PORT`).

To run on another port:

```powershell
$env:PORT=4000; npm start
```

## Usage
Browser flow:
1) Open http://localhost:3000
2) Enter a display name, choose a room (General, Sports, Tech), and click Join Room.
3) Open another tab/window to the same URL to chat between participants.
4) Send messages; join/leave notices and the room user list update in real time.

How it works (short): Express serves the static client, and Socket.IO manages connections, room joins (`join room`), messages (`chat message`), and user list updates (`room users`).

## Demo
Watch the project walkthrough:

- Video (Google Drive): https://drive.google.com/file/d/1GZtRJQX-7Zk_9G8uANS1o0gXCefId3Nv/view?usp=drive_link

## Postman examples 
This app is primarily real-time over Socket.IO. Postman doesn’t speak the Socket.IO protocol directly, but you can still verify the server with simple HTTP checks:

- GET home page
	- Method: GET
	- URL: http://localhost:3000/
	- Expected: 200 OK, HTML content (chat UI)

- GET Socket.IO client script
	- Method: GET
	- URL: http://localhost:3000/socket.io/socket.io.js
	- Expected: 200 OK, JavaScript content

- Health check JSON
	- Method: GET
	- URL: http://localhost:3000/health
	- Expected: 200 OK, `{ "status": "ok" }`

For full chat behavior, use the browser UI at http://localhost:3000.

## Project structure
```
app.js            # Express app + Socket.IO wiring
server.js         # HTTP server bootstrap
public/           # Static client (HTML/CSS/JS)
	index.html
	client.js
	style.css
```

## Contributors
- Ikechukwu Okwuchukwu Amaechina (maintainer)

## License
MIT License — see `LICENSE` file.

