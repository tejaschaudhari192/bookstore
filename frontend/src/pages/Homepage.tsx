import { BookCard } from "../components/BookCard";
import { useEffect, useState } from "react";
import { Book } from "../model";
import { getData } from "../services/api";
import LandingSection from "../components/LandingSection";
import { getUserName } from "../utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store/appStore";
export const Homepage = () => {
    const [items, setItems] = useState<Book[]>([]);
    // const [user, setUser] = useState(null);
    // console.log(user);

    const userType = useSelector((store: RootState) => store.user.type)

    // console.log(userType);

    const username = getUserName();

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             console.log('fetching');

    //             const res = await API.get('/auth/profile');
    //             console.log(res);

    //             // setUser(res.data.user);
    //         } catch (err) {
    //             setUser(null);
    //         }
    //     };
    //     fetchUser();
    // }, []);
    useEffect(() => {
        const getHompageData = async () => {
            const result = await getData();
            const books = await result.data;
            setItems(books)
        }
        getHompageData();
    }, [])

    if (userType == 'admin')
        return (
            <div className="h-full pb-20 flex justify-center items-center">
                <p className="text-4xl font-bold">Welcome Admin, <span className="text-[#465859]">{username}</span></p>

            </div>
        )

    return items && (
        <div>
            {/* <StateLoader isLoading={true}/> */}
            {!userType && (
                <LandingSection />
            )}
            <div className="flex m-10 mt-20 gap-7 flex-wrap">
                {items.map((item) => {
                    return <BookCard key={item.id} book={item} />
                })}
            </div>
        </div>
    )
}
