import React from "react";
import Navbar from "../../components/Navbar";

const HomePage = () => {

  const imgLinks = [
    {
      img: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Groceries"
    },
    {
      img: "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Home Appliances"
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
      category: "Fashion"
    },
    {
      img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Sports and Fitness"
    }   
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative  bg-center h-100 flex items-center justify-center text-white" style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/02/49/50/15/360_F_249501541_XmWdfAfUbWAvGxBwAM0ba2aYT36ntlpH.jpg')" }}>
        
      </header>

      {/* features categories */}
      <section className="p-8 px-40">
        <h2 className="p-2 font-bold text-4xl mb-5">Featured categories</h2>
        <div className="grid grid-cols-2 gap-4">          
          
          <div 
            className="relative h-130 bg-center bg-cover p-4 shadow-lg" 
            style={{ backgroundImage: "url('https://www.skullcandy.eu/cdn/shop/files/Hesh_ANC_buy_box_black_4_d20df017-dab4-4248-a533-ff2cfd5c8aa2.png?v=1740505402&width=1445')" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 flex items-center justify-center transition-opacity">
              <span className="text-white font-bold text-xl">Technology</span>
            </div>
          </div>      
          
          <div className="grid grid-cols-2 gap-4">
            {imgLinks.map((item, index) => (
              <div
                key={index}
                className="relative h-64 bg-center bg-cover shadow-lg"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-bold text-xl">{item.category}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="relative h-60 bg-cover bg-center"
               style = {{ backgroundImage: "url('https://i.pinimg.com/736x/ad/f4/7d/adf47d6103253708eca24e60e0523b83.jpg')"}}>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-bold text-xl">Perfumes and accessories</span>
                </div>
          </div>
          <div className=" relative h-60 bg-cover bg-center "
               style = {{ backgroundImage: "url('https://i.pinimg.com/736x/7f/c0/70/7fc070d3c0b99b4f90804713f0744d1d.jpg')"}}>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-bold text-xl">Books and stationary</span>
                </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>&copy; 2025 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
