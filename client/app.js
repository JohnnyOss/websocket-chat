const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = event => {
  event.preventDefault();
  if(userNameInput.value.length > 0){
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  } else {
    alert('You have to enter your login');
  }
};

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName){
    message.classList.add('message--self');
    message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">${content}</div>
    `;
  messagesList.appendChild(message);
  };
};

const sendMessage = event => {
  event.preventDefault();
  if (messageContentInput.value.length > 0){
    addMessage(userName, messageContentInput.value)
    messageContentInput.value = '';
  } else {
    alert('You have to write Your message');
  }
};

loginForm.addEventListener('submit', event => {
  login(event);
});

addMessageForm.addEventListener('submit', event => {
  sendMessage(event);
});
