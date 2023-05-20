import Image from 'next/image'
import { Inter } from 'next/font/google'
import WhyChooseUs from '@/components/WhyChooseUs'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <WhyChooseUs/>
    </div>
  )
}
