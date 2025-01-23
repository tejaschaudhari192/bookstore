import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        books: [],
    },
    reducers: {
        setBooks: (state, action) => {
        state.books = action.payload;
        },
    },
});

export default adminSlice.reducer;
export const { setBooks } = adminSlice.actions;