import Link from "next/link";

const CheckMail = () => {
    return ( 
        <section className="text-black font-montserrat md:container mx-auto px-5 md:px-10 py-20">

        <div className="w-56 md:w-96 h-full mx-auto space-y-10 text-center">

            <h1 className="text-2xl md:text-4xl font-bold ">
                Successfull !!
            </h1>

            <p className="text-sm md:text-base font-medium tracking-wider max-w-xl">
              We have sent a  email to your email. Please check your inbox and click the reset password button to reset your password. If you did not receive the email, please check your spam folder. 
            </p>
            

            <Link href="/">
              <button
                className="px-4 py-3 bg-[#3A1C61] text-white font-semibold text-sm md:text-base rounded-lg hover:bg-blue-900 text-bold mt-10"
                >
                Go to Home
              </button>
            </Link>

        </div>

    </section>
     );
}
 
export default CheckMail;