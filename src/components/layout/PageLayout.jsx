import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ChatBot from '../ChatBot';

/**
 * Main page layout component that includes the navbar, footer, and chatbot
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {boolean} props.showChatbot - Whether to show the chatbot
 */
const PageLayout = ({ 
  children, 
  showChatbot = true 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showChatbot && <ChatBot />}
      <Footer />
    </div>
  );
};

export default PageLayout; 