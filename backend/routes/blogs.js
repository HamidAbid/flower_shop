import express from "express";
import { addBlog, addMultipleBlogs, getAllBlogs, getOneBlog } from "../controllers/blogsController.js";


const router = express.Router();

// Get customization options for a product
router.get('/blogs', getAllBlogs);
router.post('/blogs', addBlog);
router.get('/blogs/:id', getOneBlog);
router.get('/blogsadded', addMultipleBlogs);


export default router; 