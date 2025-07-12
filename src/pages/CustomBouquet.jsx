import { useState, useContext, useEffect } from 'react';
import { useCart } from '../context/cartContext';


import { motion } from 'framer-motion';

// Sample flower types with color options
const flowerTypes = {
  rose: {
    name: 'Rose',
    basePrice: 5.99,
    colors: [
      { id: 'red', name: 'Red Rose', color: '#FF0000', image: 'http://localhost:3000/img/red.WEBP' },
      { id: 'pink', name: 'Pink Rose', color: '#FF69B4', image: 'http://localhost:3000/img/pink.WEBP' },
      { id: 'white', name: 'White Rose', color: '#FFFFFF', image: 'http://localhost:3000/img/white.WEBP' },
      { id: 'yellow', name: 'Yellow Rose', color: '#FFD700', image: 'http://localhost:3000/img/yellow.WEBP' }
    ]
  },
  orchid: {
    name: 'Orchid',
    basePrice: 7.99,
    colors: [
      { id: 'purple', name: 'Purple Orchid', color: '#800080', image: 'http://localhost:3000/img/purpleorch.WEBP' },
      { id: 'white', name: 'White Orchid', color: '#FFFFFF', image: 'http://localhost:3000/img/whiteorch.WEBP' },
      { id: 'pink', name: 'Pink Orchid', color: '#FF69B4', image: 'http://localhost:3000/img/pinkorch.WEBP' }
    ]
  },
  lily: {
    name: 'Lily',
    basePrice: 6.99,
    colors: [
      { id: 'white', name: 'White Lily', color: '#FFFFFF', image: 'http://localhost:3000/img/whiteli.WEBP' },
      { id: 'pink', name: 'Pink Lily', color: '#FF69B4', image: 'http://localhost:3000/img/pinkli.WEBP' },
      { id: 'orange', name: 'Orange Lily', color: '#FFA500', image: 'http://localhost:3000/img/orangeli.WEBP' }
    ]
  },
  tulip: {
    name: 'Tulip',
    basePrice: 4.99,
    colors: [
      { id: 'red', name: 'Red Tulip', color: '#FF0000', image: 'http://localhost:3000/img/redtu.WEBP' },
      { id: 'yellow', name: 'Yellow Tulip', color: '#FFD700', image: 'http://localhost:3000/img/yellowtu.WEBP' },
      { id: 'pink', name: 'Pink Tulip', color: '#FF69B4', image: 'http://localhost:3000/img/pinktu.WEBP' },
      { id: 'purple', name: 'Purple Tulip', color: '#800080', image: 'http://localhost:3000/img/purpletu.WEBP' }
    ]
  },
  sunflower: {
    name: 'Sunflower',
    basePrice: 5.99,
    image: 'http://localhost:3000/img/sunflower.WEBP'
  },
  babysBreath: {
    name: "Baby's Breath",
    basePrice: 3.99,
    image: 'http://localhost:3000/img/baby.WEBP'
  },
  hydrangea: {
    name: 'Hydrangea',
    basePrice: 6.99,
    image: 'http://localhost:3000/img/hydr.WEBP'
  },
  peony: {
    name: 'Peony',
    basePrice: 8.99,
    image: 'http://localhost:3000/img/peony.WEBP'
  },
  ranunculus: {
    name: 'Ranunculus',
    basePrice: 7.99,
    image: 'http://localhost:3000/img/rech.WEBP'
  }
};

// Update wrapper colors to include prices
const wrapColors = [
  { id: 'pink', color: '#FF69B4', name: 'Pink Wrap', price: 2.99 },
  { id: 'red', color: '#FF0000', name: 'Red Wrap', price: 2.99 },
  { id: 'blue', color: '#0000FF', name: 'Blue Wrap', price: 2.99 },
  { id: 'purple', color: '#800080', name: 'Purple Wrap', price: 2.99 },
  { id: 'white', color: '#FFFFFF', name: 'White Wrap', price: 2.99 },
  { id: 'gold', color: '#FFD700', name: 'Gold Wrap', price: 3.99 }
];

