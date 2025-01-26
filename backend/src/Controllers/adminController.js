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
exports.getBooks = getBooks;
exports.getBook = getBook;
exports.addBook = addBook;
exports.deleteBook = deleteBook;
exports.updateBook = updateBook;
const db_config_1 = require("../config/db.config");
function getBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.query.id;
            const Books = yield db_config_1.connectionPool.query("SELECT * FROM books WHERE publisher_id=$1", [userId]);
            return res.status(201).json(Books.rows);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
function getBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = req.params.id;
            console.log('sending', bookId);
            const Book = yield db_config_1.connectionPool.query("SELECT * FROM books WHERE id=$1", [bookId]);
            return res.status(201).json(Book.rows);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
function addBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('adding book');
        try {
            const userId = req.query.id;
            const { title, author, price, pages, language, category, discount, publisher, imgurl } = req.body;
            const imagePath = req.file ? req.file.path : null;
            const formattedDiscound = parseInt(discount) * 0.01;
            const newBook = yield db_config_1.connectionPool.query("INSERT INTO books (title, author, price, pages, language, publisher_id, imgurl, category, discount,publisher) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *", [title, author, price, pages, language, userId, imgurl, category, formattedDiscound, publisher]);
            return res.status(201).json(newBook.rows[0]);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = req.query.id;
            console.log('deleting', bookId);
            const deletedBook = yield db_config_1.connectionPool.query("DELETE FROM books WHERE id=$1 RETURNING *", [bookId]);
            return res.status(201).json(deletedBook.rows[0]);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = req.query.id;
            console.log('updating', bookId);
            const { title, author, price, pages, language, category, discount, imgurl } = req.body;
            const updatedBook = yield db_config_1.connectionPool.query("UPDATE books SET title=$1, author=$2, price=$3, pages=$4, language=$5, imgurl=$6, category=$7, discount=$8 WHERE id=$9 RETURNING *", [title, author, price, pages, language, imgurl, category, discount, bookId]);
            return res.status(201).json(updatedBook.rows[0]);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
