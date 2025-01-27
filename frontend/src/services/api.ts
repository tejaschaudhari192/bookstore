import axios from 'axios'
import { formDataType, orderDataType } from '../model';
import Cookies from 'js-cookie';
import { REMOTE_API } from '../config/config';



export const API = axios.create({
    baseURL: REMOTE_API, headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
})

export const register = (userData:{
    name: string;
    email: string;
    password: string;
    type: string;
}) => API.post("/auth/register", userData);
export const login = (userData:{ email: string, password: string }) =>
    API.post("/auth/login", userData)

export const getBooks = async () => {
    const id = JSON.parse(Cookies.get('user')!).id;
    try {
        const result = await API.get("/admin", { params: { id } })
        return result.data
    } catch (error) {
        return error
    }
}

export const getBook = async (id:number) => {
    try {
        const result = await API.get(`/admin/${id}`)
        return result.data
    } catch (error) {
        return error
    }
}



export const addBook = async (formData: formDataType) => {
    const id = JSON.parse(Cookies.get('user')!).id;
    try {
        const result = await API.post("/admin", formData, {
            params: { id }
        })
        //@ts-ignore
        return result.addedBook;
    } catch (error) {
        return error
    }
}
export const deleteBook = async () => {
    const id = JSON.parse(Cookies.get('user')!).id;
    try {
        const result = await API.delete("/admin", {
            params: { id }
        })
        return result
    } catch (error) {
        return error
    }
}
export const updateBook = async (formData:formDataType) => {
    try {
        const result = await API.put("/admin", formData, {
            params: {
                id: formData.id
            }
        })
        return result
    } catch (error) {
        return error
    }
}

export const getUserData = async () => {
    try {
        const id = await JSON.parse(Cookies.get("user")!).id;
        const result = await API.get("/user/profile", {
            params: { id }
        })
        // console.log(result);

        return result.data;
    } catch (error) {
        return error
    }
}

export const addOrder =  async (orderData:orderDataType) => {
    try {
        const id = await JSON.parse(Cookies.get("user")!).id;
        const result = await API.post("/user/order",orderData, {
            params: { id }
        })
        return result.data;
    } catch (error) {
        console.log(error);
        
        return error
    }
}

export const getOrders =  async () => {
    try {
        const id = await JSON.parse(Cookies.get("user")!).id;
        const result = await API.get("/user/order", {
            params: { id }
        })
        return result.data;
    } catch (error) {
        console.log(error);
        
        return error
    }
}

export const updateUserData = async (name:string) => {
    try {
        const id = await JSON.parse(Cookies.get("user")!).id;
        const result = await API.put("/user/profile", {name}, {
            params: { id }
        })
        // console.log(result);

        return result.data;
    } catch (error) {
        return error
    }
}

export const getData = async () => {
    try {
        const result = await API.get("/user")
        return result.data;
    } catch (error) {
        return error
    }
}

export const verifyToken = async (token: string) => {
    try {
        const response = await API.get('auth/verify', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data.success;
    } catch (error) {

    }
}