import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Sample blog posts data with detailed content
const blogPosts = [
  {
    id: 1,
    title: 'A Guide to Seasonal Flowers: What Blooms When',
    date: 'May 15, 2023',
    author: 'Emma Johnson',
    category: 'Flower Guide',
    image: 'http://localhost:3000/img/blog1.WEBP',
    content: `
      <h2>Understanding Seasonal Flowers</h2>
      <p>Seasonal flowers are nature's way of marking the passage of time. Each season brings its own unique palette of colors and textures to the floral world. Understanding what flowers are in season can help you create more vibrant, long-lasting arrangements while supporting local growers.</p>
      
      <h3>Spring Flowers</h3>
      <p>Spring is a time of renewal and rebirth in the floral world. Some of the most popular spring flowers include:</p>
      <ul>
        <li>Tulips - Available in a rainbow of colors, perfect for brightening any space</li>
        <li>Daffodils - Symbolizing new beginnings and hope</li>
        <li>Hyacinths - Known for their intoxicating fragrance</li>
        <li>Peonies - Large, lush blooms that are perfect for special occasions</li>
      </ul>

      <h3>Summer Flowers</h3>
      <p>Summer brings an abundance of vibrant, sun-loving flowers:</p>
      <ul>
        <li>Sunflowers - Bright and cheerful, perfect for summer arrangements</li>
        <li>Dahlias - Available in countless colors and forms</li>
        <li>Zinnias - Long-lasting and perfect for cutting gardens</li>
        <li>Lavender - Both beautiful and fragrant</li>
      </ul>

      <h3>Fall Flowers</h3>
      <p>Autumn brings rich, warm colors and unique textures:</p>
      <ul>
        <li>Chrysanthemums - Available in a wide range of colors and forms</li>
        <li>Marigolds - Perfect for fall arrangements and celebrations</li>
        <li>Ornamental Kale - Adds unique texture and color</li>
        <li>Sunflowers - Late-blooming varieties extend the season</li>
      </ul>

      <h3>Winter Flowers</h3>
      <p>Even in winter, there are beautiful flowers to enjoy:</p>
      <ul>
        <li>Poinsettias - The classic holiday flower</li>
        <li>Cyclamen - Perfect for winter containers</li>
        <li>Hellebores - Also known as Christmas roses</li>
        <li>Paperwhites - Fragrant indoor blooms</li>
      </ul>

      <h2>Tips for Seasonal Flower Arranging</h2>
      <p>When working with seasonal flowers, keep these tips in mind:</p>
      <ol>
        <li>Choose flowers that are in season for better quality and value</li>
        <li>Consider the natural colors of the season when creating arrangements</li>
        <li>Use seasonal foliage to complement your flowers</li>
        <li>Support local growers by purchasing seasonal flowers</li>
      </ol>
    `,
    relatedPosts: [2, 3, 4]
  },
  {
    id: 2,
    title: 'The Language of Flowers: What Your Bouquet Really Says',
    date: 'April 22, 2023',
    author: 'Michael Chen',
    category: 'Flower Meanings',
    image: 'http://localhost:3000/img/blog2.WEBP',
    content: `
      <h2>The History of Floriography</h2>
      <p>Floriography, or the language of flowers, has been used for centuries to convey messages and emotions. This practice became particularly popular during the Victorian era when expressing feelings openly was often considered inappropriate.</p>

      <h3>Common Flower Meanings</h3>
      <p>Here are some of the most common flowers and their meanings:</p>
      <ul>
        <li>Roses - Love and passion (red), friendship (yellow), purity (white)</li>
        <li>Lilies - Purity and refined beauty</li>
        <li>Tulips - Perfect love</li>
        <li>Daisies - Innocence and purity</li>
        <li>Orchids - Luxury and beauty</li>
      </ul>

      <h3>Creating Meaningful Arrangements</h3>
      <p>When creating a bouquet with specific meanings:</p>
      <ol>
        <li>Choose flowers that convey your intended message</li>
        <li>Consider the color of the flowers as it can change the meaning</li>
        <li>Pay attention to the number of flowers in the arrangement</li>
        <li>Include complementary foliage to enhance the message</li>
      </ol>
    `,
    relatedPosts: [1, 3, 5]
  },
  {
    id: 3,
    title: '7 Tips for Making Your Cut Flowers Last Longer',
    date: 'March 10, 2023',
    author: 'Sarah Williams',
    category: 'Flower Care',
    image: 'https://images.unsplash.com/photo-1469259943454-aa100abba749?q=80&w=1587&auto=format&fit=crop',
    content: `
      <h2>Essential Tips for Flower Care</h2>
      <p>Proper care can significantly extend the life of your cut flowers. Follow these expert tips to keep your blooms fresh and beautiful for as long as possible.</p>

      <h3>1. Clean Vase and Fresh Water</h3>
      <p>Always start with a clean vase and fresh water. Bacteria in dirty vases can shorten the life of your flowers.</p>

      <h3>2. Proper Cutting Technique</h3>
      <p>Cut stems at a 45-degree angle to maximize water absorption. Use sharp scissors or a knife to avoid crushing the stems.</p>

      <h3>3. Remove Foliage</h3>
      <p>Remove any leaves that would be submerged in water to prevent bacterial growth.</p>

      <h3>4. Use Flower Food</h3>
      <p>Commercial flower food contains nutrients and antibacterial agents that help flowers last longer.</p>

      <h3>5. Change Water Regularly</h3>
      <p>Change the water every 2-3 days and recut the stems to maintain freshness.</p>

      <h3>6. Proper Placement</h3>
      <p>Keep flowers away from direct sunlight, heat sources, and fruit (which releases ethylene gas).</p>

      <h3>7. Temperature Control</h3>
      <p>Store flowers in a cool place at night to extend their life.</p>
    `,
    relatedPosts: [1, 2, 4]
  },
  {
    id: 4,
    title: 'Sustainable Floristry: Eco-Friendly Practices for Flower Lovers',
    date: 'February 28, 2023',
    author: 'David Garcia',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=1470&auto=format&fit=crop',
    content: `
      <h2>Eco-Friendly Flower Practices</h2>
      <p>Sustainable floristry is about reducing the environmental impact of flower production and arrangement while still creating beautiful displays.</p>

      <h3>1. Local and Seasonal Flowers</h3>
      <p>Choose locally grown, seasonal flowers to reduce transportation emissions and support local growers.</p>

      <h3>2. Reduce Waste</h3>
      <p>Use biodegradable materials and avoid floral foam, which contains microplastics.</p>

      <h3>3. Composting</h3>
      <p>Compost spent flowers and plant material to return nutrients to the soil.</p>

      <h3>4. Water Conservation</h3>
      <p>Use water-efficient irrigation systems and collect rainwater for watering.</p>

      <h3>5. Natural Pest Control</h3>
      <p>Use organic pest control methods instead of chemical pesticides.</p>
    `,
    relatedPosts: [1, 3, 5]
  },
  {
    id: 5,
    title: 'DIY Wedding Flowers: A Step-by-Step Guide',
    date: 'January 15, 2023',
    author: 'Jennifer Lopez',
    category: 'DIY',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
    content: `
      <h2>Creating Your Own Wedding Flowers</h2>
      <p>Creating your own wedding flowers can be a rewarding and cost-effective way to add a personal touch to your special day.</p>

      <h3>Planning Your Arrangements</h3>
      <p>Start by determining what flowers you'll need:</p>
      <ul>
        <li>Bridal bouquet</li>
        <li>Bridesmaids' bouquets</li>
        <li>Boutonnieres</li>
        <li>Centerpieces</li>
        <li>Ceremony arrangements</li>
      </ul>

      <h3>Essential Tools and Materials</h3>
      <p>Gather these essential items before you begin:</p>
      <ul>
        <li>Sharp floral scissors</li>
        <li>Floral tape</li>
        <li>Wire</li>
        <li>Ribbon</li>
        <li>Vases and containers</li>
      </ul>

      <h3>Step-by-Step Guide</h3>
      <ol>
        <li>Order flowers 2-3 days before the wedding</li>
        <li>Prepare flowers by removing leaves and thorns</li>
        <li>Create a practice bouquet</li>
        <li>Assemble arrangements the day before</li>
        <li>Store in a cool place until needed</li>
      </ol>
    `,
    relatedPosts: [2, 3, 4]
  },
  {
    id: 6,
    title: 'The Rise of Dried Flowers: Not Just a Trend',
    date: 'December 5, 2022',
    author: 'Rebecca Taylor',
    category: 'Trends',
    image: 'http://localhost:3000/img/blog6.WEBP',
    content: `
      <h2>The Growing Popularity of Dried Flowers</h2>
      <p>Dried flowers have moved beyond their traditional role as potpourri to become a major trend in modern floral design.</p>

      <h3>Benefits of Dried Flowers</h3>
      <ul>
        <li>Long-lasting beauty</li>
        <li>Low maintenance</li>
        <li>Eco-friendly alternative</li>
        <li>Unique textures and colors</li>
      </ul>

      <h3>Popular Dried Flowers</h3>
      <p>Some of the most popular flowers for drying include:</p>
      <ul>
        <li>Lavender</li>
        <li>Strawflowers</li>
        <li>Statice</li>
        <li>Baby's Breath</li>
        <li>Pampas Grass</li>
      </ul>

      <h3>Drying Techniques</h3>
      <p>There are several methods for drying flowers:</p>
      <ol>
        <li>Air drying - Hang flowers upside down in a dark, dry place</li>
        <li>Silica gel - Preserves color and shape well</li>
        <li>Pressing - Great for flat flowers and leaves</li>
        <li>Microwave drying - Quick method for small flowers</li>
      </ol>
    `,
    relatedPosts: [1, 2, 4]
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline mt-4 block">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => post.relatedPosts.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </motion.article>

        {/* Related Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-500">{relatedPost.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default BlogDetail; 