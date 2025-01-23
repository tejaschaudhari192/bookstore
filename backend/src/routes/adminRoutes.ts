import express, { Router } from 'express';
import { addBook, deleteBook, getBook, getBooks, updateBook } from '../Controllers/adminController';
import multer from 'multer';
import { verifyToken } from '../Middleware/authMiddleware';
export const adminRoutes: Router = express.Router();

adminRoutes.route('/').
    get(getBooks).
    post(addBook).
    delete(deleteBook).
    put(updateBook);

adminRoutes.route('/:id').
    get(getBook)

export default adminRoutes;