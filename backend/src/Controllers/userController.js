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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = getData;
exports.getUserData = getUserData;
exports.updateUserData = updateUserData;
exports.addOrder = addOrder;
exports.getOrders = getOrders;
const db_config_1 = require("../config/db.config");
function getData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield db_config_1.connectionPool.query("SELECT * FROM books");
            return res.status(201).json(data.rows);
        }
        catch (error) {
            return error;
        }
    });
}
function getUserData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.query.id;
        try {
            const data = yield db_config_1.connectionPool.query("SELECT * FROM users where id=$1", [id]);
            return res.status(201).json(data.rows[0]);
        }
        catch (error) {
            return error;
        }
    });
}
function updateUserData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.query.id;
        const name = req.body.name;
        try {
            const data = yield db_config_1.connectionPool.query("UPDATE users SET name=$1 WHERE id=$2 RETURNING *", [name, id]);
            return res.status(201).json(data.rows[0]);
        }
        catch (error) {
            return error;
        }
    });
}
function addOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.query.id;
            const { total_amount, shipping_address, payment_intent_id, items } = req.body;
            const order = yield db_config_1.connectionPool.query("INSERT INTO orders (user_id, total_amount,payment_intent_id,shipping_address,items) VALUES ($1, $2, $3, $4,$5) RETURNING *", [userId, total_amount, payment_intent_id, shipping_address, JSON.stringify(items)]);
            res.status(200).json(order.rows[0]);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
function getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.query.id;
            const orders = yield db_config_1.connectionPool.query("SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC", [userId]);
            res.status(200).json(orders.rows);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
