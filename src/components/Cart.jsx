import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateCartItemQuantity } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (item, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantity({ id: item.id, quantity }));
    } else {
      dispatch(removeFromCart(item));
    }
  };

  const handleGoToProductPage = () => {
    navigate('/products'); // Navigate to the main product page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-xl text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image} // Ensure your item has an image property
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-2xl font-bold">Total: ${totalAmount}</p>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleGoToProductPage}
            >
              Go to Product Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
