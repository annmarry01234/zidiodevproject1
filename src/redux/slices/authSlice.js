// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust this if needed

// Async actions
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
});

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
});

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
});

export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId) => {
  await axios.delete(`${API_URL}/users/${userId}`);
  return userId;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'), (state) => {
        state.status = 'loading';
      })
      .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
