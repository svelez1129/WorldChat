import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

// Function to initiate the socket connection
export const initiateSocketConnection = () => {
    socket = io('http://localhost:3000'); // Connect to the Socket.IO server
    console.log('Connected to Socket.IO server');
};

// Function to disconnect the socket
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect(); // Disconnect from the Socket.IO server
        socket = null;
        console.log('Disconnected from Socket.IO server');
    }
};

// Ensure that socket connectione exists
export const subscribeToChat = (cb: (data: { message: string; username: string }) => void) => {
    // If socket is not initialized, return
    if (!socket) return; 

    socket.on('chat message', (data: { message: string; username: string }) => {
        console.log(`Received message from ${data.username}: ${data.message}`);
        // Call the callback function with the received data
        cb(data); 
    });
};

// Function to send a chat message
export const sendMessage = (message: string, username: string) => {
    if (socket) {
        socket.emit('chat message', { message, username }); // Emit a chat message event to the Socket.IO server
    }
};