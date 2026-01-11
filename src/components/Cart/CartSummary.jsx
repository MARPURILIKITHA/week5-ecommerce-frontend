import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartTotal } from '../../store/cartSlice';
import {
  calculateTax,
  calculateShipping,
  calculateTotal,
  formatPrice,
} from '../../utils/helpers';
import Card from '../common/Card';
import Button from '../common/Button';

const CartSummary = () => {
  const navigate = useNavigate();
  const subtotal = useSelector(selectCartTotal);
  const cartItems = useSelector((state) => state.cart.items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, tax, shipping);

  if (cartItems.length === 0) {
    return (
      <Card>
        <Card.Body className="text-center">
          <h5>Your cart is empty</h5>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">ORDER SUMMARY</h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal:</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Shipping:</span>
          <strong>{formatPrice(shipping)}</strong>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span>Tax:</span>
          <strong>{formatPrice(tax)}</strong>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-3">
          <h5>TOTAL:</h5>
          <h5 className="text-success">{formatPrice(total)}</h5>
        </div>
        <Button
          variant="success"
          className="w-100"
          size="lg"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;
