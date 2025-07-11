import React, { useRef } from 'react';
import { format } from 'date-fns';
import { FaPrint } from 'react-icons/fa';

/**
 * A component for displaying and printing shipping labels
 * @param {Object} props
 * @param {Object} props.order - Order details with shipping information
 */
const ShippingLabel = ({ order }) => {
  const printRef = useRef();

  if (!order || !order.shippingAddress) {
    return (
      <div className="text-center p-8 text-gray-500">
        No order selected or shipping information missing
      </div>
    );
  }
  
  const {
    id,
    orderNumber,
    date,
    customer,
    shippingMethod = 'Standard Shipping',
    shippingAddress
  } = order;
  
  // Format date
  const formattedDate = date ? format(new Date(date), 'dd MMM yyyy') : 'N/A';
  
  const handlePrint = () => {
    const content = printRef.current;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Shipping Label - Order #${orderNumber || id}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .print-container {
              padding: 20px;
              max-width: 4in;
              margin: 0 auto;
            }
            .barcode {
              margin: 10px 0;
              height: 50px;
              background: repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px);
            }
            hr {
              border: 1px dashed #ccc;
              margin: 15px 0;
            }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .text-sm { font-size: 0.875rem; }
            .uppercase { text-transform: uppercase; }
            .mb-1 { margin-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .logo { font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem; }
            @media print {
              body { width: 4in; }
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div class="print-container">
            ${content.innerHTML}
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-6 border border-gray-200 rounded-md">
      <div ref={printRef}>
        {/* Sender Information */}
        <div className="text-center mb-4">
          <div className="font-bold text-lg mb-1">Blossom Boutique</div>
          <div className="text-sm">123 Flower St, Garden City, NY 10001</div>
          <div className="text-sm">United States</div>
          <div className="text-sm">Tel: (555) 123-4567</div>
        </div>
        
        <hr className="border-dashed border-gray-300 my-4" />
        
        {/* Shipping Method */}
        <div className="text-center mb-4">
          <div className="font-bold uppercase mb-1">{shippingMethod}</div>
          <div className="text-sm">Order #: {orderNumber || id}</div>
          <div className="text-sm">Date: {formattedDate}</div>
        </div>
        
        {/* Barcode (simulated) */}
        <div className="h-10 w-full bg-repeat-x mb-4" 
             style={{ 
               backgroundImage: 'linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px)',
               backgroundSize: '4px 100%' 
             }}>
        </div>
        
        {/* Recipient */}
        <div className="mb-4">
          <div className="text-sm uppercase font-bold mb-2">Ship To:</div>
          <div className="font-bold">
            {shippingAddress.name || (customer && customer.name) || 'N/A'}
          </div>
          <div>
            {shippingAddress.street}
            {shippingAddress.street2 && <span>, {shippingAddress.street2}</span>}
          </div>
          <div>
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
          </div>
          <div>{shippingAddress.country}</div>
          <div className="mt-1">
            {shippingAddress.phone || (customer && customer.phone) || 'N/A'}
          </div>
        </div>
        
        {/* Special Instructions */}
        {order.shippingNotes && (
          <div className="mb-4 p-2 border border-gray-200 text-sm">
            <div className="font-bold mb-1">Special Instructions:</div>
            <div>{order.shippingNotes}</div>
          </div>
        )}
      </div>
      
      {/* Print button - hidden during print */}
      <button
        onClick={handlePrint}
        className="mt-4 flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-150 print:hidden"
      >
        <FaPrint className="mr-2" />
        Print Shipping Label
      </button>
    </div>
  );
};

export default ShippingLabel; 