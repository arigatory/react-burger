import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { history } from '../..';
import agent from '../api/agent';
import { FieldValues } from 'react-hook-form';


const initialState = {
  user: null,
  status: 'idle',
  token: null,
};

export const forgotPassword = createAsyncThunk<void, FieldValues>(
  'auth/forgotPassword',
  async (data, thunkAPI) => {
    try {
      await agent.Account.forgotPassword(data);
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, thunkAPI) => {
    try {
      await agent.Account.resetPassword(data);
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { success, accessToken, refreshToken, user } = userDto;
      if (success) {
        localStorage.setItem(
          'token',
          JSON.stringify({ accessToken, refreshToken })
        );
        thunkAPI.dispatch(setUser(user));
        thunkAPI.dispatch(setToken({ accessToken, refreshToken }));
      }
      return user;
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        thunkAPI.dispatch(setToken(JSON.parse(token)));
        const userDto = await agent.Account.getProfile();
        const { success, user } = userDto;
        if (success) thunkAPI.dispatch(setUser(user));
        return user;
      }
      return null;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const tokenDto = await agent.Account.getProfile();
      const { success, accessToken, refreshToken } = tokenDto;
      console.log(tokenDto);
      if (success) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const accountSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      history.push('/');
    },
  },
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
    builder.addMatcher(isAnyOf(loginUser.fulfilled), (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(
      isAnyOf(loginUser.rejected, fetchProfile.rejected, refreshToken.rejected),
      (_, action) => {
        throw action.payload;
      }
    );
  },
});

export const { signOut, setUser, setToken } = accountSlice.actions;
