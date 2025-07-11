import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setSubscriptionStatus('Please enter a valid email address');
      return;
    }
    
    // In a real app, this would send the email to your backend
    setSubscriptionStatus('Thank you for subscribing to our newsletter!');
    setEmail('');
    
    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSubscriptionStatus('');
    }, 3000);
  };

  return (
    <section className="py-16 px-4 bg-pink-50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          Join Our Newsletter
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-8"
        >
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
        </motion.p>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleNewsletterSubmit}
          className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="px-4 py-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Subscribe
          </motion.button>
        </motion.form>
        
        {subscriptionStatus && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 ${
              subscriptionStatus.includes('Thank you')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {subscriptionStatus}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Newsletter; 