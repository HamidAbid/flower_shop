import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Sample occasion-specific products
const occasionProducts = {
  birthday: [
    {
      id: 1,
      name: 'Birthday Bouquet',
      price: 59.99,
      image: 'http://localhost:3000/img/iiii.jpg',
      description: 'A vibrant and cheerful bouquet perfect for birthdays'
    },
    {
      id: 2,
      name: 'Birthday Gift Basket',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1372&auto=format&fit=crop',
      description: 'A delightful gift basket with chocolates and flowers'
    }
  ],
  anniversary: [
    {
      id: 3,
      name: 'Romantic Rose Bouquet',
      price: 69.99,
      image: 'http://localhost:3000/img/romantic.WEBP',
      description: 'Elegant roses arranged for your special anniversary'
    },
    {
      id: 4,
      name: 'Anniversary Gift Set',
      price: 89.99,
      image: 'http://localhost:3000/img/aniversary.WEBP',
      description: 'A luxurious gift set perfect for celebrating love'
    }
  ],
  wedding: [
    {
      id: 5,
      name: 'Bridal Bouquet',
      price: 99.99,
      image: 'http://localhost:3000/img/bridal.jpg',
      description: 'Elegant bridal bouquet for your special day'
    },
    {
      id: 6,
      name: 'Wedding Centerpiece',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1469&auto=format&fit=crop',
      description: 'Beautiful centerpiece for wedding tables'
    }
  ],
  sympathy: [
    {
      id: 7,
      name: 'Sympathy Bouquet',
      price: 59.99,
      image: 'http://localhost:3000/img/symphaty.WEBP',
      description: 'A thoughtful arrangement to express sympathy'
    },
    {
      id: 8,
      name: 'Memorial Wreath',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1469&auto=format&fit=crop',
      description: 'A beautiful wreath to honor and remember'
    }
  ]
};

const occasionTitles = {
  birthday: 'Birthday Flowers & Gifts',
  anniversary: 'Anniversary Flowers & Gifts',
  wedding: 'Wedding Flowers & Decorations',
  sympathy: 'Sympathy Flowers & Arrangements'
};

const occasionDescriptions = {
  birthday: 'Find the perfect flowers and gifts to celebrate birthdays',
  anniversary: 'Romantic arrangements to celebrate your special milestone',
  wedding: 'Beautiful floral arrangements for your wedding day',
  sympathy: 'Thoughtful arrangements to express your condolences'
};

const OccasionPage = () => {
  const { occasion } = useParams();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (occasion && occasionProducts[occasion]) {
      setProducts(occasionProducts[occasion]);
      setTitle(occasionTitles[occasion]);
      setDescription(occasionDescriptions[occasion]);
    }
  }, [occasion]);

  if (!occasion || !occasionProducts[occasion]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Occasion not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-4 text-lg text-gray-600">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  <Link to={`/product/${product.id}`} className="btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OccasionPage; 