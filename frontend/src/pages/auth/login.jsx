import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Customer",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/auth/login", formData, {
          headers: {
              "Content-Type": "application/json",
          },
        })

        console.log("RESPONSE DATA: ",response.data)

        setMessage(response.data)
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setMessage("login successful");
          navigate("/dashboard"); 
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message); 
        setMessage(error.response?.data?.message || "login failed. Try again.");        
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-xl outline-none text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-xl outline-none text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 rounded-xl outline-none text-white"
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition p-3 rounded-xl text-white font-semibold"
          >
            Login
          </button>
          <span 
            className=" flex flex-col items-center font-light mt-4 cursor-pointer hover:text-blue-700"
            onClick={() => {navigate("/auth/signup")}}>
              Don't have an account? Sign up here!!
            </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;