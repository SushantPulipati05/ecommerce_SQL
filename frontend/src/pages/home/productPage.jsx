import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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
  
  

  if (!product) return <div className="text-white text-center p-10">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow px-10 py-6">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <img src={product.ImageURL} alt={product.Name} className="w-full md:w-1/3 rounded-xl" />
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.Name}</h1>
            <p className="mb-4">{product.Description}</p>
            <p className="text-xl mb-4 font-semibold">₹{product.Price}</p>
            <button onClick={() => {
                handleAddToCart();
            }} className="bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-xl mr-4">
              Add to Cart
            </button>
            <button className="bg-green-600 hover:bg-green-500 transition px-5 py-3 rounded-xl">
              Buy Now
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
