const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();

// serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io instance (created when connection is called)
let io;

// Keep track of users per room: { roomName: [ {id, username}, ... ] }
const usersByRoom = {};

function connection(server) {
	if (io) return io; // already attached
	io = new Server(server);

	io.on('connection', (socket) => {
		console.log('a user connected:', socket.id);

		// User joins a room with a username
		socket.on('join room', ({ username, room }) => {
			if (!username || !room) return;
			socket.username = username;
			socket.room = room;
			socket.join(room);

			usersByRoom[room] = usersByRoom[room] || [];
			usersByRoom[room].push({ id: socket.id, username });

			// Notify others in the room
			io.to(room).emit('chat message', `${username} joined ${room} Room`);

			// Send updated user list for the room
			const usersInRoom = usersByRoom[room].map(u => u.username);
			io.to(room).emit('room users', usersInRoom);

			console.log(`${username} joined room ${room}`);
		});

		// Chat message from a client - only broadcast to the room
		socket.on('chat message', (msg) => {
			const username = socket.username || 'Unknown';
			const room = socket.room;
			if (!room) return; // ignore if user hasn't joined a room
			const full = `${username}: ${msg}`;
			console.log('room message', room, full);
			io.to(room).emit('chat message', full);
		});

		socket.on('disconnect', () => {
			const username = socket.username;
			const room = socket.room;
			console.log('user disconnected:', socket.id, username, room);

			if (room && usersByRoom[room]) {
				// remove user from room list
				usersByRoom[room] = usersByRoom[room].filter(u => u.id !== socket.id);

				// notify remaining users in the room
				if (username) {
					io.to(room).emit('chat message', `${username} left ${room} Room`);
				}

				// send updated user list
				const usersInRoom = usersByRoom[room].map(u => u.username);
				io.to(room).emit('room users', usersInRoom);
			}
		});
	});

	return io;
}

module.exports = { app, connection };

