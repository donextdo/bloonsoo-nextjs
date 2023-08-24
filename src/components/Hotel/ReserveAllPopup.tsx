import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoginPopup from '../Auth/LoginPopup/LoginPopup';
import { setHotelId } from './bookingSlice';


const ReserveAllPopup = ({ propertyName, propertyAddress, policies, handleResAllClick, setReserveAllShow, setAuthPopup, hotelId }: any) => {
  const bookings = useSelector((state: RootState) => state.booking.items);
  const totalPrice = useSelector((state: RootState) => state.booking.totalAmount);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()

  const dispatch = useDispatch();

  let user: any

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            const userJson = localStorage.getItem('user');
             user = userJson ? JSON.parse(userJson) : null;
        }
        if (user) {
          setIsLoggedIn(true);
        }
      }, []);

  console.log(propertyName)
  console.log(propertyAddress)
  console.log(policies)

  const handleClose = () => {

  };

  const handleSubmit = () => {
    console.log(hotelId)
    dispatch(setHotelId(hotelId))
    setReserveAllShow(false)
    

    if(isLoggedIn){
    router.push( "/booking/details" );

    }else {
      setAuthPopup(true)
    }
    
  };
  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-10 md:py-20">
      <div className="w-[90vw] md:w-[70vw] max-h-full bg-white rounded-lg relative shadow-md overflow-visible flex flex-col gap-6 px-8 py-10 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500">
        <div className="flex flex-col pb-5 gap-2 border-b border-gray-400">
          <h3 className="text-base md:text-xl font-bold">{propertyName}</h3>
          <p className="text-sm font-medium text-gray-600">
            {propertyAddress.street_address}, {propertyAddress.country}
          </p>
          <div className="flex gap-1 w-max">
            <FontAwesomeIcon icon={faStar} className="text-semidarkyellow text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-semidarkyellow text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-semidarkyellow text-xs" />
            <FontAwesomeIcon icon={faStar} className="text-semidarkyellow text-xs" />
            <FontAwesomeIcon icon={farStar} className="text-semidarkyellow text-xs" />
          </div>
        </div>
        {bookings.map((book: any, index: number) => (
          <section key={index} className="flex flex-col gap-6">
            <div className="flex flex-col pb-5 gap-4 border-b border-gray-400">
              <h4 className="text-sm md:text-base font-semibold text-gray-900">
                Total length of stay: <span className="font-medium">{`${book.nights} nights ${book.adults} adults ${book.children > 0 ? `${book.children} children` : ''}`}</span>
              </h4>
              <div className="md:w-2/5 grid grid-cols-2 gap-4 text-sm text-gray-900">
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Check In</span>
                  <span className="font-semibold">
                    {new Date(book.checkInDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}

                  </span>
                  <span className="font-medium">
                    {policies?.check_in_form} - {policies?.check_in_untill}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Check Out</span>
                  <span className="font-semibold">
                    {new Date(book.checkOutDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="font-medium">
                    {policies?.check_out_form} - {policies?.check_out_untill}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-5 gap-2 border-b border-gray-400">
              <h4 className="text-sm md:text-base font-semibold">
                {`${book.rooms} x ${book.roomType} ${book.roomName}`}
              </h4>
            </div>
            <div className="flex items-center justify-between pb-5 gap-2 border-b border-gray-400">
              <h3 className="text-base md:text-lg font-bold">Price</h3>
              <h3 className="text-base md:text-lg font-bold">USD {book.totalPrice}</h3>
            </div>
          </section>
        ))}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-lg font-bold">Total Price</h3>
            <h3 className="text-base md:text-lg font-bold">USD {totalPrice}</h3>
          </div>
          <p className="text-sm">
            TAX (2.50%) not included VAT (15%) not included Property service charge (10%) not included City tax (1.01%)
          </p>
          <p className="text-sm">
            * This price is converted to show you the approximate cost in LKR. You&apos;ll pay in US$ or LKR. The exchange rate might change before you pay.
          </p>
          <p className="text-sm">Keep in mind that your card issuer may charge you a foreign transaction fee.</p>
          <div className="inline-flex gap-2 w-full">
                    <input
                      type="text"
                      className="h-11 bg-gray-100 rounded-md px-4 text-sm w-full md:w-72"
                      placeholder="Coupon code"
                    //   onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button
                      className="bg-[#1d4ed8] text-white py-2.5 px-4 rounded-md text-xs h-11 w-40"
                    //   onClick={handlecoupon}
                    >
                      Apply coupon
                    </button>
                  </div>
          <button onClick={handleSubmit} className="mt-4 w-2/3 mx-auto py-3 btn-accent">
            Continue Booking
          </button>
        </div>
        <button onClick={handleResAllClick} className="absolute right-4 top-4 w-6 h-6 z-50">
          <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
        </button>
      </div>
    </div>
   
    
  );
}

export default ReserveAllPopup;