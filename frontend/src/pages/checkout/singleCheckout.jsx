import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useLocation } from 'react-router-dom'

function SingleCheckout() {
    const location = useLocation();
    const {product, userId} = location.state || {};

    if (!product) return <p>No product selected for checkout.</p>;
    
  return (
    <div className='flex flex-col min-h-screen '>
        <Navbar />
         <div className='flex-grow p-10'>
           <h1 className="text-3xl font-bold mb-4">Checkout</h1>
           <p><strong>Product:</strong> {product.Name}</p>
           <p><strong>Price:</strong> ₹{product.Price}</p>
           <p><strong>User ID:</strong> {userId}</p>
         </div>
        <Footer />
    </div>
  )
}

export default SingleCheckout