import { Request, Response } from "express";
import { connectionPool } from "../config/db.config";

export async function getData(req: Request, res: Response): Promise<any> {
    try {
        const data = await connectionPool.query("SELECT * FROM books");
        return res.status(201).json(data.rows);
    } catch (error) {
        return error
    }
}

export async function getUserData(req: Request, res: Response): Promise<any> {
    const id = req.query.id;
    // console.log(id);

    try {
        const data = await connectionPool.query("SELECT * FROM users where id=$1", [id]);
        return res.status(201).json(data.rows[0]);
    } catch (error) {
        return error
    }
}
export async function updateUserData(req: Request, res: Response): Promise<any> {
    const id = req.query.id;
    const name = req.body.name;
    // console.log(id);

    try {
        const data = await connectionPool.query("UPDATE users SET name=$1 WHERE id=$2 RETURNING *", [name, id]);
        return res.status(201).json(data.rows[0]);
    } catch (error) {
        return error
    }
}

export async function addOrder(req: Request, res: Response): Promise<any> {
    try {
        const userId = req.query.id;
        console.log(req.body);
        const { totalPrice, address, payment_intent_id } = req.body;

        const order = await connectionPool.query("INSERT TNTO orders (user_id,total_amount,payment_intent_id,shipping_address) VALUES ($1, $2, $3, $4) RETURNING *", [userId, totalPrice, payment_intent_id, address]);
        res.status(200).json(order.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export async function getOrders(req: Request, res: Response): Promise<any> {
    try {
        const userId = req.query.id;
        const orders = await connectionPool.query("SELECT * FROM orders WHERE user_id =$1", [userId])
        res.status(200).json(orders.rows)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}