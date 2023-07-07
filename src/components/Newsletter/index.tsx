import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import coupon from '../../../assets/coupon/coupon.png'
import { CiMail } from "react-icons/ci";
import baseUrl from "../../../Utils/baseUrl";


const NewsLetter = () => {
    const [email, setEmail] = useState('');


    const handlesubscribe = async (e: any) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}/subscribe/insert`, { email });

            if (response.status === 200) {
                // Handle successful subscription
                setEmail('');
                alert('Subscription successful');
            } else {
                // Handle subscription error
                const { message } = response.data;
                alert(`Subscription failed: ${message}`);
            }
        } catch (error) {
            console.error(error);
            alert('Subscription successful');
            // Handle fetch error
        }


    }

    return (
        <div className=" bg-[#233a95] w-full">
            <div className="container mx-auto px-10 lg:px-32">
                <div className="grid lg:grid-cols-2">
                    <div className="lg:self-center">
                        <h2 className="text-lg font-bold text-white lg:text-3xl lg:mt-2">
                            Join our newsletter and get...
                        </h2>
                        <p className="mt-2 text-sm text-gray-300 opacity-60 lg:text-base lg:mt-6">
                            Join our email subscription now to get updates on promotions and
                            coupons.
                        </p>
                        <form className=" mt-4" onSubmit={handlesubscribe}>

                            <div className="relative w-full">
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="pl-8 text-gray-900 bg-white h-[48px] lg:h-[62px] placeholder:text-sm w-full rounded-sm"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <CiMail className="absolute left-2 my-auto top-0 bottom-0 text-xl text-gray-400" />

                                <button
                                    type="submit"
                                    className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-[#233a95] py-2 px-4 text-white rounded-md lg:py-[15px]"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-center mt-6 lg:mt-10">
                        <Image
                            src={coupon}
                            alt="Newsletter - Image"
                            className="w-80 lg:w-3/4"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsLetter;