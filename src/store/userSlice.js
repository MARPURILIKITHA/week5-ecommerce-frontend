import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

const saveUserToStorage = (user) => {
  try {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: loadUserFromStorage(),
    isAuthenticated: !!loadUserFromStorage(),
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      saveUserToStorage(action.payload);
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      saveUserToStorage(null);
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
      saveUserToStorage(state.currentUser);
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
