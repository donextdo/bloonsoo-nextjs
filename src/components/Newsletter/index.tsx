import React from 'react'
import Logo from './Logo'

const Newsletter = () => {
  return (
    <section className="w-full py-10 bg-lightblue font-montserrat">
   
    <div className="md:container md:mx-auto px-8 md:px-32 ">
        
        <div className="md:flex items-center gap-16">
            <div className="text-center">
                <h3 className="text-xl text-black font-bold">
                    NEWSLETTER
                </h3>

                <p className="text-sm text-black">
                    Stay Upto Date
                </p>
            </div>

            <div className="w-full h-max relative">
                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-400 rounded-full text-black text-sm  focus:outline-none" placeholder="Your Email Here"/>

                <button className="absolute right-0 top-0 p-2 h-full aspect-square rounded-full grid place-items-center bg-gradient-to-b from-darkyellow to-semidarkyellow hover:from-semidarkyellow hover:to-darkyellow">
                    <Logo/>
                </button>
            </div>

        </div>

        <div className="flex w-full items-center justify-center mt-4 gap-3">
            <input type="checkbox" className="w-4 h-4"/>

            <p className="text-xs text-black font-semibold">
                Send me a link to get the FREE Bloonsoo app!
            </p>
        </div>

    </div>
</section>
  )
}

export default Newsletter