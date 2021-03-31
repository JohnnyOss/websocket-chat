const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('user', (user) => {
    users.push({name: user, id: socket.id});
    socket.broadcast.emit('newUser', {author: 'ChatBot', content: `${user} has joined the conversation!`});

    console.log('Client with id - ' + socket.id + ' has join as ' + user );
    console.log('Active users: ', users);
  });
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { 
    const userIndex = users.findIndex(user => user.id == socket.id);
    const userFind = users.find(user => user.id == socket.id);
    socket.broadcast.emit('removeUser', {author: 'ChatBot', content: `${userFind.name} has left the conversation... :(`});
    users.splice(userIndex, 1);

    console.log('Client with id - ' + socket.id + ' has left')
    console.log('Active users', users); 
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});