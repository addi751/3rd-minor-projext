import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-white">
      <header className="w-full py-4 bg-blue-600 text-white text-center text-2xl">
        Welcome to My Store
      </header>

      <main className="text-center py-12">
        <h1 className="text-4xl font-bold mb-6">Shop Our Latest Products</h1>
        <p className="text-lg text-gray-700 mb-8">Find the best products for your needs</p>
        <Link to="/products" className="bg-blue-500 text-white px-6 py-2 rounded">
          Shop Now
        </Link>
      </main>
    </div>
  );
};

export default LandingPage;
