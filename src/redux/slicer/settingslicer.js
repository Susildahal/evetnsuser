import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/config/axios";


export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async () => {
        const response = await axiosInstance.get('/settings');
        return response.data;
    }
);

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        settings: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.status = 'loading';
            }
            )
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.settings = action.payload;
            }
            )
            .addCase(fetchSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }
            );
    }
});
export default settingsSlice.reducer;
