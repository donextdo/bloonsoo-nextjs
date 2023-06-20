import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { useState } from 'react';
import baseUrl from '../../../Utils/baseUrl';
import { useRouter } from 'next/router';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailNotFoundError, setEmailNotFoundError] = useState(false);
    // const [passwordInvalidError, setPasswordInvalidError] = useState(false);
    const router = useRouter()


    const handleClick = async () => {
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

            if (!response.ok) {
                const errorData = await response.json();

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
                        <h3 className="text-4xl font-semibold mb-6">Login</h3>

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

                        <div className="relative w-full">
                            <input
                                type="Password"
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
                            onClick={handleClick}
                            className="w-full py-3 bg-[#3A1C61] text-white font-semibold text-base rounded-lg hover:bg-blue-900 text-bold"
                        >
                            Login
                        </button>

                        <Link href="/password-reset/forgot-password" className="ml-auto text-sm font-semibold">
                            Forgot Password ?
                        </Link>

                        <p className="text-sm text-gray-700 font-medium -mt-4">
                            Don&apos;t have an account? <Link href="/register" className="text-[#3A1C61]">Sing Up</Link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SignIn;