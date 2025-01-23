import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

export const Ratings = ({ ratings } : {ratings:number}) => {
    ratings += 2;
    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => {
                const value = ratings - index;

                return value > 0.5 ? ratings-- && (
                    (<IoMdStar key={index} color="#FFD700" size={17} />)

                ) : value > 0 ? ratings-- && (
                    <IoMdStarHalf key={index} color="#FFD700" size={17} />
                ) : (
                    <IoMdStarOutline key={index} color="#FFD700" size={17} />
                );
            })}
        </div>
    );
};