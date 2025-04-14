import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import CartSidebar from "./cartSidebar";


function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login"; 
  };

  return (
    <>
    <nav className="bg-white shadow-md px-20 py-4 flex justify-between items-center relative">
      {/* Logo */}
      
      <Link to = "/dashboard">
      <h1 className="text-3xl font-extrabold text-blue-600 tracking-wide">
        ShopEase
      </h1>
      </Link>

      {/* Search Bar */}
      <form className="relative w-1/3 flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <Search className="absolute left-3 text-gray-500" size={20} />
      </form>

      {/* User Info & Cart */}
      <div className="flex items-center gap-6 relative">
        <div className="flex flex-col text-right">
          <span className="font-semibold text-gray-800 text-lg">
            {user ? `Hello, ${user.name}` : "Hello, Guest"}
          </span>
          <span className="text-xs text-gray-500">Continue your shopping</span>
        </div>

        {/* User Avatar with Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setTimeout(() => setShowDropdown(false), 100)}
        >
          <img
            src={user?.avatar ||  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5FV2oJ9b6YmXcgIKzBfkJSByk37RB1U3Mrg&s"}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-blue-500 shadow-md cursor-pointer"
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 w-48 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 z-50">
              <div className="px-4 py-2 text-gray-800 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                <User size={18} />
                <span>Profile</span>
              </div>
              <div
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>

        {/* Shopping Cart Icon */}
        <div 
          onClick={() => setIsCartOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg transition-all duration-300">
          <ShoppingCart size={24} />
        </div>
      </div>
    </nav>
    <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

    </>
  );
}

export default Navbar;
