import Link from "next/link";
import { useEffect, useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const ProfileCrad = ({onEditClick, editMode}:any) => {
    const [image, setImage] = useState(null);
    const [imageValue, setImageValue] = useState("");
    const [preview, setPreview] = useState('');
    const [oneUser, setOneUser] = useState({
        about: "",
        address: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            country: '',
            postalCode: '',
        },
        email: '',
        firstName: '',
        isEmailVerified: false,
        isMobileVerified: false,
        isProfileComplete: false,
        lastName: '',
        mobile: '',
        password: '',
        profilePic: '',
        role: '',
        status: '',
        username: '',
        _id: '',
    })
    const router = useRouter ()
    let token: any;
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    }

    let user: any

   
        if (typeof localStorage !== 'undefined') {
            const userJson = localStorage.getItem('user');
             user = userJson ? JSON.parse(userJson) : null;
        }  


        
    useEffect(() => {
        fetchData()
    }, []);

    async function fetchData() {
        try {
            const res = await axios.get(`${baseUrl}/user/${user._id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data)
            const data = res.data;
            setOneUser(data)
        } catch (err) {
            console.log(err);
        }
    }
    const onChange = async (event: any) => {
        const input = event.target;
        if (input.files) {
            const file = input.files[0];
            setImage(file);

            const formData = new FormData();
            formData.append("profilePic", file);

            console.log(formData)

            try {
                const response = await axios.patch(
                    `${baseUrl}/user/profilepic/${user?._id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const hotel = response.data;
                console.log(hotel);

                setPreview(hotel.profilePic);
                router.reload()
                // authStore.setUser(response.data);
            } catch (error) {
                console.error("Error updating profile picture:", error);
            }
        }
    };

    // let fullName = "";
    // if (user && user.firstName && user.lastName) {
    //     fullName = user.firstName + " " + user.lastName;
    // } else if (user && user.username) {
    //     fullName = user.username;
    // }

    let fullName = oneUser ? `${oneUser.firstName} ${oneUser.lastName}` : "";
    let InitilName = oneUser ? `${oneUser?.firstName[0]} ${oneUser?.lastName[0]}` : ""

    return (
        <div className="shadow-md rounded-lg bg-white w-full px-6 py-6 flex flex-col gap-2">
            <div className="w-full pb-6 border-b border-gray-300">
                <div className="w-3/5 md:w-2/3 aspect-square rounded-full mx-auto overflow-hidden relative group mb-4 md:mb-0">
                    {oneUser?.profilePic ? (
                        <img
                            src={oneUser.profilePic}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                    ) : (
                        <div className="flex items-center justify-center bg-gray-500 text-white w-full h-full">
                            <h1 className="font-bold text-8xl">
                                {InitilName}
                                </h1>
                        </div>
                    )}

                    {editMode && (
                        <div className="absolute left-0 bottom-0 right-0 mx-auto w-full h-1/3 hidden items-center justify-center bg-black bg-opacity-30 group-hover:flex">
                            <label
                                htmlFor="cover-img"
                                className="text-blue-500 text-sm font-semibold cursor-pointer"
                            >
                                <FontAwesomeIcon className=" text-blue-500 text-2xl" icon={faCamera} />
                            </label>

                            <input
                                className=""
                                id="cover-img"
                                type="file"
                                onChange={onChange}
                                accept="image/*"
                            />
                        </div>
                    )}
                </div>

                <h1 className="text-center font-semibold text-lg">
                    {fullName}
                </h1>

                <div className="w-full flex flex-col items-center">
                    {oneUser?.address && (
                        <div className="w-max flex items-center gap-2">
                            <i className="fas fa-location-dot text-blue-600 text-base"></i>
                            <p className="text-sm font-semibold text-gray-600">
                                {oneUser.address.city}
                            </p>
                        </div>
                    )}

                    <div className="w-max flex items-center gap-2">
                        <i className="fas fa-envelope text-blue-600 text-base"></i>
                        <p className="text-sm font-semibold text-gray-600">{oneUser?.email}</p>
                    </div>
                </div>
            </div>

            <div className="w-full pb-6 pt-4 border-b border-gray-300">
                <ul className="w-full flex flex-col gap-3 text-sm font-semibold text-gray-600">
                    <li
                        // className={`w-full flex items-center gap-2 ${route.path === "/profile" ? "text-blue-600" : ""
                        //     }`}
                    >
                        <i className="fas fa-user text-base"></i>
                        <Link href="/profile">Profile</Link>
                    </li>

                    <li
                        // className={`w-full flex items-center gap-2 ${route.path === "/profile/reservations" ? "text-blue-700" : ""
                        //     }`}
                    >
                        <i className="fas fa-bookmark text-base"></i>
                        <Link href="/profile/reservations">Reservations</Link>
                    </li>

                    {/* <li className="w-full">
                <NuxtLink to="#">
                    Wish List
                </NuxtLink>
            </li> */}
                </ul>
            </div>

            <div className="mt-8 flex flex-col gap-4">
                <h2 className="font-semibold text-lg">
                    {fullName}
                    </h2>

                <div className="w-full flex items-center gap-2">
                    <i className="fas fa-check text-green-600 text-lg"></i>
                    <p className="font-medium text-base text-gray-700">Email Confirmed</p>
                </div>

                <div className="w-full flex items-center gap-2">
                    <i className="fas fa-check text-green-600 text-xl"></i>
                    <p className="font-medium text-base text-gray-700">
                        Mobile Confirmed
                    </p>
                </div>
            </div>

            {editMode && ( 
                <button
                    onClick={onEditClick}
                    className="px-6 py-2 gradient-btn rounded-full mt-8 my-4"
                >
                    Edit Profile
                </button>
            )}
        </div>
    );
};

export default ProfileCrad;
