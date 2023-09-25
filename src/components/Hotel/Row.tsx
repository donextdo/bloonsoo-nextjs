import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';
import ReservePopup from './ReservePopup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import { removeAll, removeItem } from './bookingSlice';
import useCurrency from '../Hooks/useCurrencyHook';


const Row = ({ room, toggleRoomModal }: any) => {
    const [showReservePopup, setShowReservePopup] = useState(false)
    const booking = useSelector((state: RootState) => state.booking.items);
    const dispatch = useDispatch();
    const { getPrice } = useCurrency();


    const handleClick = () => {
    };

    const handleReservePopup = () => {
        setShowReservePopup(!showReservePopup)

    };

    const handleCancel = (id: any) => {
        dispatch(removeItem(id))

    };

    const isRoomBooked = booking.some((item) => {
        console.log('item.roomId:', item);
        console.log('room.id:', room._id);
        return item.id === room._id;
    });
    console.log('isRoomBooked:', isRoomBooked);

    const checkForBookings = (id: any) => {
        const match = booking.find((b) => b.id === id);
      
        if (match) {
          const price =  getPrice(match.totalPrice);
          const rooms = match.rooms;
          return `Price: ${price}, Rooms: ${rooms}`;
        } else {
          // Handle the case where no booking with the given id was found
          return 'Booking not found'; // You can provide any appropriate default message
        }
      };

    return (
        <div className='hidden lg:block'>
            <div className="w-full gap-2 grid grid-cols-12 items-center">
                <div className="w-full bg-gray-200 col-span-4 pl-6 p-4 h-full flex flex-col gap-4">
                    <div className="text-base text-blue-700 font-semibold">
                        <h4 className="cursor-pointer" onClick={toggleRoomModal}>
                            {room.room_type}
                        </h4>

                        <h4 className="cursor-pointer" onClick={toggleRoomModal}>
                            {room.room_name}
                        </h4>
                    </div>

                    <div className="flex flex-col gap-2">
                        {room.beds.map((bed: any, index: number) => (
                            <div key={index} className="flex gap-2 items-center">
                                {/* <SharedLogosBed /> */}
                                <span className="text-sm font-semibold text-gray-800">
                                    {bed.no_of_beds} {bed.bed_type}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="text-sm text-gray-800">
                        <p className="text-justify">
                            {room.room_size} {room.facilities.join(" ")}
                        </p>
                    </div>
                </div>

                <div className="w-full bg-gray-200 col-span-1 p-4 h-full flex items-center justify-center">
                    <div className="flex justify-center flex-wrap gap-2">
                        {Array.from({ length: room.guests }).map((_, index) => (
                            <FontAwesomeIcon key={index} icon={faUser} className="text-gray-800 text-lg" />
                        ))}
                    </div>
                </div>

                <div className="w-full bg-gray-200 col-span-2 p-6 h-full flex flex-col justify-center gap-4">
                    <h4 className="text-base text-gray-800 font-semibold text-center">
                        {getPrice(parseFloat(room.price_for_one_night.slice(4)))}
                    </h4>
                </div>

                <div className="w-full bg-gray-200 col-span-2 p-6 h-full flex flex-col justify-center gap-4">
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faCoffee} className="text-gray-800 text-lg" />

                        <h4 className="text-base text-gray-800 font-semibold">
                            {room.is_breakfast_available
                                ? `Breakfast Available ${room.breakfast_price}`
                                : 'Breakfast not available'}
                        </h4>
                    </div>

                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faCheck} className="text-gray-800 text-lg" />

                        <h4 className="text-xs text-green-500 font-semibold">
                            Free cancellation within 24 hours
                        </h4>
                    </div>
                </div>

                <div className="w-full bg-gray-200 col-span-1 p-6 h-full flex items-center justify-center">
                    <h4 className="text-base text-gray-800 font-semibold">
                        {room.nbr_of_rooms}
                    </h4>
                </div>

                <div className="w-full bg-gray-200 col-span-2 p-6 h-full flex items-center flex-col gap-4 justify-center">

                    {isRoomBooked ? (
                        <div className="flex flex-col items-center gap-3 mx-auto">
                            <h3 className="text-sm text-left text-gray-800 font-medium">{checkForBookings(room._id)}</h3>
                            <button onClick={() => handleCancel(room._id)} className="px-10 py-2 gradient-outline-btn rounded-full">
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
                {showReservePopup && (
                    <ReservePopup room={room} setShowReservePopup={setShowReservePopup} />
                )}
            </div>
        </div>
    );
}

export default Row;