"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const SECRET = process.env.JWT_SECRET || "";
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Failed to authenticate token", success: false });
        }
        if (typeof decoded === "object" && decoded) {
            req.userId = decoded.id;
        }
        next();
    });
};
exports.verifyToken = verifyToken;
