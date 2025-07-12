import Blog from "../models/Blogs.js"; // adjust the path if needed

// GET /api/blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs
    console.log(blogs);
    res.status(200).json(blogs); // Send blogs as JSON
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server Error: Unable to fetch blogs" });
  }
};

// POST /api/blogs
export const addBlog = async (req, res) => {
  try {
    const { title, excerpt, author, category, image, tags } = req.body;

    // Optional: Basic validation
    if (!title || !author || !category) {
      return res
        .status(400)
        .json({ message: "Title, author, and category are required" });
    }

    const newBlog = new Blog({
      title,
      excerpt,
      author,
      category,
      image,
      tags,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ message: "Server Error: Unable to add blog" });
  }
};

// get one blog

export const getOneBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
console.log(blog);
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addMultipleBlogs = async (req,res) => {
   
    // const blogs = [
    //     {
    //       id: 1,
    //       title: 'A Guide to Seasonal Flowers: What Blooms When',
    //       excerpt: 'Discover the best flowers for each season and how to incorporate them into your arrangements for maximum impact and longevity.',
    //       date: 'May 15, 2023',
    //       author: 'Emma Johnson',
    //       category: 'Flower Guide',
    //       image: 'http://localhost:3000/img/blog1.WEBP',
    //       tags: ['seasonal', 'guide', 'flowers']
    //     }, 
    //     {
    //       id: 2,
    //       title: 'The Language of Flowers: What Your Bouquet Really Says',
    //       excerpt: 'Learn about the historical meanings behind different flowers and how to craft arrangements that convey exactly what you want to express.',
    //       date: 'April 22, 2023',
    //       author: 'Michael Chen',
    //       category: 'Flower Meanings',
    //       image: 'http://localhost:3000/img/blog2.WEBP',
    //       tags: ['meanings', 'history', 'symbolism']
    //     },
    //     {
    //       id: 3,
    //       title: '7 Tips for Making Your Cut Flowers Last Longer',
    //       excerpt: 'Simple but effective techniques to extend the life of your bouquets and keep your flowers looking fresh for days or even weeks.',
    //       date: 'March 10, 2023',
    //       author: 'Sarah Williams',
    //       category: 'Flower Care',
    //       image: 'https://images.unsplash.com/photo-1469259943454-aa100abba749?q=80&w=1587&auto=format&fit=crop',
    //       tags: ['care', 'tips', 'longevity']
    //     },
    //     {
    //       id: 4,
    //       title: 'Sustainable Floristry: Eco-Friendly Practices for Flower Lovers',
    //       excerpt: 'How to enjoy beautiful blooms while minimizing environmental impact through sustainable growing and arranging practices.',
    //       date: 'February 28, 2023',
    //       author: 'David Garcia',
    //       category: 'Sustainability',
    //       image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=1470&auto=format&fit=crop',
    //       tags: ['eco-friendly', 'sustainable', 'environment']
    //     },
    //     {
    //       id: 5,
    //       title: 'DIY Wedding Flowers: A Step-by-Step Guide',
    //       excerpt: 'Create your own stunning wedding arrangements with this comprehensive guide to selecting, preparing, and arranging flowers for your special day.',
    //       date: 'January 15, 2023',
    //       author: 'Jennifer Lopez',
    //       category: 'DIY',
    //       image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1480&auto=format&fit=crop',
    //       tags: ['wedding', 'DIY', 'arrangements']
    //     },
    //     {
    //       id: 6,
    //       title: 'The Rise of Dried Flowers: Not Just a Trend',
    //       excerpt: 'Explore the growing popularity of dried floral arrangements and learn techniques for drying and displaying your own preserved blooms.',
    //       date: 'December 5, 2022',
    //       author: 'Rebecca Taylor',
    //       category: 'Trends',
    //       image: 'http://localhost:3000/img/blog6.WEBP',
    //       tags: ['dried flowers', 'preservation', 'trends']
    //     }
    //   ];
    

    // const savedBlogs = await Blog.insertMany(blogs);

        res.send('added')
};

