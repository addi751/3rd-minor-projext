import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import BillingInfo from './components/CheckoutSteps/BillingInfo';
import OrderReview from './components/CheckoutSteps/OrderReview';  // Import OrderReview
import Payment from './components/CheckoutSteps/Payment';
import OrderHistory from './components/OrderHistory';
import ProductManager from './components/AdminPanel/ProductManager';
import UserManager from './components/AdminPanel/UserManager';

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/billing" element={<BillingInfo />} />
          <Route path="/checkout/review" element={<OrderReview />} /> {/* Order Review Route */}
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/admin/products" element={<ProductManager />} />
          <Route path="/admin/users" element={<UserManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
