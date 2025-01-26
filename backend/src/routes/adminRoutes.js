"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../Controllers/adminController");
exports.adminRoutes = express_1.default.Router();
exports.adminRoutes.route('/').
    get(adminController_1.getBooks).
    post(adminController_1.addBook).
    delete(adminController_1.deleteBook).
    put(adminController_1.updateBook);
exports.adminRoutes.route('/:id').
    get(adminController_1.getBook);
exports.default = exports.adminRoutes;
