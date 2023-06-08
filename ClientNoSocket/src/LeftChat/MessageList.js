import React, { useEffect, useMemo, useState } from 'react';
import './MessageList.css';
import ChatUpperBar from './ChatUpperBar';
import SenderList from './SenderList';
import { getChat } from '../api';

function MessageList({ onContactAdded, onSelect, messenger, searchTerm, setSearchTerm }) {
  const [contacts, setContacts ] = useState([])

  const addNewContact = (contact) => {
    setContacts(prev => ([...prev, contact]));
  }

  const filterContacts = useMemo(() => {
    return contacts.filter(({user}) => user.displayName.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [contacts, searchTerm]);

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
      <div style={{overflow: 'auto', maxHeight: '70vh' }}>
      {filterContacts.map(({id, user, lastMessage}) => (
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
