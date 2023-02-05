import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import agent from '../api/agent';
import { FieldValues } from 'react-hook-form';
import { Profile } from '../models/user';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';

interface AccountState {
  profile: Profile | null;
  status: string;
}

export interface User {
  email: string;
  name: string;
}

export interface UserDto {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  message?: string;
}

const initialState: AccountState = {
  profile: null,
  status: 'idle',
};

export const loginUser = createAsyncThunk<Profile, FieldValues>(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const userDto: UserDto = await agent.Account.login(data);
      const { success, accessToken, refreshToken, user } = userDto;
      if (success) {
        const profile: Profile = {
          email: user!.email,
          name: user!.name,
          accessToken: accessToken!,
          refreshToken: refreshToken!,
        };
        localStorage.setItem('profile', JSON.stringify(profile));
        thunkAPI.dispatch(setUser(profile));
        return profile;
      } else {
        return thunkAPI.rejectWithValue({ error: userDto.message });
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchProfile = createAsyncThunk<Profile>(
  'auth/login',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('profile')!)));
    try {
      const userDto: UserDto = await agent.Account.getProfile();
      const { success, user } = userDto;
      if (success) {
        let profile: Profile;
        const profileString = localStorage.getItem('profile');
        if (profileString) {
          profile = JSON.parse(profileString);
        } else {
          profile = {
            email: user!.email,
            name: user!.name,
            accessToken: '',
            refreshToken: '',
          };
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        return profile;
      } else {
        return thunkAPI.rejectWithValue({ error: userDto.message });
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('profile')) return false;
    },
  }
);

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

export const resetPassword = createAsyncThunk<void, FieldValues>(
  'auth/resetPassword',
  async (data, thunkAPI) => {
    try {
      await agent.Account.resetPassword(data);
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const tokenDto = await agent.Account.getProfile();
      const { success, accessToken, refreshToken } = tokenDto;
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
      state.profile = action.payload;
    },
    signOut: (state) => {
      state.profile = null;
      localStorage.removeItem('profile');
      router.navigate('/');
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
      state.status = 'idle';
    });
    builder.addCase(fetchProfile.rejected, (state) => {
      state.profile = null;
      localStorage.removeItem('profile');
      toast.error('Сессия истекла. Пожалуйста, залогиньтесь снова');
      router.navigate('/');
    });
    builder.addMatcher(
      isAnyOf(loginUser.fulfilled, fetchProfile.fulfilled),
      (state, action) => {
        state.profile = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(loginUser.rejected, refreshToken.rejected),
      (_, action) => {
        console.log(action.payload);
      }
    );
  },
});

export const { signOut, setUser } = accountSlice.actions;
