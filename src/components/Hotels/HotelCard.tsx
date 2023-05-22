import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart, faHeart as farHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

interface Hotel {
  _id: string;
  cover_image: string;
  property_name: string;
  property_address: {
    street_address: string;
  };
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const [isFav, setIsFav] = useState(false);

  const getImageUrl = (name: string) => {
    return new URL(`./assets/images/${name}.jpg`, import.meta.url).href;
  };

  const toggleFavorite = () => {
    setIsFav((prevIsFav) => !prevIsFav);
  };

  return (
    <Link href={`/hotels/${hotel._id}`} passHref  className="group relative w-80 md:w-full h-80 md:h-80 shadow-lg text-white rounded-lg overflow-hidden hover:scale-105 transition">
      
        <Image src={hotel.cover_image} loading="lazy" className="w-full h-full object-cover" width={100} height={100} alt="" />
        <div className="absolute bottom-0 left-0 right-0 py-2 px-4 flex flex-col bg-black bg-opacity-20 group-hover:bg-opacity-40">
          <h4 className="text-md font-bold">{hotel.property_name}</h4>
          <p className="text-xs font-semibold">{hotel.property_address.street_address}</p>
        </div>
        <div className="absolute top-2 right-2">
          <FontAwesomeIcon
            icon={isFav ? fasHeart : farHeartRegular}
            className="text-white text-2xl"
            onClick={toggleFavorite}
          />
        </div>
      
    </Link>
  );
};

export default HotelCard;
