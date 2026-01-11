# Advanced E-commerce Frontend

## Project Description

A modern e-commerce frontend built with React, featuring product catalog, shopping cart, user authentication, and responsive design. Demonstrates advanced frontend development skills and modern web practices.

## Features

- **Product Catalog** with filtering and sorting
  - Category filtering
  - Price range filtering
  - Rating filtering
  - Multiple sort options (name, price, rating)
  - Real-time search with debouncing

- **Interactive Shopping Cart**
  - Add/remove items from cart
  - Update quantities with validation
  - Calculate totals, taxes, and shipping
  - Persist cart data to localStorage
  - Real-time cart updates

- **User Authentication Simulation**
  - Login/Logout functionality
  - Protected routes
  - User session management with localStorage

- **Product Search** with autocomplete
  - Real-time search across product names, descriptions, and categories
  - Debounced search input for performance

- **Wishlist Functionality**
  - Add/remove items from wishlist
  - Persistent wishlist storage

- **Product Detail Pages**
  - Detailed product information
  - Image gallery
  - Quantity selection
  - Breadcrumb navigation

- **Checkout Process**
  - Comprehensive form validation
  - Shipping information
  - Payment information
  - Order summary
  - Success confirmation

- **Responsive Design** for all devices
  - Mobile-first approach
  - Bootstrap grid system
  - Responsive navigation

- **Performance Optimizations**
  - Code splitting with React.lazy
  - Lazy loading of routes
  - Memoized filtering and sorting
  - Debounced search input
  - Optimized re-renders

- **State Management** with Redux Toolkit
  - Centralized state management
  - Cart state management
  - Product state management
  - User state management
  - Wishlist state management

## Technologies

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Bootstrap 5** - CSS framework for styling
- **Axios** - HTTP client (configured for API calls)
- **Vite** - Build tool and development server
- **LocalStorage** - Client-side persistence

## Project Structure

```
week5-ecommerce-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── CartItem.jsx
│   │   │   └── CartSummary.jsx
│   │   ├── Checkout/
│   │   │   └── CheckoutForm.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Modal.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   └── ProductCard/
│   │       └── ProductCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── CartPage.jsx
│   │   └── Login.jsx
│   ├── store/
│   │   ├── cartSlice.js
│   │   ├── productSlice.js
│   │   ├── userSlice.js
│   │   ├── wishlistSlice.js
│   │   └── index.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd week5-ecommerce-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Code Structure

### Components Architecture

The application follows a component-based architecture with clear separation of concerns:

- **Common Components** (`src/components/common/`): Reusable UI components (Button, Card, Modal)
- **Feature Components** (`src/components/Cart/`, `src/components/Checkout/`, etc.): Feature-specific components
- **Pages** (`src/pages/`): Route-level page components

### State Management

The application uses Redux Toolkit for state management with the following slices:

- **productSlice**: Manages product data, filters, sorting, and search
- **cartSlice**: Manages shopping cart items with localStorage persistence
- **userSlice**: Manages user authentication state
- **wishlistSlice**: Manages wishlist items with localStorage persistence

### Data Flow

1. Components dispatch actions to Redux store
2. Redux reducers update state based on actions
3. Components subscribe to state changes via `useSelector`
4. State changes trigger component re-renders
5. localStorage is used for persistence of cart, user, and wishlist data

### Component Hierarchy

```
App
├── Header
│   ├── Navigation Links
│   └── User Authentication Status
└── Routes
    ├── Home
    │   └── ProductCard (Featured Products)
    ├── ProductList
    │   ├── Filters Sidebar
    │   └── ProductCard Grid
    ├── ProductDetail
    │   └── Product Information
    ├── CartPage
    │   ├── CartItem (List)
    │   └── CartSummary
    ├── Login
    │   └── Login Form
    └── Checkout
        ├── CheckoutForm
        └── Order Summary
