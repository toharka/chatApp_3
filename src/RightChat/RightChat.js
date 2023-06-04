import React from 'react';
import TopBar from './TopBar';
import MessageContainer from './MessageContainer';
import BottomBar from './BottomBar';

const RightChat = ({ onSendMessage, selectedContact }) => {
  return (
    <div className="col-9 border-end border-bottom border-2">
      <TopBar selectedContact={selectedContact} />
      <div className="chat-body " style={{ height: '57vh' }}>
        <MessageContainer messages={selectedContact.messages || []} />
        <BottomBar onSendMessage={onSendMessage} selectedContact= {selectedContact  } />
      </div>
    </div>
  );
};

export default RightChat;