import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface GuestsPanelState {
  guestPanel: boolean;
  adults: number;
  children: number;
  rooms: number;
  setGuests: boolean;
}

const GuestsPanel: React.FC = () => {
  const [guestPanel, setGuestPanel] = useState<boolean>(false);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);
  const [setGuests, setSetGuests] = useState<boolean>(false);

  const handleGuestClick = () => {
    setGuestPanel((prevGuestPanel) => !prevGuestPanel);
    setSetGuests(true);
  };

  const handleIncrease = (name: string) => {
    if (name === 'adults') {
      setAdults((prevAdults) => prevAdults + 1);
    } else if (name === 'children') {
      setChildren((prevChildren) => prevChildren + 1);
    } else {
      setRooms((prevRooms) => prevRooms + 1);
    }
  };

  const handleDecrease = (name: string) => {
    if (name === 'adults') {
      setAdults((prevAdults) => (prevAdults > 1 ? prevAdults - 1 : prevAdults));
    } else if (name === 'children') {
      setChildren((prevChildren) => (prevChildren > 0 ? prevChildren - 1 : prevChildren));
    } else {
      setRooms((prevRooms) => (prevRooms > 1 ? prevRooms - 1 : prevRooms));
    }
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full relative">
      <label className="text-gray-600 text-sm font-bold">Guests</label>

      <div className="w-full relative h-max">
        <button
          onClick={handleGuestClick}
          type="button"
          className="w-full px-12 py-2 border border-slate-400 rounded-lg text-slate-700 font-semibold text-sm focus:border-blue-500 focus:border focus:outline-none flex items-center justify-start"
        >
          {setGuests ? `${adults} Adults • ${children} Children • ${rooms} Room` : 'Add Guests'}
        </button>

        <FontAwesomeIcon icon={faUser} className="absolute left-4 top-0 bottom-0 my-auto text-slate-700 text-lg" />
      </div>

      <div className={`w-full md:w-1/3 p-4 flex flex-col gap-4 absolute -top-24 left-0 right-0 z-10 bg-white shadow-md mx-auto transition-all overflow-hidden border border-slate-400 rounded-md origin-center ${guestPanel ? 'scale-y-100' : 'scale-y-0'}`}>

        <h4 className="text-sm font-bold text-gray-600">Guests</h4>

        <div className="flex items-center justify-between text-sm font-semibold text-gray-500">
          <span>Adults</span>

          <div className="flex items-center gap-4">
            <button onClick={() => handleDecrease('adults')} name="adults" className="control-btn">
              -
            </button>

            <span className="w-4 text-center">{adults}</span>

            <button onClick={() => handleIncrease('adults')} name="adults" className="control-btn">
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm font-semibold text-gray-500">
          <span>Children</span>

          <div className="flex items-center gap-4">
            <button onClick={() => handleDecrease('children')} name="children" className="control-btn">
              -
            </button>

            <span className="w-4 text-center">{children}</span>

            <button onClick={() => handleIncrease('children')} name="children" className="control-btn">
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm font-semibold text-gray-500">
          <span>Rooms</span>

          <div className="flex items-center gap-4">
            <button onClick={() => handleDecrease('rooms')} name="rooms" className="control-btn">
              -
            </button>

            <span className="w-4 text-center">{rooms}</span>

            <button onClick={() => handleIncrease('rooms')} name="rooms" className="control-btn">
              +
            </button>
          </div>
        </div>

        <button onClick={handleGuestClick} className="px-6 py-2 gradient-btn w-3/4 rounded-md self-center">
          Done
        </button>
      </div>
    </div>
  );
};

export default GuestsPanel;
