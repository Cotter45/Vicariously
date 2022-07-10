import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authFetch } from './authFetch';
import { RootState, AppThunk } from './store';

import type { User } from './models';

export interface AuthState {
  user: User | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: undefined,
  status: 'idle',
};

export interface LoginAction {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  'session/loginUser',
  async ({ email, password }: LoginAction) => {
    const response = await authFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data.data;
  },
);

export const signup = createAsyncThunk(
  'session/signupUser',
  async (user: Partial<User>) => {
    const response = await authFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ ...user }),
    });
    const data = await response.json();
    return data.data;
  },
);

export const logout = (): AppThunk => async (dispatch) => {
  const response = await authFetch('/api/auth/logout', {
    method: 'DELETE',
  });
  const data = await response.json();
  dispatch(removeUser());
  return data;
};

export const restore = (): AppThunk => async (dispatch) => {
  const response = await authFetch('/api/auth/restore');
  const data = await response.json();
  dispatch(setUser(data.data));
  return data.data;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setUser, removeUser } = authSlice.actions;

export const currentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;