
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import baseUrl from "../../../../Utils/baseUrl";
import Card from "@/components/Booking/Card";
import AdminCard from "@/components/Booking/AdminCard";
import axios from "axios";

const Admin = () => {
    const [menu, setMenu] = useState(false);
    const [bookings, setBookings] = useState([]);
    const router = useRouter()

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    let user: any
    if (typeof localStorage !== 'undefined') {
        const userJson = localStorage.getItem('user');
        user = userJson ? JSON.parse(userJson) : null;
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/booking`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            const data = response.data
            console.log("booking", data)
            setBookings(data);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token')
        router.push('/')
    }

    const toggleMenu = () => {
        setMenu(!menu);
    };
    
    return (
        <div>
            <section className="text-black font-montserrat md:container mx-auto px-5 md:px-2 flex flex-col gap-14 py-10">
                <main className="  w-full">

                    <section className="w-full  flex flex-col relative">
                        <div className="w-full pb-6 border-b border-gray-300">
                            <h4 className="text-lg font-bold">Reservations</h4>
                        </div>

                        {bookings.length > 0 && (
                            <div className="mt-6 flex flex-col gap-4 w-full">
                                {bookings.map((book: any) => (
                                    <AdminCard key={book._id} booking={book} setBookings={setBookings} bookings={bookings}/>

                                ))}
                            </div>
                        )}


                    </section>
                </main>
            </section>
        </div>
    );
}

export default Admin;