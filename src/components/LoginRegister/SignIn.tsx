import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { useState } from 'react';
import baseUrl from '../../../Utils/baseUrl';
import { useRouter } from 'next/router';
import Image from 'next/image';
import bgImage from '../../../assets/login/hero.png'
import Logo from '../../../assets/logo.png'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailNotFoundError, setEmailNotFoundError] = useState(false);
    // const [passwordInvalidError, setPasswordInvalidError] = useState(false);
    const router = useRouter()

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

    const handlePasswordChange = (e: any) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // perform form submission or validation here
        if (emailError || passwordError) {
            setFormError('Please fix the errors and try again');
        } else {
            try {
                const verified = true;

                const loginDto = {
                    email: email,
                    password: password
                };

                const response = await fetch(`${baseUrl}/auth/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginDto)
                });

                if (response.status == 401) {
                    const errorData = await response.json();
                    setFormError('Incorrect password or email');

                    // if (errorData.code === 'USER_NOT_FOUND') {
                    //   setUsernameNotFoundError(true);
                    //   setTimeout(() => {
                    //     setUsernameNotFoundError(false);
                    //   }, 5000);
                    // } else if (errorData.code === 'INVALID_PASSWORD') {
                    //   setPasswordInvalidError(true);
                    //   setTimeout(() => {
                    //     setPasswordInvalidError(false);
                    //   }, 5000);
                    // } else {
                    //   console.log(errorData.message);
                    // }

                    return;
                }

                const user = await response.json();
                console.log(user)

                localStorage.setItem('token', user.token);
                localStorage.setItem('user', JSON.stringify(user.userInfo));

                //   await authStore.getAuthUser();

                if (verified) {
                    console.log("hdadi");
                    router.push('/');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                } else {
                    console.log("hi");
                    router.back();
                }

            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <div className='relative w-full h-full'>

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


                    <div className="w-full h-full px-12 bg-white bg-opacity-60 backdrop-blur-sm flex flex-col justify-center gap-6 ">
                        <h3 className="text-4xl font-semibold mb-6">Login</h3>

                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                            />
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"
                            />

                        </div>
                        {emailError && <div className='text-red-500'>{emailError}</div>}


                        <div className="relative w-full">
                            <input
                                type="Password"
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
                        {passwordError && <div className='text-red-500'>{passwordError}</div>}


                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="checkbox-1"
                                className="w-4 h-4 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                            />
                            <label htmlFor="checkbox-1" className="ml-2 text-sm text-gray-600">
                                Keep me logged in
                            </label>
                        </div>

                        <button
                            // onClick={handleClick}
                            className="w-full py-3 bg-[#3A1C61] text-white font-semibold text-base rounded-lg hover:bg-blue-900 text-bold"
                        >
                            Login
                        </button>
                        {formError && <div className='text-red-500'>{formError}</div>}


                        <Link href="/password-reset/forget-password" className="ml-auto text-sm font-semibold">
                            Forgot Password ?
                        </Link>

                        <p className="text-sm text-gray-700 font-medium -mt-4">
                            Don&apos;t have an account? <Link href="/register" className="text-[#3A1C61]">Sing Up</Link>
                        </p>
                    </div>


                </div>
            </form>

        </div>
    );
}

export default SignIn;