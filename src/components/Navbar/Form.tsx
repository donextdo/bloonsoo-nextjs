import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import DateInput from '../Shared/DateInput';
import GuestsPanel from '../Shared/GuestPanel';


const Form = () => {

  const [error, setError] = useState(false)
  const [modelValue, setModelValue] = useState('');
  const errorMessage = 'Please provide a valid date';
  // const [disabled, setDisabled] = useState(!city);

  // const handleClick = () => {
  //   if (city) {
  //     onClick();
  //   }
  // };

  const handleUpdateModelValue = (value: string) => {
    setModelValue(value);
  };

  return (
    <div className="relative mx-auto md:container px-10 md:px-20 -mt-14 z-20">
      <form className="relative w-full h-full border-4 rounded-lg px-8 py-4 bg-white border-blue-500 flex flex-col gap-4 md:px-24" action="">

        <div>
          <label className="font-montserrat text-sm font-bold text-slate-700" >Location</label>

          <div className="relative w-full mt-2">

              <input
              v-model="city"
              type="text" className="w-full px-12 py-2 border border-slate-400 rounded-lg text-slate-700 text-sm font-semibold focus:border-blue-500 focus:border focus:outline-none" placeholder="Which city do you prefer?"/>

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

        <GuestsPanel/>

        <button
      // disabled={!city}
      // onClick={handleClick}
      className={`py-3 px-6 -mb-10 rounded-full text-sm text-black font-semibold bg-gradient-to-b from-darkyellow to-semidarkyellow hover:from-semidarkyellow hover:to-darkyellow`}
    >
      Search
    </button>

      </form>
    </div>
  )
}

export default Form