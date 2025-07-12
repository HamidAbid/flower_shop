import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
// import { productsAPI } from "../utils/api";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import axios from "axios";

const ProductView = ({}) => {

  const navigate=useNavigate()
  const { addToCart } = useCart();
  const { token } = useAuth();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [newReview, setNewReview] = useState({
    author: "",
    rating: 0,
    comment: "",
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products/${id}`);

        const data = response.data;

        // Map ratings to reviews if reviews are not defined
        setProduct({
          ...data,
          reviews: data.reviews || [],
          images: data.images?.length ? data.images : [data.image],
        });

        setRelatedProducts(data.relatedProducts || []);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const handleQuantityChange = (value) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(token);
      if (!token) navigate("/login");
      await axios.post(`/api/products/${product._id}/reviews`, {
        author: newReview.author,
        rating: newReview.rating,
        comment: newReview.comment,
      },{headers: {
        Authorization: `Bearer ${token}`,
      },});

      const updatedReviews = [
        ...product.reviews,
        {
          author: newReview.author,
          rating: newReview.rating,
          comment: newReview.comment,
        }

      ];

      setProduct({ ...product, reviews: updatedReviews });
      setNewReview({ author: "", rating: 0, comment: "" });
      setReviewSubmitted(true);
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response?.data?.message || error.message
      );
    }
  };

  function handleAddToCart() {
    if(!token) navigate('/register')
    if (!product || !product._id) return;
    addToCart(product._id, quantity);
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (!product)
    return <div className="p-8 text-red-500">Product not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <Link to="/products" className="text-gray-500 hover:text-gray-700">
            Products
          </Link>
          <span className="mx-2 text-gray-500">›</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Images */}
            <div className="p-6">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              {product.images?.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`border rounded-md overflow-hidden ${
                        selectedImage === idx
                          ? "border-blue-500 ring-2 ring-offset-2 ring-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 flex flex-col">
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill={
                        star <=
                        Math.round(calculateAverageRating(product.reviews))
                          ? "currentColor"
                          : "none"
                      }
                      viewBox="0 0 20 20"
                      stroke="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {calculateAverageRating(product.reviews)} (
                  {product.reviews?.length || 0} reviews)
                </span>
              </div>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="text-2xl font-bold text-gray-900 mb-6">
                ${product.price?.toFixed(2)}
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="mr-4 text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-1"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart?.(product, quantity)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-auto text-sm text-gray-600 space-y-2">
                <div>✓ Free delivery on orders over $100</div>
                <div>✓ Same-day delivery before 2 PM</div>
                <div>✓ Satisfaction guaranteed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex border-b border-gray-300 mb-4">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="text-gray-700">
              {product.fullDescription || "No additional description."}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {product.reviews?.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded bg-white shadow-sm"
                  >
                    <div className="font-semibold">{review.author}</div>
                    <div className="text-yellow-400">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <h3 className="text-lg font-bold">Leave a Review</h3>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="border p-2 w-full"
                  value={newReview.author}
                  onChange={(e) =>
                    setNewReview({ ...newReview, author: e.target.value })
                  }
                />
                <select
                  required
                  className="border p-2 w-full"
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={0}>Select Rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 && "s"}
                    </option>
                  ))}
                </select>
                <textarea
                  required
                  className="border p-2 w-full"
                  placeholder="Your comment..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit Review
                </button>
                {reviewSubmitted && (
                  <p className="text-green-600">Thank you for your review!</p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
