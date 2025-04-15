import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {useNavigate} from 'react-router-dom';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/get-reviews/${productId}`);
        setReviews(res.data); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user')); 
    const userId = user.ID;
    console.log(userId)
    if(!userId){
        alert('Please login to add product to cart');
    }
  
    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        {
          userId,
          productId: product.ProductID,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error("Add to Cart Error:", error);
      alert("Failed to add product to cart.");
    }
  };
  
  const handleBuyNow = () =>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(!user || !user.ID){
        alert("Please login to continue");
        return;
    }

    console.log("Navigating to checkout...", product);

    navigate("/checkout" , {
        state: {
            product,
            userId: user.ID,
        },
    })
  }
  

  if (!product) return <div className="text-white text-center p-10">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow px-10 py-6">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <img src={product.ImageURL} alt={product.Name} className="w-full md:w-1/3 rounded-xl" />
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.Name}</h1>
            <p className="mb-4">{product.Description}</p>
            <p className="text-xl mb-4 font-semibold">₹{product.Price}</p>
            <button
              type='button'
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-xl mr-4"
            >
              Add to Cart
            </button>
            <button 
              type='button'
              onClick={handleBuyNow}
              className="bg-green-600 hover:bg-green-500 transition px-5 py-3 rounded-xl">
              Buy Now
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.ReviewID} className="border-t border-gray-600 pt-4">
                <p className="font-semibold">{review.UserName}</p>
                <div className="flex items-center">
                  {/* Display rating as stars */}
                  {[...Array(review.Rating)].map((_, index) => (
                    <span key={index} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-400">{review.ReviewText}</p>
                <p className="text-xs text-gray-500">{new Date(review.CreatedAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
