// MessageContainer.js

import React, { useEffect, useRef } from 'react';
import MassageOfSender from './MassageOfSender';
import { useUser } from '../UserContext';

function MessageContainer({ messages }) {
  const { user }= useUser();
  const scrollerRef = useRef(null);

  useEffect(() => {
    // Scroll to the last message when messages are updated
    const scroller = scrollerRef.current;
    console.log("scroler", scroller)
    if (scroller && scroller.scrollHeight) {
      scroller.scrollTop = scroller.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container" style={{ height: '80vh', overflow: 'auto' }} ref={scrollerRef}>
      {messages.map((message, index)=> (
        <MassageOfSender key={index} isMe={message?.sender?.username === user?.username} message={message} />
      ))}
    </div>
  );
}

export default MessageContainer;
