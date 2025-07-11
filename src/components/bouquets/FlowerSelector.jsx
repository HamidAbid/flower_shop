import React from 'react';

/**
 * Flower selector component for custom bouquet creation
 * @param {Object} props
 * @param {Array} props.availableFlowers - List of available flowers
 * @param {Array} props.selectedFlowers - Currently selected flowers
 * @param {Function} props.onAddFlower - Function to add a flower
 * @param {Function} props.onRemoveFlower - Function to remove a flower
 * @param {Function} props.onUpdateFlowerQuantity - Function to update flower quantity
 */
const FlowerSelector = ({ 
  availableFlowers, 
  selectedFlowers, 
  onAddFlower, 
  onRemoveFlower, 
  onUpdateFlowerQuantity 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Select Flowers</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableFlowers.map((flower) => (
          <div 
            key={flower.id}
            className="border border-gray-200 rounded-lg p-4 flex items-center"
          >
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={flower.image} 
                alt={flower.name}
                className="h-full w-full object-cover" 
              />
            </div>
            
            <div className="ml-4 flex-1">
              <h4 className="font-medium text-gray-800">{flower.name}</h4>
              <p className="text-sm text-gray-500">${flower.price.toFixed(2)} per stem</p>
              
              <button
                type="button"
                onClick={() => onAddFlower(flower)}
                className="mt-2 text-sm text-primary hover:text-primary-dark font-medium"
              >
                Add to Bouquet
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedFlowers.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Selected Flowers</h3>
          
          <div className="space-y-4">
            {selectedFlowers.map((selection) => (
              <div 
                key={selection.flower.id}
                className="border border-gray-200 rounded-lg p-4 flex items-center"
              >
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img 
                    src={selection.flower.image} 
                    alt={selection.flower.name}
                    className="h-full w-full object-cover" 
                  />
                </div>
                
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-800">{selection.flower.name}</h4>
                  <p className="text-sm text-gray-500">
                    ${(selection.flower.price * selection.quantity).toFixed(2)}
                  </p>
                  
                  <div className="mt-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => onUpdateFlowerQuantity(selection.flower.id, Math.max(1, selection.quantity - 1))}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span className="mx-2 text-gray-700">{selection.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateFlowerQuantity(selection.flower.id, selection.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => onRemoveFlower(selection.flower.id)}
                      className="ml-auto text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowerSelector; 