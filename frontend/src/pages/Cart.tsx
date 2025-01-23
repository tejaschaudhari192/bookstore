import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/store/cartSlice";
import { RootState } from "../utils/store/appStore";
import { CartItem } from "../components/CartItem";
import { Navigate, useNavigate } from "react-router-dom";
import { StateLoader } from "../components/StateLoader";
import { setLoadingState } from "../utils/store/loadSlice";


const Cart = () => {
    const cartItems = useSelector((store: RootState) => store.cart.items)
    const cartPrice = useSelector((store: RootState) => store.cart.totalPrice)
    const loadingState = useSelector((store: RootState) => store.load.loadingState)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    function handleClearCart() {
        dispatch(clearCart())
    }

    return (
        <div className="container mx-auto mt-10 p-4 md:p-10 md:mt-20 bg-white rounded-lg">
            <h1 className="font-bold text-center text-xl md:text-2xl mb-4 md:mb-6">
                Cart ({cartItems.length === 0 ? "Your cart is Empty" : cartItems.length + " Items"})
            </h1>
            {cartItems.length > 0 && (
                <div className="flex justify-between mb-4 md:mb-6">
                    <button
                        className="border-2 h-fit w-fit border-black bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition duration-300"
                        onClick={handleClearCart}
                    >
                        Clear 🧹
                    </button>
                    <div className="flex flex-col items-center gap-2">
                        <div>
                            <span>Total Price:</span>
                            <span className="price-text"> $ {cartPrice}</span>
                        </div>
                        <button
                            className="p-2 px-4 w-fit bg-yellow-300 rounded-lg"
                            onClick={() => {
                                dispatch(setLoadingState(true));
                                navigate('/payment/checkout')
                            }}
                        >checkout
                        </button>
                    </div>
                </div>
            )}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"> */}
            <div className="flex gap-5 flex-wrap justify-center">
                {cartItems.map((cartItem, index) => (
                    <div key={index} className="bg-gray-100 w-fit p-4 rounded-lg shadow-sm">
                        <CartItem cartItem={cartItem} />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Cart;