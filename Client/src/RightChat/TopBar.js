import React from 'react';

function TopBar({ selectedContact }) {
  
  const { profilePic, displayName } = selectedContact;
  return (
    <div className="topBar">
      <img className="circular-image" id="chatPic" src={profilePic}  />
      <span className="messegerName rightTop">{displayName}</span>
    </div>
  );
}

export default TopBar;