import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content */}
      <main className="flex-grow px-10 py-6">
        <h1 className="text-3xl font-bold capitalize">Category: {categoryName}</h1>
        {/* More content can go here */}
      </main>

      <Footer />
    </div>
  );
}

export default CategoryPage;
