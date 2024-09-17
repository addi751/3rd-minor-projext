import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderReview = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Review Your Order</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="mb-6">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between mb-4">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-gray-600">${item.price} x {item.quantity}</p>
                </div>
                <p className="font-semibold">${item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold">Total Amount: ${totalAmount}</p>

          <div className="mt-6">
            <Link
              to="/checkout/payment"
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Proceed to Payment
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderReview;
