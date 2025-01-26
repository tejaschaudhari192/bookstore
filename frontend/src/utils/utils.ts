import Cookies from 'js-cookie'
import { getBook } from '../services/api';

export const getUserName = () => {
    if (Cookies.get('user')) return JSON.parse(Cookies.get('user')!).name;
    else return null
}

export const getBookDetails = async (bookId: number) => {
    const data = await getBook(bookId);
    return (data[0]);
};