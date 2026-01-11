import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { fetchProductById } from '../services/api';
import { formatPrice } from '../utils/helpers';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState(null);
  const [imgError, setImgError] = useState(false);

  // Default fallback image as SVG data URI
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc(fallbackImage);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setImgSrc(data.image);
        setImgError(false);
        // Ensure products list is loaded for related products
        dispatch(loadProducts());
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, dispatch, navigate]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          })
        );
      }
      navigate('/cart');
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <Card>
          <Card.Body className="text-center">
            <h5>Product not found</h5>
            <Link to="/products">
              <Button variant="primary">Back to Products</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src={imgSrc || product.image}
            alt={product.name}
            className="img-fluid rounded"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <div className="mb-3">
            <span className="h3 text-primary me-2">
              {formatPrice(product.price)}
            </span>
            <span className="badge bg-warning text-dark me-2">
              ⭐ {product.rating}
            </span>
            <span className="badge bg-secondary">{product.category}</span>
          </div>
          <p className="text-muted mb-4">{product.description}</p>

          <div className="mb-4">
            <label className="form-label fw-bold">Quantity:</label>
            <div className="input-group mb-3" style={{ width: '200px' }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                min="1"
                max="10"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>

          {product.inStock ? (
            <div className="mb-3">
              <Button
                variant="primary"
                size="lg"
                className="me-2"
                onClick={handleAddToCart}
              >
                Add to Cart ({quantity} item{quantity > 1 ? 's' : ''})
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => navigate('/cart')}
              >
                View Cart
              </Button>
            </div>
          ) : (
            <Button variant="secondary" size="lg" disabled>
              Out of Stock
            </Button>
          )}

          <div className="mt-4">
            <h5>Product Details</h5>
            <ul className="list-unstyled">
              <li>
                <strong>Category:</strong> {product.category}
              </li>
              <li>
                <strong>Rating:</strong> {product.rating} / 5.0
              </li>
              <li>
                <strong>Stock Status:</strong>{' '}
                {product.inStock ? (
                  <span className="text-success">In Stock</span>
                ) : (
                  <span className="text-danger">Out of Stock</span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
