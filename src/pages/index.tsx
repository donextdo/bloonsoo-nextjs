import Image from 'next/image'
import { Inter } from 'next/font/google'
import WhyChooseUs from '@/components/WhyChooseUs'
import FeaturedSection from '@/components/Featured'
import Cta from '@/components/Cta'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const cta1 = {
    title: 'Browse For More Properties',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/assets/cta/cta_image1.jpg',
    buttonLink: "/listing/",
    buttonText: "Become A Host",
  };

  return (
    <div>
      <WhyChooseUs/>
      {/* <FeaturedSection/> */}

      <Cta contents={cta1}>
      <Image src="/assets/cta/cta_image1.jpg" loading="lazy" className="w-full h-full object-cover" alt="" />
      <Link href={cta1.buttonLink} 
      className="py-3 px-5 md:py-4 md:px-10 inline-block rounded-full 
                w-max text-sm text-black 
                font-bold bg-gradient-to-b 
                from-darkyellow to-semidarkyellow 
                hover:from-semidarkyellow 
                hover:to-darkyellow">{cta1.buttonText}</Link>
    </Cta>
    </div>
  )
}
