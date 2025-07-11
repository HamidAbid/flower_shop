import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderTracking from '../components/orders/OrderTracking';
import Section from '../components/layout/Section';

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId) {
      navigate(`/track-order/${trackingId}`);
    }
  };

  return (
    <Section className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Track Your Order</h1>
        
        {/* Only show our form if no ID is provided and hide the one in OrderTracking */}
        {!id ? (
          <div className="max-w-lg mx-auto mb-8 bg-white p-6 rounded-lg shadow-sm">
            <p className="mb-4 text-gray-600">
              Enter your order ID or tracking number to track the status of your delivery.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Order ID or Tracking Number"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark"
              >
                Track Order
              </button>
            </form>
          </div>
        ) : null}
        
        <OrderTracking order={id} hideForm={!id} />
        
        <div className="max-w-lg mx-auto mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order or need assistance, our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+1234567890" 
              className="inline-block bg-white border border-secondary text-secondary px-4 py-2 rounded hover:bg-secondary hover:text-white"
            >
              Call Us
            </a>
            <a 
              href="/contact" 
              className="inline-block bg-white border border-secondary text-secondary px-4 py-2 rounded hover:bg-secondary hover:text-white"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TrackOrder; 