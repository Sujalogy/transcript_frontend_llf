// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse, LoginCredentials, AuthState } from "@/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;



export const checkAuthStatus = createAsyncThunk<
    LoginResponse,
    void,
    { rejectValue: string }
>('auth/checkStatus', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "ngrok-skip-browser-warning": "true",
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Not authenticated');
        }

        const data = await response.json();
        return data as LoginResponse;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});

export const logout = createAsyncThunk<
    boolean,
    void,
    { rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "ngrok-skip-browser-warning": "true",
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return true;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // You can add additional reducers here if needed
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Check auth status cases
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.loading = false;
            })
            // Logout cases
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload || 'Logout failed';
            });
    },
});

// Export actions
export const { clearErrors } = authSlice.actions;

// Export selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;