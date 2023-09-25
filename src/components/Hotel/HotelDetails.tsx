import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faShareAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/router';
import baseUrl from '../../../Utils/baseUrl';
import axios from 'axios';
import siteUrl from '../../../Utils/siteUrl';
import { FacebookShareButton, FacebookIcon } from 'react-share'
import { Helmet } from 'react-helmet';
import Head from 'next/head';
import { FaFacebookF } from 'react-icons/fa';


const HotelDetails = ({ hotel }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [user, setUser] = useState({})

  const router = useRouter()


  const toggleFavorite = () => {
    setIsFav(!isFav);
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const userArray = userString ? JSON.parse(userString) : [];
    if (userArray) {
      setIsLoggedIn(true);
    }
    setUser(userArray._id)
  }, []);

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

  const encodedUrl = encodeURIComponent(`${siteUrl}/hotels/${hotel._id}`);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  const facebookShareClick = (e: any) => {
    e.preventDefault();
    window.open(
      facebookShareUrl,
      "facebook-share-dialog",
      "width=626,height=436"
    );
  };

  return (
    <div className="md:w-full px-4 md:px-8 py-8 bg-white rounded-lg shadow-lg flex flex-col gap-6">
     
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex flex-col gap-5 md:gap-10 mb-12 md:mb-0">
          <h2 className="text-lg md:text-2xl font-bold">{hotel.property_name ? hotel.property_name : ''}</h2>
          <p className="text-sm text-gray-600">{hotel.property_address ? hotel.property_address.street_address : ''}, {hotel.property_address ? hotel.property_address.country : ''}</p>
        </div>
        <div className="flex items-center  gap-6 md:gap-4">
          <button onClick={() => handleWishlist(hotel)}>
            <FontAwesomeIcon
              className={`text-red-500 text-xl md:text-3xl mx-5 md:mx-0`}
              icon={isFav ? solidHeart : regularHeart}
            />
          </button>
          <button>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={facebookShareClick}
              >
                <div
                        className="h-[34px] w-[34px] rounded-full bg-blue-700 flex items-center justify-center">
                        <FaFacebookF className="text-white"></FaFacebookF>
                    </div>
              </a>
            </button>
          {/* <div>
            <FacebookShareButton url={facebookShareUrl}>
              <FacebookIcon size={35} round={true} />
            </FacebookShareButton>
          </div> */}
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


