import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import bgImage from '../../../assets/login/hero.png'
import Logo from '../../../assets/logo.png'
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
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [formError, setFormError] = useState('');



    const handleEmailChange = (e: any) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleUsernameChange = (e: any) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        if (newUsername.trim() === '') {
            setUsernameError('Username is required');
        } else {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (e: any) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e: any) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // perform form submission or validation here
        if (usernameError || emailError || passwordError || confirmPasswordError) {
            setFormError('Please fix the errors and try again');
        } else {
            // perform form submission
            if (confirmPassword !== password) {
                setFormError('Please enter a confirm password');
            } else {
                try {
                    const verified = true;

                    const loginDto = {
                        username: username,
                        email: email,
                        password: password

                    };

                    console.log(loginDto)
                    const response = await axios.post(`${baseUrl}/auth/signup`, loginDto)

                    console.log(response)
                    if (response.status == 201) {
                        setFormError('');
                        router.push('/signin')

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
            }

        }
    };


    return (
        <div className='relative w-ful h-full'>

            <div className='bg-darkblue py-8 z-50 absolute w-full '>
                <div className='container mx-auto'>
                    <Link href='/'>
                        <Image src={Logo} width='255' height='255' alt='logo' />
                    </Link>
                </div>
            </div>

            <div className="w-full h-screen">
                <Image
                    src={bgImage}
                    alt="background image"
                    className='object-cover w-full h-full'
                />

            </div>

            <form onSubmit={handleSubmit}>
            <div className='absolute right-0 top-0 w-full md:w-1/2 h-full flex'>

                
                    <div className="w-full h-full px-12 bg-white bg-opacity-60 backdrop-blur-sm flex flex-col justify-center gap-6">
                        <h3 className="text-4xl font-semibold mb-6">Sign Up</h3>

                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={handleUsernameChange}
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
                        {usernameError && <div className='text-red-500'>{usernameError}</div>}


                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                                required
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
                        {emailError && <div className='text-red-500'>{emailError}</div>}


                        <div className='grid grid-cols-2 gap-4'>
                            <div className="relative w-full">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
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
                                    onChange={handleConfirmPasswordChange}
                                    className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                                />
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"
                                />
                            </div>


                        </div>
                        {passwordError && <div className='text-red-500'>{passwordError}</div>}
                        {confirmPasswordError && <div className='text-red-500'>{confirmPasswordError}</div>}


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
                            // onClick={handleClick}
                            // disabled={loading}
                            className="w-full py-3 bg-[#3A1C61] text-white font-semibold text-base rounded-lg hover:bg-blue-900 text-bold"
                        >
                            Create Account
                            {/* {!loading ? 'Create Account' : <SharedButtonSpinner />} */}
                        </button>
                        {formError && <div className='text-red-500'>{formError}</div>}

                        <p className="text-sm text-gray-700 font-medium">
                            Already have an account? <Link href="/signin" className="text-[#3A1C61]">Sign In</Link>
                        </p>
                    </div>
                

            </div>
            </form>

        </div>
    );
}

export default Register;