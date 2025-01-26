import { Book } from "../model"
import { useNavigate } from "react-router-dom";
import { Ratings } from "./Ratings";
import { API, getBooks } from "../services/api";
import { setBooks } from "../utils/store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store/appStore";
import { setLoadingState } from "../utils/store/loadSlice";

export const BookCard = ({ book }: { book: Book }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userType = useSelector((store: RootState) => store.user.type)

    const handleDirect = () => {
        navigate(`/book/${book.id}`);
    }

    const handleDeleteBook = () => {
        dispatch(setLoadingState(true))
        API.delete("/admin", { params: { id: book.id } }).then(() => {
            dispatch(setLoadingState(false))
        }).catch((err) => {
            alert(err)
        })

        const getBooksCall = async () => {
            const data:Book[] = await await getBooks();
            dispatch(setBooks(data));
            // setBooks(data);
        };
        getBooksCall();
    }



    return (
        <div
            onClick={() => { userType != 'admin' && handleDirect() }}
            className="min-w-fit min-h-[360px]  bg-white hover:scale-105 transition-all duration-250 cursor-pointer">
            <div className="overflow-hidden h-fit m-2 flex flex-col gap-3">
                <div className="w-fit  overflow-hidden ">
                    <img src={book.imgurl != null ? book.imgurl : "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"} alt=""
                        className="h-64 w-40 object-cover hover:scale-110 transition-all duration-500" />
                </div>
                {book.ratings &&
                    <Ratings ratings={book.ratings} />
                }
                <div>
                    <div className="font-bold">{book.title}</div>
                    <div className="text-sm">
                        <span className="text-slate-500 text-sm">{book.author}</span>
                    </div>
                    <div className="flex gap-2 mt-3 leading-tight items-center">
                        <div className="font-bold">${book.price - book.price * (book.discount)}</div>
                        <div className="text-slate-400 font-bold text-sm line-through decoration-[1.5px]">${Math.round(book.price)}</div>
                    </div>
                    {userType === 'admin' && (
                        <div className="flex my-2 justify-between">
                            <button
                                onClick={() => navigate(`/admin/edit/${book.id}`)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring focus:ring-blue-300">Edit</button>
                            <button
                                onClick={() => handleDeleteBook()}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring focus:ring-red-300">Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
