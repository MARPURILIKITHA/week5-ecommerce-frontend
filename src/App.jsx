import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const Login = lazy(() => import('./pages/Login'));
const CheckoutForm = lazy(() => import('./components/Checkout/CheckoutForm'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <main className="min-vh-100">
            <Suspense
              fallback={
                <div className="container py-5">
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<CheckoutForm />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="bg-dark text-white text-center py-4 mt-5">
            <div className="container">
              <p className="mb-0">
                &copy; 2024 The Developers Arena. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
