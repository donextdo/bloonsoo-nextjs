import React from 'react'
import Gradient from '../styles/coming_soon.module.css'

const coming_soon = () => {

  return (
    <section className="md:container mx-auto px-10 py-24 flex flex-col items-center gap-10 text-black font-montserrat">

      <h1 className={`${Gradient.coming_soon} text-8xl py-2 font-bold bg bg-gradient-to-b from-darkyellow to-semidarkyellow gradient-text`}>
            Coming Soon
          </h1>

    <p className="text-base font-semibold max-w-lg text-center">
        This page is not found because the page is under constructions
    </p>

    <div className="relative">
        <input type="email" placeholder="Please enter your email address" 
            className="w-[40rem] pl-6 pr-24 py-4 text-gray-600 text-sm font-semibold focus:outline-none bg-gray-300"/>

        
            <button className="px-6 h-10 bg-blue-700 text-white font-semibold text-base rounded-lg hover:bg-blue-900 absolute right-4 top-0 bottom-0 my-auto">
                Notify me
            </button>
    </div>

    <p className="text-base font-normal text-center">
        Notify me when the page is completed.
    </p>

</section>
  )
}

export default coming_soon