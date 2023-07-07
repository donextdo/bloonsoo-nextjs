import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart, faHeart as farHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import baseUrl from '../../../Utils/baseUrl';
import axios from 'axios';
import { useRouter } from 'next/router';

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
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()



  useEffect(() => {
    const userString = localStorage.getItem('user');
    const userArray = userString ? JSON.parse(userString) : [];
    if (userArray) {
      setIsLoggedIn(true);
    }
    setUser(userArray._id)
  }, []);


  const getImageUrl = (name: string) => {
    return new URL(`./assets/images/${name}.jpg`, import.meta.url).href;
  };

  const toggleFavorite = () => {
    // setIsFav((prevIsFav) => !prevIsFav);
  };

  const handleWishlist = async (hotel: any) => {
    console.log(hotel)

    if (isLoggedIn) {
      setIsFav(!isFav)

      const whishListObj = {
        whishList: [
          {
            hotelId: hotel._id,
            image: hotel.cover_image,
            title: hotel.property_name,
            address: hotel.property_address.street_address,
          },
        ],
      };

      try {
        const response = await axios.post(
          `${baseUrl}/user/wishList/${user}`,
          whishListObj,

        );

        console.log(response.data); // do something with the response data
      } catch (error) {
        console.log(error); // handle the error 

        // alert("Session expired")
        // router.push("/signin");
      }
    } else {
      router.push("/signin");
    }

  }

  return (
    <div className="group relative w-80 md:w-full h-80 shadow-lg text-white rounded-lg overflow-hidden hover:scale-105 transition">
      <Link href={`/hotels/${hotel._id}`} >

        <img src={hotel.cover_image} loading="lazy" className="w-full h-full object-cover" alt="" />
      </Link>
      <div className="absolute bottom-0 left-0 right-0 py-2 px-4 flex flex-col bg-black bg-opacity-20 group-hover:bg-opacity-40">
        <h4 className="text-md font-bold">{hotel.property_name}</h4>
        <p className="text-xs font-semibold">{hotel.property_address?.street_address}</p>
      </div>
      <button className="absolute top-4 right-2 md:invisible group-hover:visible p-2 bg-white rounded-full" onClick={() => (handleWishlist(hotel))}>

        {isFav ? <FaHeart className='text-black' /> : <FaHeart className='text-blue-500' />}

      </button>



    </div>
  );
};

export default HotelCard;
