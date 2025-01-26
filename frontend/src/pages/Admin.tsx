import { useEffect } from "react";
import { getBooks } from "../services/api";
import {  } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../utils/store/adminSlice";
import { RootState } from "../utils/store/appStore";
import { Loader } from "./Loader";
import { Book } from "../model";
import { StateLoader } from "../components/StateLoader";

export const Admin = () => {
    const books = useSelector((state: RootState) => state.admin.books);
    const loadingState = useSelector((state:RootState)=> state.load.loadingState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(userId);

    useEffect(() => {
        const getBooksCall = async () => {
            const books = await getBooks();
            const data = await books;
            dispatch(setBooks(data));
            // setBooks(data);
        };
        getBooksCall();
    }, [books])

    if (!books) {
        return <Loader/>
    }

    if (loadingState) {
        return <Loader/>
    }

    return (
        <div className="h-fit w-full mt-20 ">
            <div className="flex m-10 mt-20 gap-7 flex-wrap">
                {books.map((book:Book) => {
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
