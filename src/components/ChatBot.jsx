import { useState, useCallback, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: 'Hi there! 👋 I\'m Floral Bot. How can I help you today with your flower needs?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const messageCountRef = useRef(0);

  // Quick reply options
  const quickReplies = [
    'What flowers are in season?',
    'How do I care for my bouquet?',
    'Do you offer same-day delivery?',
    'Wedding flower packages'
  ];

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Clean up messages when component unmounts
  useEffect(() => {
    return () => {
      setMessages([]);
      setInputValue('');
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleToggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const generateBotResponse = useCallback((userText) => {
    const text = userText.toLowerCase();
    
    if (text.includes('delivery') || text.includes('shipping')) {
      return 'We offer same-day delivery for orders placed before 2 PM local time. For more delivery options, please visit our delivery page.';
    } else if (text.includes('wedding') || text.includes('event')) {
      return 'We specialize in wedding and event flowers! Our team can create custom arrangements for your special day. Would you like to speak with one of our event specialists?';
    } else if (text.includes('care') || text.includes('maintain')) {
      return 'To keep your flowers fresh longer: 1) Change the water every 2 days, 2) Trim stems at an angle, 3) Keep away from direct sunlight and heat sources, 4) Add flower food if provided.';
    } else if (text.includes('season')) {
      return 'Currently in season: roses, tulips, lilies, and sunflowers. These are all at their best right now and make beautiful arrangements!';
    } else {
      return 'Thank you for your message! One of our flower experts will respond shortly. In the meantime, can I help you with anything else?';
    }
  }, []);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || messageCountRef.current >= 20) return;
    
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    messageCountRef.current++;
    
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
          sender: 'bot',
        text: generateBotResponse(inputValue)
      };
      
      setMessages(prev => [...prev, botResponse]);
      messageCountRef.current++;
    }, 1000);
  }, [inputValue, generateBotResponse]);

  const handleQuickReply = useCallback((text) => {
    if (messageCountRef.current >= 20) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text
    };
    
    setMessages(prev => [...prev, userMessage]);
    messageCountRef.current++;
    
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
          sender: 'bot',
        text: generateBotResponse(text)
      };
      
      setMessages(prev => [...prev, botResponse]);
      messageCountRef.current++;
    }, 1000);
  }, [generateBotResponse]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button */}
      <button
        onClick={handleToggleChat}
        className="bg-secondary rounded-full p-3 text-white shadow-lg hover:bg-opacity-80 transition-colors"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-primary">
          {/* Chat header */}
          <div className="bg-primary p-4 text-secondary">
            <h3 className="font-medium">Chat with Floral Bot</h3>
            <p className="text-xs opacity-75">We typically reply within minutes</p>
          </div>
          
          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-secondary text-white rounded-tr-none'
                      : 'bg-primary text-secondary rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick replies */}
          <div className="p-2 bg-primary bg-opacity-20 border-t border-primary overflow-x-auto">
            <div className="flex space-x-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1 bg-white border border-secondary text-secondary rounded-full text-xs whitespace-nowrap hover:bg-secondary hover:text-white"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-primary border-opacity-20 flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-secondary border-opacity-30 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
            />
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded-r-md hover:bg-opacity-80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 