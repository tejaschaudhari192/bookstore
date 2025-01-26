import { useDispatch, useSelector } from "react-redux";
import { clearCart, setBultDiscount } from "../utils/store/cartSlice";
import { RootState } from "../utils/store/appStore";
import { CartItem } from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { setLoadingState } from "../utils/store/loadSlice";
import { CartItemType } from "../model";
import { useState, useEffect } from "react";


const offerNote = (
    <div className="bg-red-200 text-red-800 text-center py-2 px-4 rounded-md shadow-md mb-6 md:mb-10">
        🎉 Get a <strong>5% discount</strong> on purchasing more than <strong>5 books</strong>,
        <strong>10%</strong> for more than <strong>10 books</strong>, and <strong>25%</strong> for more than
        <strong>25 books</strong>! 🛒
    </div>
);


const Cart = () => {
    const cartItems = useSelector((store: RootState) => store.cart.items);
    const cartPrice = useSelector((store: RootState) => store.cart.totalPrice);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [discount, setDiscount] = useState<number>(0);

    let totalCartQuantity = 0;
    cartItems.forEach((item: CartItemType) => {
        totalCartQuantity += item.quantity;
    });
    
    useEffect(() => {
        if (totalCartQuantity >= 5) {
            const factor = Math.floor(totalCartQuantity / 5);
            if (factor === 1) setDiscount(5);
            else if (factor >= 2 && factor < 5) setDiscount(10);
            else if (factor >= 5) setDiscount(25);
        } else {
            setDiscount(0);
        }
    }, [totalCartQuantity]);



    const handleCheckout = async (e:React.ChangeEvent<unknown>) => {
        e.preventDefault()
        dispatch(setLoadingState(true));
        dispatch(setBultDiscount(discount));
        navigate("/payment/checkout");
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto mt-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h1>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-[#929292] text-white rounded-lg hover:bg-[#5A5A5A] transition duration-300"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-10 p-4 md:p-10">
            <h1 className="font-bold text-center text-2xl md:text-3xl mb-6">
                Cart <span className="text-gray-500">({cartItems.length} Items)</span>
            </h1>
            {offerNote}

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Your Items</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cartItems.map((cartItem, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-lg p-4 shadow-md"
                            >
                                <CartItem cartItem={cartItem} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-1/3 bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg sticky top-20 h-fit">
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center tracking-wide">Order Summary</h2>
                    <div className="mb-6 border-b border-gray-300 pb-4">
                        <div className="flex justify-between text-lg font-medium text-gray-600 mb-3">
                            <span>Subtotal:</span>
                            <span>$ {cartPrice.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="bg-white -mx-2 p-2 rounded-md shadow-sm mb-3 transition text-red-600">
                                <div className="flex justify-between text-lg font-medium">
                                    <span>Promotion Applied:</span>
                                    <span>{discount.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between text-lg font-medium">
                                    <span>Discounted Price:</span>
                                    <span>$ {(cartPrice - cartPrice * discount / 100).toFixed(2)}</span>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-medium text-gray-600 mb-3">
                            <span>Shipping:</span>
                            <span>$5.00</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-800">
                            <span>Total:</span>
                            <span>$ {(cartPrice + 5 - cartPrice * discount / 100).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-[#848484] text-white py-3 rounded-xl shadow-md hover:bg-[#5A5A5A] transition duration-300 text-lg font-semibold tracking-wide"
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={handleClearCart}
                            className="w-full border-2 border-slate-800  py-3 rounded-xl hover:bg-slate-200 transition duration-300 text-lg font-semibold tracking-wide"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );

};

export default Cart;