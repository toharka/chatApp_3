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
    <div className="bottomBar">
      <div>
        {selectedContact?.username && (
          <>
            <input
              className="text-box"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="New message here..."
            />
            <button style={{ background: 'white' }} onClick={handleSendClick}>
              Send
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default BottomBar;
