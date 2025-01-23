import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, updateBook } from '../services/api';
import { formDataType } from '../model';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingState } from '../utils/store/loadSlice';
import { StateLoader } from '../components/StateLoader';
import Cookies from 'js-cookie';

export const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadingState = useSelector(store => store.load.loadingState)
    const [formData, setFormData] = useState<formDataType | null>(null); // Initialize as null
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Explicitly type as string or null
    const [image, setImage] = useState<File | null>(null); // Explicitly type as File or null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = Cookies.get('token');
    // const data = useGetData().find((book) => book.id?.toString() === id);

    useEffect(() => {
        async function getBookDetails() {
            const result = await getBook(id);
            const data = await result.data;
            // console.log(data);
            const bookDetails = data[0]

            setFormData(bookDetails);
            setImagePreview(bookDetails.imgurl || null);
            setLoading(false)
        }
        getBookDetails()
    }, [])

    // useEffect(() => {
    //     if (data) { // Check if data is available before setting state
    //         setFormData(data);
    //     } else {
    //         setLoading(false); // Set loading to false if no data is found
    //         setError("Book not found");
    //     }
    // }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value } as formDataType); // Type assertion
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Use optional chaining
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else if (file) { // Only show alert if a file was selected but has wrong type
            alert('Only jpg/png files are allowed');
        } else {
            setImage(null);
            setImagePreview(formData?.imgurl || null)
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoadingState(true))
        setLoading(true); // Set loading to true during submission
        setError(null);

        try {
            let cdnImage = formData?.imgurl; // Initialize with existing image URL

            if (image) {
                const data = new FormData();
                data.append('file', image);
                data.append("upload_preset", "unsigned");
                data.append("cloud_name", "drfcuw0bf");

                const response = await fetch("https://api.cloudinary.com/v1_1/drfcuw0bf/image/upload", {
                    method: "POST",
                    body: data
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData?.error?.message || "Image upload failed"); // Throw error with message
                }

                const uploadResponse = await response.json();
                cdnImage = uploadResponse.url;
            }

            const updatedFormData = { ...formData, imgurl: cdnImage } as formDataType;
            console.log("updatedimage :", updatedFormData.imgurl);
            const result = await updateBook(updatedFormData,token);

            navigate('/admin');
        } catch (err: any) { // Type the error
            setError(err.message);
            alert(err.message);
            console.error(err)
        } finally {
            setLoading(false); // Set loading to false regardless of success/failure
        }
        return dispatch(setLoadingState(false));
    };

    if (loading) {
        return <div className='mt-20'>Loading book data...</div>;
    }

    if (error) {
        return <div className='mt-20'>Error: {error}</div>;
    }

    if (!formData) { // Check if formData is still null after potential error
        return <div className='mt-20'>Book data not available.</div>
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl bg-white mt-20 rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Book</h2>
            <StateLoader isLoading={loadingState} />

            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData?.title || ''}
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
                            value={formData?.author || ''}
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
                            value={formData?.price || ''}
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
                            value={formData?.pages || ''}
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
                            value={formData?.language || ''}
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
                            value={formData?.category || ''}
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
                            value={formData?.discount || ''}
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
                        Update Book
                    </button>
                </div>
            </form>
        </div>
    );
};