// MessageContainer.js

import React from 'react';
import MassageOfSender from './MassageOfSender';

// Get the current user here.
// if message.sender.username == currentUser.usename --> it should be green message
// otherwise, white mssage (and make it aligned to the left, display:flex, justifycontent:flex-end;)

function MessageContainer({ messages }) {

  return (
    <div className="container" style={{ height: '50vh', overflow: 'auto' }}>
      {messages.map((message)=> (
        <MassageOfSender message={message} />
      ))}
    </div>
  );
}

export default MessageContainer;