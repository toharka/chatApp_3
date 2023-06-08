import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import MessageContainer from './MessageContainer';
import BottomBar from './BottomBar';
import { sendMessageToChat, getMessages } from '../api';
import { socket } from '../SocketContext';
import { useUser } from '../UserContext';

const RightChat = ({ selectedContact }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  useEffect(()=> {
    const handleChatMessage = (msg) => {
      console.log("message", msg)
      setMessages(prev => ([...prev, msg]))
    };

    socket.on('chat', handleChatMessage);

    return () => {
      // Remove the chat message listener
      socket.off('chat', handleChatMessage);
    };
  }, [])

  useEffect(()=> {
    if (selectedContact.chatId) {
      getMessages(selectedContact.chatId).then((msgs)=> {
        if(msgs) {
          setMessages(msgs);
        }
      })
    }
  }, [selectedContact])

  const sendMessage = async (text) => {
    const { chatId } = selectedContact;
    socket.emit('chat', {
      roomId: chatId,
      message: { content: text, sender: { username: user.username }, created: new Date(), chatId }});
     await sendMessageToChat(chatId, text);
  };

  return (
    <div className="row p-0 m-0 col-12">
      <div className="col-12 p-3 m-0 bg-white">
        <TopBar selectedContact={selectedContact} />
      </div>
      <div className="col-12 d-flex flex-fill flex-column h-100 ">
        <MessageContainer user={user} messages={messages} />
        <BottomBar onSendMessage={sendMessage} selectedContact={selectedContact} />
      </div>
    </div>
  );
};

export default RightChat;
