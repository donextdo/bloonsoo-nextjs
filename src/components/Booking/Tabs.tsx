const BookingTabs = ({final}:any) => {
    return ( 
        <div className="w-full grid grid-cols-3 gap-2">
        <div className="w-full h-20 border-b-8 border-blue-700 flex items-center gap-3 text-blue-700">
            <span className="span-point">
                1
            </span>

            <span className="text-sm md:text-base font-semibold">
                Booking Details
            </span>
        </div>

        <div className="w-full h-20 border-b-8 border-blue-700 flex items-center gap-3 text-blue-700">
            <span className="span-point">
                2
            </span>

            <span className="text-sm md:text-base font-semibold">
                Your Details
            </span>
        </div>

        <div className={`w-full h-20 border-b-8  flex items-center gap-3 text-blue-700 ${final ? 'border-blue-700' : 'border-gray-200'}`}>
      <span className="span-point">
        3
      </span>

      <span className="text-sm md:text-base font-semibold">
        Final Setup
      </span>
    </div>
    </div>
     );
}
 
export default BookingTabs;