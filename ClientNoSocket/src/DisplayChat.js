import React, { useState } from 'react';
import LeftChat from './LeftChat/LeftChat';
import RightChat from './RightChat/RightChat';
import { socket, useSocket } from './SocketContext';

function DisplayChat({ user }) {
  const [messenger, setMessenger] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { handleLeaveCurrentRoom, setCurrentRoomId } = useSocket();

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
    if (contact?.chatId) {
      handleLeaveCurrentRoom();
      console.log("User joined room", contact?.chatId)
      socket.emit('joinRoom', contact?.chatId);
      setCurrentRoomId(contact?.chatId);
    }
  };

  return (
      <div style={{ width: '100%', height: '100%', padding: 0, margin: 0}} className="container-fluid">
        <div className="row p-0 m-0" style={{ height:'100vh'}}>
          <div className="col-4 bg-white border-right-3 m-0 p-0">
            <LeftChat
              user={user}
              onContactAdded={onContactAdded}
              onSelect={handleSelect}
              messenger={messenger}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              />
          </div>
          <div className="col-8 bg-success-subtle m-0 p-0 chat-background">
            <RightChat user={user} selectedContact={selectedContact} />
          </div>
        </div>
      </div>
  );
}

export default DisplayChat;
