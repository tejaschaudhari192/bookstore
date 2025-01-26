"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../Controllers/authController");
const authMiddleware_1 = require("../Middleware/authMiddleware");
exports.authRoutes = express_1.default.Router();
exports.authRoutes.post('/register', authController_1.registerUser);
exports.authRoutes.post('/login', authController_1.loginUser);
exports.authRoutes.get('/profile', authMiddleware_1.verifyToken, authController_1.checkAuth);
exports.authRoutes.post('/profile', authMiddleware_1.verifyToken, authController_1.logoutUser);
exports.authRoutes.get('/verify', authMiddleware_1.verifyToken, authController_1.verifyMessage);
exports.default = exports.authRoutes;
