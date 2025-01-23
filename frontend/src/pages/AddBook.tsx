import { useEffect, useState } from 'react';
import { addBook } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingState } from '../utils/store/loadSlice';
import { StateLoader } from '../components/StateLoader';

export const AddBook = () => {
    const userId = JSON.parse(Cookies.get('user')).id;
    const username = JSON.parse(Cookies.get('user')).name;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadingState = useSelector(store => store.load.loadingState)
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        price: "",
        pages: "",
        language: "",
        publisher_id: userId || "",
        publisher: username || "",
        category: "",
        discount: "",
        imgurl: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setFormData((prevFormData) => ({ ...prevFormData, imgurl: file }));
            setImagePreview(URL.createObjectURL(file));
            setImage(file);
        } else {
            alert('Only jpg/png files are allowed');
        }
    };





    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoadingState(true))
        console.log(formData);
        try {
            const file = image
            const data = new FormData()
            data.append('file', file)
            data.append("upload_preset", "unsigned")
            data.append("cloud_name", "drfcuw0bf")
            const response = await fetch("https://api.cloudinary.com/v1_1/drfcuw0bf/image/upload", {
                method: "POST",
                body: data
            })
            const uploadResponse = await response.json();
            const cdnImage = await uploadResponse.url;
            // console.log(cdnImage);

            setFormData({ ...formData, imgurl: await cdnImage });
            // console.log(formData.imgurl);


            const result = await addBook(formData);
            const addedBook = await result.addedBook;
            await navigate('/admin');
        } catch (error) {
            alert(error)
        }

        // setFormData({
        //     title: "",
        //     imgurl: null,
        //     author: "",
        //     price: "",
        //     pages: "",
        //     language: "",
        //     publisher: userId || "",
        //     category: "",
        //     discount: "",
        // });
        return dispatch(setLoadingState(false))

    };

    return (
        <div className="container mx-auto p-6 max-w-4xl bg-white mt-20 rounded-lg">
            <StateLoader isLoading={loadingState} />
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Book</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Book Cover</label>
                        <input
                            id="image"
                            type="file"
                            name="image"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-3 w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                            />
                        )}
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="pages" className="block text-gray-700 font-medium mb-2">Pages</label>
                        <input
                            type="number"
                            id="pages"
                            name="pages"
                            value={formData.pages}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="language" className="block text-gray-700 font-medium mb-2">Language</label>
                        <input
                            type="text"
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="discount" className="block text-gray-700 font-medium mb-2">Discount (%)</label>
                        <input
                            type="number"
                            id="discount"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition duration-200"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                    >
                        Add Book
                    </button>
                </div>
            </form>
        </div>

    );
};