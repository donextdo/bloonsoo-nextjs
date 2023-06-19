import { useState } from 'react'
import { BookingStatus, BookingStatusColor } from '../../../Utils/constants/bookingContants'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BookinCard = ({booking}:any) => {
    const [expand, setExpand] = useState(false)

    const getColor = (status:any) => {
        if(status == 0) {
            return 'bg-blue-500'
        }
        else if(status == 1) {
            return 'bg-green-500'
        }
        else {
            return 'bg-red-300'
        }
    }

    const toggleExpand = () => {
        setExpand(!expand)
    }
    return ( 
        <div className={`w-full px-4 py-6 pr-16 flex flex-col gap-8 bg-white rounded-md shadow-md overflow-hidden relative transition-all duration-300 ${expand ? 'h-max' : 'h-[5.5rem]'}`}>
        <div className="grid grid-cols-3 pb-5 border-b border-gray-400">
          <div className="flex flex-col">
            <h3 className="text-sm md:text-lg font-bold">{booking.hotel_id.property_name}</h3>
            <p className="text-sm font-medium text-gray-600">
              {booking.hotel_id.property_address.street_address}, {booking.hotel_id.property_address.country}
            </p>
          </div>
  
          <span className={`text-xs h-max font-medium w-max text-blask tracking-wider py-[2px] px-3 rounded-md ${getColor(booking?.status)}`}>
          {booking?.status === 0 ? 'Pending' : booking?.status === 1 ? 'Approved' : 'Cancelled'}
          </span>
  
          <h3 className="text-sm md:text-lg font-bold ml-auto">Total Price: {booking.total}</h3>
        </div>
  
        {booking.booked_rooms.map((room:any, index:number) => (
          <section key={index} className="flex flex-col gap-6">
            <div className="flex flex-col pb-5 gap-4 border-b border-gray-400">
              <h4 className="text-sm md:text-base font-semibold text-gray-900">
                Total length of stay:
                <span className="font-medium">
                  {`${room.nights} nights`} {`${room.adults} adults`} {room.children > 0 ? `${room.children} children` : ''}
                </span>
              </h4>
  
              <div className="md:w-2/5 grid grid-cols-2 gap-4 text-sm text-gray-900">
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Check In</span>
                  <span className="font-semibold">
                    {new Date(room.check_in).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                  </span>
                </div>
  
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Check Out</span>
                  <span className="font-semibold">
                    {new Date(room.check_out).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
  
            <div className="flex flex-col pb-5 gap-2 border-b border-gray-400">
              <h4 className="text-sm md:text-base font-semibold">
                {room.rooms} x {room.room_type} {room.room_name}
              </h4>
            </div>
  
            <div className="flex items-center justify-between pb-5 gap-2 border-b border-gray-400">
              <h3 className="text-sm md:text-lg font-bold">Price</h3>
              <h3 className="text-sm md:text-lg font-bold">{room.total}</h3>
            </div>
          </section>
        ))}
  
        <button onClick={toggleExpand} className="absolute top-8 right-6">
          {!expand ? (
            <FontAwesomeIcon icon={faChevronDown} className="text-lg text-blue-700" />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} className="text-lg text-blue-700" />
          )}
        </button>
      </div>
     );
}
 
export default BookinCard;