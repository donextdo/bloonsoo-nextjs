const ReserveAll = ({ headers, bookings, total, onResAllClick }:any) => {
    const handleResAllClick = () => {
        onResAllClick();
      };
    
    return ( 
        <div>
      <div>
        <div
          className={`${
            bookings ? 'bg-green-700 shadow-md w-full px-5 rounded-lg' : ''
          } w-full col-span-2 px-6 h-24 flex items-center relative`}
        >
          {bookings && (
            <div className="w-2 bg-gray-100 h-24 absolute top-0 bottom-0 -left-2"></div>
          )}

          {!bookings && <h3></h3>}

          {bookings && (
            <div className="flex flex-col items-center gap-3 mx-auto">
              <h3 className="text-sm text-white">TOTAL: {total}</h3>

              <button
                onClick={handleResAllClick}
                className="px-6 py-1 gradient-btn rounded-full"
              >
                Reserve All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
     );
}
 
export default ReserveAll;