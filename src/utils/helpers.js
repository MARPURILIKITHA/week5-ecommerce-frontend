export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateTax = (subtotal, taxRate = 0.08) => {
  return subtotal * taxRate;
};

export const calculateShipping = (subtotal) => {
  if (subtotal >= 100) {
    return 0;
  }
  return 5.99;
};

export const calculateTotal = (subtotal, tax, shipping) => {
  return subtotal + tax + shipping;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
