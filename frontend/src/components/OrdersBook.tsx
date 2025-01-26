import { useEffect, useState } from "react";
import { getBook } from "../services/api";
import { Book } from "../model";
import { Loader } from "../pages/Loader";

export const OrdersBook = ({ id }) => {
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        const getBookDetails = async () => {
            const data = await getBook(id);
            setBook(data[0]);
        };
        getBookDetails();
    }, [id]);

    if (!book) {
        return <Loader/>;
    }

    return (
        <div className="flex items-center space-x-4">
            <img
                className="w-24 h-36 object-cover rounded-md"
                src={book.imgurl}
                alt={book.title}
            />

            <div>
                <h3 className="text-base font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-500">Author: {book.author}</p>
                <p className="text-sm text-gray-500">Language: {book.language}</p>
            </div>
        </div>
    );
};
