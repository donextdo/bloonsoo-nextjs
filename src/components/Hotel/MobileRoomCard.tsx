import { faCheck, faCoffee, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { removeItem } from "./bookingSlice";
import ReservePopup from "./ReservePopup";

const MobileRoomCard = ({room, toggleRoomModal}:any) => {
    const [showReservePopup, setShowReservePopup] = useState(false)
    const booking = useSelector((state: RootState) => state.booking.items);
    const dispatch = useDispatch();

    const handleReservePopup = () => {
        setShowReservePopup(!showReservePopup)

    };

    const handleCancel = (id:any) => {
        dispatch(removeItem(id))

    };

    const isRoomBooked = booking.some((item) => {
        console.log('item.roomId:', item);
        console.log('room.id:', room._id);
        return item.id === room._id;
      });
      console.log('isRoomBooked:', isRoomBooked);
      
    return ( 
        <div className="bg-white shadow-md w-full px-5 my-5 lg:hidden">
        <div className="py-2">
          <h3 className="text-base font-bold text-blue-700 py-2">
            {room.room_type}
          </h3>
  
          <p className="text-sm font-medium text-gray-600 py-2">
            {room.room_name}
          </p>
  
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 mx-auto my-auto">
              {/* <SharedLogosBed /> */}
            </div>
  
            <div className="col-span-3">
              {room.beds.map((bed:any, index:number) => (
                <div key={index}>
                  <span className="text-sm font-semibold text-gray-800">
                    {bed.no_of_beds} {bed.bed_type}
                  </span>
                </div>
              ))}
            </div>
          </div>
  
          <div className="text-sm text-gray-800">
            <p className="text-justify py-2">
              {room.room_size}
              {room.facilities.join(' ')}
            </p>
          </div>
  
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-2">
              <div className="grid grid-rows-4 space-y-6 mx-auto my-auto">
                <div className="flex flex-row">
                  {Array.from({ length: room.guests }).map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faUser} className="text-sm text-gray-800 mx-auto my-auto" />

                  ))}
                </div>
  
                <h4 className="text-sm text-gray-800 font-semibold text-center">
                  {room.price_for_one_night}
                </h4>
  
                
                 <FontAwesomeIcon icon={faCoffee} className="text-gray-800 text-sm mx-auto my-auto" />
  
                <FontAwesomeIcon icon={faCheck}
                  className="text-green-500 text-sm mx-auto my-auto"
                />
              </div>
            </div>
  
            <div className="col-span-5">
              <div className="grid grid-rows-4 space-y-4">
                <p className="text-sm text-justify font-semibold py-3">
                  Person can Sleep
                </p>
  
                <p className="text-sm text-justify font-semibold">
                  Per Night
                </p>
  
                <h4 className="text-sm text-gray-800 font-semibold">
                  {room.is_breakfast_available
                    ? `Breakfast Available ${room.breakfast_price}`
                    : 'Breakfast not available'}
                </h4>
  
                <h4 className="text-xs text-green-500 font-semibold">
                  Free cancellation within 24 hours
                </h4>
              </div>
            </div>
          </div>
  
          <div className="w-full p-4 h-full flex items-center flex-row gap-10 justify-center">
            {/* <slot name="rooms"></slot> */}
            <slot name="actions"></slot>
          </div>

          <div className="w-full bg-gray-200 col-span-1 p-6 h-full flex items-center justify-center">
                <h4 className="text-base text-gray-800 font-semibold">
                    {room.nbr_of_rooms}
                </h4>
            </div>

            <div className="w-full bg-gray-200 col-span-2 p-6 h-full flex items-center flex-col gap-4 justify-center">

                  {isRoomBooked ? (
                     <div className="flex flex-col items-center gap-3 mx-auto">
                     <h3 className="text-sm text-left text-gray-800 font-medium">TOTAL: 24</h3>
                     <button onClick={()=>handleCancel(room._id)} className="px-10 py-2 gradient-outline-btn rounded-full">
                         Cancel
                     </button>
                 </div>
                ) : (
                    <button
                    className="px-10 py-2 gradient-outline-btn"
                    onClick={handleReservePopup}
                >
                    Reserve
                </button>
                )}
            </div>

        </div>
        {showReservePopup && (
                <ReservePopup room={room} setShowReservePopup={setShowReservePopup} />
            )}
      </div>
     );
}
 
export default MobileRoomCard;