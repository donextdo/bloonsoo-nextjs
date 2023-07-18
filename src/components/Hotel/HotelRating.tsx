import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const HotelRating = ({hotel}:any) => {
    const [isFav, setIsFav] = useState(false);
    return ( 
        <div className="w-full bg-gray-200 flex flex-col gap-4 rounded-lg shadow-md p-6 font-montserrat text-black">
      <div className="text-base md:text-lg font-bold flex justify-between items-center gap-4">
        <h2>Ratings</h2>
        <div className="flex items-center gap-2">
          {hotel.star_rating !== 'N/A' && (
            <FontAwesomeIcon icon={faStar} className="text-semidarkyellow text-base" />
          )}
          <p>{hotel.star_rating}</p>
        </div>
      </div>
      <div className="w-full flex flex-col">
        {/* Render HotelRatingBar components here */}
      </div>
    </div>
     );
}
 
export default HotelRating;