import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "../../model";

const cartSlice = createSlice({
    name: 'cart',

    initialState: {
        items: [] as CartItemType[],
        totalPrice: 0,
        bulkDiscount: 0,
        INRFactor:86.21
    },
    reducers: {
        addItem: (state, action: PayloadAction<CartItemType>) => {
            const { bookId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.bookId === bookId);
            if (existingItem) {
                existingItem.quantity += quantity;
            }
            else {
                state.items.push({ bookId, quantity });
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const bookId = action.payload;
            console.log(bookId);

            const existingItem = state.items.find(item => item.bookId === bookId);
            console.log(existingItem);

            if (existingItem) {
                state.items = state.items.filter(item => item.bookId !== bookId);
            }
        },
        updateCartItem: (state, action: PayloadAction<CartItemType>) => {
            const { bookId, quantity } = action.payload;
            const existingItem = state.items.find(item => item.bookId === bookId);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items.length = 0;
            state.totalPrice = 0;

        },
        setCartPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice += action.payload;
        },
        setBultDiscount: (state, action: PayloadAction<number>) => {
            state.bulkDiscount = action.payload
        }
    }
});

export default cartSlice.reducer;

export const { addItem, removeItem, clearCart, updateCartItem, setCartPrice, setBultDiscount } = cartSlice.actions;