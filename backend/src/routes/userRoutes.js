"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.route('/').
    get(userController_1.getData);
exports.userRoutes.route('/profile').
    get(userController_1.getUserData).
    put(userController_1.updateUserData);
exports.userRoutes.route('/order').
    get(userController_1.getOrders).
    post(userController_1.addOrder);
exports.default = exports.userRoutes;
