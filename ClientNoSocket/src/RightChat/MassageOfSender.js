import React from 'react';

function MassageOfSender({ isMe, message }) {
  // Remove the useState for messages, as it's passed as a prop

  return (
    <div key={message.id} className={`row d-flex p-3 m-2`}>
      <div className={`d-flex flex-fill  ${isMe? 'justify-content-end' : 'justify-content-start'}`}>
        <div className="p-3 m-2" style={{ backgroundColor: isMe? "#dcf8c6": "white"}}>
          {!isMe && <div>{message?.displayName}</div>}
          <p>{message?.content}</p>
          <span >{message?.created}</span>
        </div>
      </div>
    </div>
  );
}

export default MassageOfSender;
