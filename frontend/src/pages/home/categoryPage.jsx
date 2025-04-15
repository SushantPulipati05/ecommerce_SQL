import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/products/by-category?name=${categoryName}`);
        setProducts(res.data.products);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products");
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-200">
      <Navbar />

      <main className="flex-grow px-10 py-6">
        <h1 className="text-3xl font-bold capitalize mb-6">Category: {categoryName}</h1>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">no products added in this category yet!!</p>}

        {!loading && !error && products.length === 0 && (
          <p>No products found in this category.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {products.map(product => (
            <div 
              key={product.ProductID} 
              className="bg-gray-800 p-4 rounded-xl cursor-pointer shadow hover:shadow-lg transition transition-transform hover:scale-102"
              onClick={()=>{handleCardClick(product.ProductID)}}>
              <img
                src={product.ImageURL}
                alt={product.Name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl text-white font-semibold mb-2">{product.Name}</h2>              
              <p className="text-lg font-bold text-green-400">${product.Price}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CategoryPage;
