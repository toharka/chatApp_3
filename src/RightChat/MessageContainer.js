// MessageContainer.js

import React from 'react';
import MassageOfReciver from './MassageOfReciver';
import MassageOfSender from './MassageOfSender';

function MessageContainer({ messages }) {
  return (
    <div className="container" style={{ height: '50vh', overflow: 'auto' }}>
      <MassageOfReciver />
      <MassageOfSender messages={messages} />
    </div>
  );
}

export default MessageContainer;