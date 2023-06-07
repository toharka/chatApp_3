import React, { useState, useEffect } from 'react';
import './DisplayChat.css';
import LeftChat from './LeftChat/LeftChat';
import RightChat from './RightChat/RightChat';
import {useNavigate, useLocation } from 'react-router-dom';
import { getUserInfo } from './api';


function DisplayChat({ user }) {
  const [messenger, setMessenger] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // const { currentUser } = useContext(UserContext);
  //  const { currentUser } = useContext(UserContext);
  
  //const token = Connection(location.state.username,location.state.password);
  // console.log('l', location);
  // console.log('tc', currentUser);
  
  useEffect(()=> {
    console.log("user", user)
    if (!user.username) {
      logout();
    }
  }, [user])

  const logout = () => {
    navigate('../');
  };

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
      <div className="row  d-flex align-items-center" style={{ height:'100vh'}}>
        <LeftChat user={user} onContactAdded={onContactAdded} onSelect={handleSelect} messenger={messenger} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <RightChat user={user} selectedContact={selectedContact} />
      </div>
    </div>
  );
}

export default DisplayChat;