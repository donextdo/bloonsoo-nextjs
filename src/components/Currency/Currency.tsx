import React from 'react'

function Currency({setSelectedCurrency}:any) {
  return (
    <div
            className='absolute w-[100px] max-h-[540px] bg-white right-0 top-8 z-50 px-5 py-4 shadow-lg space-y-2 rounded-lg flex flex-col'>
            <button className="text-xs text-black hover:text-primary" onClick={() => setSelectedCurrency("USD")}>USD</button>
            <button className="text-xs text-black hover:text-primary" onClick={() => setSelectedCurrency("EUR")}>EUR</button>
        </div>
  )
}

export default Currency
