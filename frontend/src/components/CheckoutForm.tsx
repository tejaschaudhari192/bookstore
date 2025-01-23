import React, { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
    AddressElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store/appStore";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [address, setAddress] = useState();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const cartPrice = useSelector((store: RootState) => store.cart.totalPrice);

    const handleAddressComplete = (event) => {
        if (event.complete) {
            setAddress(event.value.address);
        }
    };

    const handleNextStep = () => {
        setStep(2);
    };

    const handlePreviousStep = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://localhost:5173/payment/complete",
            },
        });

        if (error) {
            setMessage(
                error.type === "card_error" || error.type === "validation_error"
                    ? error.message
                    : "An unexpected error occurred."
            );
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion",
    };

    return (
        <div className="w-full max-w-5xl h-screen mx-auto mt-20 p-4 bg-white rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between items-center mb-2">
                    <span>Subtotal:</span>
                    <span>${cartPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span>Shipping:</span>
                    <span>$5.00</span>
                </div>
                <div className="flex justify-between items-center font-bold">
                    <span>Total:</span>
                    <span>${(cartPrice + 5).toFixed(2)}</span>
                </div>
                {address && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                        <div className="text-sm text-gray-700">
                            <p>{address.line1}</p>
                            {address.line2 && <p>{address.line2}</p>}
                            <p>
                                {address.city}, {address.state} {address.postal_code}
                            </p>
                            <p>{address.country}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="col-span-2 relative min-h-fit"> 
                <div
                    className={` inset-0 transition-all duration-700 ease-in-out transform ${
                        step === 1 ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    }`}
                >
                    <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                    <form>
                        <AddressElement
                            options={{ mode: "shipping" }}
                            onChange={handleAddressComplete}
                        />
                        <button
                            type="button"
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleNextStep}
                        >
                            Next
                        </button>
                    </form>
                </div>

                <div
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                        step === 2 ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                    }`}
                >
                    <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                    <form id="payment-form" onSubmit={handleSubmit}>
                        <PaymentElement
                            id="payment-element"
                            options={paymentElementOptions}
                        />
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={handlePreviousStep}
                            >
                                Back
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                disabled={isLoading || !stripe || !elements}
                                id="submit"
                            >
                                {isLoading ? (
                                    <div className="spinner" id="spinner"></div>
                                ) : (
                                    "Pay Now"
                                )}
                            </button>
                        </div>
                    </form>
                    {message && (
                        <div id="payment-message" className="mt-2 text-red-500 text-sm">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
