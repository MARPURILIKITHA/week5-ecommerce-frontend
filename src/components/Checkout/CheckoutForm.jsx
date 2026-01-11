import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/cartSlice';
import { selectCartTotal } from '../../store/cartSlice';
import {
  calculateTax,
  calculateShipping,
  calculateTotal,
  formatPrice,
} from '../../utils/helpers';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector(selectCartTotal);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, tax, shipping);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'CVV must be at least 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate order processing
      dispatch(clearCart());
      setShowSuccessModal(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

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
    <>
      <div className="row">
        <div className="col-lg-8">
          <Card>
            <Card.Header>
              <h5>Shipping Information</h5>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Address *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    {errors.state && (
                      <div className="invalid-feedback">{errors.state}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Zip Code *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                    {errors.zipCode && (
                      <div className="invalid-feedback">{errors.zipCode}</div>
                    )}
                  </div>
                </div>

                <hr className="my-4" />

                <h5 className="mb-3">Payment Information</h5>

                <div className="mb-3">
                  <label className="form-label">Card Number *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  {errors.cardNumber && (
                    <div className="invalid-feedback">{errors.cardNumber}</div>
                  )}
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Expiry Date *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiryDate && (
                      <div className="invalid-feedback">{errors.expiryDate}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">CVV *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && (
                      <div className="invalid-feedback">{errors.cvv}</div>
                    )}
                  </div>
                </div>

                <Button type="submit" variant="success" className="w-100" size="lg">
                  Place Order
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>Items ({cartItems.length}):</strong>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between small">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <hr />
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
              <div className="d-flex justify-content-between">
                <h5>TOTAL:</h5>
                <h5 className="text-success">{formatPrice(total)}</h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Modal
        show={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Order Placed Successfully!"
      >
        <p>Thank you for your order! Your order has been placed successfully.</p>
        <p>Order Total: <strong>{formatPrice(total)}</strong></p>
        <Button variant="primary" onClick={handleSuccessModalClose}>
          Continue Shopping
        </Button>
      </Modal>
    </>
  );
};

export default CheckoutForm;
