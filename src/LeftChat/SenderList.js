import React from 'react';

function SenderList({ message, onSelect }) {
  const { photo, messengerName, messageDate } = message;
  return (
    <ul className="list-group tohar">
      <li className="list-group-item tohar" onClick={() => onSelect(message)}>
        <img className="circular-image" src={photo} alt="description of the image" width="30px" />
        <span className="listMessengerName tohar">{messengerName}</span>
        <br />
        <span style={{ fontSize: '8px' }}>{messageDate}</span>
      </li>
    </ul>
  );
}

export default SenderList;
