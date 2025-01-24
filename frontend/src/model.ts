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
}