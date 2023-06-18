import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useState } from "react";
import ReserveAllPopup from "./ReserveAllPopup";
import LoginPopup from "../Auth/LoginPopup/LoginPopup";

const Table = ({ headers, hotel}: any) => {
  const booking = useSelector((state: RootState) => state.booking.items);
  const totalAmount = useSelector((state: RootState) => state.booking.totalAmount);
  const [reserveAllShow, setReserveAllShow] = useState(false)
  const [authPopup, setAuthPopup] = useState(false);


  const handleResAllClick = () => {
    setReserveAllShow(!reserveAllShow)
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full bg-blue-700 gap-2 grid grid-cols-12 items-center text-white text-base font-semibold">
        <div className="w-full col-span-4 px-6 h-24 flex items-center">
          <h3>{headers[0] ? headers[0] : ''}</h3>
        </div>
        <div className="w-full col-span-1 px-6 h-24 flex items-center">
          <h3>{headers[1] ? headers[1] : ''}</h3>
        </div>
        <div className="w-full col-span-2 px-6 h-24 flex items-center">
          <h3>{headers[2] ? headers[2] : ''}</h3>
        </div>
        <div className="w-full col-span-2 px-6 h-24 flex items-center">
          <h3>{headers[3] ? headers[3] : ''}</h3>
        </div>
        <div className="w-full col-span-1 px-6 h-24 flex items-center">
          <h3>{headers[4] ? headers[4] : ''}</h3>
        </div>
        <div className={`w-full col-span-2 px-6 h-24 flex items-center relative ${booking.length > 0 && 'bg-green-700'}`}>
          {/* {booking.length < 1 && <div className="w-2 bg-gray-100 h-24 absolute top-0 bottom-0 -left-2"></div>} */}
          {booking.length < 1 ? (
            <h3>{headers[5] ? headers[5] : ''}</h3>
          ) : (
            <div className="flex flex-col items-center gap-3 mx-auto">
              <h3 className="text-sm">TOTAL: {totalAmount}</h3>
              <button onClick={handleResAllClick} className="px-6 py-1 gradient-btn rounded-full">
                Reserve All
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        {/* Render the children components */}
      </div>
      {reserveAllShow && (
        <ReserveAllPopup handleResAllClick={handleResAllClick} propertyName={hotel.property_name} propertyAddress={hotel.property_address} policies={hotel.policies
        } setReserveAllShow={setReserveAllShow} setAuthPopup={setAuthPopup} hotelId={hotel._id}/>
      )}

{authPopup && (
        <LoginPopup setAuthPopup={setAuthPopup}/>
      )}
    </div>
  );
}

export default Table;