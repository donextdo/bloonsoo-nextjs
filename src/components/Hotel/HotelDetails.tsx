import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faShareAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';


const HotelDetails = ({hotel}:any) => {

    const [isFav, setIsFav] = useState(false);

    const toggleFavorite = () => {
      setIsFav(!isFav);
    };
    return (
        <div className="md:w-full px-4 md:px-8 py-8 bg-white rounded-lg shadow-lg flex flex-col gap-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex flex-col gap-5 md:gap-10 mb-12 md:mb-0">
            <h2 className="text-lg md:text-2xl font-bold">{hotel.property_name ? hotel.property_name : ''}</h2>
            <p className="text-sm text-gray-600">{hotel.property_address ? hotel.property_address.street_address : ''}, {hotel.property_address ? hotel.property_address.country : ''}</p>
          </div>
          <div className="md:flex items-center justify-center gap-6">
            {/* <button onClick={toggleFavorite}>
              <FontAwesomeIcon
                className={`text-red-500 text-xl md:text-3xl mx-5 md:mx-0`}
                icon={isFav ? solidHeart : regularHeart}
              />
            </button>
            <button>
              <FontAwesomeIcon className="text-xl md:text-3xl mx-5 md:mx-0" icon={faShareAlt} />
            </button> */}
            <a
              href="#rooms-area"
              className="py-2 md:py-3 px-7 md:px-10 rounded-full w-max gradient-btn mx-5 md:mx-0"
            >
              Reserve Now
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="mt-2 flex items-center gap-10 text-blue-700">
            <button className="py-4 text-sm font-semibold flex items-center gap-4">
              <FontAwesomeIcon className="text-sm md:text-xl" icon={faPhone} />
              <span>Contact Host</span>
            </button>
            <button className="py-4 text-sm font-semibold flex items-center gap-4">
              <FontAwesomeIcon className="text-sm md:text-xl" icon={faBuilding} />
              <span>Property Inquiry</span>
            </button>
          </div>
        </div>
        <div className="pr-4">
          <p className="text-base md:text-xl font-bold">About Hotel</p>
          <p className="text-justify mt-3 text-gray-600 text-sm">{hotel.about ? hotel.about : ''}</p>
        </div>
      </div>
      );
}
 
export default HotelDetails;