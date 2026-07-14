import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../lib/api";
import { csrf } from "../lib/csrf";
import type {
  ApiError,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth";

type AuthStatus = "idle" | "loading" | "succeeded" | "failed";

interface AuthState {
  user: User | null;
  status: AuthStatus;
  error: ApiError | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

function apiError(error: unknown): ApiError {
  if (axios.isAxiosError<ApiError>(error) && error.response?.data) {
    return error.response.data;
  }

  return { message: null };
}

export const registerUser = createAsyncThunk<
  User,
  RegisterCredentials,
  { rejectValue: ApiError }
>("auth/registerUser", async (credentials, { rejectWithValue }) => {
  try {
    await csrf();
    const response = await api.post<AuthResponse>("/api/auth/register", credentials);
    return response.data.user;
  } catch (error: unknown) {
    return rejectWithValue(apiError(error));
  }
});

export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: ApiError }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    await csrf();
    const response = await api.post<AuthResponse>("/api/auth/login", credentials);
    return response.data.user;
  } catch (error: unknown) {
    return rejectWithValue(apiError(error));
  }
});

export const logoutUser = createAsyncThunk<
  true,
  void,
  { rejectValue: ApiError }
>("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await csrf();
    await api.post("/api/auth/logout");
    return true;
  } catch (error: unknown) {
    return rejectWithValue(apiError(error));
  }
});

export const fetchUser = createAsyncThunk<
  User,
  void,
  { rejectValue: ApiError | null }
>("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<User>("/api/auth/user");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return rejectWithValue(null);
    }

    return rejectWithValue(apiError(error));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? { message: null };
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? { message: null };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "idle";
        if (action.payload === null) {
          state.user = null;
        } else {
          state.error = action.payload ?? { message: null };
        }
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
