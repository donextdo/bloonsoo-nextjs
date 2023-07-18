import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import baseUrl from "../../../Utils/baseUrl";
import { useEffect, useState } from "react";
import Card from "@/components/Booking/Card";
import ProfileCard from "@/components/Profile/ProfileCard";

const ReservationPage = () => {
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
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/booking/my/bookings`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const logout = () => {
        // user.value = null
        localStorage.removeItem('token')
        router.push('/')
    }

    const toggleMenu = () => {
        setMenu(!menu);
    };

    return (
        <div>
            <section className="text-black font-montserrat md:container mx-auto px-5 md:px-2 flex flex-col gap-14 py-10">
                <main className="md:grid grid-cols-4 items-start gap-12 w-full">
                    <aside className="w-full col-span-1 h-full mb-10 md:mb-0">
                        <ProfileCard />
                    </aside>

                    <section className="w-full col-span-3 flex flex-col relative">
                        <div className="w-full pb-6 border-b border-gray-300">
                            <h4 className="text-lg font-bold">Reservations</h4>
                        </div>

                        <div className="mt-6 flex flex-col gap-4 w-full">
                            {bookings.map((book: any) => (
                                <Card key={book._id} booking={book} />

                            ))}
                        </div>

                        <button onClick={toggleMenu} className="absolute top-0 right-10">
                            {menu ? (
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="text-2xl md:text-4xl text-blue-700"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faBars}
                                    className="text-2xl md:text-4xl text-blue-700"
                                />
                            )}
                        </button>

                        <div
                            className={`${menu ? 'scale-y-100' : 'scale-y-0'
                                } bg-white px-6 py-4 rounded-md w-56 absolute right-10 top-12 z-30 shadow-md transition-all duration-300 origin-top`}
                        >
                            <ul className="w-full flex flex-col gap-2 text-sm font-semibold text-gray-600">
                                <li className="w-full border-b border-gray-300 py-1">
                                    <Link href="/profile">Profile</Link>
                                </li>

                                <li className="w-full border-b border-gray-300 py-1">
                                    <Link href="/profile/reservations">Reservations</Link>
                                </li>

                                <li className="w-full border-b border-gray-300 py-1">
                                    <Link href="#">Wish List</Link>
                                </li>

                                {user && (
                                <button onClick={logout} className="btn-accent py-2">
                                    Logout
                                </button>
                                  )} 
                            </ul>
                        </div>
                    </section>
                </main>
            </section>
        </div>
    );
}

export default ReservationPage;