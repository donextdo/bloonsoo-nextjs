import { useRouter } from "next/router";
import { useEffect, useState } from "react";



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

const Dashboard = ({onButtonClick, handleAddressClick, handlePasswordClick, handleAccountDetailsClick,
}: any) => {

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
      const router = useRouter()
  
       useEffect(()=>{
        if (typeof localStorage !== 'undefined') {
            const userJson = localStorage.getItem('user');
           const user = userJson ? JSON.parse(userJson) : null;
           setUserData(user)
        }
      },[])

  const handleClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')

    setTimeout(() => {
        window.location.reload();
    }, 1000);
  };


const username = userData.email.split("@")[0]; // Extract the username from the email
 const extractedUsername = username.replace(/"/g, "");
 
  return (
    <div>
      <p className="text-sm">
        Hello <span className="font-semibold">{extractedUsername}</span> (not{" "}
        <span className="font-semibold">{extractedUsername}</span>
        <button onClick={handleClick}>
          <span className="text-[#2bbef9] underline underline-offset-1">
            {" "}
            Log out
          </span>
        </button>
        )
      </p>

      <p className="mt-4 text-sm">
        From your account dashboard you can view your{" "}
        <button onClick={onButtonClick}>
          <span className="text-[#2bbef9] underline underline-offset-1">
            recent orders
          </span>
        </button>
        , manage your{" "}
        <button onClick={handlePasswordClick}>
          <span className="text-[#2bbef9] underline underline-offset-1">
            Admin
          </span>
        </button>
        , and{" "}
        <button onClick={handleAccountDetailsClick}>
          <span className="text-[#2bbef9] underline underline-offset-1">
            edit account details
          </span>
        </button>
        .
      </p>
    </div>
  );
};

export default Dashboard;
