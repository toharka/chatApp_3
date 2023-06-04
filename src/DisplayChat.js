import React, { useState } from 'react';
import './DisplayChat.css';
import LeftChat from './LeftChat/LeftChat';
import RightChat from './RightChat/RightChat';
import {useNavigate } from 'react-router-dom';

function DisplayChat() {
  const navigate = useNavigate();
  const logout = () => {
    navigate('../');
  };
  const [messenger, setMessenger] = useState([]);
  const [selectedContact, setSelectedContact] = useState({ photo: '', name: '', messages: [] });
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

  const sendMessage = (text) => {
    const currentTime = new Date().toLocaleTimeString();
    const newMessage = { text, time: currentTime };

    const updatedMessenger = messenger.map(contact =>
      contact.messengerName === selectedContact.messengerName
        ? { ...contact, messages: [...contact.messages, newMessage] }
        : contact
    );

    // Find the updated selected contact
    const updatedSelectedContact = updatedMessenger.find(
      contact => contact.messengerName === selectedContact.messengerName
    );

    setMessenger(updatedMessenger);
    setSelectedContact(updatedSelectedContact);  // Update the selected contact
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
        <RightChat onSendMessage={sendMessage} selectedContact={selectedContact} />
      </div>
    </div>
  );
}

export default DisplayChat;