import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          
          {/* Main content routing */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {/* Global Toast Notifications */}
          <Toast />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
