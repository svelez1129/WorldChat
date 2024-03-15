import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { initiateSocketConnection, sendMessage, subscribeToChat, disconnectSocket } from './socket.service';

const ChatRoom: React.FC = () => {
    // set the state of messages and usernames
    const [messages, setMessages] = useState<{ message: string; username: string }[]>([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Initialize the socket connection when the component mounts
        initiateSocketConnection();

        // Subscribe to chat events and update the messages state
        subscribeToChat((data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            disconnectSocket();
        };
    }, []);

    const sendMessageHandler = () => {
        if (message.trim() && username.trim()) {
            // Send the message and username to the server
            sendMessage(message, username);
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <ScrollToBottom>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.username}</strong>: {msg.message}
                        </div>
                    ))}
                </ScrollToBottom>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessageHandler();
                        }
                    }}
                />
                <button onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;