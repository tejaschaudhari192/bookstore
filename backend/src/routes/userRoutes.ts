import express, { Router } from 'express';
import { loginUser, registerUser } from '../Controllers/authController';
import { addOrder, getData, getOrders, getUserData, updateUserData } from '../Controllers/userController';

export const userRoutes: Router = express.Router();

userRoutes.route('/').
    get(getData)

userRoutes.route('/profile').
    get(getUserData).
    put(updateUserData)

userRoutes.route('/order').
    get(getOrders).
    post(addOrder)

export default userRoutes;
