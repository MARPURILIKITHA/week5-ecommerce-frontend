import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { formatPrice } from '../../utils/helpers';
import Card from '../common/Card';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card
      className="h-100 shadow-sm"
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <Card.Img top src={product.image} alt={product.name} />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title flex-grow-1">{product.name}</h5>
          <button
            className="btn btn-link p-0 border-0"
            onClick={handleWishlistToggle}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist ? (
              <span className="text-danger">❤️</span>
            ) : (
              <span className="text-muted">🤍</span>
            )}
          </button>
        </div>
        <p className="card-text text-muted small">
          {product.description || 'No description available'}
        </p>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold text-primary">{formatPrice(product.price)}</span>
          <div>
            <span className="badge bg-warning text-dark">
              ⭐ {product.rating}
            </span>
            <span className="badge bg-secondary ms-1">{product.category}</span>
          </div>
        </div>
        {product.inStock ? (
          <Button
            variant="primary"
            className="w-100"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        ) : (
          <Button variant="secondary" className="w-100" disabled>
            Out of Stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
