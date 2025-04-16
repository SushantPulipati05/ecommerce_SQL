import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const SingleCheckout = () => {
  const location = useLocation();
  const { product, userId } = location.state || {};
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    city: '',
    state: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to COD
  const [shippingMethod, setShippingMethod] = useState('Standard'); // Default shipping method

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId,
        totalAmount: product.Price, 
        orderStatus: 'Pending',
        address,
        deliveryType: shippingMethod,
        quantity: 1,
        paymentMethod: paymentMethod,
        orderItems: [
          {
            productId: product.ProductID,
            quantity: 1,
            price: product.Price,
          },
        ],
      };

      const response = await fetch('http://localhost:3000/api/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (result.success) {
        // Handle success (redirect to order confirmation page or similar)
        console.log('Order placed successfully:', result);
        console.log(orderData)
        const orderId = result.orderId
        navigate(`/successful-checkout/${orderId}`, 
          { state: { 
              orderData: result.order, 
              orderedItems: orderData.orderItems
            } 
          }
        );
      } else {
        // Handle error
        console.log('Order placement failed:', result.message);
        console.log(orderData)
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-red-600 text-xl">
          No product selected for checkout.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex flex-col lg:flex-row flex-grow px-4 lg:px-20 py-10 gap-10">
        {/* Left Section: Form */}
        <section className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-6">Checkout</h2>

          {/* Step 1: Shipping Address */}
          <div className="border border-gray-300 rounded-xl p-6 mb-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">1. Shipping address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                value={address.firstName}
                onChange={handleChange}
                className="border p-3 rounded"
                placeholder="First Name *"
              />
              <input
                name="lastName"
                value={address.lastName}
                onChange={handleChange}
                className="border p-3 rounded"
                placeholder="Last Name *"
              />
              <input
                name="addressLine1"
                value={address.addressLine1}
                onChange={handleChange}
                className="md:col-span-2 border p-3 rounded"
                placeholder="Address 1 - Street or P.O. Box *"
              />
              <input
                name="addressLine2"
                value={address.addressLine2}
                onChange={handleChange}
                className="md:col-span-2 border p-3 rounded"
                placeholder="Address 2 - Apt, Suite, Floor"
              />
              <input
                name="zipCode"
                value={address.zipCode}
                onChange={handleChange}
                className="border p-3 rounded"
                placeholder="ZIP Code *"
              />
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                className="border p-3 rounded"
                placeholder="City *"
              />
              <input
                name="state"
                value={address.state}
                onChange={handleChange}
                className="md:col-span-2 border p-3 rounded"
                placeholder="State"
              />
            </div>
            <button
              className="mt-6 bg-black text-white py-3 px-6 rounded-lg"
              onClick={() => {}}
            >
              Continue to shipping method
            </button>
          </div>

          {/* Step 2: Shipping Method */}
          <div className="border border-gray-300 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">2. Shipping method</h3>
            <div className="space-y-4">
              <label
                className="flex items-center justify-between border p-4 rounded-lg cursor-pointer hover:shadow-md"
                onClick={() => setShippingMethod('Standard')}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="shipping"
                    defaultChecked={shippingMethod === 'Standard'}
                  />
                  <div>
                    <p className="font-medium">Standard Delivery (4-6 days)</p>
                    <p className="text-sm text-gray-500">Free</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-700">₹0</span>
              </label>

              <label
                className="flex items-center justify-between border p-4 rounded-lg cursor-pointer hover:shadow-md"
                onClick={() => setShippingMethod('Express')}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="shipping"
                    defaultChecked={shippingMethod === 'Express'}
                  />
                  <div>
                    <p className="font-medium">Express Delivery (1-2 days)</p>
                    <p className="text-sm text-gray-500">₹150 extra</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-700">₹150</span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className="border border-gray-300 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">3. Payment</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer hover:shadow-md">
                <input type="radio" name="payment" defaultChecked />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when the product is delivered to your doorstep.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Step 4: Review & Place Order */}
          <div className="border border-gray-300 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">4. Place Order</h3>
            <button
              className="w-full bg-green-600 hover:bg-green-500 transition text-white py-3 rounded-xl font-semibold"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </section>

        {/* Right Section: Order Summary */}
        <aside className="w-full lg:w-1/3 bg-gray-50 border border-gray-200 rounded-xl p-6 h-fit shadow-md">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Promo code</label>
            <div className="flex">
              <input
                className="flex-1 border p-2 rounded-l"
                placeholder="Enter code"
              />
              <button className="bg-black text-white px-4 rounded-r">Apply</button>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{product.Price}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{product.Price}</span>
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default SingleCheckout;
