import { createSlice } from '@reduxjs/toolkit';

// Check if a token already exists in localStorage
const authToken = localStorage.getItem('authToken');

const initialState = {
  token: authToken,
  isLoggedIn: authToken ? true : false,
  user: null, // We can store user details here later
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // This action is called when a user successfully logs in
    loginSuccess: (state, action) => {
      const { access, refresh } = action.payload;
      localStorage.setItem('authToken', access);
      localStorage.setItem('refreshToken', refresh);
      state.token = access;
      state.isLoggedIn = true;
    },
    // This action is called when a user logs out
    logout: (state) => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },
    // You can add an action to load user data
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export the actions
export const { loginSuccess, logout, setUser } = authSlice.actions;

export default authSlice.reducer;