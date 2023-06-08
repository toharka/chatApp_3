import React, { useState } from 'react';
import UserPic from './UserPic';
import MessageList from './MessageList';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const LeftChat = ({ user, onContactAdded, onSelect, messenger }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { removeUser } = useUser();

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    removeUser()
    navigate('../');
  };
  return (
    <div className="d-flex flex-fill flex-column h-100">
      <div className="row">
        <UserPic user={user} />
      </div>
      <div className="container">
        <MessageList onContactAdded={onContactAdded} onSelect={onSelect} messenger={messenger} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="d-flex flex-fill align-items-end justify-content-center p-2">
        <button className="btn btn-block btn-danger" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default LeftChat;
