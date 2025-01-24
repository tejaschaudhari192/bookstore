import { Elements } from "@stripe/react-stripe-js"
import { Route, Routes } from "react-router-dom"
import CheckoutForm from "../components/CheckoutForm"
import CompletePage from "./CompletePage"
import { useEffect, useState } from "react"
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../utils/store/appStore"
import { setLoadingState } from "../utils/store/loadSlice"
import { StateLoader } from "../components/StateLoader"
import { Error } from "./Error"

const stripePromise = loadStripe("pk_test_51QfkH0D7NrQSN6EXt3CrCcq5Zipvms6MTtu6OVypKpQqM0HajHueKwofG0AOzvEDPloar1037G52KugjU6Ck9jLI00JUdbsUZh");

export const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    // const items = [{ id: "xl-tshirt", amount: 1000 }]
    const cartPrice = useSelector((store: RootState) => store.cart.totalPrice)
    const discount = useSelector((store: RootState) => store.cart.bulkDiscount);
    const loadingState = useSelector((store: RootState) => store.load.loadingState)
    const dispatch = useDispatch();

    async function getSecret() {
        return await axios.post('http://localhost:3030/create-payment-intent', { cartPrice: cartPrice + 5 - cartPrice * discount / 100 }).then(async (res) => {
            const data = await res.data;
            console.log(data);
            setClientSecret(await data.clientSecret)
            dispatch(setLoadingState(false))
        })
    }

    useEffect(() => {
        getSecret()
    }, [])

    const loader = 'auto';
    const appearance = {
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