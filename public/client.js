const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

function addMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg';
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = input.value.trim();
  if (!val) return;
  socket.emit('chat message', val);
  input.value = '';
});

socket.on('chat message', (msg) => {
  addMessage(msg);
});
