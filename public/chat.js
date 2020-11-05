const socket = io.connect('https://chat-room-socketio.herokuapp.com/:' + process.env.PORT ? process.env.PORT : '8080');

const controls = {
    message: document.getElementById('message'),
    user: document.getElementById('user'),
    send: document.getElementById('send'),
    conversation: document.getElementById('conversation'),
    typing: document.getElementById('typing')
}

controls.send.addEventListener('click', () => {
    socket.emit('chat', {
        message: controls.message.value,
        user: controls.user.value
    });
    controls.message.value = "";
});

controls.message.addEventListener('keypress', () => {
    socket.emit('typing', controls.user.value);
})

socket.on('chat', data => {
    controls.typing.innerHTML = '';
    controls.conversation.innerHTML += '<p><span>' + data.user + ': </span>' + data.message + '</p>';
});

socket.on('typing', data => {
    controls.typing.innerHTML = '<small>' + data + ' está escribiendo...</small>';
});
