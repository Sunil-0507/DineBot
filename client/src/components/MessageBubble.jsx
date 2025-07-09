import React from 'react';

const MessageBubble = ({ from, text }) => {
  const isBot = from === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isBot ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
