"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.checkAuth = checkAuth;
exports.verifyMessage = verifyMessage;
const db_config_1 = require("../config/db.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, type } = req.body;
            const existingUser = yield db_config_1.connectionPool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = yield db_config_1.connectionPool.query("INSERT INTO users (name, email, password, type) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, hashedPassword, type]);
            return res.status(201).json(newUser.rows[0]);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield db_config_1.connectionPool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (user.rows.length === 0) {
                return res.status(400).json({ message: "Email not registered" });
            }
            const isPassword = yield bcrypt_1.default.compare(password, user.rows[0].password);
            if (!isPassword) {
                return res.status(401).json({ message: "Wrong Password" });
            }
            const token = jsonwebtoken_1.default.sign({ user: user.rows[0], }, process.env.JWT_SECRET);
            // res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', user });
            return res.status(200).json({ user: user.rows[0], token });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie('token');
            return res.status(200).json({ message: 'Logged out successfully' });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
function checkAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ error: 'Unauthorized' });
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = yield db_config_1.connectionPool.query("SELECT * FROM users WHERE id = $1", [decoded.id]);
            res.json({ user: user.rows[0] });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
    });
}
;
function verifyMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("from server verify token");
        return res.json({ message: 'Verify token', success: true });
    });
}
