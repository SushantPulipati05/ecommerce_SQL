// components/CartSidebar.jsx
import React from "react";

function CartSidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-150 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Example cart items */}
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <div>
              <p className="font-semibold">Product Name</p>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
            <p className="font-bold">$29.99</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;
