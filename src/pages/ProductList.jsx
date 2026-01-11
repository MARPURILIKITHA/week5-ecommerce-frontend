import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  loadProducts,
  setCategoryFilter,
  setPriceRangeFilter,
  setRatingFilter,
  setSortBy,
  setSearchQuery,
} from '../store/productSlice';
import { debounce } from '../utils/helpers';
import ProductCard from '../components/ProductCard/ProductCard';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, filters, sortBy, searchQuery } = useSelector(
    (state) => state.products
  );
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, items.length]);

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        dispatch(setSearchQuery(query));
      }, 300),
    [dispatch]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    debouncedSearch(value);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...items];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter((product) => {
        switch (filters.priceRange) {
          case 'under-50':
            return product.price < 50;
          case '50-100':
            return product.price >= 50 && product.price < 100;
          case '100-200':
            return product.price >= 100 && product.price < 200;
          case 'over-200':
            return product.price >= 200;
          default:
            return true;
        }
      });
    }

    // Rating filter
    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter((product) => product.rating >= minRating);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [items, filters, sortBy, searchQuery]);

  const categories = ['all', ...new Set(items.map((p) => p.category))];

  return (
    <div className="container">
      <h1 className="mb-4">Product Catalog</h1>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3 mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Filters</h5>
            </Card.Header>
            <Card.Body>
              {/* Search */}
              <div className="mb-3">
                <label className="form-label">Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Category Filter */}
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={filters.category}
                  onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-3">
                <label className="form-label">Price Range</label>
                <select
                  className="form-select"
                  value={filters.priceRange}
                  onChange={(e) =>
                    dispatch(setPriceRangeFilter(e.target.value))
                  }
                >
                  <option value="all">All Prices</option>
                  <option value="under-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="over-200">Over $200</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-3">
                <label className="form-label">Minimum Rating</label>
                <select
                  className="form-select"
                  value={filters.rating}
                  onChange={(e) => dispatch(setRatingFilter(e.target.value))}
                >
                  <option value="all">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-100"
                onClick={() => {
                  dispatch(setCategoryFilter('all'));
                  dispatch(setPriceRangeFilter('all'));
                  dispatch(setRatingFilter('all'));
                  dispatch(setSearchQuery(''));
                  setLocalSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </Card.Body>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0">
              Showing {filteredAndSortedProducts.length} products
            </p>
            <select
              className="form-select"
              style={{ width: 'auto' }}
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-5">
                <h5>No products found</h5>
                <p className="text-muted">
                  Try adjusting your filters or search query
                </p>
              </Card.Body>
            </Card>
          ) : (
            <div className="row g-4">
              {filteredAndSortedProducts.map((product) => (
                <div key={product.id} className="col-md-6 col-lg-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
