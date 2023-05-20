import React from 'react'
import Card from './Card'
import Image from 'next/image'
import Img1 from '../../assets/features/feature_1.png'
import Img2 from '../../assets/features/feature_2.png'
import Img3 from '../../assets/features/feature_3.png'
import Img4 from '../../assets/features/feature_4.png'

const WhyChooseUs = () => {
  return (
    <section className="w-full py-10 bg-gray-200 border-4 border-gray-300 font-montserrat">
        <h1 className="text-3xl text-center font-semibold leading-5 mb-12">
            Why Choose Us
        </h1>

        <div className="md:container md:mx-auto px-20 grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center lg:grid-cols-4 md:gap-8">
          <Card title="Hottest Deal Finder" >
            <Image src={Img1}  width='250' height='250'className="w-full h-full object-contain" alt=''/>
          </Card>

          <Card title="Easy Payment time">
          <Image src={Img2}  width='250' height='250' className="w-full h-full object-contain" alt=''/>
          </Card>

          <Card title="Affordable Packages">
          <Image src={Img3}  width='250' height='250' className="w-full h-full object-contain" alt=''/>
          </Card>

          <Card title="100% Safe">
          <Image src={Img4}  width='250' height='250' className="w-full h-full object-contain" alt=''/>
          </Card>
        </div>
    </section>
  )
}

export default WhyChooseUs