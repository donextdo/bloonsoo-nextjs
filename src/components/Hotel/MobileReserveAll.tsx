import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useState } from "react";
import ReserveAllPopup from "./ReserveAllPopup";
import LoginPopup from "../Auth/LoginPopup/LoginPopup";

const MobileReserveAll = ({hotel}:any) => {
    const bookings = useSelector((state: RootState) => state.booking.items);
  const totalAmount = useSelector((state: RootState) => state.booking.totalAmount);
  const [reserveAllShow, setReserveAllShow] = useState(false)
  const [authPopup, setAuthPopup] = useState(false);

  const handleResAllClick = () => {
    setReserveAllShow(!reserveAllShow)
  };
  
    return ( 
        <div className="lg:hidden">
            {bookings.length > 0 && (
                <div className={'bg-green-700 shadow-md w-full px-5 rounded-lg h-24 flex flex-cil items-center'}>
                <div className="flex flex-col items-center gap-3 mx-auto">
                   <h3 className="text-sm text-white">
                     TOTAL: {totalAmount}
                   </h3>
                   <button onClick={handleResAllClick} className="px-6 py-1 gradient-btn rounded-full">
                     Reserve All
                   </button>
                 </div>
             </div>
            )}
        
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
 
export default MobileReserveAll;