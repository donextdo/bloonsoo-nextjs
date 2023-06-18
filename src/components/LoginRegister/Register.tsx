import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import bg from '../../assets/login/hero.png'
import { useRouter } from 'next/router';
import baseUrl from '../../../Utils/baseUrl';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameExistError, setUsernameExistError] = useState(false);
    const [emailExistError, setEmailExistError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);
const router = useRouter()


    const handleClick = async () => {
        // Perform sign up logic here
        try {
            const verified = true;
      
            const loginDto = {
            username:username,
              email: email,
              password: password
           
            };
      
           console.log(loginDto)
            const response = await axios.post(`${baseUrl}/auth/signup`,loginDto)
             
        console.log(response)
            if (response) {
            //   const user = await response.json();
            //   localStorage.setItem('token', user.token);
            //   localStorage.setItem('user', JSON.stringify(user.userInfo));
             
      
            //   if (verified) {
            //     router.push('/');
            //   } else {
            //     router.back();
            //   }
            } else {
            //   const errorData = await response.json();
            //   if (errorData.code === 'USER_NOT_FOUND') {
            //     setUsernameNotFoundError(true);
            //     setTimeout(() => {
            //       setUsernameNotFoundError(false);
            //     }, 5000);
            //   } else if (errorData.code === 'INVALID_PASSWORD') {
            //     setPasswordInvalidError(true);
            //     setTimeout(() => {
            //       setPasswordInvalidError(false);
            //     }, 5000);
            //   } else {
            //     console.log(errorData.message);
            //   }
            }
          } catch (error) {
            console.log(error)
            console.error(error);
          }
    };
    return (
        <div className='relative'>

            {/* <div className="w-full h-full ">
                <Image
                    src={bg}
                    alt="background image"
                    style={{
                        objectFit: "cover",
                        backgroundColor: "white",
                        width: "100%",
                        height: "100%",
                    }}
                    width={450}
                    height={400}
                />

            </div> */}
            <div className='grid grid-cols-2 '>
                <div></div>
                <div className="">
                    <div className="w-full h-full px-12 bg-white bg-opacity-60 backdrop-blur-sm flex flex-col justify-center gap-6">
                        <h3 className="text-4xl font-semibold mb-6">Sign Up</h3>

                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                            />
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"
                            />
                            {/* {usernameExistError && (
                                <small className="text-xs font-semibold text-red-700 absolute left-0 -bottom-5">
                                    This username already exists
                                </small>
                            )} */}
                        </div>

                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                            />
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"
                            />
                            {/* {emailExistError && (
                                <small className="text-xs font-semibold text-red-700 absolute left-0 -bottom-5">
                                    This email already exists
                                </small>
                            )} */}
                        </div>


                        <div className='grid grid-cols-2 gap-4'>
                            <div className="relative w-full">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                                />
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"
                                />
                            </div>
                            <div className="relative w-full">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                                />
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"
                                />
                            </div>
                        </div>



                        <p className="text-sm font-normal">
                            Bloonsoo may keep me informed with personalized emails about products and services. See our{' '}
                            <Link href="#" className="font-bold">
                                Privacy Policy
                            </Link>{' '}
                            for more details.
                        </p>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="checkbox-1"
                                className="w-4 h-4 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                            />
                            <label htmlFor="checkbox-1" className="ml-2 text-sm text-gray-600">
                                Please contact me via e-mail
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="checkbox-2"
                                className="w-4 h-4 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                            />
                            <label htmlFor="checkbox-2" className="ml-2 text-sm text-gray-600">
                                I have read and accept the Terms and Conditions
                            </label>
                        </div>

                        <button
                            onClick={handleClick}
                            disabled={loading}
                            className="w-full py-3 bg-[#3A1C61] text-white font-semibold text-base rounded-lg hover:bg-blue-900 text-bold"
                        >
                            Create Account
                            {/* {!loading ? 'Create Account' : <SharedButtonSpinner />} */}
                        </button>

                        <p className="text-sm text-gray-700 font-medium">
                            Already have an account? <Link href="/login" className="text-[#3A1C61]">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;