```

## Testing Evidence

### Manual Testing Scenarios

1. **Product Catalog**
   - [x] Products load and display correctly
   - [x] Filtering by category works
   - [x] Filtering by price range works
   - [x] Filtering by rating works
   - [x] Sorting by name, price, and rating works
   - [x] Search functionality works with debouncing

2. **Shopping Cart**
   - [x] Add items to cart
   - [x] Remove items from cart
   - [x] Update item quantities
   - [x] Cart totals calculate correctly (subtotal, tax, shipping, total)
   - [x] Cart persists to localStorage
   - [x] Cart badge shows correct item count

3. **User Authentication**
   - [x] Login with valid credentials
   - [x] Logout functionality
   - [x] User state persists to localStorage
   - [x] Protected routes redirect unauthenticated users

4. **Checkout Process**
   - [x] Form validation works for all fields
   - [x] Invalid email shows error
   - [x] Required fields show errors when empty
   - [x] Order submission clears cart
   - [x] Success modal displays after order

5. **Wishlist**
   - [x] Add items to wishlist
   - [x] Remove items from wishlist
   - [x] Wishlist persists to localStorage
   - [x] Wishlist icon updates based on state

6. **Performance**
   - [x] Code splitting works (check Network tab)
   - [x] Debounced search prevents excessive re-renders
   - [x] Memoized filtering and sorting
   - [x] Lazy loading of route components

### Example Test Cases

**Test Case 1: Add Product to Cart**
- **Input**: Click "Add to Cart" on a product
- **Expected**: Product appears in cart, cart count increases, cart persists after refresh

**Test Case 2: Filter Products**
- **Input**: Select category "Electronics" from filter dropdown
- **Expected**: Only electronics products are displayed

**Test Case 3: Search Products**
- **Input**: Type "headphones" in search box
- **Expected**: Only products matching "headphones" are displayed (debounced)

**Test Case 4: Checkout Validation**
- **Input**: Submit checkout form with empty email field
- **Expected**: Error message "Email is required" appears

**Test Case 5: Calculate Cart Totals**
- **Input**: Add items with prices $99.99, $24.99, $19.99 (quantities: 1, 2, 1)
- **Expected**: Subtotal = $169.96, Shipping = $5.99, Tax = $13.60, Total = $189.55

## Visual Documentation

To capture screenshots demonstrating functionality:

1. **Product Catalog Page:**
   - Screenshot of product grid with filters visible
   - Screenshot showing filtered results
   - Screenshot showing sorted results

2. **Shopping Cart:**
   - Screenshot of cart with multiple items
   - Screenshot showing quantity updates
   - Screenshot showing cart summary with totals

3. **Product Detail:**
   - Screenshot of product detail page
   - Screenshot showing quantity selector

4. **Checkout Process:**
   - Screenshot of checkout form
   - Screenshot of validation errors
   - Screenshot of success modal

5. **Responsive Design:**
   - Screenshots on mobile, tablet, and desktop viewports
   - Screenshot of mobile navigation menu

6. **Authentication:**
   - Screenshot of login page
   - Screenshot showing authenticated state in header

## Technical Details

### Algorithms & Data Structures

- **Debouncing**: Used for search input to prevent excessive API calls/re-renders
- **Memoization**: `useMemo` for filtered and sorted product lists
- **Array Operations**: Filtering, sorting, and mapping for product manipulation
- **LocalStorage**: Key-value storage for persistence

### Architecture Patterns

- **Component-Based Architecture**: Modular, reusable components
- **Container/Presentational Pattern**: Pages as containers, components as presenters
- **Redux Pattern**: Unidirectional data flow with centralized state
- **Higher-Order Components**: Code splitting with React.lazy

### Performance Optimizations

1. **Code Splitting**: Routes loaded lazily with React.lazy and Suspense
2. **Debouncing**: Search input debounced to reduce unnecessary computations
3. **Memoization**: Filtered/sorted products memoized with useMemo
4. **LocalStorage Caching**: Cart, user, and wishlist data cached locally
5. **Optimized Re-renders**: Redux selectors prevent unnecessary re-renders

### API Integration

The application includes a mock API service (`src/services/api.js`) that simulates backend API calls. In a production environment, this would be replaced with actual API endpoints:

```javascript
// Example API integration (currently mocked)
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Backend API integration
- [ ] Product reviews and ratings display
- [ ] Product comparison feature
- [ ] Advanced search with filters
- [ ] User profile page
- [ ] Order history
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Product recommendations

## License

This project is created for educational purposes as part of The Developers Arena internship program.

## Author

Created as part of Week 5 Intern Tasks - Advanced E-commerce Frontend Project

---

**Note**: This is a frontend-only implementation. Backend API integration would be required for a production-ready application.
