import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import axios from "axios";

const PasswordReset = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [formError, setFormError] = useState('');


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

    const handleClick = async (e:any) => {
        e.preventDefault();
        // perform form submission or validation here
        if (passwordError || confirmPasswordError) {
            setFormError('Please fix the errors and try again');
        } else {
            // perform form submission
            if (confirmPassword !== password) {
                setFormError('Please enter a confirm password');
            } else {
                try {
                    
                    const loginDto = {
        
                        password: password

                    };

                    console.log(loginDto)
                    const response = await axios.post(`${baseUrl}/api/auth/reset-password`, loginDto)

                    // const data = await $fetch(`${baseUrl}/api/auth/reset-password`, {
                    //     method: 'POST',
                    //     body: {
                    //         token: id,
                    //         password: password.value
                    //     }
                    
                    // })
            
                    // setTimeout(() => {
                    //   loading.value = false
                    //   router.push({path: '/login', query: {verified:true}})
                    // }, 4000)

                    console.log(response)
                    
                } catch (error) {
                    console.log(error)
                    console.error(error);
                }
            }

        }

    } 

    return (
        <section className="text-black font-montserrat md:container mx-auto px-5 md:px-10 py-20">
            <div className="w-56 md:w-96 h-full mx-auto space-y-10">
                <h3 className="text-lg md:text-2xl font-semibold mb-6">Create a new password</h3>
                {/* {errorResponse && (
                    <h4 className="text-lg font-semibold text-center text-gray-700">
                        Oops... Something went wrong. Please try again later
                    </h4>
                )} */}
                <p className="text-sm font-semibold">
                    Use a minimum of 8 characters, including uppercase letters, lowercase letters, and numbers.
                </p>
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
                {passwordError && <div className='text-red-500'>{passwordError}</div>}
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
                {confirmPasswordError && <div className='text-red-500'>{confirmPasswordError}</div>}
                <button
                    onClick={handleClick}
                    disabled={!password}
                    className="w-full py-3 bg-[#3A1C61] text-white font-semibold text-base rounded-lg hover:bg-blue-900 text-bold"
                >
                    Set new password
                    {/* {!loading ? 'Set new password' : <span>Loading...</span>} */}
                </button>
                {formError && <div className='text-red-500'>{formError}</div>}
            </div>
        </section>
    );
}

export default PasswordReset;