import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story, StoryState } from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// AsyncThunk to fetch categories from the API
export const fetchStories = createAsyncThunk<Story[]>(
    'stories/fetch',
    async () => {
        console.log('started fetching')
        const response = await fetch(`${BASE_URL}/story`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',

            headers: {
                "ngrok-skip-browser-warning": "true",
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return response.json();
    }
);

// Initial state for the categories slice
const initialState: StoryState = {
    stories: [],
    loading: false,
    error: null,
};

// Categories slice
export const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        addStory: (state, action: PayloadAction<Story>) => {
            state.stories = [action.payload, ...state.stories];
        },
        updateStories: (state, action: PayloadAction<Story[]>) => {
            state.stories = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStories.fulfilled, (state, action) => {
                state.loading = false;
                state.stories = action.payload;
            })
            .addCase(fetchStories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch stories';
            });
    },
});

export const { addStory, updateStories } = storiesSlice.actions;

export default storiesSlice.reducer;
