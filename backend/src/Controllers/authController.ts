import { Response, Request } from "express";
import { connectionPool } from "../config/db.config";
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export async function registerUser(req: Request, res: Response): Promise<any> {
    try {
        const { name, email, password, type } = req.body;

        const existingUser = await connectionPool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await connectionPool.query("INSERT INTO users (name, email, password, type) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, hashedPassword, type]);
        return res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function loginUser(req: Request, res: Response): Promise<any> {

    try {
        const { email, password } = req.body;

        const user = await connectionPool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Email not registered" });
        }
        
        

        const isPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!isPassword) {
            return res.status(401).json({ message: "Wrong Password" })
        }

        const token = jwt.sign({ user: user.rows[0], }, process.env.JWT_SECRET as string);
        // res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', user });

        return res.status(200).json({ user: user.rows[0], token });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function logoutUser(req: Request, res: Response): Promise<any> {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function checkAuth(req: Request, res: Response): Promise<any> {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await connectionPool.query("SELECT * FROM users WHERE id = $1", [decoded.id]);
        res.json({ user: user.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export async function verifyMessage(req: Request, res: Response): Promise<any> {
    console.log("from server verify token");
    return res.json({ message: 'Verify token', success: true });

}