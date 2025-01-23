import { MdDeleteOutline } from "react-icons/md";
import { useGetData } from "../utils/useGetData";
import { useDispatch } from "react-redux";
import { removeItem, setCartPrice, updateCartItem } from "../utils/store/cartSlice";
import { CartItemType } from "../model";
import { Loader } from "../pages/Loader";

export const CartItem = ({ cartItem }: {
    cartItem: CartItemType;
}) => {
    const book = useGetData().find((book) => book.id == cartItem.bookId);
    const dispatch = useDispatch();

    if (!book) {
        return <div className="text-gray-500 font-italic"><Loader /></div>;
    }

    book.discount = parseFloat(book.discount);
    book.price = parseInt(book.price)

    const discountedPrice = book.price - book.price * book.discount;
    console.log(discountedPrice);
    

    const handleDeleteCartItem = (id: number) => {
        dispatch(removeItem(id));
        console.log("Item Deleted");
        const totalPrice = discountedPrice * cartItem.quantity;
        dispatch(setCartPrice(totalPrice * -1));
    }

    const handleUpdateCartItem = (id: number, quantity: number) => {
        if (cartItem.quantity === 1 && quantity < cartItem.quantity) {
            // dispatch(removeItem(id));
            return;
        }
        if (quantity < cartItem.quantity) {
            dispatch(setCartPrice(discountedPrice * -1));
        }
        else {
            dispatch(setCartPrice(discountedPrice));
        }
        dispatch(updateCartItem({ bookId: id, quantity }));
    }

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 border rounded-lg p-4 shadow-sm">
            <div className="min-w-32 max-w-36">
                <img
                    src={book.imgurl? book.imgurl : "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"}
                    alt={book.title}
                    className=" rounded-lg"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col">
                <div className="text-lg font-semibold">{book.title}</div>
                <div className="text-sm text-gray-500">By: <span className="text-red-700">{book.author}</span> (Author)</div>
            </div>

            <div className="flex items-center justify-end md:justify-center flex-shrink-0">
                <div className="quantity-modifier-div">
                    <button
                        onClick={() => handleUpdateCartItem(cartItem.bookId, cartItem.quantity - 1)}
                        className="quantity-modifier-button">-</button>
                    <span className="px-3 py-1 border-x">{cartItem.quantity}</span>
                    <button
                        onClick={() => handleUpdateCartItem(cartItem.bookId, cartItem.quantity + 1)}
                        className="quantity-modifier-button">+</button>
                </div>
                <button
                    onClick={() => handleDeleteCartItem(cartItem.bookId)}
                    className="text-sm text-red-600 ml-3 hover:underline"><MdDeleteOutline size={20} />
                </button>
            </div>
        </div>
    );
};