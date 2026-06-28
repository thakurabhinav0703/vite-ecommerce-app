import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const { id, title, price, quantity, thumbnail, brand } = item;

  return (
    <div className="cart-item glass-card animate-fade-in">
      <div className="item-image-wrapper">
        <img src={thumbnail} alt={title} className="item-image" />
      </div>

      <div className="item-details">
        <div className="item-brand">{brand || 'Premium Brand'}</div>
        <h4 className="item-title">{title}</h4>
        <div className="item-price-unit">${price.toFixed(2)} each</div>
      </div>

      <div className="item-quantity-controls">
        <button 
          onClick={() => decreaseQuantity(id)} 
          className="quantity-btn btn-minus"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span className="quantity-value">{quantity}</span>
        <button 
          onClick={() => increaseQuantity(id)} 
          className="quantity-btn btn-plus"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="item-total-price">
        ${(price * quantity).toFixed(2)}
      </div>

      <button 
        onClick={() => removeFromCart(id)} 
        className="btn-remove"
        aria-label="Remove item from cart"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartItem;
