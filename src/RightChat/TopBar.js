import React from 'react';

function TopBar({ selectedContact }) {
  const { photo, messengerName } = selectedContact;
  return (
    <div className="topBar">
      <img className="circular-image" id="chatPic" src={photo}  />
      <span className="messegerName rightTop">{messengerName}</span>
    </div>
  );
}

export default TopBar;