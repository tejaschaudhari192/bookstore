import express, { Router } from 'express';
import { checkAuth, loginUser, logoutUser, registerUser, verifyMessage } from '../Controllers/authController';
import { verifyToken } from '../Middleware/authMiddleware';

export const authRoutes:Router = express.Router();

authRoutes.post('/register',registerUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/profile',verifyToken, checkAuth);
authRoutes.post('/profile',verifyToken, logoutUser);
authRoutes.get('/verify',verifyToken,verifyMessage)

export default authRoutes;