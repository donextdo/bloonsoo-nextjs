import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faHeart as solidHeart, faHeart as regularHeart } from '@fortawesome/free-solid-svg-icons';
//import { faHeart as regularHeart } from '@fontawesome/free-regular-svg-icons';
//import FeaturedSwiper from './Swiper';
import Room from './Icons/tub';
import Tub from './Icons/Room';
import Beds from './Icons/Beds';
import Foot from './Icons/Foot';
//import { faHeart } from '@fortawesome/free-solid-svg-icons';

const FeaturedCard
: React.FC = () => {
  const [isFav, setIsFav] = useState(false);

  const toggleFavorite = () => {
    setIsFav(!isFav);
  };

  return (
    <div className="w-80 md:w-full flex flex-col gap-4 text-white select-none xl:gap-6">
      <div className="w-full h-60 rounded-lg shadow-lg xl:h-80 relative overflow-hidden">
        {/* <FeaturedSwiper /> */}

        <h3 className="text-xs font-bold absolute bottom-0 left-0 right-0 w-full p-4 bg-black bg-opacity-20 z-30 xl:text-sm pointer-events-none">
          $ 1000 - 5000 USD
        </h3>
{/* 
        <div className="absolute top-4 right-4 z-30">
          <FontAwesomeIcon
            className="text-white text-2xl cursor-pointer"
            icon={isFav ? solidHeart : regularHeart}
            onClick={toggleFavorite}
          />
        </div> */}
      </div>

      <div className="flex flex-col">
        <h4 className="text-sm font-semibold text-black xl:text-base">Well Furnished Apartment</h4>

        <p className="text-xs text-gray-500 xl:text-sm">100 Whatever Street, USA</p>

        <div className="flex gap-4 mt-2 xl:gap-5">
          <div className="flex gap-2 items-center">
            <Room/>
            <span className="w-4 h-4 xl:w-5 xl:h-5" />
            <span className="text-black font-bold text-xs xl:text-base">2</span>
          </div>

          <div className="flex gap-2 items-center">
            <Tub/>
            <span className="w-4 h-4 xl:w-5 xl:h-5" />
            <span className="text-black font-bold text-xs xl:text-base">2</span>
          </div>

          <div className="flex gap-2 items-center">
            <Beds/>
            <span className="w-4 h-4 xl:w-5 xl:h-5" />
            <span className="text-black font-bold text-xs xl:text-base">2</span>
          </div>

          <div className="flex gap-2 items-center">
            <Foot/>
            <span className="w-4 h-4 xl:w-5 xl:h-5" />
            <span className="text-black font-bold text-xs xl:text-base">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard
;
