import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fileReducer from './slices/fileSlice';
import chartHistoryReducer from './slices/chartHistorySlice'; // Import the new reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    file: fileReducer,
    chartHistory: chartHistoryReducer, // Add chartHistory reducer to the store
  },
});

export default store;
