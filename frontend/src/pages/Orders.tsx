import { useEffect, useState } from "react";
import { getOrders } from "../services/api";
import { Loader } from "./Loader";
import { OrdersBook } from "../components/OrdersBook";
import { useNavigate } from "react-router-dom";
import { orderDataType } from "../model";

export const Orders = () => {
    const [orderData, setOrderData] = useState<orderDataType[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getOrders();
                setOrderData(data);
            } catch (error) {
                alert(error);
            }
        }
        fetchOrders();
    }, []);

    if (!orderData || orderData.length === 0) {
        return <Loader />;
    }

    return (
        <div className="mt-20 lg:mx-10 px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>
            <div className="space-y-10 md:mx-24">
                {orderData.map((order) => {
                    const address = JSON.parse(order.shipping_address);
                    const books = JSON.parse(order.items.toString());

                    return (
                        <div
                            key={order.id}
                            className="bg-white shadow-lg rounded-lg p-6 border border-gray-300"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                                <div className="mb-2 md:mb-0">
                                    <p className="text-sm text-gray-500">ORDER ID</p>
                                    <p className="text-base font-medium">{order.id}</p>
                                </div>
                                <div className="mb-2 md:mb-0">
                                    <p className="text-sm text-gray-500">TOTAL AMOUNT</p>
                                    <p className="text-base font-medium">₹ {order.total_amount}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">ORDER DATE</p>
                                    <p className="text-base font-medium">
                                        {new Date(order.order_date!).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-500">SHIPPING ADDRESS</p>
                                <p className="text-base">
                                    {`${address.line1}, ${address.line2}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}`}
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-500">ITEMS</p>
                                <div className="space-y-2 grid lg:grid-cols-2 ">
                                    {books.map((book: { bookId: number; quantity: number }) => (
                                        <div
                                            key={book.bookId}
                                            onClick={()=>{navigate(`/book/${book.bookId}`)}}
                                            className="cursor-pointer select-none flex items-center border bg-slate-50 border-gray-300 rounded p-3 space-x-4"
                                        >
                                            <OrdersBook id={book.bookId} />
                                            <p className="text-sm text-gray-500">
                                                
                                                <span className="font-semibold text-base">Quantity: </span>{book.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">PAYMENT ID</p>
                                <p className="text-base">{order.payment_intent_id}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
