import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { formatPrice } from '../../utils/helpers';
import Button from '../common/Button';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);

  // Default fallback image as SVG data URI
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemove();
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
    }
  };

  const total = item.price * item.quantity;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img
              src={imgError ? fallbackImage : item.image}
              alt={item.name}
              className="img-fluid rounded"
              onError={handleImageError}
              loading="lazy"
            />
          </div>
          <div className="col-md-4">
            <h6 className="card-title mb-1">{item.name}</h6>
            <p className="text-muted small mb-0">{formatPrice(item.price)} each</p>
          </div>
          <div className="col-md-3">
            <div className="input-group input-group-sm">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                min="1"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="col-md-2 text-end">
            <strong>{formatPrice(total)}</strong>
          </div>
          <div className="col-md-1 text-end">
            <Button variant="danger" size="sm" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
