import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";



const LoginPopup = ({setAuthPopup}:any) => {
    
const handleClose = () => {
    setAuthPopup(false)
}
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">

            <div className="w-80 h-max bg-white rounded-lg relative shadow-md overflow-visible flex flex-col gap-4 px-6 py-4">

                <div className="w-full flex flex-col gap-6">

                    <h4 className="text-base font-semibold text-gray-800 mt-4">
                        You need to sign in before booking
                    </h4>

                    <Link href="/login"
                        className="rounded-full flex items-center justify-center py-2 w-24 gradient-btn col-span-2 mt-2 ml-auto">
                        Sign in
                    </Link>

                </div>

                <button onClick={handleClose} className="absolute right-4 top-4 w-6 h-6 z-50">
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>

            </div>


        </div>
    );
}

export default LoginPopup;