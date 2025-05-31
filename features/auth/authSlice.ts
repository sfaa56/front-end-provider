import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSession, deleteSession } from "@/lib/session";

import { User } from "@/types/user";
import * as authApi from "./authApi";
import { handleLogin, handleLogout } from "@/lib/actions/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

export const loginUser = createAsyncThunk<User, authApi.LoginPayload>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await authApi.login(data); // { user, token }

      // Store token securely
      
      await handleLogin(response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      return response.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.error || "Login failed"
      );
    }
  }
);


export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await handleLogout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setUserFromStorage: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }) 
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem("user");
        state.user = null;
      });
  },
});

export const {  setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
