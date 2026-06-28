import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ShoppingBag, Home as HomeIcon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { getCartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);
  const cartCount = getCartCount();

  // Scroll effect for blurred navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger pulse animation on cart count change
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateBadge(true);
      const timer = setTimeout(() => setAnimateBadge(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <ShoppingBag className="logo-icon" size={26} />
          <span className="logo-text">Aura<span className="gradient-text">Cart</span></span>
        </Link>

        <nav className="navbar-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            end
          >
            <HomeIcon size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink 
            to="/cart" 
            className={({ isActive }) => `nav-link cart-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <div className="cart-icon-container">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className={`cart-badge ${animateBadge ? 'badge-pulse' : ''}`}>
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
