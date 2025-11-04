import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    // This connects your auth slice to the main store
    auth: authReducer,
    // You can add other reducers (slices) here later
  },
});