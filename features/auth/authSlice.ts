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
      console.log("response111", response);

      localStorage.setItem("user", JSON.stringify(response.user));

      return response.user;
    } catch (error: any) {
      console.error("Login error:", error); // <--- Add this line
      return thunkAPI.rejectWithValue(
        error?.response?.data?.error || error?.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    await authApi.logout();
  } catch (error) {
    console.error("Login error:", error); // <--- Add this line
    return "Login failed";
  }
});

export const updateAdmin = createAsyncThunk<User, authApi.UpdatePayload>(
  "auth/update",
  async (data, thunkAPI) => {
    try {
      console.log("data", data);
      const response = await authApi.update(data); // { user, token }
      console.log("response111", response);

      localStorage.setItem("user", JSON.stringify(response));

      return response;
    } catch (error: any) {
      console.log("login error", error);
      return thunkAPI.rejectWithValue(
         error?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserFromStorage: (state, action) => {
      state.user = action.payload.user;
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
      })
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally update user info here if your API returns updated user
        state.user = action.payload;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
