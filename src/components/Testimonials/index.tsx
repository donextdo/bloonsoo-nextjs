import React from 'react'
import Card from './Card'

const Testimonials = () => {
  return (
    <section className="px-10 md:px-20 mb-16 md:container md:mx-auto flex flex-col items-center font-montserrat">

    <div className="w-full bg-gray-200 border-4 p-10 pb-16 border-gray-300">
        
        <h1 className="text-3xl w-full text-center font-semibold mb-10 leading-10">
            Testimonials
        </h1>

        <div className='grid grid-cols-2 gap-5'>
        <Card/>
        <Card/>
        </div>

    </div>

</section>
  )
}

export default Testimonials