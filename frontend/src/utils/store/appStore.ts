import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './adminSlice'
import cartReducer from './cartSlice'
import loadReducer from './loadSlice'
import userReducer from './userSlice';
const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        admin: adminReducer,
        load: loadReducer,
        user:userReducer
    }
});


export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
export default appStore;