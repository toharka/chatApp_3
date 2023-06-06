import React, { useState } from 'react';
import BottomBar from './BottomBar';

function MassageOfSender({ message }) {
  // Remove the useState for messages, as it's passed as a prop

  return (
    <div>
        <div key={message.id} className="row message-body">
          <div className="col-sm-12 message-main-sender">
            <div className="sender">
              <div className="message-text">{message.content}</div>
              <span className="message-time pull-right">{message.created}</span>
            </div>
          </div>
        </div>
      {/* Input field and send button */}
      {/* ... */}
    </div>
  );
}

export default MassageOfSender;