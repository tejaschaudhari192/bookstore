import { useEffect, useState } from "react";
import { getBooks } from "../services/api";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { Book } from "../model";
import { Dispatch } from "@reduxjs/toolkit";
import { setBooks } from "../utils/store/adminSlice";
import { RootState } from "../utils/store/appStore";
import Cookies from 'js-cookie';

export const Admin = () => {
    // const [books, setBooks] = useState([]);
    const books = useSelector((state: RootState) => state.admin.books);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = JSON.parse(Cookies.get('user')).id;
    // console.log(userId);

    useEffect(() => {
        const getBooksCall = async () => {
            const books = await getBooks();
            const data = await books.data;
            dispatch(setBooks(data));
            // setBooks(data);
        };
        getBooksCall();
    }, [])
    return (
        <div className="h-fit w-full mt-20 ">
            <div className="flex m-10 mt-20 gap-7 flex-wrap">
                {books.map((book) => {
                    return (
                        <BookCard key={book.id} book={book} />
                    )
                }
                )}
            </div>

            <button
                onClick={() => navigate('/admin/add')}
                className="fixed bottom-5 right-5">
                <div className='flex gap-1 bg-red-400 text-white px-3 p-2 rounded-lg items-center'>
                    {/* <IoMdAddCircleOutline size={40} /> */}
                    <span className="text-2xl -mt-[3px]">+</span>
                    <span className='text-md'>Add Book</span>
                </div>
            </button>
        </div>
    )
}
