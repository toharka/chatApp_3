import React from 'react';

function TopBar({ selectedContact }) {

  const { profilePic, displayName } = selectedContact;
  return (
    <>
      <img className="circular-image" id="chatPic" src={profilePic ? profilePic : './unknown.png'} alt="profilePic" width="50" />
      <span className="messegerName rightTop">{displayName || "Select chat..."}</span>
    </>
  );
}

export default TopBar;
