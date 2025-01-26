import { useEffect, useState } from "react";
import { getUserData, updateUserData } from "../services/api"; 
import { Loader } from "./Loader";
import { FiEdit, FiSave } from "react-icons/fi"; 

const Profile = () => {
    const [profileData, setProfileData] = useState<any>();
    const [isEditingName, setIsEditingName] = useState(false); 
    const [updatedName, setUpdatedName] = useState(""); 

    useEffect(() => {
        
        async function getProfileData() {
            try {
                const result = await getUserData();
                setProfileData(result);
                setUpdatedName(result.name); 
            } catch (error) {
                alert(error);
            }
        }
        getProfileData();
    }, []);

    const handleSaveName = async () => {

        try {
            await updateUserData(updatedName); 
            setProfileData((prev:any) => ({ ...prev, name: updatedName })); 
            setIsEditingName(false); 
        } catch (error) {
            alert("Failed to update name: " + error);
        }
    };

    if (!profileData) {
        return <Loader />;
    }

    return (
        <div>

            <div className="bg-white rounded-lg p-6 mt-20 w-full max-w-lg m-auto">
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

                <div className="mb-4 flex items-center justify-between">
                    <label className="block mb-2">Name</label>
                    <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() =>
                            isEditingName ? handleSaveName() : setIsEditingName(true)
                        }
                    >
                        {isEditingName ? <FiSave size={18} /> : <FiEdit size={18} />}
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        value={updatedName}
                        disabled={!isEditingName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-300 ${isEditingName ? "" : "bg-gray-100"
                            }`}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Type</label>
                    <input
                        type="text"
                        readOnly
                        value={profileData.type}
                        className="border rounded-md px-3 py-2 w-full bg-gray-100"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Email Address</label>
                    <input
                        type="email"
                        value={profileData.email}
                        readOnly
                        className="border rounded-md px-3 py-2 w-full bg-gray-100"
                    />
                </div>
            </div>

            <div>

            </div>

        </div>
    );
};

export default Profile;
