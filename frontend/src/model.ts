export interface Book {
    id: number;
    imgurl: string;
    title: string;
    author: string;
    ratings: number;
    price: number;
    pages: number;
    language: string;
    publisher: string;
    publication_date: string;
    category: string;
    discount: number;
}

export interface CartItemType {
    bookId: number;
    quantity: number;
}

export interface UserType {
    userId: number;
    name: string;
    type: string;

}

export interface formDataType {
    id?: number;
    title: string;
    author: string;
    price: string;
    pages: string;
    language: string;
    publisher?: string;
    category: string;
    discount: string;
    imgurl: null;
}

export interface orderDataType {
    id?:number
    items:CartItemType[]
    total_amount:number,
    shipping_address:any,
    status?:string,
    payment_intent_id?:string,
    order_date?:string | number
}



export interface profileDataType {

}