import React from 'react';
import { motion } from 'framer-motion';

/**
 * Component for displaying a preview of the custom bouquet
 * @param {Object} props
 * @param {Array} props.selectedFlowers - Flowers selected for the bouquet
 * @param {Object} props.options - Selected options for the bouquet
 * @param {number} props.totalPrice - Total price of the bouquet
 */
const BouquetPreview = ({ 
  selectedFlowers, 
  options,
  totalPrice 
}) => {
  // Helper function to get the color hex value from the option value
  const getColorHex = (category, value) => {
    const colorOptions = {
      wrappingColor: [
        { value: 'white', hex: '#ffffff' },
        { value: 'cream', hex: '#f9f3e3' },
        { value: 'pink', hex: '#f9c0c0' },
        { value: 'blue', hex: '#c0dbf9' },
        { value: 'green', hex: '#c0f9c0' }
      ],
      ribbonColor: [
        { value: 'gold', hex: '#d4af37' },
        { value: 'silver', hex: '#c0c0c0' },
        { value: 'red', hex: '#e63946' },
        { value: 'navy', hex: '#1d3557' },
        { value: 'black', hex: '#333333' }
      ]
    };
    
    const color = colorOptions[category].find(c => c.value === value);
    return color ? color.hex : '#ffffff';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Your Custom Bouquet
        </h3>
        
        {selectedFlowers.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500">
              Add some flowers to your bouquet to see a preview!
            </p>
          </div>
        ) : (
          <>
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              {/* This is a simplified visual representation of the bouquet */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  backgroundColor: getColorHex('wrappingColor', options.wrappingColor),
                  borderRadius: '50%',
                  border: `8px solid ${getColorHex('ribbonColor', options.ribbonColor)}`
                }}
              >
                <div className="p-4 flex flex-wrap justify-center">
                  {selectedFlowers.map((selection) => (
                    <motion.div
                      key={selection.flower.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="m-1"
                    >
                      <div 
                        className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-white"
                        title={`${selection.flower.name} x${selection.quantity}`}
                      >
                        <img 
                          src={selection.flower.image} 
                          alt={selection.flower.name}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Flowers:</h4>
                <ul className="mt-1 text-gray-600">
                  {selectedFlowers.map((selection) => (
                    <li key={selection.flower.id}>
                      {selection.flower.name} x{selection.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Wrapping:</h4>
                <p className="mt-1 text-gray-600">
                  {options.wrappingType}, {options.wrappingColor}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Ribbon:</h4>
                <p className="mt-1 text-gray-600">
                  {options.ribbonType}, {options.ribbonColor}
                </p>
              </div>
              
              {options.includeCard === 'yes' && (
                <div>
                  <h4 className="font-medium text-gray-700">Card Message:</h4>
                  <p className="mt-1 text-gray-600 italic">
                    "{options.cardMessage || 'No message specified'}"
                  </p>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800">Total Price:</h4>
                <p className="mt-1 text-xl text-primary font-semibold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BouquetPreview; 