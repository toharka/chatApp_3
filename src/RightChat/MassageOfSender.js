import React, { useState } from 'react';
import BottomBar from './BottomBar';

function MassageOfSender({ messages }) {
  // Remove the useState for messages, as it's passed as a prop

  return (
    <div>
      {/* Display messages */}
      {messages.map((message, index) => (
        <div key={index} className="row message-body">
          <div className="col-sm-12 message-main-sender">
            <div className="sender">
              <div className="message-text">{message.text}</div>
              <span className="message-time pull-right">{message.time}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Input field and send button */}
      {/* ... */}
    </div>
  );
}

export default MassageOfSender;