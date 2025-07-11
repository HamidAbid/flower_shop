import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Sample product data
const allProducts = {
  flowers: [
    {
      id: '1',
      name: 'Spring Bliss Bouquet',
      price: 59.99,
      image: 'http://localhost:3000/img/bouquet.WEBP',
      category: 'flowers',
      description: 'A vibrant arrangement of seasonal spring flowers in soft pastel colors.'
    },
    {
      id: '2',
      name: 'Rose Garden Bouquet',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
      category: 'flowers',
      description: 'Classic arrangement of premium roses in various colors with greenery.'
    },
    {
      id: '3',
      name: 'Elegant Lily Arrangement',
      price: 64.99,
      image: 'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=1470&auto=format&fit=crop',
      category: 'flowers',
      description: 'Sophisticated arrangement of fragrant lilies with complementary blooms.'
    },
    {
      id: '4',
      name: 'Wildflower Meadow Bouquet',
      price: 54.99,
      image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=1470&auto=format&fit=crop',
      category: 'flowers',
      description: 'Rustic arrangement of colorful wildflowers for a natural, countryside feel.'
    },
    {
      id: '5',
      name: 'Peaceful Orchid Display',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?q=80&w=1374&auto=format&fit=crop',
      category: 'flowers',
      description: 'Elegant arrangement featuring exotic orchids in a modern container.'
    },
    {
      id: '6',
      name: 'Sunflower Sunshine Bouquet',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?q=80&w=1374&auto=format&fit=crop',
      category: 'flowers',
      description: 'Bright and cheerful bouquet of sunflowers mixed with seasonal fillers.'
    }
  ],
  gifts: [
    {
      id: '7',
      name: 'Chocolate Delight Gift Basket',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1372&auto=format&fit=crop',
      category: 'gifts',
      description: 'Luxurious gift basket filled with premium chocolates and sweet treats.'
    },
    {
      id: '8',
      name: 'Spa Relaxation Basket',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop',
      category: 'gifts',
      description: 'Pampering gift set with bath bombs, lotions, and relaxation essentials.'
    },
    {
      id: '9',
      name: 'Gourmet Food Hamper',
      price: 99.99,
      image: 'http://localhost:3000/img/gourmet.WEBP',
      category: 'gifts',
      description: 'Selection of fine cheeses, crackers, jams, and other gourmet delicacies.'
    },
    {
      id: '10',
      name: 'Wine & Cheese Collection',
      price: 109.99,
      image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=1374&auto=format&fit=crop',
      category: 'gifts',
      description: 'Elegant gift basket featuring selected wines paired with artisanal cheeses.'
    }
  ],
  chocolates: [
    {
      id: '11',
      name: 'Luxury Chocolate Box',
      price: 39.99,
      image: 'http://localhost:3000/img/luxary.WEBP',
      category: 'chocolates',
      description: 'Assortment of handcrafted premium chocolates in an elegant gift box.'
    },
    {
      id: '12',
      name: 'Chocolate Truffles Collection',
      price: 34.99,
      image: 'http://localhost:3000/img/choclate.WEBP',
      category: 'chocolates',
      description: 'Decadent chocolate truffles in various flavors, handmade by expert chocolatiers.'
    },
    {
      id: '13',
      name: 'Chocolate Covered Strawberries',
      price: 29.99,
      image: 'http://localhost:3000/img/strawberry.WEBP',
      category: 'chocolates',
      description: 'Fresh strawberries hand-dipped in premium dark, milk, and white chocolate.'
    }
  ],
  cards: [
    {
      id: '14',
      name: 'Handcrafted Birthday Card',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop',
      category: 'cards',
      description: 'Beautifully crafted birthday card with elegant design and heartfelt message.'
    },
    {
      id: '15',
      name: 'Anniversary Card Collection',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop',
      category: 'cards',
      description: 'Set of premium anniversary cards with romantic messages and designs.'
    },
    {
      id: '16',
      name: 'Thank You Cards Set',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop',
      category: 'cards',
      description: 'Pack of elegant thank you cards with envelopes, perfect for expressing gratitude.'
    }
  ]
};

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'flowers', name: 'Flowers' },
  { id: 'gifts', name: 'Gift Baskets' },
  { id: 'chocolates', name: 'Chocolates' },
  { id: 'cards', name: 'Cards' }
];

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Prepare products based on category
  useEffect(() => {
    if (category) {
      setActiveCategory(category);
    }
    
    let filteredProducts = [];
    if (activeCategory === 'all') {
      // Get all products from all categories
      Object.values(allProducts).forEach(categoryProducts => {
        filteredProducts = [...filteredProducts, ...categoryProducts];
      });
    } else if (allProducts[activeCategory]) {
      filteredProducts = allProducts[activeCategory];
    }
    
    // Apply sorting
    let sortedProducts = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // 'featured' - no need to sort
        break;
    }
    
    setProducts(sortedProducts);
    
    // Reset visible products for animation
    setVisibleProducts([]);
    setIsLoaded(false);
    
    // Set a short delay before showing animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, [activeCategory, sortBy, category]);
  
  // Progressive loading effect for products
  useEffect(() => {
    if (isLoaded && products.length > 0) {
      const showProducts = async () => {
        // Reset visible products
        setVisibleProducts([]);
        
        // Add products one by one with a small delay
        for (let i = 0; i < products.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setVisibleProducts(prev => [...prev, products[i].id]);
        }
      };
      
      showProducts();
    }
  }, [isLoaded, products]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Update the URL to reflect the category
    if (categoryId === 'all') {
      navigate('/products');
    } else {
      navigate(`/products/${categoryId}`);
    }
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Toggle favorite for products
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 slide-up">
          <h1 className="text-3xl font-bold text-gray-900">
            {activeCategory === 'all' ? 'All Products' : 
              categories.find(cat => cat.id === activeCategory)?.name || 'Products'}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover our collection of beautiful {activeCategory === 'all' ? 'products' : activeCategory} for every occasion
          </p>
        </div>

        {/* Category and Sorting Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 slide-up" style={{animationDelay: '0.1s'}}>
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          {/* Sorting */}
          <div className="flex items-center slide-in-right" style={{animationDelay: '0.2s'}}>
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md text-sm p-2 bg-white transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-500 hover-grow ${visibleProducts.includes(product.id) ? 'fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className="h-64 overflow-hidden relative hover-shine">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-2 right-2 z-10">
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 text-pink-500 transition-all duration-300 ${favorites.includes(product.id) ? 'scale-125' : ''}`}
                      fill={favorites.includes(product.id) ? "currentColor" : "none"} 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                {/* Badge for category */}
                <div className="absolute top-2 left-2">
                  <span className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors duration-300">
                    <Link to={`/product/${product.id}`} className="hover:text-primary">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                </div>
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
                <div className="mt-4">
                  <Link to={`/product/${product.id}`} className="block">
                    <button className="btn-primary w-full text-sm hover-float">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No Products Message */}
        {products.length === 0 && (
          <div className="text-center py-12 fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        )}
        
        {/* Back to top button */}
        <div className="text-center mt-10">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-primary border border-primary rounded-full p-3 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products; 