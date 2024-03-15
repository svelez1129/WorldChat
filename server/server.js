const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


io.on('connection', (socket) => {
    console.log('A user connected');

    // Event listener for receiving chat messages
    socket.on('chat message', ({ message, username }) => {
        console.log(`Received message from ${username}: ${message}`);
        
        // Emit the chat message to all connected clients
        io.emit('chat message', { message, username });
    });

    // Event listener for user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});