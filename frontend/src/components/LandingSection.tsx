import { useNavigate } from "react-router-dom";
import heroImage from "../assets/book.png";

const LandingSection = () => {
    const navigate = useNavigate()
    return (
        <section className="bg-gradient-to-br from-pink-50 to-orange-50 p-8 min-h-screen flex items-center">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
                <div className="max-w-xl ml-10 text-center lg:text-left">
                    <div className="mb-4 text-blue-500 font-semibold">
                        Analysis. Research. Problem Solving.
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
                        Find yourself in a <span className="text-indigo-600">Great Book</span>
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                        dapibus risus velit, ut pretium nulla ultricies in.
                    </p>
                    <div className="flex justify-center lg:justify-start space-x-4">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                            Get Book
                        </button>
                        <button
                            onClick={() => navigate('/register')}

                            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg shadow-lg hover:bg-indigo-100 transition duration-300">
                            Sell Books
                        </button>
                    </div>
                </div>

                <div className="mt-10 lg:mt-0 flex justify-center w-full lg:w-1/2">
                    <img
                        src={heroImage}
                        alt="Open book illustration"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default LandingSection;
