const socket = io();

// Join UI
const joinDiv = document.querySelector('.join');
const usernameInput = document.getElementById('username');
const roomSelect = document.getElementById('room');
const joinBtn = document.getElementById('joinBtn');

// Chat UI
const chatDiv = document.getElementById('chat');
const roomNameSpan = document.getElementById('roomName');
const usersList = document.getElementById('users');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

function addMessage(text, cls) {
  const div = document.createElement('div');
  div.className = 'msg' + (cls ? ' ' + cls : '');
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function updateUsers(list) {
  usersList.innerHTML = '';
  list.forEach(u => {
    const li = document.createElement('li');
    li.textContent = u;
    usersList.appendChild(li);
  });
}

joinBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const room = roomSelect.value;
  if (!username) return alert('Please enter a username');

  // show chat UI
  joinDiv.style.display = 'none';
  chatDiv.classList.remove('hidden');
  roomNameSpan.textContent = room;

  // tell server to join
  socket.emit('join room', { username, room });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = input.value.trim();
  if (!val) return;
  socket.emit('chat message', val);
  input.value = '';
});

socket.on('chat message', (msg) => {
  // System messages like "Kim joined" may be plain text
  if (typeof msg === 'string' && msg.includes('joined') || msg.includes('left')) {
    addMessage(msg, 'system');
  } else {
    addMessage(msg);
  }
});

socket.on('room users', (users) => {
  updateUsers(users);
});
