import { Elements } from "@stripe/react-stripe-js"
import { Route, Routes } from "react-router-dom"
import CheckoutForm from "../components/CheckoutForm"
import CompletePage from "./CompletePage"
import { useEffect, useState } from "react"
import axios from "axios"
import { Appearance, loadStripe } from "@stripe/stripe-js"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../utils/store/appStore"
import { setLoadingState } from "../utils/store/loadSlice"
import { StateLoader } from "../components/StateLoader"
import { Error } from "./Error"
import { REMOTE_API } from "../config/config"

const stripePromise = loadStripe("pk_test_51QlYDVRkNoSxUe6s54cYryB3iY4CieSCvlHahra2tn5tSgla6eGc0ggTMcLSHAw0ov7FhqaDYjxC3meNmaIclO5j00WNciT5Qs");

export const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    // const items = [{ id: "xl-tshirt", amount: 1000 }]
    const cartPrice: number = useSelector((store: RootState) => store.cart.totalPrice)
    const discount = useSelector((store: RootState) => store.cart.bulkDiscount);
    const INRFactor = useSelector((store: RootState) => store.cart.INRFactor);
    const loadingState = useSelector((store: RootState) => store.load.loadingState)
    const dispatch = useDispatch();

    const totalCheckoutPrice = ((cartPrice + 5 - cartPrice * discount / 100) * INRFactor).toFixed(2);
    async function getSecret() {
        return await axios.post(REMOTE_API+'/create-payment-intent', { cartPrice: totalCheckoutPrice }).then(async (res) => {
            const data = await res.data;
            console.log(data);
            setClientSecret(await data.clientSecret)
            console.log(await data.paymentIntent);
            dispatch(setLoadingState(false))
        })
    }

    useEffect(() => {
        getSecret().catch((err) => {
            alert(err)
        })
    }, [])

    const loader = 'auto';
    const appearance: Appearance = {
        theme: 'flat',
        variables: {
            colorPrimary: '#373737'
        }
    }

    return (
        <div className="w-full h-fit">
            <StateLoader isLoading={loadingState} />

            {clientSecret && (
                <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                    <Routes>{
                        cartPrice ?
                            <Route path="/checkout" element={<CheckoutForm />} /> : <Route element={<Error />} />
                    }
                        <Route path="/complete" element={<CompletePage />} />
                    </Routes>
                </Elements>
            )}
        </div>
    )
}