import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, HelpCircle, ArrowLeft } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <main className="container section-padding not-found-page">
      <div className="not-found-card glass-card animate-fade-in">
        <div className="cosmic-glow"></div>
        <div className="not-found-icon-wrapper">
          <HelpCircle size={48} className="not-found-icon" />
        </div>
        <h1 className="not-found-code gradient-text">404</h1>
        <h2>Lost in Space?</h2>
        <p>The page you are looking for has been moved, renamed, or is temporarily unavailable in this galaxy.</p>
        <Link to="/" className="btn btn-primary not-found-btn">
          <ArrowLeft size={16} />
          <span>Return to Shop</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
