import Image from "next/image";
import Link from "next/link";
import pic from "../../../../assets/item/item2.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../../../Utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Card from "@/components/Booking/Card";




const Orders = () => {
 

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
                <main className="  w-full">
                    
                    <section className="w-full  flex flex-col relative">
                        <div className="w-full pb-6 border-b border-gray-300">
                            <h4 className="text-lg font-bold">Reservations</h4>
                        </div>

                        {bookings.length > 0 && (
                            <div className="mt-6 flex flex-col gap-4 w-full">
                                {bookings.map((book: any) => (
                                    <Card key={book._id} booking={book} />

                                ))}
                            </div>
                        )}
                         
                    </section>
                </main>
            </section>
    </div>
  );
};

export default Orders;
