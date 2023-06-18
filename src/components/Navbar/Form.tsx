import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import DateInput from '../Shared/DateInput';
import GuestsPanel from '../Shared/GuestPanel';
import { useRouter } from 'next/router';


const Form = () => {

  const [error, setError] = useState(false)
  const [modelValue, setModelValue] = useState('');
  const [city, setCity] = useState('')
  const errorMessage = 'Please provide a valid date';
  const router = useRouter()
  // const [disabled, setDisabled] = useState(!city);

  

  const handleUpdateModelValue = (value: string) => {
    setModelValue(value);
  };

  const handleSearch = () => {
    const hotelData = { city: city };
    console.log(hotelData)
    router.push({
        pathname: '/search',
        query: hotelData,
    });
  }

  return (
    <div className="relative mx-auto md:container px-10 md:px-20 -mt-14 z-20">
      <div className="relative w-full h-full border-4 rounded-lg px-8 py-4 bg-white border-blue-500 flex flex-col gap-4 md:px-24" >

        <div>
          <label className="font-montserrat text-sm font-bold text-slate-700" >Location</label>

          <div className="relative w-full mt-2">

            <input

              type="text" className="w-full px-12 py-2 border border-slate-400 rounded-lg text-slate-700 text-sm font-semibold focus:border-blue-500 focus:border focus:outline-none" placeholder="Which city do you prefer?" value={city} onChange={(e) => setCity(e.target.value)} />

            <FontAwesomeIcon icon={faLocationDot} className="absolute left-4 top-0 bottom-0 my-auto text-slate-700 text-2xl" />

          </div>

          {error && <small className="text-red-900 font-semibold">Please provide a location</small>}

        </div>

        <div className="grid gird-rows-2 lg:grid-cols-2 gap-4">

          <DateInput
            label="Check In"
            modelValue={modelValue}
            error={error}
            errorMessage={errorMessage}
            onUpdateModelValue={handleUpdateModelValue}
          />

          <DateInput
            label="Check Out"
            modelValue={modelValue}
            error={error}
            errorMessage={errorMessage}
            onUpdateModelValue={handleUpdateModelValue}
          />
        </div>

        <GuestsPanel />

        


        <button
          onClick={handleSearch}
          className="py-3 px-6 -mb-10 rounded-full text-sm text-black font-semibold bg-gradient-to-b from-darkyellow to-semidarkyellow hover:from-semidarkyellow hover:to-darkyellow">Search</button>
      </div>
    </div>
  )
}

export default Form