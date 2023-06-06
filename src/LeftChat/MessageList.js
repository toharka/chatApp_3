import React, { useEffect, useState } from 'react';
import './MessageList.css';
import ChatUpperBar from './ChatUpperBar';
import SenderList from './SenderList';
import { getChat } from '../api';

function MessageList({ onContactAdded, onSelect, messenger, searchTerm, setSearchTerm }) {
  const [contacts, setContacts ] = useState([])

  const addNewContact = (contact) => {
    setContacts(prev => ([...prev, contact]));
  }

  useEffect(()=> {
    getChat().then((response) => {
      if (response && response.length) {
        setContacts(response)
      }
    })
  },[])

  return (
    <>
     <ChatUpperBar addNewContact={addNewContact} onContactAdded={onContactAdded} setSearchTerm={setSearchTerm} messenger={messenger} />
      <div>
      {contacts.map(({id, user, lastMessage}) => (
        <SenderList
          key={id}
          user={user}
          lastMessage={lastMessage}
          onSelect={()=>onSelect({ chatId: id, ...user})}
        />
      ))}
      </div>
    </>
  );
}

export default MessageList;
