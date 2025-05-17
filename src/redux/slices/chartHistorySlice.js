import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch chart history
export const fetchChartHistory = createAsyncThunk('chart/fetchHistory', async () => {
    const response = await axios.get('/api/charts/user');
    return response.data;
});

const chartHistorySlice = createSlice({
    name: 'chartHistory',
    initialState: {
        history: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChartHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChartHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
                state.error = null;
            })
            .addCase(fetchChartHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default chartHistorySlice.reducer;
