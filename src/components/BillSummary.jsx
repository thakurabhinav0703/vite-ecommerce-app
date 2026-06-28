import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import './BillSummary.css';

const BillSummary = () => {
  const { cart, clearCart, triggerToast } = useCart();

  // Calculate totals
  const totals = cart.reduce(
    (acc, item) => {
      const sellPrice = item.price * item.quantity;
      const discountPct = item.discountPercentage || 0;
      const originalPrice = discountPct > 0 
        ? item.price / (1 - discountPct / 100) 
        : item.price;
      
      const originalPriceTotal = originalPrice * item.quantity;
      
      acc.subtotalOriginal += originalPriceTotal;
      acc.subtotalSelling += sellPrice;
      return acc;
    },
    { subtotalOriginal: 0, subtotalSelling: 0 }
  );

  const subtotal = totals.subtotalSelling;
  const discountVal = totals.subtotalOriginal - totals.subtotalSelling;
  const gst = subtotal * 0.18;
  const delivery = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + gst + delivery;

  const handleCheckout = () => {
    triggerToast('Thank you for your order! Checkout successful.', 'success');
    clearCart();
  };

  return (
    <div className="bill-summary glass-card animate-fade-in">
      <h3 className="summary-title">Bill Summary</h3>
      
      <div className="summary-details">
        <div className="summary-row">
          <span>Items Subtotal</span>
          <span>${totals.subtotalOriginal.toFixed(2)}</span>
        </div>
        
        {discountVal > 0 && (
          <div className="summary-row discount-row">
            <span>Special Discount</span>
            <span>-${discountVal.toFixed(2)}</span>
          </div>
        )}

        <div className="summary-row">
          <span>Net Price</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>GST (18%)</span>
          <span>${gst.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Delivery Charges</span>
          <span className={delivery === 0 ? 'free-delivery' : ''}>
            {delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}
          </span>
        </div>
        
        {delivery > 0 && (
          <p className="delivery-tip">Add ${(100 - subtotal).toFixed(2)} more for FREE delivery!</p>
        )}

        <div className="summary-divider"></div>

        <div className="summary-row grand-total-row">
          <span>Grand Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="summary-actions">
        <button onClick={handleCheckout} className="btn btn-primary checkout-btn">
          <span>Proceed to Checkout</span>
          <ArrowRight size={18} />
        </button>
        <button onClick={clearCart} className="btn btn-secondary clear-btn">
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default BillSummary;
