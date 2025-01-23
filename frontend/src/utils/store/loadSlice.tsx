import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadSlice = createSlice({
    name: 'load',

    initialState: {
        loadingState: false,
    },
    reducers: {
        setLoadingState: (state,action:PayloadAction<boolean>) => {
            state.loadingState = action.payload;
        },

    }
});

export default loadSlice.reducer;

export const { setLoadingState } = loadSlice.actions;