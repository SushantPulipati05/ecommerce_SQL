import React, { useEffect, useState } from "react";
import axios from "axios";

function CartSidebar({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.ID) return;

      try {
        const res = await axios.get("http://localhost:3000/api/cart/get", {
          params: { userId: user.ID },
        });
        setCartItems(res.data.cartItems);
        console.log(setCartItems)
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 text-black flex justify-between items-center border-b">
          <h2 className="text-xl  font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.CartItemID}
                className="flex justify-between items-center mb-4 text-black border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.Name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.Quantity}</p>
                </div>
                <p className="font-bold">₹{item.Price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default CartSidebar;
