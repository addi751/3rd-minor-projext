import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice'; // Import your action creator
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigate('/cart'); // Redirect to the cart page
  };

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`); // Navigate to the product detail page
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${product.price}</span>
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={handleViewDetails}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
