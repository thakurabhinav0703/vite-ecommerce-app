import React, { useState, useEffect, useMemo } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { Search, SlidersHorizontal, AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Load products on mount
  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError('Could not retrieve catalog data. Please verify your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Dynamically extract categories from fetched products
  const categories = useMemo(() => {
    if (products.length === 0) return [];
    const list = products.map(p => p.category);
    return ['all', ...new Set(list)];
  }, [products]);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  // Perform filtering and sorting
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount-desc') {
      result.sort((a, b) => b.discountPercentage - a.discountPercentage);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Paginated items
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll back to top of product grid
      window.scrollTo({
        top: 250,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <main className="container section-padding home-page">
        <div className="home-hero">
          <h1 className="hero-title">Experience Premium <span className="gradient-text">Aura</span></h1>
          <p className="hero-subtitle">Curating the world's finest products with fast global shipping</p>
        </div>
        <Loader type="skeleton" count={8} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container section-padding error-container">
        <div className="error-card glass-card">
          <AlertCircle size={48} className="error-icon" />
          <h2>Catalog Temporarily Offline</h2>
          <p>{error}</p>
          <button onClick={loadProducts} className="btn btn-primary">
            <RefreshCw size={16} />
            <span>Retry Connection</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container section-padding home-page">
      {/* Hero Section */}
      <div className="home-hero">
        <h1 className="hero-title animate-fade-in">Experience Premium <span className="gradient-text">Aura</span></h1>
        <p className="hero-subtitle animate-fade-in">Curating the world's finest products with fast global shipping</p>
      </div>

      {/* Toolbar / Filters */}
      <div className="toolbar glass-card animate-fade-in">
        {/* Search */}
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search products, brands, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Filter & Sort */}
        <div className="filter-wrapper">
          <div className="filter-group">
            <SlidersHorizontal size={16} className="filter-icon" />
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select sort-select"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="discount-desc">Discount: High to Low</option>
          </select>
        </div>
      </div>

      {/* Catalog Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="product-grid">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pagination-btn pagination-prev"
                aria-label="Previous Page"
              >
                <ChevronLeft size={18} />
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  // Show current page, first, last, and buffer pages
                  if (
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    Math.abs(pageNum - currentPage) <= 1
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`pagination-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === 2 || 
                    pageNum === totalPages - 1
                  ) {
                    return <span key={pageNum} className="pagination-dots">...</span>;
                  }
                  return null;
                })}
              </div>

              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pagination-btn pagination-next"
                aria-label="Next Page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-results glass-card animate-fade-in">
          <h3>No matching items found</h3>
          <p>Try refining your search terms or selecting a different category filter.</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSortBy('default');
            }} 
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;