// Wrapping options with proper images
const wrappingOptions = [
  { 
    id: 'classic', 
    name: 'Classic Paper Wrap', 
    price: 2.99, 
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop',
    style: 'paper-wrap',
    previewImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop'
  },
  { 
    id: 'tissue', 
    name: 'Tissue Paper Wrap', 
    price: 3.99, 
    image: 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop',
    style: 'tissue-wrap',
    previewImage: 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop'
  },
  { 
    id: 'cellophane', 
    name: 'Cellophane Wrap', 
    price: 4.99, 
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop',
    style: 'cellophane-wrap',
    previewImage: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop'
  },
  { 
    id: 'kraft', 
    name: 'Kraft Paper Wrap', 
    price: 3.99, 
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop',
    style: 'kraft-wrap',
    previewImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop'
  },
  { 
    id: 'burlap', 
    name: 'Burlap Wrap', 
    price: 4.99, 
    image: 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop',
    style: 'burlap-wrap',
    previewImage: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop'
  },
  { 
    id: 'metallic', 
    name: 'Metallic Foil Wrap', 
    price: 5.99, 
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop',
    style: 'metallic-wrap',
    previewImage: 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop'
  }
];

// Ribbon options
const ribbonOptions = [
  { id: 'satin', name: 'Satin Ribbon', price: 2.99, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop' },
  { id: 'velvet', name: 'Velvet Ribbon', price: 3.99, image: 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop' },
  { id: 'organza', name: 'Organza Ribbon', price: 2.99, image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop' }
];

// Card options
const cardOptions = [
  { id: 'birthday', name: 'Birthday Card', price: 3.99, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop' },
  { id: 'anniversary', name: 'Anniversary Card', price: 4.99, image: 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop' },
  { id: 'thankyou', name: 'Thank You Card', price: 3.99, image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop' }
];

// Shape options
const shapeOptions = [
  { id: 'round', name: 'Round Shape', price: 0, image: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?q=80&w=2074&auto=format&fit=crop' },
  { id: 'heart', name: 'Heart Shape', price: 2.99, image: 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop' },
  { id: 'cascade', name: 'Cascade Shape', price: 3.99, image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop' }
];

// Color palette options
const colorPaletteOptions = [
  { id: 'pastel', name: 'Pastel Colors', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop' },
  { id: 'vibrant', name: 'Vibrant Colors', image: 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop' },
  { id: 'neutral', name: 'Neutral Colors', image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop' }
];

const CustomBouquet = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();


  const [selectedItems, setSelectedItems] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedFlowerColor, setSelectedFlowerColor] = useState(null);
  const [selectedFlowerType, setSelectedFlowerType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('flowers');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImagePrice, setUploadedImagePrice] = useState(10);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customBouquetPreview, setCustomBouquetPreview] = useState(null);
  const [customBouquetPrice, setCustomBouquetPrice] = useState(0);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  // Add new state variables for AI generation
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiGeneratedImage, setAiGeneratedImage] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);

  // Handle flower type selection
  const handleFlowerTypeSelect = (flowerType) => {
    setSelectedFlowerType(flowerType);
    setSelectedFlowerColor(null);
    setQuantity(1);

    // If the flower has no color options, add it directly
    if (!flowerType.colors) {
      const newPrice = flowerType.basePrice * quantity;
      const newFlower = {
        id: Date.now(),
        type: flowerType.name,
        name: flowerType.name,
        image: flowerType.image,
        price: newPrice,
        quantity: quantity
      };
      
      setSelectedFlowers(prev => [...prev, newFlower]);
      
      // Update price immediately
      setTotalPrice(prevPrice => prevPrice + newPrice);
      setCustomBouquetPrice(prevPrice => prevPrice + newPrice);
      
      // Update preview
      setCustomBouquetPreview(flowerType.image);
    }
  };

  // Handle flower color selection
  const handleFlowerColorSelect = (flower, colorOption) => {
    setSelectedFlowerColor(colorOption);
    
    // Calculate price for this flower
    const flowerPrice = flower.basePrice * quantity;
    
    // Check if the same flower and color already exists
    const existingFlowerIndex = selectedFlowers.findIndex(
      f => f.type === flower.name && f.selectedColor === colorOption.id
    );

    if (existingFlowerIndex !== -1) {
      // Update quantity and price for existing flower
      const updatedFlowers = [...selectedFlowers];
      const previousPrice = updatedFlowers[existingFlowerIndex].price;
      const newQuantity = updatedFlowers[existingFlowerIndex].quantity + quantity;
      const newPrice = flower.basePrice * newQuantity;
      const priceDifference = newPrice - previousPrice;
      
      updatedFlowers[existingFlowerIndex] = {
        ...updatedFlowers[existingFlowerIndex],
        quantity: newQuantity,
        price: newPrice
      };
      
      setSelectedFlowers(updatedFlowers);
      
      // Update total price with the price difference
      setTotalPrice(prevPrice => prevPrice + priceDifference);
      setCustomBouquetPrice(prevPrice => prevPrice + priceDifference);
    } else {
      // Add new flower
      const newFlower = {
        id: Date.now(),
        type: flower.name,
        name: colorOption.name,
        image: colorOption.image,
        price: flowerPrice,
        quantity: quantity,
        selectedColor: colorOption.id
      };
      
      setSelectedFlowers(prev => [...prev, newFlower]);
      
      // Update total price with the new flower price
      setTotalPrice(prevPrice => prevPrice + flowerPrice);
      setCustomBouquetPrice(prevPrice => prevPrice + flowerPrice);
    }

    // Reset selection states
    setSelectedFlowerType(null);
    setSelectedFlowerColor(null);
    setQuantity(1);
    
    // Update preview
    if (selectedFlowers.length === 0) {
      setCustomBouquetPreview(colorOption.image);
    } else {
      updateCustomBouquetPreview();
    }
  };

  // Add delete flower function
  const handleDeleteFlower = (flowerId) => {
    const flowerToDelete = selectedFlowers.find(f => f.id === flowerId);
    if (flowerToDelete) {
      const updatedFlowers = selectedFlowers.filter(flower => flower.id !== flowerId);
      setSelectedFlowers(updatedFlowers);
      
      // Update total price
      setTotalPrice(prevPrice => Math.max(0, prevPrice - flowerToDelete.price));
      setCustomBouquetPrice(prevPrice => Math.max(0, prevPrice - flowerToDelete.price));
      
      // Update preview if there are still flowers, otherwise clear it
      if (updatedFlowers.length > 0) {
        setCustomBouquetPreview(updatedFlowers[0].image);
      } else {
        setCustomBouquetPreview(null);
      }
    }
  };

  // Handle wrapper color selection
  const handleWrapperSelect = (wrapper) => {
    // If there was a previous wrapper, subtract its price first
    const prevWrapperPrice = selectedItems.wrapper?.price || 0;
    
    setSelectedColor(wrapper.id);
    setSelectedItems(prev => ({
      ...prev,
      wrapper: {
        name: wrapper.name,
        color: wrapper.color,
        price: wrapper.price
      }
    }));
    // Update total price by removing previous wrapper price and adding new one
    setTotalPrice(prevPrice => prevPrice - prevWrapperPrice + wrapper.price);
    setCustomBouquetPrice(prevPrice => prevPrice - prevWrapperPrice + wrapper.price);
  };

  // Handle wrapping selection
  const handleWrappingSelect = (wrapping) => {
    // If there was a previous wrapping, subtract its price first
    const prevWrappingPrice = selectedItems.wrapping?.price || 0;
    
    setSelectedItems(prev => ({
      ...prev,
      wrapping: {
        name: wrapping.name,
        price: wrapping.price,
        image: wrapping.image
      }
    }));
    // Update total price by removing previous wrapping price and adding new one
    setTotalPrice(prevPrice => prevPrice - prevWrappingPrice + wrapping.price);
    setCustomBouquetPrice(prevPrice => prevPrice - prevWrappingPrice + wrapping.price);
    updateCustomBouquetPreview();
  };

  // Handle ribbon selection
  const handleRibbonSelect = (ribbon) => {
    // If there was a previous ribbon, subtract its price first
    const prevRibbonPrice = selectedItems.ribbon?.price || 0;
    
    setSelectedItems(prev => ({
      ...prev,
      ribbon: {
        name: ribbon.name,
        price: ribbon.price,
        image: ribbon.image
      }
    }));
    // Update total price by removing previous ribbon price and adding new one
    setTotalPrice(prevPrice => prevPrice - prevRibbonPrice + ribbon.price);
    setCustomBouquetPrice(prevPrice => prevPrice - prevRibbonPrice + ribbon.price);
    updateCustomBouquetPreview();
  };

  // Handle card selection
  const handleCardSelect = (card) => {
    // If there was a previous card, subtract its price first
    const prevCardPrice = selectedItems.card?.price || 0;
    
    setSelectedItems(prev => ({
      ...prev,
      card: {
        name: card.name,
        price: card.price,
        image: card.image
      }
    }));
    // Update total price by removing previous card price and adding new one
    setTotalPrice(prevPrice => prevPrice - prevCardPrice + card.price);
    setCustomBouquetPrice(prevPrice => prevPrice - prevCardPrice + card.price);
    updateCustomBouquetPreview();
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setTotalPrice(uploadedImagePrice);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update custom bouquet preview
  const updateCustomBouquetPreview = () => {
    if (selectedFlowers.length > 0) {
      setCustomBouquetPreview(selectedFlowers[0].image);
    } else {
      setCustomBouquetPreview(null);
    }
  };

  // Handle add to cart for uploaded image
  const handleUploadedBouquetAddToCart = () => {
    if (!uploadedImage) return;

    const uploadedBouquet = {
      id: Date.now(),
      name: 'Custom Uploaded Bouquet',
      price: uploadedImagePrice,
      image: uploadedImage,
      quantity: 1,
      isUploaded: true
    };
    setCartItems([...cartItems, uploadedBouquet]);
    alert('Custom uploaded bouquet added to cart!');
    
    // Clear only upload related states
    setUploadedImage(null);
    setTotalPrice(customBouquetPrice);
  };

  // Handle add to cart for custom bouquet
  const handleCustomBouquetAddToCart = () => {
    if (selectedFlowers.length === 0 || !selectedColor) {
      alert('Please select at least one flower and a wrap color');
      return;
    }

    const customBouquet = {
      id: Date.now(),
      name: 'Custom Bouquet',
      price: customBouquetPrice,
      image: aiGeneratedImage || selectedFlowers[0].image,
      quantity: 1,
      customizations: {
        flowers: selectedFlowers,
        wrapper: selectedItems.wrapper,
        wrapping: selectedItems.wrapping,
        ribbon: selectedItems.ribbon,
        card: selectedItems.card,
        shape: selectedShape,
        aiGenerated: !!aiGeneratedImage
      },
      details: [
        ...selectedFlowers.map(flower => ({
          label: 'Flowers',
          value: `${flower.name} (${flower.quantity})`
        })),
        selectedShape ? { label: 'Shape', value: selectedShape.name } : null,
        { label: 'Wrap', value: selectedItems.wrapper.name },
        { label: 'Wrapping', value: selectedItems.wrapping?.name },
        { label: 'Ribbon', value: selectedItems.ribbon?.name },
        { label: 'Card', value: selectedItems.card?.name },
      ].filter(item => item && item.value)
    };

    setCartItems(prevCartItems => [...prevCartItems, customBouquet]);
    alert('Custom bouquet added to cart!');
    
    // Clear all selections after adding to cart
    setSelectedItems({});
    setSelectedColor(null);
    setSelectedFlowerColor(null);
    setSelectedFlowerType(null);
    setSelectedFlowers([]);
    setSelectedShape(null);
    setAiGeneratedImage(null);
    setQuantity(1);
    setCustomBouquetPreview(null);
    
    // Reset prices to 0
    setTotalPrice(0);
    setCustomBouquetPrice(0);
  };

  // Add delete handlers for each product type
  const handleDeleteWrap = () => {
    const wrapPrice = selectedItems.wrapper?.price || 0;
    setSelectedColor(null);
    setSelectedItems(prev => ({
      ...prev,
      wrapper: null
    }));
    setTotalPrice(prevPrice => Math.max(0, prevPrice - wrapPrice));
    setCustomBouquetPrice(prevPrice => Math.max(0, prevPrice - wrapPrice));
  };

  const handleDeleteWrapping = () => {
    const wrappingPrice = selectedItems.wrapping?.price || 0;
    setSelectedItems(prev => ({
      ...prev,
      wrapping: null
    }));
    setTotalPrice(prevPrice => Math.max(0, prevPrice - wrappingPrice));
    setCustomBouquetPrice(prevPrice => Math.max(0, prevPrice - wrappingPrice));
  };

  const handleDeleteRibbon = () => {
    const ribbonPrice = selectedItems.ribbon?.price || 0;
    setSelectedItems(prev => ({
      ...prev,
      ribbon: null
    }));
    setTotalPrice(prevPrice => Math.max(0, prevPrice - ribbonPrice));
    setCustomBouquetPrice(prevPrice => Math.max(0, prevPrice - ribbonPrice));
  };

  const handleDeleteCard = () => {
    const cardPrice = selectedItems.card?.price || 0;
    setSelectedItems(prev => ({
      ...prev,
      card: null
    }));
    setTotalPrice(prevPrice => Math.max(0, prevPrice - cardPrice));
    setCustomBouquetPrice(prevPrice => Math.max(0, prevPrice - cardPrice));
  };

  // Handle shape selection
  const handleShapeSelect = (shape) => {
    // If there was a previous shape, subtract its price
    const prevShapePrice = selectedShape?.price || 0;
    
    setSelectedShape(shape);
    // Update total price
    setTotalPrice(prevPrice => prevPrice - prevShapePrice + shape.price);
    setCustomBouquetPrice(prevPrice => prevPrice - prevShapePrice + shape.price);
    updateCustomBouquetPreview();
  };

  // Handle AI image generation
  const generateAIBouquet = async () => {
    if (selectedFlowers.length === 0) {
      alert('Please select at least one flower first');
      return;
    }

    setIsGeneratingAI(true);
    
    // Build AI prompt based on selections
    const flowerNames = selectedFlowers.map(flower => `${flower.quantity} ${flower.name}`).join(', ');
    const wrapperInfo = selectedItems.wrapper ? ` wrapped in ${selectedItems.wrapper.name}` : '';
    const wrappingInfo = selectedItems.wrapping ? ` with ${selectedItems.wrapping.name}` : '';
    const ribbonInfo = selectedItems.ribbon ? ` tied with ${selectedItems.ribbon.name}` : '';
    const shapeInfo = selectedShape ? ` in a ${selectedShape.name}` : '';
    
    const prompt = `Beautiful bouquet with ${flowerNames}${wrapperInfo}${wrappingInfo}${ribbonInfo}${shapeInfo}`;
    
    console.log("AI Prompt:", prompt);
    
    // Simulate API call with timeout
    try {
      // In a real application, this would be an actual API call
      // const response = await fetch('/api/generate-ai-bouquet', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt })
      // });
      // const data = await response.json();
      
      // Simulate API response delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate response with sample image URLs based on selections
      let imageUrl = 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?q=80&w=2074&auto=format&fit=crop'; // Default

      if (selectedFlowers.length > 0) {
        if (selectedShape?.id === 'heart') {
          imageUrl = 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop';
        } else if (selectedShape?.id === 'cascade') {
          imageUrl = 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop';
        } else {
          // Round or default
          imageUrl = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop';
        }
      }
      
      setAiGeneratedImage(imageUrl);
    } catch (error) {
      console.error("Error generating AI bouquet:", error);
      alert("Failed to generate AI bouquet. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Build Your Bouquet</h1>
          <p className="mt-2 text-lg text-gray-600">Create your perfect arrangement with our custom bouquet builder</p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Options */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab('flowers')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'flowers' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Flowers
              </button>
              <button
                onClick={() => setActiveTab('wrap')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'wrap' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Wrap
              </button>
              <button
                onClick={() => setActiveTab('wrapping')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'wrapping' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Wrapping
              </button>
              <button
                onClick={() => setActiveTab('ribbons')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'ribbons' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Ribbons
              </button>
              <button
                onClick={() => setActiveTab('cards')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'cards' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setActiveTab('shapes')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'shapes' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Shapes
              </button>
            </div>

            {/* Content based on active tab */}
            <div className="mb-6">
              {activeTab === 'flowers' && (
                <div>
                  {/* Flower Types */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(flowerTypes).map(([id, flower]) => (
                      <motion.div
                        key={id}
                        whileHover={{ scale: 1.05 }}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                          selectedFlowerType?.name === flower.name
                            ? 'border-primary'
                            : 'border-transparent'
                        }`}
                        onClick={() => handleFlowerTypeSelect(flower)}
                      >
                        <div className="h-24 overflow-hidden">
                          <img
                            src={flower.colors ? flower.colors[0].image : flower.image}
                            alt={flower.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2 text-center bg-white">
                          <p className="text-sm font-medium text-gray-900">{flower.name}</p>
                          <p className="text-xs text-primary">From ${flower.basePrice}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Color Options for Selected Flower */}
                  {selectedFlowerType?.colors && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Select Color</h4>
                      <div className="grid grid-cols-4 gap-3">
                        {selectedFlowerType.colors.map((colorOption) => (
                          <motion.div
                            key={colorOption.id}
                            whileHover={{ scale: 1.05 }}
                            className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                              selectedFlowerColor?.id === colorOption.id
                                ? 'border-primary'
                                : 'border-transparent'
                            }`}
                            onClick={() => handleFlowerColorSelect(selectedFlowerType, colorOption)}
                          >
                            <div className="h-16 overflow-hidden">
                              <img
                                src={colorOption.image}
                                alt={colorOption.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-2 text-center bg-white">
                              <p className="text-xs font-medium text-gray-900">{colorOption.name}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wrap' && (
                <div className="grid grid-cols-3 gap-4">
                  {wrapColors.map(wrap => (
                    <motion.div
                      key={wrap.id}
                      whileHover={{ scale: 1.05 }}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedColor === wrap.id ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => handleWrapperSelect(wrap)}
                    >
                      <div className="h-24" style={{ backgroundColor: wrap.color }}></div>
                      <div className="p-2 text-center bg-white">
                        <p className="text-sm font-medium text-gray-900">{wrap.name}</p>
                        <p className="text-xs text-primary">${wrap.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'wrapping' && (
                <div className="grid grid-cols-3 gap-4">
                  {wrappingOptions.map(wrapping => (
                    <motion.div
                      key={wrapping.id}
                      whileHover={{ scale: 1.05 }}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedItems.wrapping?.id === wrapping.id
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                      onClick={() => handleWrappingSelect(wrapping)}
                    >
                      <div className="h-24 overflow-hidden">
                        <img
                          src={wrapping.image}
                          alt={wrapping.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 text-center bg-white">
                        <p className="text-sm font-medium text-gray-900">{wrapping.name}</p>
                        <p className="text-xs text-primary">${wrapping.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'ribbons' && (
                <div className="grid grid-cols-3 gap-4">
                  {ribbonOptions.map(ribbon => (
                    <motion.div
                      key={ribbon.id}
                      whileHover={{ scale: 1.05 }}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedItems.ribbon?.id === ribbon.id
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                      onClick={() => handleRibbonSelect(ribbon)}
                    >
                      <div className="h-24 overflow-hidden">
                        <img
                          src={ribbon.image}
                          alt={ribbon.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 text-center bg-white">
                        <p className="text-sm font-medium text-gray-900">{ribbon.name}</p>
                        <p className="text-xs text-primary">${ribbon.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'cards' && (
                <div className="grid grid-cols-3 gap-4">
                  {cardOptions.map(card => (
                    <motion.div
                      key={card.id}
                      whileHover={{ scale: 1.05 }}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedItems.card?.id === card.id
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                      onClick={() => handleCardSelect(card)}
                    >
                      <div className="h-24 overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 text-center bg-white">
                        <p className="text-sm font-medium text-gray-900">{card.name}</p>
                        <p className="text-xs text-primary">${card.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'shapes' && (
                <div className="grid grid-cols-3 gap-4">
                  {shapeOptions.map(shape => (
                    <motion.div
                      key={shape.id}
                      whileHover={{ scale: 1.05 }}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                        selectedShape?.id === shape.id
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                      onClick={() => handleShapeSelect(shape)}
                    >
                      <div className="h-24 overflow-hidden">
                        <img
                          src={shape.image}
                          alt={shape.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 text-center bg-white">
                        <p className="text-sm font-medium text-gray-900">{shape.name}</p>
                        <p className="text-xs text-primary">${shape.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity Selection */}
            {activeTab === 'flowers' && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Preview and Upload */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Create Your Custom Bouquet Preview */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Create Your Custom Bouquet</h3>
              
              {/* AI Bouquet Generation Button */}
              {selectedFlowers.length > 0 && !isGeneratingAI && !aiGeneratedImage && (
                <button
                  onClick={generateAIBouquet}
                  className="w-full mb-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Generate AI Bouquet Image
                </button>
              )}
              
              {/* Loading Spinner */}
              {isGeneratingAI && (
                <div className="flex items-center justify-center mb-4 py-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-2 text-primary font-medium">Generating your bouquet...</span>
                </div>
              )}
              
              {/* Display AI-generated image if available */}
              {aiGeneratedImage && (
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="relative">
                    <img
                      src={aiGeneratedImage}
                      alt="AI Generated Bouquet"
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      onClick={() => setAiGeneratedImage(null)}
                      className="absolute top-2 right-2 bg-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-200"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-2 left-2 bg-primary text-white px-2 py-1 rounded-lg text-xs">
                      AI Generated
                    </div>
                  </div>
                </div>
              )}
              
              {/* Regular Bouquet Preview */}
              <div className="bg-gray-100 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                {customBouquetPreview ? (
                  <div className="text-center w-full">
                    <div className="relative mx-auto" style={{ width: '250px', height: '250px' }}>
                      {/* Main flower images */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {selectedFlowers.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2">
                            {selectedFlowers.map(flower => (
                              <div key={flower.id} className="relative group">
                                <img
                                  src={flower.image}
                                  alt={flower.name}
                                  className="max-h-24 object-contain"
                                />
                                <span className="absolute bottom-0 right-0 bg-white bg-opacity-75 px-1 text-xs">
                                  x{flower.quantity}
                                </span>
                            <button
                                  onClick={() => handleDeleteFlower(flower.id)}
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                        ) : (
                          <p className="text-sm text-gray-500">
                            Select flowers to create your custom bouquet
                          </p>
                        )}
                    </div>
                    </div>

                    {/* Selections text */}
                    <div className="mt-4 space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        {selectedFlowers.length > 0 ? selectedFlowers[0].name : ''} Bouquet
                      </p>
                      {selectedShape && (
                        <p className="text-sm text-gray-600">
                          Shape: {selectedShape.name}
                        </p>
                      )}
                      {selectedItems.wrapper && (
                        <p className="text-sm text-gray-600">
                          Wrap: {selectedItems.wrapper.name}
                        </p>
                      )}
                      {selectedItems.wrapping && (
                        <p className="text-sm text-gray-600">
                          Wrapping: {selectedItems.wrapping.name}
                        </p>
                      )}
                      {selectedItems.ribbon && (
                        <p className="text-sm text-gray-600">
                          Ribbon: {selectedItems.ribbon.name}
                        </p>
                      )}
                      {selectedItems.card && (
                        <p className="text-sm text-gray-600">
                          Card: {selectedItems.card.name}
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-medium text-primary mt-2">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Select flowers to create your custom bouquet
                  </p>
                )}
                  </div>
                </div>

            {/* Image Upload */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Upload Your Bouquet Image</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  {uploadedImage ? (
                    <div className="text-center">
                      <img
                        src={uploadedImage}
                        alt="Uploaded bouquet"
                        className="max-h-48 object-contain mb-4"
                      />
                      <p className="text-sm text-primary font-medium">
                        Price: ${uploadedImagePrice.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="w-12 h-12 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">
                        Click to upload a reference image
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Items Summary */}
        {!uploadedImage && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Your Selections</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {selectedFlowers.map(flower => (
                <div key={flower.id} className="flex justify-between items-center">
                  <p>
                    {flower.name} (Quantity: {flower.quantity})
                  </p>
                  <button
                    onClick={() => handleDeleteFlower(flower.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {selectedShape && (
                <div className="flex justify-between items-center">
                  <p>Shape: {selectedShape.name}</p>
                  <button
                    onClick={() => {
                      const shapePrice = selectedShape.price || 0;
                      setSelectedShape(null);
                      setTotalPrice(prevPrice => Math.max(0, prevPrice - shapePrice));
                      setCustomBouquetPrice(prevPrice => Math.max(0, prevPrice - shapePrice));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
              {selectedColor && (
                <div className="flex justify-between items-center">
                  <p>Wrap: {wrapColors.find(w => w.id === selectedColor)?.name}</p>
                  <button
                    onClick={handleDeleteWrap}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
              {selectedItems.wrapping && (
                <div className="flex justify-between items-center">
                  <p>Wrapping: {selectedItems.wrapping.name}</p>
                  <button
                    onClick={handleDeleteWrapping}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
              {selectedItems.ribbon && (
                <div className="flex justify-between items-center">
                  <p>Ribbon: {selectedItems.ribbon.name}</p>
                  <button
                    onClick={handleDeleteRibbon}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
              {selectedItems.card && (
                <div className="flex justify-between items-center">
                  <p>Card: {selectedItems.card.name}</p>
                  <button
                    onClick={handleDeleteCard}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Total and Add to Cart */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-primary">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Add to Cart button for uploaded bouquet */}
          {uploadedImage && (
            <button
              onClick={handleUploadedBouquetAddToCart}
              className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark mb-4"
            >
              Add Uploaded Bouquet to Cart
            </button>
          )}
          
          {/* Add to Cart button for custom bouquet */}
          {!uploadedImage && (
            <button
              onClick={handleCustomBouquetAddToCart}
              disabled={selectedFlowers.length === 0 || !selectedColor}
              className={`w-full py-3 rounded-lg text-white font-medium ${
                (selectedFlowers.length > 0 && selectedColor)
                  ? 'bg-primary hover:bg-primary-dark'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Add Custom Bouquet to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Add these styles to your CSS
const styles = `
  .paper-wrap {
    background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
    border-radius: 0.5rem;
  }
  
  .tissue-wrap {
    background: linear-gradient(45deg, #fce7f3, #fbcfe8);
    border-radius: 0.5rem;
  }
  
  .cellophane-wrap {
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid #f3f4f6;
    border-radius: 0.5rem;
  }
  
  .kraft-wrap {
    background: linear-gradient(45deg, #fef3c7, #fde68a);
    border-radius: 0.5rem;
  }
  
  .burlap-wrap {
    background: linear-gradient(45deg, #d1d5db, #9ca3af);
    border-radius: 0.5rem;
  }
  
  .metallic-wrap {
    background: linear-gradient(45deg, #d1d5db, #9ca3af);
    border-radius: 0.5rem;
  }
`;

export default CustomBouquet; 