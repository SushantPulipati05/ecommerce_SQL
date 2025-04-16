import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CheckCircle } from 'lucide-react';

const SuccessfulCheckout = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/orders/${orderId}`);
        const data = await res.json();
        if (data.success) {
          setOrderData(data.order);
          
        } else {
          console.error('Failed to fetch order:', data.message);
        }
      } catch (err) {
        console.error('Error fetching order:', err);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Thank you for your purchase</h1>
        <p className="text-gray-600 mb-6">
          Your order has been received and will be shipped via <b>{orderData.DeliveryType}</b> delivery.<br />
          Order number: <span className="font-medium text-black">#{orderData.OrderID}</span>
        </p>

        {/* Order Items */}
        <div className="w-full max-w-2xl bg-white border rounded-xl shadow p-6 text-left mb-6">
          <h2 className="text-lg font-semibold mb-4">Items in Your Order</h2>
          {orderData.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.ImageURL}
                  alt={item.ProductName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.ProductName}</p>
                  <p className="text-sm text-gray-600">Qty: {item.Quantity}</p>
                </div>
              </div>
              <span className="font-medium">₹{item.Price}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{orderData.TotalAmount}</span>
          </div>
        </div>

        {/* Address */}
        <div className="w-full max-w-2xl bg-white border rounded-xl shadow p-6 text-left">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <p>{orderData.Address.FullName}</p>
          <p>{orderData.Address.AddressLine1}</p>
          {orderData.Address.AddressLine2 && <p>{orderData.Address.AddressLine2}</p>}
          <p>{orderData.Address.City}, {orderData.Address.State} - {orderData.Address.ZipCode}</p>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Back to Home
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default SuccessfulCheckout;
