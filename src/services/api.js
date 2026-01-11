import axios from 'axios';

// Mock product data - in a real app, this would be fetched from an API
// Using reliable image services for product images
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'Electronics',
    rating: 4.5,
    image: 'http://www.bhphotovideo.com/images/images2500x2500/beats_by_dr_dre_900_00109_01_studio_wireless_headphones_red_1016369.jpg',
    description: 'Premium wireless headphones with noise cancellation',
    inStock: true,
  },
  {
    id: 2,
    name: 'Smartphone Case',
    price: 24.99,
    category: 'Accessories',
    rating: 4.2,
    image: 'https://i5.walmartimages.com/asr/64d8c524-098c-4873-8ce0-3a37f424b14d.2e49cd7c17ee7fc3c3fcd495018fe157.jpeg',
    description: 'Durable protective case for your smartphone',
    inStock: true,
  },
  {
    id: 3,
    name: 'USB-C Cable',
    price: 19.99,
    category: 'Accessories',
    rating: 4.0,
    image: 'https://unifydropshipping.com/wp-content/uploads/2022/08/7A-USB-Type-C-Super-Fast-Charge-Cable-for-Huawei-P40-P30-Mate-40-USB-Fast.jpg',
    description: 'Fast charging USB-C cable',
    inStock: true,
  },
  {
    id: 4,
    name: 'Laptop Stand',
    price: 49.99,
    category: 'Accessories',
    rating: 4.7,
    image: 'https://images-na.ssl-images-amazon.com/images/I/71xlXzGX9aL.jpg',
    description: 'Ergonomic aluminum laptop stand',
    inStock: true,
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 29.99,
    category: 'Electronics',
    rating: 4.3,
    image: 'https://i5.walmartimages.com/asr/fe47a4ab-5ecc-414f-ae49-6c7a2669e11b_1.42489ef0e331c97f5252d7fc211303a1.jpeg',
    description: 'Ergonomic wireless mouse with long battery life',
    inStock: true,
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    price: 129.99,
    category: 'Electronics',
    rating: 4.8,
    image: 'https://techgage.com/wp-content/uploads/2018/10/Corsair-K70-RGB-MK2-Low-Profile-Mechanical-Keyboard-RGB-Keys-1.jpg',
    description: 'RGB mechanical keyboard with Cherry MX switches',
    inStock: false,
  },
  {
    id: 7,
    name: 'Monitor Stand',
    price: 39.99,
    category: 'Accessories',
    rating: 4.4,
    image: 'https://i5.walmartimages.com/asr/06a93a09-4f1a-4db2-b9ae-1c07ceb7d776_2.c215e85d5f7a7123d6d0fda0c8394018.jpeg',
    description: 'Adjustable monitor stand for better ergonomics',
    inStock: true,
  },
  {
    id: 8,
    name: 'Webcam HD',
    price: 79.99,
    category: 'Electronics',
    rating: 4.6,
    image: 'https://static3.webx.pk/files/4059/Images/71n4xdftxrl.-ac-sl1500--4059-0-110724074444620.jpg',
    description: '1080p HD webcam with auto-focus',
    inStock: true,
  },
];

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProducts = async () => {
  await delay(500); // Simulate network delay
  return mockProducts;
};

export const fetchProductById = async (id) => {
  await delay(300);
  const product = mockProducts.find((p) => p.id === parseInt(id));
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const searchProducts = async (query) => {
  await delay(300);
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
  );
};

// In a real application, you would use axios like this:
// const api = axios.create({
//   baseURL: 'https://api.example.com',
//   timeout: 10000,
// });

// export const fetchProducts = async () => {
//   const response = await api.get('/products');
//   return response.data;
// };
