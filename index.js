const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(process.env.PORT || 8080, function(){
    console.log('server listening at', process.env.PORT ? process.env.PORT : '8080');
});

app.use(express.static('public'));

const io = socket(server);
io.on('connection', socket => {
    console.log('new connection: ', socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });
});
