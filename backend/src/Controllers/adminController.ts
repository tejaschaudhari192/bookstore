import { Request, Response } from "express";
import { connectionPool } from "../config/db.config";

export async function getBooks(req: Request, res: Response): Promise<any> {
    try {
        const userId = req.query.id;
        const Books = await connectionPool.query("SELECT * FROM books WHERE publisher_id=$1", [userId]);
        return res.status(201).json(Books.rows);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getBook(req: Request, res: Response): Promise<any> {

    try {
        const bookId = req.params.id;
        console.log(bookId);
        const Book = await connectionPool.query("SELECT * FROM books WHERE id=$1", [bookId]);
        return res.status(201).json(Book.rows);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function addBook(req: Request, res: Response): Promise<any> {
    console.log('adding...');
    try {
        const userId = req.query.id;
        const { title, author, price, pages, language, category, discount, publisher,imgurl } = req.body;
        const imagePath = req.file ? req.file.path : null;
        console.log(imagePath);

        const formattedDiscound = parseInt(discount) * 0.01
        // console.log(formattedDiscound);


        const newBook = await connectionPool.query("INSERT INTO books (title, author, price, pages, language, publisher_id, imgurl, category, discount,publisher) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *", [title, author, price, pages, language, userId, imgurl, category, formattedDiscound, publisher]);
        return res.status(201).json(newBook.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteBook(req: Request, res: Response): Promise<any> {
    console.log('deleting...');

    try {
        const bookId = req.query.id;
        // console.log(bookId);

        const deletedBook = await connectionPool.query("DELETE FROM books WHERE id=$1 RETURNING *", [bookId]);

        return res.status(201).json(deletedBook.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateBook(req: Request, res: Response): Promise<any> {
    console.log('updating...');

    try {
        const bookId = req.query.id;
        console.log(req.body.imgurl);

        const { title, author, price, pages, language, category, discount, imgurl } = req.body;
        const updatedBook = await connectionPool.query("UPDATE books SET title=$1, author=$2, price=$3, pages=$4, language=$5, imgurl=$6, category=$7, discount=$8 WHERE id=$9 RETURNING *", [title, author, price, pages, language, imgurl, category, discount, bookId]);
        return res.status(201).json(updatedBook.rows[0]);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal server error" });
    }
}