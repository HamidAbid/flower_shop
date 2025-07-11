import React from 'react';

/**
 * Component for selecting bouquet options like wrapping, ribbon, etc.
 * @param {Object} props
 * @param {Object} props.options - Current selections for the bouquet
 * @param {Object} props.availableOptions - Available options for selection
 * @param {Function} props.onOptionChange - Function to update an option
 */
const BouquetOptions = ({ 
  options, 
  availableOptions, 
  onOptionChange 
}) => {
  // Helper function to render color swatches
  const renderColorOptions = (category, selected) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {availableOptions[category].map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onOptionChange(category, color.value)}
            className={`h-8 w-8 rounded-full ${selected === color.value ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
            style={{ backgroundColor: color.hex }}
            title={color.label}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Wrapping Options</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Wrapping Type
            </label>
            <select
              value={options.wrappingType}
              onChange={(e) => onOptionChange('wrappingType', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {availableOptions.wrappingTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Wrapping Color
            </label>
            {renderColorOptions('wrappingColors', options.wrappingColor)}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ribbon Options</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ribbon Type
            </label>
            <select
              value={options.ribbonType}
              onChange={(e) => onOptionChange('ribbonType', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {availableOptions.ribbonTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ribbon Color
            </label>
            {renderColorOptions('ribbonColors', options.ribbonColor)}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Card Options</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Include Card
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="yes"
                  checked={options.includeCard === 'yes'}
                  onChange={() => onOptionChange('includeCard', 'yes')}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="ml-2">Yes</span>
              </label>
              
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="no"
                  checked={options.includeCard === 'no'}
                  onChange={() => onOptionChange('includeCard', 'no')}
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          
          {options.includeCard === 'yes' && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Card Message
              </label>
              <textarea
                value={options.cardMessage}
                onChange={(e) => onOptionChange('cardMessage', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
                placeholder="Enter your message here..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BouquetOptions; 