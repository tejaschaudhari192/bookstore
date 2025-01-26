import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}


import jwt from "jsonwebtoken";
require("dotenv").config();

const SECRET = process.env.JWT_SECRET || "";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Failed to authenticate token", success: false });
    }

    if (typeof decoded === "object" && decoded) {
      (req as AuthenticatedRequest).userId = decoded.id as string;
    }

    next();
  });
};
