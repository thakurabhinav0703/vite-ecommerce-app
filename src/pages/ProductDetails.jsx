import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import { 
  Star, ShoppingCart, ArrowLeft, ShieldCheck, 
  Truck, RotateCcw, Box, Check, Percent, AlertCircle 
} from 'lucide-react';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setActiveImage(data.images?.[0] || data.thumbnail);
      } catch (err) {
        setError(err.message || 'Product not found.');
      } finally {
        setLoading(false);
      }
    };
    
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="container section-padding details-loading">
        <Loader type="spinner" />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container section-padding error-container">
        <div className="error-card glass-card">
          <AlertCircle size={48} className="error-icon" />
          <h2>Product Not Found</h2>
          <p>{error || 'The requested product could not be located in our systems.'}</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Back to Shop</span>
          </Link>
        </div>
      </main>
    );
  }

  // Calculation details
  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  // Rating representation
  const renderStars = (ratingVal) => {
    const stars = [];
    const floor = Math.floor(ratingVal);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<Star key={i} size={16} className="detail-star filled" />);
      } else if (i - 0.5 <= ratingVal) {
        stars.push(<Star key={i} size={16} className="detail-star half-filled" />);
      } else {
        stars.push(<Star key={i} size={16} className="detail-star" />);
      }
    }
    return stars;
  };

  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;

  return (
    <main className="container section-padding product-details-page">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn btn-secondary back-btn">
        <ArrowLeft size={16} />
        <span>Go Back</span>
      </button>

      <div className="product-layout">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image-wrapper glass-card">
            <img src={activeImage} alt={product.title} className="main-image" />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="thumbnails-wrapper">
              {product.images.map((img, index) => (
                <button 
                  key={index} 
                  className={`thumbnail-btn glass-card ${activeImage === img ? 'thumbnail-active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${product.title} thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="product-info-panel">
          <div className="info-meta">
            <span className="info-category">{product.category}</span>
            <span className="info-brand">{product.brand || 'Aura Premium'}</span>
          </div>

          <h1 className="info-title">{product.title}</h1>

          {/* Rating */}
          <div className="info-rating-row">
            <div className="detail-stars">{renderStars(product.rating)}</div>
            <span className="detail-rating-text">{product.rating} / 5.0</span>
            <span className="rating-divider">|</span>
            <span className="stock-badge-text">
              {isOutOfStock ? (
                <span className="badge-out">Out of Stock</span>
              ) : isLowStock ? (
                <span className="badge-low">Only {product.stock} left</span>
              ) : (
                <span className="badge-in">In Stock</span>
              )}
            </span>
          </div>

          {/* Pricing */}
          <div className="info-price-card glass-card">
            <div className="price-row">
              <span className="info-price">${product.price.toFixed(2)}</span>
              {originalPrice && (
                <>
                  <span className="info-original">${originalPrice}</span>
                  <span className="info-discount">
                    <Percent size={12} /> {Math.round(product.discountPercentage)}% Off
                  </span>
                </>
              )}
            </div>
            <p className="price-tax-tip">Prices include tax and customs duties.</p>
          </div>

          {/* Description */}
          <div className="info-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Details Specifications */}
          <div className="info-specs-grid">
            <div className="spec-item glass-card">
              <Box className="spec-icon" size={20} />
              <div>
                <div className="spec-label">Stock Status</div>
                <div className="spec-val">{product.stock} units available</div>
              </div>
            </div>

            {product.warrantyInformation && (
              <div className="spec-item glass-card">
                <ShieldCheck className="spec-icon" size={20} />
                <div>
                  <div className="spec-label">Warranty</div>
                  <div className="spec-val">{product.warrantyInformation}</div>
                </div>
              </div>
            )}

            {product.shippingInformation && (
              <div className="spec-item glass-card">
                <Truck className="spec-icon" size={20} />
                <div>
                  <div className="spec-label">Shipping Details</div>
                  <div className="spec-val">{product.shippingInformation}</div>
                </div>
              </div>
            )}

            {product.returnPolicy && (
              <div className="spec-item glass-card">
                <RotateCcw className="spec-icon" size={20} />
                <div>
                  <div className="spec-label">Return Policy</div>
                  <div className="spec-val">{product.returnPolicy}</div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="info-actions">
            <button 
              onClick={() => addToCart(product)} 
              disabled={isOutOfStock}
              className="btn btn-primary detail-add-btn"
            >
              <ShoppingCart size={18} />
              <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart Bag'}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
