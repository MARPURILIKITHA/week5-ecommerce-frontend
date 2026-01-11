import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <Card>
          <Card.Body className="text-center py-5">
            <h2 className="mb-3">Your Shopping Cart is Empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      <hr className="mb-4" />
      <h5 className="mb-3">
        Cart Items ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}):
      </h5>
      <hr className="mb-4" />

      <div className="row">
        <div className="col-lg-8 mb-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="col-lg-4">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
