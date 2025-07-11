import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks = ({ isVisible }) => {
  return (
    <section id="quickLinks" className={`py-10 bg-white ${isVisible ? 'fade-in' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/products/flowers" className="group hover-float">
            <div className={`bg-primary bg-opacity-20 rounded-lg py-4 px-6 text-center hover:bg-primary hover:bg-opacity-40 transition-all duration-300 ${isVisible ? 'scale-in' : 'opacity-0'}`} style={{transitionDelay: '0.1s'}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="font-medium text-secondary">Flower Shop</h3>
            </div>
          </Link>
          <Link to="/quiz" className="group hover-float">
            <div className={`bg-primary bg-opacity-20 rounded-lg py-4 px-6 text-center hover:bg-primary hover:bg-opacity-40 transition-all duration-300 ${isVisible ? 'scale-in' : 'opacity-0'}`} style={{transitionDelay: '0.2s'}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-secondary">Flower Quiz</h3>
            </div>
          </Link>
          <Link to="/events" className="group hover-float">
            <div className={`bg-primary bg-opacity-20 rounded-lg py-4 px-6 text-center hover:bg-primary hover:bg-opacity-40 transition-all duration-300 ${isVisible ? 'scale-in' : 'opacity-0'}`} style={{transitionDelay: '0.3s'}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-medium text-secondary">Event Organizer</h3>
            </div>
          </Link>
          <Link to="/blog" className="group hover-float">
            <div className={`bg-primary bg-opacity-20 rounded-lg py-4 px-6 text-center hover:bg-primary hover:bg-opacity-40 transition-all duration-300 ${isVisible ? 'scale-in' : 'opacity-0'}`} style={{transitionDelay: '0.4s'}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="font-medium text-secondary">Flower Blog</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks; 