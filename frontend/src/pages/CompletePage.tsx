import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { orderDataType } from "../model";
import { addOrder } from "../services/api";


const STATUS_CONTENT_MAP :Record<any,any>= {
    succeeded: {
        text: "Order Placed Successfully! 🎉",
        iconColor: "bg-green-500/80",
        icon: "✅",
    },
    processing: {
        text: "Your payment is processing...",
        iconColor: "bg-gray-500",
        icon: "⏳",
    },
    requires_payment_method: {
        text: "Payment failed. Please try again.",
        iconColor: "bg-red-300",
        icon: "❌",
    },
    default: {
        text: "Processing your payment...",
        iconColor: "bg-blue-400",
        icon: "ℹ️",
    },
};

export default function CompletePage() {
    const stripe = useStripe();
    const [status, setStatus] = useState("default");
    const [intentId, setIntentId] = useState("");

    useEffect(() => {
        if (status === "succeeded" && localStorage.getItem("order")) {
            const order: orderDataType = JSON.parse(localStorage.getItem("order")!);
            order.payment_intent_id = intentId;

            addOrder(order)
                .then((result) => {
                    console.log(result);
                    localStorage.removeItem("order");
                })
                .catch((err) => {
                    alert(err);
                });
        }

        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (!paymentIntent) return;

            setStatus(paymentIntent.status);
            setIntentId(paymentIntent.id);
        });
    }, [stripe, status]);

    const { text, iconColor, icon } = STATUS_CONTENT_MAP[status] || STATUS_CONTENT_MAP.default;

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-slate-100 p-6">
            <div
                className={`w-full max-w-3xl bg-white shadow-xl rounded-lg p-8 text-center border border-slate-300 transform transition-all duration-300 ${
                    status === "succeeded" ? "scale-105" : ""
                }`}
            >
                <div
                    className={`w-20 h-20 mx-auto flex items-center justify-center text-5xl text-white rounded-full ${iconColor} mb-6`}
                >
                    {icon}
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-4">{text}</h2>

                {intentId && (
                    <div className="mt-6 bg-slate-50 p-6 rounded-lg shadow-md text-left">
                        <h3 className="text-slate-600 text-lg font-semibold mb-2">
                            Transaction Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-slate-700">
                            <div>
                                <span className="block text-slate-500 text-sm">Payment ID:</span>
                                <span className="font-mono">{intentId}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-sm">Status:</span>
                                <span className="font-medium capitalize">{status}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {intentId && (
                        <a
                            href={`https://dashboard.stripe.com/payments/${intentId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 text-sm text-white bg-slate-600 hover:bg-slate-700 rounded-lg shadow transition-transform transform hover:scale-105"
                        >
                            View Payment Details
                        </a>
                    )}
                    <a
                        href="/"
                        className="px-6 py-3 text-sm text-slate-600 border border-slate-500 rounded-lg shadow hover:bg-slate-500 hover:text-white transition-all"
                    >
                        Go to Store
                    </a>
                </div>
            </div>
        </div>
    );
}
