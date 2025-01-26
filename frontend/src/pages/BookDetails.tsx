import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, setCartPrice, updateCartItem } from "../utils/store/cartSlice";
import { RootState } from "../utils/store/appStore";
import { getBook } from "../services/api";
import { setLoadingState } from "../utils/store/loadSlice";
import { StateLoader } from "../components/StateLoader";
import { Book } from "../model";

export const BookDetails = () => {
    const [bookQuantity, setBookQuantity] = useState<number>(1);
    const { id } = useParams();
    const [book, setBook] = useState<Book>();
    const dispatch = useDispatch();
    const loadingState = useSelector((store: RootState) => store.load.loadingState)
    const INRFactor = useSelector((store: RootState) => store.cart.INRFactor);

    const cartItems = useSelector((store: RootState) => store.cart.items);

    useEffect(() => {
        async function getBookDetails() {
            dispatch(setLoadingState(true))

            const data = await getBook(parseInt(id!));
            console.log(data);
            const bookDetails = data[0]
            setBook(bookDetails);
            dispatch(setLoadingState(true))
        }
        getBookDetails()
    }, [])


    if (!book) return (<StateLoader isLoading={loadingState} />
    );


    const date = new Date(book.publication_date)
    // book.discount = parseFloat(book.discount);
    // book.price = parseInt(book.price)
    const discountedPrice = book.price - book.price * book.discount;
    // console.log(book.discount);

    const cartItem = cartItems.find((item) => item.bookId === book.id);

    const handleAddToCart = () => {
        console.log("Add to Cart");
        dispatch(addItem({ bookId: book.id, quantity: bookQuantity }));
        const totalPrice = discountedPrice * bookQuantity;
        console.log(totalPrice);
        dispatch(setCartPrice(totalPrice));
    }

    const handleDeleteCartItem = (id: number) => {
        if (!cartItem) return;
        dispatch(removeItem(id));
        const totalPrice = discountedPrice * cartItem.quantity;
        dispatch(setCartPrice(totalPrice * -1));
    }

    const handleUpdateCartItem = (id: number, quantity: number) => {
        if (!cartItem) return;
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
        <div className="flex flex-wrap md:mt-20 m-5 sm:justify-center md:m-10 w-full">
            <div className="md:w-1/4">
                <img src={book.imgurl ? book.imgurl : "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"} className="w-9/12 mx-10" alt="" />
            </div>
            <div className="md:w-1/2">
                <div className="text-2xl font-bold">{book.title}</div>
                <div className="text-lg text-slate-700">By : <span className="text-red-700">{book.author}</span> (Author)</div>

                <div className="my-10 mr-10 md:mr-5">
                    <p className="font-bold">Description: </p>
                    <p className="ml-2 mt-2">
                        Franny Stone has always been the kind of woman who is able to love but unable to stay. Leaving behind everything but her research gear, she arrives in Greenland with a singular purpose: to follow the last Arctic terns in the world on what might be their final migration to Antarctica. Franny talks her way onto a fishing boat, and she and the crew set sail, traveling ever further from shore and safety. But as Franny’s history begins to unspool—a passionate love affair, an absent family, a devastating crime—it becomes clear that she is chasing more than just the birds. When Franny's dark secrets catch up with her, how much is she willing to risk for one more chance at redemption?
                        Epic and intimate, heartbreaking and galvanizing, Charlotte McConaghy's Migrations is an ode to a disappearing world and a breathtaking page-turner about the possibility of hope against all odds.
                    </p>
                </div>
            </div>
            <div className="mt-5">
                <div className="bg-red-500 ml-10 text-white font-medium w-fit px-2 py-1 text-sm rounded-sm">-{book.discount * 100}%</div>
                <div className="ml-10">{book.category}</div>
                <div className="flex flex-col gap-5 my-5 px-4 md:px-8 lg:px-12">
                    <div className="text-xl font-semibold">Features</div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div className="font-bold">Language:</div>
                            <div className="font-normal">{book.language}</div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div className="font-bold">Pages:</div>
                            <div className="font-normal">{book.pages}</div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div className="font-bold">Publisher:</div>
                            <div className="font-normal">{book.publisher}</div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div className="font-bold">Publish Date:</div>
                            <div className="font-normal">{date.toDateString()}</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-end text-red-800 gap-3 m-5 ml-10">
                    <div className="text-3xl font-bold">${discountedPrice * bookQuantity}</div>
                    <div className="text-xl line-through">${book.price * bookQuantity}</div>
                </div>

                <div className="flex items-end text-red-800 gap-3 m-5 ml-10">
                    <div className="text-2xl font-bold">₹ {(discountedPrice * bookQuantity) * INRFactor}</div>
                </div>

                <div className="ml-10">


                    {
                        cartItem ? (

                            <div className="flex gap-3 flex-col w-fit">
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
                                    onClick={() => handleDeleteCartItem(book.id)}

                                    className="bg-[#465859] text-white p-2 rounded-lg">Remove from Cart</button>
                            </div>
                        )
                            : (
                                <div className="flex gap-3 flex-col w-fit">
                                    <div className="quantity-modifier-div">
                                        <button
                                            onClick={() => bookQuantity > 1 && setBookQuantity(bookQuantity - 1)}
                                            className="quantity-modifier-button">
                                            -
                                        </button>
                                        <span className="px-3 py-1 border-x">{bookQuantity}</span>

                                        <button
                                            onClick={() => setBookQuantity(bookQuantity + 1)}
                                            className="quantity-modifier-button">
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        className="bg-[#8abfc3] text-white p-2 rounded-lg">Add to Cart</button>
                                </div>
                            )
                    }
                </div>

            </div>
        </div>
    )
}
