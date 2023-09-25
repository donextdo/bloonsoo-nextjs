import { useEffect, useState } from "react";
import baseUrl from "../../../../Utils/baseUrl";
import axios from "axios";
import Swal from "sweetalert2";

//  Define the main interface for the user data
interface UserData {
  email: string;
  firstName: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  isProfileComplete: boolean;
  lastName: string;
  role: string;
  status: string;
  updatedAt: string;
  username: string;
  whishList: string[]; // Array of wishlist items
  __v: number;
  _id: string;
}

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const [userData, setUserData] = useState<UserData>({
        email: "",
        firstName: "",
        isEmailVerified: false,
        isMobileVerified: false,
        isProfileComplete: false,
        lastName: "",
        role: "",
        status: "",
        updatedAt: "",
        username: "",
        whishList: [],
        __v: 0,
        _id: "",
      });

    
      useEffect(()=>{
        if (typeof localStorage !== 'undefined') {
            const userJson = localStorage.getItem('user');
           const user = userJson ? JSON.parse(userJson) : null;
           setUserData(user)
        }
      },[])
      
      let token: any
      if (typeof localStorage !== 'undefined') {
          token = localStorage.getItem("token");
      }

    // const handlePasswordChange = (e: any) => {
    //     const newPassword = e.target.value;
    //     setPassword(newPassword);
    //     if (newPassword.length < 6) {
    //         setPasswordError('Password must be at least 6 characters long');
    //     } else {
    //         setPasswordError('');
    //     }
    // };

    // const handleConfirmPasswordChange = (e: any) => {
    //     const newConfirmPassword = e.target.value;
    //     setConfirmPassword(newConfirmPassword);
    //     if (newConfirmPassword !== password) {
    //         setConfirmPasswordError('Passwords do not match');
    //     } else {
    //         setConfirmPasswordError('');
    //     }
    // };

    const handleClick = async (e: any) => {
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
                        token: token,
                        password: password
                    };

                    console.log(loginDto)
                    // const response = await axios.post(`${baseUrl}/auth/reset-password`, loginDto)


                    // setTimeout(() => {
                    //   loading.value = false
                    //   router.push({path: '/login', query: {verified:true}})
                    // }, 4000)

                    // console.log(response)
                    // if (response.status == 200) {
                    //     Swal.fire({
                    //         title: "Success",
                    //         text: "Your password has been updated successfully",
                    //         icon: "success",
                    //         confirmButtonText: "Done",
                    //         confirmButtonColor: "#8DC14F",
                    //     });
                    // }

                } catch (error) {
                    console.log(error)
                    console.error(error);
                }
            }

        }

    }

    console.log(userData._id)
    return (
        <div>
            <h1 className="fone-smeibold text-xl mb-5">Password Change</h1>

            <label className="text-sm">
                New password (leave blank to leave unchanged)
            </label>
            <input
                type="text"
                className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <label className="text-sm">Confirm new password</label>
            <input
                type="text"
                className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
                className="bg-[#233a95] text-white py-2.5 px-4 mb-4 rounded-md text-sm"
                onClick={handleClick}
            >
                Save Changes
            </button>
        </div>
     );
}

export default ChangePassword;