import React, { useEffect, useState } from 'react';
import TopBar from './TopBar';
import MessageContainer from './MessageContainer';
import BottomBar from './BottomBar';
import { sendMessageToChat, getMessages } from '../api';

const RightChat = ({ user, selectedContact }) => {
  const [messages, setMessages] = useState([]);

  useEffect(()=> {
    getMessages(selectedContact.chatId).then((msgs)=> {
      if(msgs && msgs.length) {
        setMessages(msgs.reverse());
      }
    })
  }, [selectedContact])

  const sendMessage = async (text) => {
    const { chatId } = selectedContact;

    const msg = await sendMessageToChat(chatId, text);
    console.log("current", msg)
    setMessages(prev => ([...prev, msg]))
  };

  return (
    <div className="col-9 border-end border-bottom border-2">
      <TopBar selectedContact={selectedContact} />
      <div className="chat-body " style={{ height: '57vh' }}>
        <MessageContainer user={user} messages={messages} />
        <BottomBar onSendMessage={sendMessage} selectedContact={selectedContact} />
      </div>
    </div>
  );
};

export default RightChat;