import Image from 'next/image'
import { Inter } from 'next/font/google'
import WhyChooseUs from '@/components/WhyChooseUs'
import Cta from '@/components/Cta'
import Link from 'next/link'

import Tips from '@/components/Tips'
import Testimonials from '@/components/Testimonials'

import Img1 from '../assets/cta/cta_image1.jpg'
import Img2 from '../assets/cta/cta_image2.jpg'
import Img3 from '../assets/cta/cta_image3.jpg'
import Hotels from '@/components/Hotels'
import MyComponent from '@/components/Featured'



const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  const cta1 = {
    title: 'Try Hosting With Us',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    buttonLink: "/listing/",
    buttonText: "Become A Host",
  };

  const cta2 = {
    title: 'Browse For More Properties',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    buttonLink: "/listing/",
    buttonText: "Find A Property",
  };

  const cta3 = {
    title: '',
    desc: '',
    buttonLink: "",
    buttonText: "",
  };



  return (
    <div>

      <Hotels />
      <WhyChooseUs />



      <Cta contents={cta1}>
        <Image src={Img1} loading="lazy" className="w-full h-full object-cover" alt="" />
      </Cta>

      {/* <MyComponent/> */}


      <div className='mt-8'>
        <Cta contents={cta2}>
          <Image src={Img2} loading="lazy" className="w-full h-full object-cover" alt="" />

        </Cta>
      </div>

      <Tips />

      <Testimonials />

      
        <Image src={Img3} loading="lazy" className="w-full h-full object-cover" alt="" />

      

    </div>
  )
}
