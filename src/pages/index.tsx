import Image from 'next/image'
import { Inter } from 'next/font/google'
import WhyChooseUs from '@/components/WhyChooseUs'

import Tips from '@/components/Tips'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <WhyChooseUs/>
      <Tips/>
    
      
    </div>
  )
}
