import React from 'react';
import './MessageList.css';
import ChatUpperBar from './ChatUpperBar';
import SenderList from './SenderList';

function MessageList({ onContactAdded, onSelect, messenger, searchTerm, setSearchTerm }) {
  const filteredMessenger = messenger.filter((contact) => 
    contact.messengerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const messageItems = filteredMessenger.map((message, index) => (
    <SenderList
      key={index}
      message={message}
      onSelect={onSelect}
    />
  ));

  return (
    <>
     <ChatUpperBar onContactAdded={onContactAdded} setSearchTerm={setSearchTerm} messenger={messenger} />
      <div>{messageItems}</div>
    </>
  );
}

export default MessageList;
