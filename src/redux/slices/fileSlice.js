// src/redux/slices/fileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/files'; // Adjust if needed

// Async actions
export const uploadFile = createAsyncThunk('files/uploadFile', async (fileData) => {
  const formData = new FormData();
  formData.append('file', fileData);

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

export const fetchUploadHistory = createAsyncThunk('files/fetchUploadHistory', async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
});

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearFiles(state) {
      state.files = [];
    },
    setFiles(state, action) {
      state.files = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(fetchUploadHistory.fulfilled, (state, action) => {
        state.files = action.payload;
        state.status = 'succeeded';
      })
      .addMatcher((action) => action.type.startsWith('files/') && action.type.endsWith('/pending'), (state) => {
        state.status = 'loading';
      })
      .addMatcher((action) => action.type.startsWith('files/') && action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearFiles, setFiles } = fileSlice.actions;
export default fileSlice.reducer;
