import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  // 🚨 Reset products & pagination when category/sort changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setVisibleProducts([]);
    setHasMore(true);
  }, [activeCategory, sortBy]);

  // ✅ Fetch products when page/category/sort changes
  useEffect(() => {
    fetchProducts();
  }, [page, activeCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      const params = {
        category: activeCategory !== 'all' ? activeCategory : undefined,
        page,
        limit,
        sort: sortBy
      };
  
      const response = await axios.get('/api/products')
     
      const fetchedProducts = response.data.products;
  
      if (page === 1) {
        setProducts(fetchedProducts);
      } else {
        setProducts(prev => [...prev, ...fetchedProducts]);
      }
  
      setHasMore(fetchedProducts.length === limit);
      setIsLoaded(false);
      setVisibleProducts([]);
      setTimeout(() => setIsLoaded(true), 100);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  

  // ⏱ Progressive reveal animation
  useEffect(() => {
    if (isLoaded && products.length > 0) {
      const showProducts = async () => {
        setVisibleProducts([]);
        for (let i = 0; i < products.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setVisibleProducts(prev => [...prev, products[i]._id]);
        }
      };
      showProducts();
    }
  }, [isLoaded, products]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return; // avoid double load
    setActiveCategory(categoryId);
    navigate(categoryId === 'all' ? '/products' : `/products/${categoryId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (productId) => {
    setFavorites(favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId]);
  };

  const loadMore = () => {
    if (hasMore) setPage(prev => prev + 1);
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 slide-up">
          <h1 className="text-3xl font-bold text-gray-900">
            {activeCategory === 'all'
              ? 'All Products'
              : categories.find(cat => cat.id === activeCategory)?.name || 'Products'}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover our collection of beautiful {activeCategory === 'all' ? 'products' : activeCategory}
          </p>
        </div>

        {/* Category & Sort Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 slide-up" style={{ animationDelay: '0.1s' }}>
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

          <div className="flex items-center slide-in-right" style={{ animationDelay: '0.2s' }}>
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product._id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-500 hover-grow ${visibleProducts.includes(product._id) ? 'fade-in' : 'opacity-0'}`}
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
                    onClick={() => toggleFavorite(product._id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-pink-500 ${favorites.includes(product._id) ? 'scale-125' : ''}`} fill={favorites.includes(product._id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors duration-300">
                    <Link to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                </div>
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
                <div className="mt-4">
                  <Link to={`/product/${product._id}`}>
                    <button className="btn-primary w-full text-sm hover-float">View Details</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-8">
            <button onClick={loadMore} className="btn-primary px-6 py-2 text-sm hover-float">
              Load More
            </button>
          </div>
        )}

        {/* No Products Fallback */}
        {products.length === 0 && (
          <div className="text-center py-12 fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        )}

        {/* Back to Top */}
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
