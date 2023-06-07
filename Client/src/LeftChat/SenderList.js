import React from 'react';

function SenderList({ lastMessage, user, onSelect }) {
  const { profilePic, displayName, username } = user;
  return (
    <ul className="list-group tohar">
      <li className="list-group-item tohar" onClick={() => onSelect(username)}>
        <img className="circular-image" src={profilePic} alt="description of the image" width="30px" />
        <span className="listMessengerName tohar">{displayName}</span>
        <br />
        <span style={{ fontSize: '8px' }}>{lastMessage?.created}</span>
      </li>
    </ul>
  );
}

export default SenderList;
