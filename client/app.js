const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = event => {
  event.preventDefault();
  if (userNameInput.value.length = 0){
    alert('You have to enter your login');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message message--recived');
  if (author === userName){
    message.classList.add('message--self')
  }
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">${content}</div>
    `;
  messagesList.appendChild(message);
};

const sendMessage = event => {
  event.preventDefault();
  if (messageContentInput.value.length = 0){
    alert('You have to write Your message');
  } else {
    addMessage(userName, messageContentInput.value)
    messageContentInput.value = '';
  }
};

loginForm.addEventListener('submit', event => {
  login(event);
});

addMessageForm.addEventListener('submit', event => {
  sendMessage(event);
});
