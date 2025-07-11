import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../App';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa';

// Sample product data (in a real app, this would come from a database/API)
const productsData = [
  {
    id: '1',
    name: 'Spring Bliss Bouquet',
    price: 59.99,
    description: 'A vibrant arrangement of seasonal spring flowers in soft pastel colors.',
    details: 'This stunning bouquet features a mix of seasonal spring blooms including tulips, daffodils, and hyacinths, carefully arranged with fresh greenery for a natural, garden-fresh look. Perfect for bringing the beauty of spring indoors.',
    images: [
      'http://localhost:3000/img/bouquet.WEBP',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=1470&auto=format&fit=crop'
    ],
    specifications: [
      { name: 'Number of Flowers', value: '15-20 Stems' },
      { name: 'Color', value: 'Mixed Pastels' },
      { name: 'Size', value: 'Medium' },
      { name: 'Vase', value: 'Not Included (Available as Add-on)' },
      { name: 'Care', value: 'Lasts 7-10 days with proper care' }
    ],
    features: [
      'Seasonal spring flowers',
      'Fresh, natural arrangement',
      'Includes care instructions',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Sarah M.', rating: 5, date: '2023-05-15', comment: 'Absolutely beautiful! The flowers were fresh and lasted for over a week.' },
      { id: 2, author: 'John D.', rating: 4, date: '2023-04-22', comment: 'Great quality flowers. My wife loved them. Would order again.' },
      { id: 3, author: 'Lisa K.', rating: 5, date: '2023-03-30', comment: 'Stunning arrangement. Delivery was prompt and the flowers were even better than the pictures.' }
    ],
    relatedProducts: ['2', '3', '4']
  },
  {
    id: '2',
    name: 'Rose Garden Bouquet',
    price: 49.99,
    description: 'Classic arrangement of premium roses in various colors with greenery.',
    details: 'This elegant bouquet features 12 premium roses in a mix of colors, carefully arranged with fresh greenery and baby\'s breath. Each rose is hand-selected for quality and freshness, creating a timeless and romantic arrangement.',
    images: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
      'http://localhost:3000/img/garden.WEBP',
      'http://localhost:3000/img/rose.WEBP'
    ],
    specifications: [
      { name: 'Number of Flowers', value: '12 Roses' },
      { name: 'Color', value: 'Mixed Colors' },
      { name: 'Size', value: 'Medium' },
      { name: 'Vase', value: 'Not Included (Available as Add-on)' },
      { name: 'Care', value: 'Lasts 7-10 days with proper care' }
    ],
    features: [
      'Premium quality roses',
      'Mixed color arrangement',
      'Includes card for personal message',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Amanda J.', rating: 5, date: '2023-05-02', comment: 'The roses were absolutely stunning! Perfect for my anniversary.' },
      { id: 2, author: 'Michael T.', rating: 5, date: '2023-04-18', comment: 'Ordered for my wife\'s birthday and she loved them. Great quality!' },
      { id: 3, author: 'Patricia L.', rating: 4, date: '2023-03-27', comment: 'Beautiful arrangement. Only giving 4 stars because one rose was slightly damaged, but overall very nice.' }
    ],
    relatedProducts: ['1', '3', '5']
  },
  {
    id: '3',
    name: 'Elegant Lily Arrangement',
    price: 64.99,
    description: 'Sophisticated arrangement of fragrant lilies with complementary blooms.',
    details: 'This luxurious arrangement features 5 premium oriental lilies, carefully arranged with complementary flowers and fresh greenery. The lilies will gradually open over several days, providing a long-lasting display of beauty and fragrance.',
    images: [
      'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591710668263-bee1e9db2a26?q=80&w=1374&auto=format&fit=crop',
      'http://localhost:3000/img/lilly.WEBP'
    ],
    specifications: [
      { name: 'Number of Flowers', value: '5 Lilies + Fillers' },
      { name: 'Color', value: 'White & Pink' },
      { name: 'Size', value: 'Large' },
      { name: 'Vase', value: 'Not Included (Available as Add-on)' },
      { name: 'Care', value: 'Lasts 7-10 days with proper care' }
    ],
    features: [
      'Premium oriental lilies',
      'Fragrant arrangement',
      'Includes care instructions',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Robert K.', rating: 5, date: '2023-05-10', comment: 'The lilies were absolutely stunning and the fragrance was amazing!' },
      { id: 2, author: 'Emily W.', rating: 5, date: '2023-04-15', comment: 'Such a beautiful arrangement. The lilies opened up beautifully.' },
      { id: 3, author: 'Thomas B.', rating: 4, date: '2023-03-22', comment: 'Nice arrangement. The fragrance was lovely without being overwhelming.' }
    ],
    relatedProducts: ['1', '2', '4']
  },
  {
    id: '4',
    name: 'Wildflower Meadow Bouquet',
    price: 54.99,
    description: 'Rustic arrangement of colorful wildflowers for a natural, countryside feel.',
    details: 'This charming bouquet features a mix of seasonal wildflowers, carefully arranged to create a natural, meadow-inspired look. Perfect for those who love a more casual, garden-fresh style.',
    images: [
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=1470&auto=format&fit=crop'
    ],
    specifications: [
      { name: 'Number of Flowers', value: '20-25 Stems' },
      { name: 'Color', value: 'Mixed Colors' },
      { name: 'Size', value: 'Medium' },
      { name: 'Vase', value: 'Not Included (Available as Add-on)' },
      { name: 'Care', value: 'Lasts 7-10 days with proper care' }
    ],
    features: [
      'Seasonal wildflowers',
      'Natural, rustic arrangement',
      'Includes care instructions',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Jennifer L.', rating: 5, date: '2023-05-12', comment: 'Absolutely beautiful! The wildflowers were fresh and lasted for over a week.' },
      { id: 2, author: 'David M.', rating: 4, date: '2023-04-20', comment: 'Great quality flowers. Perfect for a country-style wedding.' },
      { id: 3, author: 'Rachel S.', rating: 5, date: '2023-03-28', comment: 'Stunning arrangement. The colors were vibrant and the flowers were fresh.' }
    ],
    relatedProducts: ['1', '3', '5']
  },
  {
    id: '5',
    name: 'Peaceful Orchid Display',
    price: 79.99,
    description: 'Elegant arrangement featuring exotic orchids in a modern container.',
    details: 'This sophisticated arrangement features 3 premium phalaenopsis orchids in a modern ceramic container. The orchids are carefully selected for their quality and will provide weeks of beauty with proper care.',
    images: [
      'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=1470&auto=format&fit=crop'
    ],
    specifications: [
      { name: 'Number of Flowers', value: '3 Orchid Plants' },
      { name: 'Color', value: 'White & Purple' },
      { name: 'Size', value: 'Large' },
      { name: 'Container', value: 'Included' },
      { name: 'Care', value: 'Lasts 4-6 weeks with proper care' }
    ],
    features: [
      'Premium phalaenopsis orchids',
      'Modern ceramic container',
      'Includes care instructions',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Sophie R.', rating: 5, date: '2023-05-08', comment: 'The orchids were absolutely stunning! They\'re still blooming beautifully after 3 weeks.' },
      { id: 2, author: 'James H.', rating: 5, date: '2023-04-16', comment: 'Ordered for my wife\'s birthday and she loved them. Great quality!' },
      { id: 3, author: 'Emma W.', rating: 4, date: '2023-03-25', comment: 'Beautiful arrangement. The container is very elegant.' }
    ],
    relatedProducts: ['2', '3', '4']
  },
  {
    id: '6',
    name: 'Sunflower Sunshine Bouquet',
    price: 49.99,
    description: 'Bright and cheerful bouquet of sunflowers mixed with seasonal fillers.',
    details: 'This vibrant bouquet features 5 large sunflowers, carefully arranged with seasonal fillers and fresh greenery. Perfect for bringing sunshine and happiness to any occasion.',
    images: [
      'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=1470&auto=format&fit=crop'
    ],
    specifications: [
      { name: 'Number of Flowers', value: '5 Sunflowers + Fillers' },
      { name: 'Color', value: 'Yellow & Green' },
      { name: 'Size', value: 'Medium' },
      { name: 'Vase', value: 'Not Included (Available as Add-on)' },
      { name: 'Care', value: 'Lasts 7-10 days with proper care' }
    ],
    features: [
      'Large, vibrant sunflowers',
      'Cheerful arrangement',
      'Includes care instructions',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Olivia P.', rating: 5, date: '2023-05-05', comment: 'The sunflowers were absolutely stunning! They brought so much joy to my home.' },
      { id: 2, author: 'William T.', rating: 5, date: '2023-04-12', comment: 'Ordered for my mom\'s birthday and she loved them. Great quality!' },
      { id: 3, author: 'Grace M.', rating: 4, date: '2023-03-20', comment: 'Beautiful arrangement. The sunflowers were huge and vibrant.' }
    ],
    relatedProducts: ['1', '2', '4']
  },
  {
    id: '7',
    name: 'Chocolate Delight Gift Basket',
    price: 79.99,
    description: 'Luxurious gift basket filled with premium chocolates and sweet treats.',
    details: 'This elegant gift basket features a selection of premium chocolates, including truffles, pralines, and chocolate-covered fruits. Perfect for chocolate lovers and special occasions.',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1372&auto=format&fit=crop',
      'http://localhost:3000/img/delight.WEBP',
      'http://localhost:3000/img/basket.AVIF'
    ],
    specifications: [
      { name: 'Contents', value: 'Assorted Chocolates' },
      { name: 'Weight', value: '500g' },
      { name: 'Size', value: 'Medium Basket' },
      { name: 'Packaging', value: 'Elegant Gift Box' },
      { name: 'Shelf Life', value: '2-3 months' }
    ],
    features: [
      'Premium quality chocolates',
      'Elegant gift packaging',
      'Includes personalized card',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Daniel K.', rating: 5, date: '2023-05-15', comment: 'The chocolates were absolutely delicious! Perfect gift for my wife.' },
      { id: 2, author: 'Sophia L.', rating: 5, date: '2023-04-22', comment: 'Ordered for my mom\'s birthday and she loved it. Great quality!' },
      { id: 3, author: 'Benjamin R.', rating: 4, date: '2023-03-30', comment: 'Beautiful presentation. The chocolates were very tasty.' }
    ],
    relatedProducts: ['8', '11', '12']
  },
  {
    id: '8',
    name: 'Spa Relaxation Basket',
    price: 89.99,
    description: 'Pampering gift set with bath bombs, lotions, and relaxation essentials.',
    details: 'This luxurious spa basket features premium bath and body products, including bath bombs, body lotion, scented candles, and other relaxation essentials. Perfect for self-care and pampering.',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1372&auto=format&fit=crop',
      'http://localhost:3000/img/spa.WEBP'
    ],
    specifications: [
      { name: 'Contents', value: 'Bath & Body Products' },
      { name: 'Size', value: 'Large Basket' },
      { name: 'Fragrance', value: 'Lavender & Vanilla' },
      { name: 'Packaging', value: 'Elegant Gift Box' },
      { name: 'Shelf Life', value: '6-12 months' }
    ],
    features: [
      'Premium spa products',
      'Luxurious gift packaging',
      'Includes personalized card',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Isabella M.', rating: 5, date: '2023-05-10', comment: 'The spa basket was absolutely perfect! Everything was high quality.' },
      { id: 2, author: 'Alexander P.', rating: 5, date: '2023-04-18', comment: 'Ordered for my wife\'s birthday and she loved it. Great quality!' },
      { id: 3, author: 'Charlotte W.', rating: 4, date: '2023-03-27', comment: 'Beautiful presentation. The products smell amazing.' }
    ],
    relatedProducts: ['7', '9', '10']
  },
  {
    id: '9',
    name: 'Gourmet Food Hamper',
    price: 99.99,
    description: 'Selection of fine cheeses, crackers, jams, and other gourmet delicacies.',
    details: 'This elegant hamper features a selection of premium gourmet foods, including artisanal cheeses, gourmet crackers, specialty jams, and other delicacies. Perfect for food lovers and special occasions.',
    images: [
      'http://localhost:3000/img/gourmet.WEBP',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1372&auto=format&fit=crop',
      'http://localhost:3000/img/hamper.WEBP'
    ],
    specifications: [
      { name: 'Contents', value: 'Gourmet Food Selection' },
      { name: 'Size', value: 'Large Hamper' },
      { name: 'Storage', value: 'Refrigerate After Opening' },
      { name: 'Packaging', value: 'Elegant Gift Box' },
      { name: 'Shelf Life', value: 'Varies by Product' }
    ],
    features: [
      'Premium gourmet foods',
      'Luxurious gift packaging',
      'Includes personalized card',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Henry B.', rating: 5, date: '2023-05-08', comment: 'The hamper was absolutely delicious! Perfect gift for food lovers.' },
      { id: 2, author: 'Victoria S.', rating: 5, date: '2023-04-16', comment: 'Ordered for my parents\' anniversary and they loved it. Great quality!' },
      { id: 3, author: 'George M.', rating: 4, date: '2023-03-25', comment: 'Beautiful presentation. The cheeses were excellent.' }
    ],
    relatedProducts: ['7', '8', '10']
  },
  {
    id: '10',
    name: 'Wine & Cheese Collection',
    price: 109.99,
    description: 'Elegant gift basket featuring selected wines paired with artisanal cheeses.',
    details: 'This sophisticated collection features two premium wines carefully paired with artisanal cheeses, gourmet crackers, and accompaniments. Perfect for wine enthusiasts and special occasions.',
    images: [
      'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=1374&auto=format&fit=crop',
      'http://localhost:3000/img/wine.WEBP',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1372&auto=format&fit=crop'
    ],
    specifications: [
      { name: 'Contents', value: '2 Wines + Cheese Selection' },
      { name: 'Size', value: 'Large Basket' },
      { name: 'Storage', value: 'Refrigerate After Opening' },
      { name: 'Packaging', value: 'Elegant Gift Box' },
      { name: 'Shelf Life', value: 'Varies by Product' }
    ],
    features: [
      'Premium wine selection',
      'Artisanal cheese pairing',
      'Includes personalized card',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Edward L.', rating: 5, date: '2023-05-12', comment: 'The wine and cheese selection was excellent! Perfect gift for wine lovers.' },
      { id: 2, author: 'Margaret H.', rating: 5, date: '2023-04-20', comment: 'Ordered for my husband\'s birthday and he loved it. Great quality!' },
      { id: 3, author: 'Richard W.', rating: 4, date: '2023-03-28', comment: 'Beautiful presentation. The wine pairings were perfect.' }
    ],
    relatedProducts: ['7', '8', '9']
  },
  {
    id: '11',
    name: 'Luxury Chocolate Box',
    price: 39.99,
    description: 'Assortment of handcrafted premium chocolates in an elegant gift box.',
    details: 'This elegant box features a selection of handcrafted premium chocolates, including truffles, pralines, and chocolate-covered fruits. Each piece is carefully crafted for exceptional taste and presentation.',
    images: [
      'http://localhost:3000/img/luxary.WEBP',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1372&auto=format&fit=crop',
      'http://localhost:3000/img/lxbox.WEBP'
    ],
    specifications: [
      { name: 'Contents', value: 'Assorted Chocolates' },
      { name: 'Weight', value: '300g' },
      { name: 'Size', value: 'Medium Box' },
      { name: 'Packaging', value: 'Elegant Gift Box' },
      { name: 'Shelf Life', value: '2-3 months' }
    ],
    features: [
      'Handcrafted chocolates',
      'Premium ingredients',
      'Elegant gift packaging',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Catherine R.', rating: 5, date: '2023-05-15', comment: 'The chocolates were absolutely delicious! Perfect gift for chocolate lovers.' },
      { id: 2, author: 'Andrew M.', rating: 5, date: '2023-04-22', comment: 'Ordered for my wife\'s birthday and she loved it. Great quality!' },
      { id: 3, author: 'Elizabeth S.', rating: 4, date: '2023-03-30', comment: 'Beautiful presentation. The chocolates were very tasty.' }
    ],
    relatedProducts: ['7', '12', '13']
  },
  {
    id: '12',
    name: 'Chocolate Truffles Collection',
    price: 34.99,
    description: 'Decadent chocolate truffles in various flavors, handmade by expert chocolatiers.',
    details: 'This luxurious collection features 16 handcrafted chocolate truffles in a variety of flavors, including dark chocolate, milk chocolate, and white chocolate. Each truffle is carefully crafted for exceptional taste and texture.',
    images: [
      'http://localhost:3000/img/choclate.WEBP',
      'http://localhost:3000/img/trufins.WEBP',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1372&auto=format&fit=crop'
    ],
    specifications: [
      { name: 'Contents', value: '16 Truffles' },
      { name: 'Weight', value: '250g' },
      { name: 'Size', value: 'Medium Box' },
      { name: 'Packaging', value: 'Elegant Gift Box' },
      { name: 'Shelf Life', value: '2-3 months' }
    ],
    features: [
      'Handcrafted truffles',
      'Multiple flavor options',
      'Elegant gift packaging',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Josephine K.', rating: 5, date: '2023-05-10', comment: 'The truffles were absolutely delicious! Perfect gift for chocolate lovers.' },
      { id: 2, author: 'Charles P.', rating: 5, date: '2023-04-18', comment: 'Ordered for my wife\'s birthday and she loved it. Great quality!' },
      { id: 3, author: 'Diana W.', rating: 4, date: '2023-03-27', comment: 'Beautiful presentation. The truffles were very tasty.' }
    ],
    relatedProducts: ['7', '11', '13']
  },
  {
    id: '13',
    name: 'Chocolate Covered Strawberries',
    price: 29.99,
    description: 'Fresh strawberries hand-dipped in premium dark, milk, and white chocolate.',
    details: 'This delightful treat features 12 large, fresh strawberries hand-dipped in premium dark, milk, and white chocolate. Each strawberry is carefully decorated and presented in an elegant gift box.',
    images: [
      'http://localhost:3000/img/strawberry.WEBP',
      'http://localhost:3000/img/stchoco.AVIF',
      'http://localhost:3000/img/covered.AVIF'
    ],
    specifications: [
      { name: 'Contents', value: '12 Strawberries' },
      { name: 'Chocolate', value: 'Dark, Milk, White' },
      { name: 'Size', value: 'Medium Box' },
      { name: 'Packaging', value: 'Elegant Gift Box' },
      { name: 'Shelf Life', value: '2-3 days' }
    ],
    features: [
      'Fresh strawberries',
      'Premium chocolate coating',
      'Elegant gift packaging',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Victoria M.', rating: 5, date: '2023-05-08', comment: 'The strawberries were absolutely delicious! Perfect gift for any occasion.' },
      { id: 2, author: 'William S.', rating: 5, date: '2023-04-16', comment: 'Ordered for my wife\'s birthday and she loved it. Great quality!' },
      { id: 3, author: 'Elizabeth R.', rating: 4, date: '2023-03-25', comment: 'Beautiful presentation. The strawberries were fresh and tasty.' }
    ],
    relatedProducts: ['7', '11', '12']
  },
  {
    id: '14',
    name: 'Handcrafted Birthday Card',
    price: 8.99,
    description: 'Beautifully crafted birthday card with elegant design and heartfelt message.',
    details: 'This elegant birthday card features a beautiful design with a heartfelt message inside. The card is handcrafted with premium materials and includes a matching envelope.',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop'
    ],
    specifications: [
      { name: 'Size', value: 'A6 (4.1" x 5.8")' },
      { name: 'Material', value: 'Premium Cardstock' },
      { name: 'Style', value: 'Elegant Design' },
      { name: 'Packaging', value: 'Matching Envelope' },
      { name: 'Message', value: 'Included' }
    ],
    features: [
      'Handcrafted design',
      'Premium materials',
      'Matching envelope',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Margaret L.', rating: 5, date: '2023-05-12', comment: 'The card was absolutely beautiful! Perfect for my daughter\'s birthday.' },
      { id: 2, author: 'Thomas H.', rating: 5, date: '2023-04-20', comment: 'Ordered for my wife\'s birthday and she loved it. Great quality!' },
      { id: 3, author: 'Sarah W.', rating: 4, date: '2023-03-28', comment: 'Beautiful design. The card was very elegant.' }
    ],
    relatedProducts: ['15', '16']
  },
  {
    id: '15',
    name: 'Anniversary Card Collection',
    price: 12.99,
    description: 'Set of premium anniversary cards with romantic messages and designs.',
    details: 'This elegant collection features 3 premium anniversary cards with romantic designs and heartfelt messages. Each card is handcrafted with premium materials and includes matching envelopes.',
    images: [
      'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop'
    ],
    specifications: [
      { name: 'Size', value: 'A6 (4.1" x 5.8")' },
      { name: 'Material', value: 'Premium Cardstock' },
      { name: 'Style', value: 'Romantic Design' },
      { name: 'Packaging', value: 'Matching Envelopes' },
      { name: 'Message', value: 'Included' }
    ],
    features: [
      'Set of 3 cards',
      'Premium materials',
      'Matching envelopes',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Elizabeth M.', rating: 5, date: '2023-05-10', comment: 'The cards were absolutely beautiful! Perfect for our anniversary.' },
      { id: 2, author: 'James H.', rating: 5, date: '2023-04-18', comment: 'Ordered for our anniversary and we loved them. Great quality!' },
      { id: 3, author: 'Mary W.', rating: 4, date: '2023-03-27', comment: 'Beautiful designs. The cards were very elegant.' }
    ],
    relatedProducts: ['14', '16']
  },
  {
    id: '16',
    name: 'Thank You Cards Set',
    price: 14.99,
    description: 'Pack of elegant thank you cards with envelopes, perfect for expressing gratitude.',
    details: 'This elegant set features 10 premium thank you cards with beautiful designs and matching envelopes. Perfect for expressing gratitude for any occasion.',
    images: [
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577375729078-820d5283031c?q=80&w=1480&auto=format&fit=crop'
    ],
    specifications: [
      { name: 'Size', value: 'A6 (4.1" x 5.8")' },
      { name: 'Material', value: 'Premium Cardstock' },
      { name: 'Style', value: 'Elegant Design' },
      { name: 'Packaging', value: 'Matching Envelopes' },
      { name: 'Message', value: 'Included' }
    ],
    features: [
      'Set of 10 cards',
      'Premium materials',
      'Matching envelopes',
      'Same-day delivery available',
      'Satisfaction guaranteed'
    ],
    reviews: [
      { id: 1, author: 'Catherine R.', rating: 5, date: '2023-05-08', comment: 'The cards were absolutely beautiful! Perfect for thank you notes.' },
      { id: 2, author: 'Andrew M.', rating: 5, date: '2023-04-16', comment: 'Ordered for our wedding thank yous and they were perfect. Great quality!' },
      { id: 3, author: 'Diana W.', rating: 4, date: '2023-03-25', comment: 'Beautiful designs. The cards were very elegant.' }
    ],
    relatedProducts: ['14', '15']
  }
];

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { cartItems, setCartItems } = useContext(CartContext);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    comment: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  // Related products
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Add scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    // Simulate API call to fetch product
    setLoading(true);
    try {
      const foundProduct = productsData.find(product => product.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products
        if (foundProduct.relatedProducts && foundProduct.relatedProducts.length > 0) {
          const related = productsData.filter(p => 
            foundProduct.relatedProducts.includes(p.id)
          );
          setRelatedProducts(related);
        }
      } else {
        setError('Product not found');
      }
    } catch (err) {
      setError('Error loading product');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      };
      
      setCartItems([...cartItems, itemToAdd]);
      
      // Show a confirmation message (in a real app, use a toast or modal)
      alert(`${product.name} added to your cart!`);
    }
  };

  // Calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      alert('Please fill in all fields');
      return;
    }

    const review = {
      id: Date.now(),
      author: newReview.author,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment
    };

    const updatedProduct = {
      ...product,
      reviews: [...product.reviews, review]
    };

    setProduct(updatedProduct);
    setNewReview({
      author: '',
      rating: 5,
      comment: ''
    });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
          <p className="text-gray-600 mb-8">We couldn't find the product you're looking for.</p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Overview */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Images */}
            <div className="p-6">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border rounded-md overflow-hidden ${
                      selectedImage === index ? 'border-primary ring-2 ring-offset-2 ring-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        star <= Math.round(calculateAverageRating(product.reviews))
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {calculateAverageRating(product.reviews)} ({product.reviews.length} reviews)
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
              
              {/* Add to Cart */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="mr-4 text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-gray-600">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-2"
                >
                  Add to Cart
                </button>
              </div>
              
              {/* Delivery Information */}
              <div className="border-t border-gray-200 pt-6 mt-auto">
                <div className="flex items-start mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Free delivery on orders over $100</span>
                </div>
                <div className="flex items-start mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Same day delivery for orders before 2 PM</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Satisfaction guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'specs'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-600 mb-6">{product.details}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'specs' && (
              <div>
                <table className="min-w-full">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{spec.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          star <= Math.round(calculateAverageRating(product.reviews))
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {calculateAverageRating(product.reviews)} out of 5
                  </span>
                </div>
                
                {/* Review Form */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="author"
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-6 w-6 ${
                                star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Review
                      </label>
                      <textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Submit Review
                    </button>
                  </form>
                  {reviewSubmitted && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                      Thank you for your review!
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{review.author}</h4>
                          <div className="flex text-yellow-400 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${
                                  star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <p className="mt-3 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-56 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${relatedProduct.id}`} className="block">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    </Link>
                    <p className="text-gray-600 mb-3 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">${relatedProduct.price.toFixed(2)}</span>
                      <Link to={`/product/${relatedProduct.id}`} className="text-primary hover:text-pink-600 font-medium text-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView; 