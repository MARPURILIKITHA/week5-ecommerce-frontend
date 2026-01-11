import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard/ProductCard';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, items.length]);

  const featuredProducts = items.slice(0, 6);

  return (
    <div className="container">
      <div className="jumbotron bg-light p-5 rounded mb-5">
        <h1 className="display-4">Welcome to The Developers Arena</h1>
        <p className="lead">
          Discover amazing products for developers. Build your perfect setup with
          our curated collection of electronics and accessories.
        </p>
        <hr className="my-4" />
        <p>
          Explore our product catalog with filtering, sorting, and search
          capabilities.
        </p>
        <Link to="/products">
          <Button variant="primary" size="lg">
            Shop Now
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2 className="mb-4">Featured Products</h2>
          <div className="row g-4 mb-5">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="row mb-5">
            <div className="col-md-4 mb-3">
              <Card className="h-100 text-center">
                <Card.Body>
                  <h5 className="card-title">🔍 Smart Search</h5>
                  <p className="card-text">
                    Find products quickly with our advanced search and
                    autocomplete features.
                  </p>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4 mb-3">
              <Card className="h-100 text-center">
                <Card.Body>
                  <h5 className="card-title">🛒 Easy Shopping</h5>
                  <p className="card-text">
                    Seamless shopping experience with real-time cart updates and
                    quick checkout.
                  </p>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4 mb-3">
              <Card className="h-100 text-center">
                <Card.Body>
                  <h5 className="card-title">⚡ Fast & Responsive</h5>
                  <p className="card-text">
                    Optimized performance with lazy loading and code splitting
                    for faster load times.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
