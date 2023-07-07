import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import baseUrl from "../../Utils/baseUrl";
import HotelCard from "@/components/Hotels/HotelCard";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

const WishList = () => {
    // const [userId, setUserId] = useState("")
    const [hotels, setHotels] = useState([])

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    let userId: any
    if (typeof localStorage !== 'undefined') {
        const userString = localStorage.getItem('user');
        const userArray = userString ? JSON.parse(userString) : [];
        userId = userArray._id
    }


    // useEffect(() => {
    //     const userString = localStorage.getItem('user');
    //     const userArray = userString ? JSON.parse(userString) : [];
    //     setUserId(userArray._id)


    // }, []);

    useEffect(() => {
        fetchData()
    }, []);

    async function fetchData() {
        console.log(userId)
        try {
            const res = await axios.get(`${baseUrl}/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(res.data.whishList)
            setHotels(res.data.whishList)
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (_id: any) => {

        const cartItemsString = localStorage.getItem('cartItems');
        const items = cartItemsString ? JSON.parse(cartItemsString) : [];

        try {
            const res = await axios.delete(`${baseUrl}/user/${userId}/wishList/${_id}`);
            console.log(res.data)
            const newItems = hotels.filter((item: any) => item.hotelId !== _id);
            setHotels(newItems)
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mx-auto my-16 w-full md:px-20 grid md:grid-cols-2 gap-4 justify-items-center lg:grid-cols-4 md:gap-8">
            {hotels.map((hotel: any, index: number) => (
                <div className="group relative w-80 md:w-full h-80 md:h-80 shadow-lg text-white rounded-lg overflow-hidden hover:scale-105 transition" key={index}>
                    <Link href={`/hotels/${hotel.hotelId}`} >

                        <img src={hotel.image} loading="lazy" className="w-full h-full object-cover" alt="" />
                    </Link>
                    <div className="absolute bottom-0 left-0 right-0 py-2 px-4 flex flex-col bg-black bg-opacity-20 group-hover:bg-opacity-40">
                        <h4 className="text-md font-bold">{hotel.title}</h4>
                        <p className="text-xs font-semibold">{hotel.address}</p>
                    </div>
                    <button className="absolute top-4 right-2  p-2 bg-white rounded-full"
                        onClick={() => (handleDelete(hotel.hotelId))}
                    >

                        <AiFillDelete className='text-red-500 ' />

                    </button>

                </div>
            ))}

        </div>
    );
}

export default WishList;