import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/api';

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      category: 'all',
      priceRange: 'all',
      rating: 'all',
    },
    sortBy: 'name',
    searchQuery: '',
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setPriceRangeFilter: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.filters.rating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setCategoryFilter,
  setPriceRangeFilter,
  setRatingFilter,
  setSortBy,
  setSearchQuery,
} = productSlice.actions;

export default productSlice.reducer;
