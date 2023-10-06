import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../stores/store'
import { addCurrency } from './currencySlice'
import lk from '../../../assets/country/sl.png'
import usa from '../../../assets/country/usa.png'
import Image from 'next/image'


function Currency({ setSelectedCurrency }: any) {
  const dispatch = useDispatch<AppDispatch>()

  const handleUSD = () => {
    setSelectedCurrency("USD")
    dispatch(addCurrency("USD"))
    // sessionStorage.setItem("currency", "USD");
  }

  const handleEUR = () => {
    setSelectedCurrency("LKR")
    // sessionStorage.setItem("currency", "LKR");
    dispatch(addCurrency("LKR"))

  }

  return (
    <div
      className='absolute w-[100px] max-h-[540px] bg-white right-0 top-8 z-50 px-5 py-4 shadow-lg space-y-2 rounded-lg flex flex-col'>
      <div className='flex gap-4 w-6 h-6 cursor-pointer' onClick={handleUSD}>
        <Image src={usa} alt='lkr' className='object-cover' />
        <button className="text-xs text-black hover:text-primary" >USD</button>
      </div>
      <div className='flex gap-4 w-6 h-6 cursor-pointer' onClick={handleEUR}>
        <Image src={lk} alt='lkr' className='object-cover' />
        <button className="text-xs text-black hover:text-primary" >LKR</button>
      </div>
    </div>
  )
}

export default Currency
