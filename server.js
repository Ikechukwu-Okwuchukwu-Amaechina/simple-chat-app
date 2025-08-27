
const http = require('http');

// import express app and connection from app.js
const { app, connection } = require('./app');

const server = http.createServer(app);

// attach socket.io to the server
connection(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
