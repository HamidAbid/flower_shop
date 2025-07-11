import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../common/ProductCard';
import BlogCard from '../blog/BlogCard';

/**
 * Component for displaying search results
 * @param {Object} props
 * @param {Array} props.results - Search results (products, blogs, etc.)
 * @param {string} props.query - Search query
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onToggleFavorite - Function to toggle favorite product
 * @param {Array} props.favorites - Array of favorite product IDs
 */
const SearchResults = ({ 
  results = {}, 
  query = '', 
  loading = false,
  onToggleFavorite = () => {},
  favorites = []
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const { products = [], blogs = [], events = [] } = results;
  
  // Get total count of all results
  const totalResults = products.length + blogs.length + events.length;
  
  // Get counts for each category
  const tabs = [
    { id: 'all', label: 'All', count: totalResults },
    { id: 'products', label: 'Products', count: products.length },
    { id: 'blogs', label: 'Blog Posts', count: blogs.length },
    { id: 'events', label: 'Events', count: events.length }
  ];
  
  // Filter results based on active tab
  const filteredResults = () => {
    if (activeTab === 'all') return results;
    return {
      [activeTab]: results[activeTab] || [],
      products: activeTab === 'products' ? results.products : [],
      blogs: activeTab === 'blogs' ? results.blogs : [],
      events: activeTab === 'events' ? results.events : []
    };
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Search Results
        </h2>
        <p className="text-gray-600">
          {totalResults > 0 ? (
            <>Found {totalResults} results for "<span className="font-medium">{query}</span>"</>
          ) : (
            <>No results found for "<span className="font-medium">{query}</span>"</>
          )}
        </p>
      </div>
      
      {totalResults > 0 && (
        <>
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex flex-wrap -mb-px">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    mr-6 py-4 px-1 border-b-2 font-medium text-sm flex items-center
                    ${activeTab === tab.id 
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab.label}
                  <span className={`ml-2 rounded-full text-xs px-2 py-0.5 ${activeTab === tab.id ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-600'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="space-y-10">
            {/* Products Section */}
            {(activeTab === 'all' || activeTab === 'products') && filteredResults().products.length > 0 && (
              <section>
                {activeTab === 'all' && (
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Products</h3>
                    {products.length > 3 && (
                      <Link to={`/search?q=${query}&type=products`} className="text-sm text-primary hover:text-primary-dark">
                        View all {products.length} products
                      </Link>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults().products.slice(0, activeTab === 'all' ? 3 : undefined).map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProductCard 
                        product={product}
                        isFavorite={favorites.includes(product.id)}
                        onToggleFavorite={onToggleFavorite}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Blog Posts Section */}
            {(activeTab === 'all' || activeTab === 'blogs') && filteredResults().blogs.length > 0 && (
              <section>
                {activeTab === 'all' && (
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Blog Posts</h3>
                    {blogs.length > 2 && (
                      <Link to={`/search?q=${query}&type=blogs`} className="text-sm text-primary hover:text-primary-dark">
                        View all {blogs.length} posts
                      </Link>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResults().blogs.slice(0, activeTab === 'all' ? 2 : undefined).map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <BlogCard post={blog} index={index} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Events Section */}
            {(activeTab === 'all' || activeTab === 'events') && filteredResults().events.length > 0 && (
              <section>
                {activeTab === 'all' && (
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Events</h3>
                    {events.length > 2 && (
                      <Link to={`/search?q=${query}&type=events`} className="text-sm text-primary hover:text-primary-dark">
                        View all {events.length} events
                      </Link>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResults().events.slice(0, activeTab === 'all' ? 2 : undefined).map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="relative h-48 overflow-hidden">
                        {event.image ? (
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <h4 className="text-white font-bold text-lg">{event.title}</h4>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-3 text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          {event.time && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{event.time}</span>
                            </>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                        <Link 
                          to={`/events/${event.id}`}
                          className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center"
                        >
                          View Details
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      )}
      
      {totalResults === 0 && !loading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            We couldn't find any matches for "{query}". Please try a different search term or browse our categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults; 