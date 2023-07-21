import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [userNotFoundError, setUserNotFoundError] = useState(false);
    const router = useRouter()

    const handleClick = async () => {
        try {
            // setLoading(true);
          
            const loginDto = {
              email: email,
            };
          
            const res = await axios.post(`${baseUrl}/auth/send-password-reset-email`, loginDto);
          
            console.log(res);
          
            setTimeout(() => {
              router.push('/password-reset/check-mail');
            //   setLoading(false);
            }, 1000);
          } catch (error) {
                  setUserNotFoundError(true);
              console.error(error);


            // if (error.response) {
            //   if (error.response.data.message) {
            //     if (error.response.data.message === 'USER_NOT_FOUND') {
            //       setTimeout(() => {
            //         setUserNotFoundError(false);
            //       }, 5000);
            //     //   setLoading(false);
            //       setUserNotFoundError(true);
            //       return;
            //     }
            //   } else {
            //     console.log(error.response.data.message);
            //   }
            // } else {
            //   console.error(error);
            // }
            // setLoading(false);
          }
          
    };

    return (
        <section className="text-black font-montserrat md:container mx-auto px-5 md:px-10 py-20">
            <div className="w-56 md:w-96 h-full mx-auto space-y-10">
                <h3 className="text-lg md:text-2xl font-semibold">Find Your Account</h3>
                <hr />
                <p className="text-sm">Please enter your email address or mobile number to search for your account</p>
                <div className="relative w-full mb-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                    />
                    <FontAwesomeIcon icon={faUser} className="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto" />
                    {userNotFoundError && (
                    <small className="text-xs font-semibold text-red-700 absolute left-0 -bottom-5">
                        Cannot find user with this email!
                    </small>
                    )}
                </div>
                <button
                    onClick={handleClick}
                    // disabled={!email}
                    className="w-full py-3 bg-[#3A1C61] text-white font-semibold text-base rounded-lg hover:bg-blue-900 text-bold"
                >
                    Send email
                </button>
            </div>
        </section>
    );
}

export default ForgetPassword;