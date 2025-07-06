import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:8000/api'; // your backend URL

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/register`, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Register failed');
    }
  }
);


export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/login`, formData);

      // Check for your backend structure
      if (res.data.status && res.data.data.token) {
        return {
          token: res.data.data.token,
          role: res.data.data.role,
        };
      } else {
        return rejectWithValue(res.data.message || "Login failed");
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login error");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;



