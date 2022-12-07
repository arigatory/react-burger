import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import agent from '../../app/api/agent';

const initialState = {
  user: null,
  status: 'idle',
};

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data, thunkAPI) => {
    try {
      await agent.Account.forgotPassword(data);
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, thunkAPI) => {
    try {
      await agent.Account.resetPassword(data);
    } catch (error) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const accountSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
  },
});
