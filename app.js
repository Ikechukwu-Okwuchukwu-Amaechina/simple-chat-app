const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();

// serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io instance (created when connection is called)
let io;
function connection(server) {
	if (io) return io; // already attached
	io = new Server(server);

	io.on('connection', (socket) => {
		console.log('a user connected:', socket.id);

		socket.on('chat message', (msg) => {
			console.log('message:', msg);
			// broadcast to all clients (including sender)
			io.emit('chat message', msg);
		});

		socket.on('disconnect', () => {
			console.log('user disconnected:', socket.id);
		});
	});

	return io;
}

module.exports = { app, connection };
