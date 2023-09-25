import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../stores/store'
import { addCurrency } from './currencySlice'

function Currency({setSelectedCurrency}:any) {
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
            <button className="text-xs text-black hover:text-primary" onClick={handleUSD}>USD</button>
            <button className="text-xs text-black hover:text-primary" onClick={handleEUR}>LKR</button>
        </div>
  )
}

export default Currency
