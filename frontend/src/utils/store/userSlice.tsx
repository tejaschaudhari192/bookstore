import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../model";
import Cookies from "js-cookie";
const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        type: '',
        userId: 0
    },
    reducers: {
        addUser: (state, action: PayloadAction<UserType>) => {
            const { name, type, userId } = action.payload;
            state.name = name;
            state.type = type;
            state.userId = userId;
        },
        removeUser: (state) =>{
            state.name = '';
            state.type = '';
            state.userId = 0;
            Cookies.remove('user')
            Cookies.remove('token')
        }
    }
})

export default userSlice.reducer;
export const { addUser,removeUser } = userSlice.actions;