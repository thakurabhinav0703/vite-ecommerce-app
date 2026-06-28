import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import BillSummary from '../components/BillSummary';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <main className="container section-padding cart-page empty-cart-container">
        <div className="empty-cart-card glass-card animate-fade-in">
          <div className="empty-icon-wrapper animate-pulse">
            <ShoppingBag size={48} className="empty-icon" />
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Explore our premium collections and add items to your shopping bag to get started.</p>
          <Link to="/" className="btn btn-primary start-shopping-btn">
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container section-padding cart-page">
      <div className="cart-header animate-fade-in">
        <h1 className="cart-title">Your Shopping Bag</h1>
        <button onClick={clearCart} className="btn btn-danger clear-all-btn">
          <Trash2 size={16} />
          <span>Clear All Items</span>
        </button>
      </div>

      <div className="cart-layout">
        {/* Items Listing */}
        <div className="cart-items-section">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Bill Summary Panel */}
        <div className="cart-summary-section">
          <BillSummary />
        </div>
      </div>
    </main>
  );
};

export default Cart;
