import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Destructure product details
  const {
    id,
    title,
    brand,
    category,
    rating,
    price,
    discountPercentage,
    thumbnail
  } = product;

  // Calculate original price if discount is present
  const originalPrice = discountPercentage 
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  // Render Star Rating
  const renderStars = (ratingVal) => {
    const stars = [];
    const floor = Math.floor(ratingVal);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<Star key={i} size={14} className="star-icon filled" />);
      } else if (i - 0.5 <= ratingVal) {
        stars.push(<Star key={i} size={14} className="star-icon half-filled" />);
      } else {
        stars.push(<Star key={i} size={14} className="star-icon" />);
      }
    }
    return stars;
  };

  return (
    <div className="product-card glass-card animate-fade-in">
      {/* Category Badge & Discount Badge */}
      <div className="card-badges">
        {discountPercentage > 0 && (
          <span className="discount-badge">-{Math.round(discountPercentage)}%</span>
        )}
        <span className="category-badge">{category}</span>
      </div>

      {/* Image Container */}
      <div className="card-image-container">
        <img 
          src={thumbnail} 
          alt={title} 
          className="product-image"
          loading="lazy" 
        />
        <div className="card-overlay">
          <Link to={`/product/${id}`} className="btn-icon" title="View Details">
            <Eye size={20} />
          </Link>
        </div>
      </div>

      {/* Product Information */}
      <div className="card-info">
        <div className="brand-name">{brand || 'Aura Premium'}</div>
        <h3 className="product-title" title={title}>{title}</h3>
        
        {/* Rating */}
        <div className="rating-container">
          <div className="stars-row">{renderStars(rating)}</div>
          <span className="rating-number">({rating})</span>
        </div>

        {/* Pricing */}
        <div className="pricing-container">
          <span className="current-price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice}</span>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions">
          <Link to={`/product/${id}`} className="btn btn-secondary card-btn-view">
            Details
          </Link>
          <button 
            onClick={() => addToCart(product)} 
            className="btn btn-primary card-btn-add"
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
