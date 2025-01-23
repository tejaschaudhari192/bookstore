import { useEffect, useState } from "react";
import { Book } from "../model";
import { getData } from "../services/api";


export const useGetData = () => {
	const [data, setData] = useState<Book[]>([]);

	useEffect(() => {
		const getHompaegData = async () => {
			const result = await getData();
            // console.log(result);
            
			const books = await result.data;
			setData(books)
		}
		getHompaegData();
	}, [])
	return data
}
