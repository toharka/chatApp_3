import React, { useState } from 'react';
import UserPic from './UserPic';
import MessageList from './MessageList';
import UserContext from '../Users/UserContext';

const LeftChat = ({ onContactAdded, onSelect, messenger }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="col-3 border-end border-start border-bottom border-2">
      <UserPic />
      <div className="container" style={{ height: '50vh', overflow: 'auto' }}>
      <MessageList onContactAdded={onContactAdded} onSelect={onSelect} messenger={messenger} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </div>
  );
};

export default LeftChat;
