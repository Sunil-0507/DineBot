import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MessageBubble from './MessageBubble';
import PaymentModal from './PaymentModal';

const socket = io('http://localhost:3000');

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m DineBot 🤖. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    socket.on('botMessage', (msg) => {
      setMessages(prev => [...prev, { from: 'bot', text: msg }]);
    });

    return () => {
      socket.off('botMessage');
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    socket.emit('userMessage', input);

    if (input.toLowerCase().includes('checkout')) {
      setShowPayment(true);
    }

    setInput('');
  };

  return (
    <div className="w-full max-w-xl mx-auto h-screen flex flex-col bg-white shadow-lg rounded-md overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, index) => (
          <MessageBubble key={index} from={msg.from} text={msg.text} />
        ))}
      </div>
      <div className="flex p-2 border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded mr-2"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
    </div>
  );
};

export default ChatBot;
