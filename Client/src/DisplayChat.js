import React, { useState,useContext } from 'react';
import './DisplayChat.css';
import LeftChat from './LeftChat/LeftChat';
import RightChat from './RightChat/RightChat';
import {useNavigate, useLocation } from 'react-router-dom';
import { Connection, getUserInfo, sendMessageToChat } from './api';
import UserContext from './Users/UserContext';


function DisplayChat() {
  const navigate = useNavigate();
  const location = useLocation();
  //  const { currentUser } = useContext(UserContext);
  
  //const token = Connection(location.state.username,location.state.password);
  // console.log('l', location);
  // console.log('tc', currentUser);
  
  
  const logout = () => {
    navigate('../');
  };
  const [messenger, setMessenger] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const onContactAdded = (contactData) => {
    const { photo, name } = contactData;
    const newMessenger = [
      ...messenger,
      {
        photo: photo ? URL.createObjectURL(photo) : '/unknown.png',
        messengerName: name,
        messageDate: new Date().toLocaleString(),
        messages: []
      }
    ];
    setMessenger(newMessenger);
  };

  const handleSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="container-fluid">
      <div className="logout-container">
      <button className="logout-button" onClick={logout}>Logout</button>
      </div>
      <div className="row">
      <LeftChat onContactAdded={onContactAdded} onSelect={handleSelect} messenger={messenger} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <RightChat selectedContact={selectedContact} />
      </div>
    </div>
  );
}

export default DisplayChat;