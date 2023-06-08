import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { serverUrl } from './api';

const URL = process.env.NODE_ENV === 'production' ? undefined : serverUrl;

export const socket = io(URL, { transports: ['websocket'] }, { autoConnect: false });
// Create the UserContext
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [currentRoomId, setCurrentRoomId] = useState(''); // Current chat room ID

    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log("socket connected")
        });

        // Clean up the socket connection when component unmounts
        return () => {
            handleLeaveCurrentRoom()
            socket.disconnect();
        };
    }, []);


    // Leave the current chat room
    const handleLeaveCurrentRoom = () => {
        if (currentRoomId){
            socket.emit('leaveRoom', currentRoomId);
        }
        setCurrentRoomId('');
    };


    return (
        <SocketContext.Provider value={{ handleLeaveCurrentRoom, setCurrentRoomId, currentRoomId }}>
        {children}
        </SocketContext.Provider>
    );
};
