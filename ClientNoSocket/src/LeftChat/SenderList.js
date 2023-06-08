import React from 'react';

function SenderList({ lastMessage, user, onSelect }) {
  const { profilePic, displayName, username } = user;
  return (
    <div className="list-group tohar">
      <div className=" p-3 row d-flex" onClick={() => onSelect(username)}>
        <div className="col-3">
          <img className="circular-image" src={profilePic} alt="profilePic" width="50px" />
        </div>
        <div className="col-9">
          <div className="row">
            <div className="col-12">
              <strong>{displayName}</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <span >{lastMessage?.content}</span>
            </div>
            <div className="col-6">
            <span  className="text-secondary" style={{ fontSize: '8px' }}>{new Date(lastMessage?.created).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SenderList;
