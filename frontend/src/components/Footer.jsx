import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 mt-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-2">ShopEase</h2>
          <p className="text-sm text-gray-300">
            Your one-stop destination for effortless shopping. Fast delivery, top brands, and unbeatable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">Cart</a></li>
            <li><a href="#" className="hover:text-white">My Account</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Returns</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-300">support@shopease.com</p>
          <p className="text-sm text-gray-300">+91 98765 43210</p>
          <p className="text-sm text-gray-300">Hyderabad, India</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-400 text-center">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
