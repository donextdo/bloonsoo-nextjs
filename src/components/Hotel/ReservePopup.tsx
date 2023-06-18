import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBooking } from './bookingSlice';

const ReservePopup = ({ room, setShowReservePopup }: any) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkInError, setCheckInError] = useState(false);
    const [checkOut, setCheckOut] = useState('');
    const [checkOutError, setCheckOutError] = useState(false);
    const [guestPanel, setGuestPanel] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [setGuests, setSetGuests] = useState(false);

    console.log('checkIn:', checkIn);
    console.log('checkOut:', checkOut);
    console.log('guestPanel:', guestPanel);
    console.log('adults:', adults);
    console.log('children:', children);
    console.log('rooms:', rooms);
    console.log('room:', room);

  const dispatch = useDispatch();


    useEffect(() => {
        const today = new Date();
        const inDate = new Date(today.setDate(today.getDate()));
        const outDate = new Date(today.setDate(today.getDate() + 1));

        const month = String(inDate.getMonth() + 1).padStart(2, '0');
        const day = String(inDate.getDate()).padStart(2, '0');
        const tomorrowMonth = String(outDate.getMonth() + 1).padStart(2, '0');
        const tomorrowDay = String(outDate.getDate()).padStart(2, '0');
        const year = inDate.getFullYear();

        setCheckIn(`${year}-${month}-${day}`);
        setCheckOut(`${year}-${tomorrowMonth}-${tomorrowDay}`);
    }, []);

    const handleClose = () => {
        setShowReservePopup(false)
    };

    const handleGuestClick = () => {
        setGuestPanel(!guestPanel);
        setSetGuests(true);
    };

    const handleIncrease = (e: any) => {
        if (e.target.name === 'adults') {
            setAdults(adults + 1);
        } else if (e.target.name === 'children') {
            setChildren(children + 1);
        } else {
            setRooms(rooms + 1);
        }
    };

    const handleDecrease = (e: any) => {
        if (e.target.name === 'adults') {
            if (adults > 1) {
                setAdults(adults - 1);
            }
        } else if (e.target.name === 'children') {
            children > 0 && setChildren(children - 1);
        } else {
            rooms > 1 && setRooms(rooms - 1);
        }
    };

    useEffect(() => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkInDate >= checkOutDate) {
            setCheckOutError(true);
        } else {
            setCheckOutError(false);
        }
    }, [checkOut]);

    const onSubmit = () => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        console.log(checkInDate)

        const nights = (checkOutDate.getTime() - checkInDate.getTime()) / 86400000;
        
        const stringAmount = room.price_for_one_night
        const numberAmount = parseInt(stringAmount.split(" ")[1]);

        const totalPriceForRoom = rooms * nights * numberAmount
        console.log(totalPriceForRoom)

        const bookingObj = {
            id: room._id,
            nights: nights,
            rooms: rooms,
            adults: adults,
            children: children,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            roomName: room.room_name,
            roomType: room.room_type,
            totalPrice: totalPriceForRoom,
        };

        dispatch(addBooking(bookingObj))
        // Handle form submission with the payload
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 grid md:place-items-center z-40 py-20">
            <div className="w-[80vw] md:w-[60vw] h-max bg-white rounded-lg relative shadow-md overflow-visible flex flex-col gap-4 px-5 md:px-24 py-10 mx-auto md:mx-0">
                <div className="w-full grid grid-cols-2 gap-6">

                    <div className="flex flex-col gap-2 items-start">

                        <label className="text-sm font-bold">
                            Check In
                        </label>
                        <div className="w-full relative h-max">
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="w-full px-6 md:px-12 py-2 border border-slate-400 rounded-lg text-slate-700 font-semibold text-sm focus:border-blue-500 focus:border focus:outline-none appearance-none"
                                {...Attr}
                            />
                            <i className="left-2 md:left-4 top-0 bottom-0 my-auto text-slate-700 text-sm md:text-lg fas fa-calendar"></i>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2 items-start">

                        <label className="text-sm font-bold">
                            Check Out
                        </label>
                        <div className="w-full relative h-max">
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="w-full px-6 md:px-12 py-2 border border-slate-400 rounded-lg text-slate-700 font-semibold text-sm focus:border-blue-500 focus:border focus:outline-none appearance-none"
                                {...Attr}
                            />
                            <i className="left-2 md:left-4 top-0 bottom-0 my-auto text-slate-700 text-sm md:text-lg fas fa-calendar"></i>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2 items-start col-span-2 relative">
                        <label className="text-gray-600 text-sm font-bold">Guests</label>

                        <div className="w-full relative h-max">
                            <button
                                onClick={handleGuestClick}
                                type="button"
                                className="w-full px-6 md:px-12 py-2 border border-slate-400 rounded-lg text-slate-700 font-semibold text-sm focus:border-blue-500 focus:border focus:outline-none flex items-center justify-start"
                            >
                                {setGuests
                                    ? `${adults} Adults : ${children} Children : ${rooms} Room`
                                    : 'Add Guests'}
                                {/* Add Guests */}
                            </button>

                            <FontAwesomeIcon
                                icon={faUser}
                                className="absolute left-2 md:left-4 top-0 bottom-0 my-auto text-slate-700 text-sm md:text-lg"
                            />
                        </div>

                        {guestPanel && (
                            <div className="md:w-1/2 p-4 flex flex-col gap-4 absolute -top-14 left-0 right-0 z-10 bg-white shadow-md mx-auto transition-all overflow-hidden border border-slate-400 rounded-md origin-center">
                                <h4 className="text-sm font-bold text-gray-600">Guests</h4>

                                <div className="flex items-center justify-between text-sm font-semibold text-gray-500">
                                    <span>Adults</span>

                                    <div className="flex items-center gap-4">
                                        <button onClick={handleDecrease} name='adults' className="control-btn">
                                            -
                                        </button>
                                        <span className="w-4 text-center">{adults}</span>
                                        <button onClick={handleIncrease} name='adults' className="control-btn">
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm font-semibold text-gray-500">
                                    <span>Children</span>

                                    <div className="flex items-center gap-4">
                                        <button onClick={handleDecrease} name='children' className="control-btn">
                                            -
                                        </button>
                                        <span className="w-4 text-center">{children}</span>
                                        <button onClick={handleIncrease} name='children' className="control-btn">
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm font-semibold text-gray-500">
                                    <span>Rooms</span>

                                    <div className="flex items-center gap-4">
                                        <button onClick={handleDecrease} name='rooms' className="control-btn">
                                            -
                                        </button>
                                        <span className="w-4 text-center">{rooms}</span>
                                        <button onClick={handleIncrease} name='rooms' className="control-btn">
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button onClick={handleGuestClick} className="px-6 py-2 gradient-btn w-3/4 rounded-md self-center">
                                    Done
                                </button>
                            </div>
                        )}
                    </div>

                    <button onClick={onSubmit} className="rounded-full py-2 md:py-3 gradient-btn col-span-2 mt-3 md:mt-6">
                        Done
                    </button>
                </div>

                <button onClick={handleClose} className="absolute right-4 top-4 w-6 h-6 z-50">
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>
            </div>
        </div>
    );
}

export default ReservePopup;