import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import Room from './icons/Room';
import Tub from './icons/Tub';
import Beds from './icons/Beds';
import Foots from './icons/Foots';
import SwiperComponent from './Swiper';

interface FeaturedItemProps {
  title: string;
  address: string;
  rooms: number;
  tubs: number;
  beds: number;
  foots: number;
}

const FeaturedItem: React.FC<FeaturedItemProps> = ({
  title,
  address,
  rooms,
  tubs,
  beds,
  foots,
}) => {
  const [isFav, setIsFav] = useState(false);

  const handleFavoriteClick = () => {
    setIsFav(!isFav);
  };

  const heartIcon: IconDefinition = isFav ? fasHeart : farHeart;

  return (
    <div className="w-80 md:w-full flex flex-col gap-4 text-white select-none xl:gap-6">
      <div className="w-full h-60 rounded-lg shadow-lg xl:h-80 relative overflow-hidden">
        <SwiperComponent /> {/* Make sure to import and use your FeaturedSwiper component */}
        <h3 className="text-xs font-bold absolute bottom-0 left-0 right-0 w-full p-4 bg-black bg-opacity-20 z-30 xl:text-sm pointer-events-none">
          $ 1000 - 5000 USD
        </h3>
        <div className="absolute top-4 right-4 z-30">
          <FontAwesomeIcon
            icon={heartIcon}
            className="text-white text-2xl cursor-pointer"
            onClick={handleFavoriteClick}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-semibold text-black xl:text-base">{title}</h4>
        <p className="text-xs text-gray-500 xl:text-sm">{address}</p>
        <div className="flex gap-4 mt-2 xl:gap-5">
          <div className="flex gap-2 items-center">
            <Room />
            <span className="text-black font-bold text-xs xl:text-base">{rooms}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Tub />
            <span className="text-black font-bold text-xs xl:text-base">{tubs}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Beds />
            <span className="text-black font-bold text-xs xl:text-base">{beds}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Foots />
            <span className="text-black font-bold text-xs xl:text-base">{foots}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedItem;
