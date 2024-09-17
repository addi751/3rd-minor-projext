import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Payment via Rapid API
export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async (paymentData, thunkAPI) => {
    try {
      const response = await axios.post('https://your-rapidapi-endpoint.com/processPayment', paymentData, {
        headers: {
          'X-RapidAPI-Key': 'your-rapid-api-key',
          'X-RapidAPI-Host': 'payment-provider',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.fulfilled, (state, action) => {
        state.status = 'Payment successful';
        state.error = null;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.status = null;
        state.error = 'Payment failed';
      });
  },
});

export default paymentSlice.reducer;
