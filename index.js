const socket = io('http://localhost:8002');

const form = document.getElementById('msgForm');
const messageInput = document.getElementById('inputBox');
const messageContainer = document.querySelector('.messegeBox')


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('messege');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message != ''){
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
    }
})

const name = prompt("Enter your name to DesiWhatsapp");
messageInput.focus();
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'left');
})

socket.on('receive', data=>{
    append(`${data.name }: ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name } left the chat`, 'left');
})



