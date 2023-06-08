import React, { useState } from 'react';

function BottomBar({ onSendMessage, selectedContact }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim() !== '') {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className="row m-0 p-0">
      <div className="col-10 m-0 p-0 d-flex flex-fill flex-column">
        <textarea
            disabled={!selectedContact?.username}
            className="text-input"
            type="textarea"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="New message here..."
          />
      </div>
      <div className="col-auto d-flex align-items-center flex-column justify-content-center">
        <button disabled={!selectedContact?.username} className="btn btn-dark" onClick={handleSendClick}>
          Send
        </button>
      </div>
    </div>
  );
}

export default BottomBar;
