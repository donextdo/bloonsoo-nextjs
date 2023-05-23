import Image from 'next/image';
import React, { useState, useEffect, FC } from 'react';
// import { HotelData } from '../Hotels/HotelData';
import axios from 'axios';
import baseUrl from '../../../Utils/baseUrl';
import { HotelData } from '../Hotels/HotelData';

// interface Hotel {
//   _id: string;
//   gallery_image: string[];
// }

interface HotelCardProps {
  hotel: HotelData;
}


const ImageGallery: React.FC<HotelCardProps>= ({hotel}) => {
  const [hotels, setHotels] = useState([]);

  // useEffect(() => {
  //   fetchHotels();
  // },[]);
  
  // const fetchHotels = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/hotel`);
  //     console.log(response.data)
  //     setHotels(response.data);
  //   } catch (error) {
  //     console.error('Error fetching hotels:', error);
  //   }
  // };

  // const handleClick = () => {
  //   onClick();
  // };

  return (
    <div className="w-full h-48 md:h-70vh grid grid-cols-3 grid-rows-2 gap-4 relative">
      <div className="w-full h-full row-span-2 col-span-2 relative">
        <Image src={hotel.gallery_images[0]} alt="" className="w-full h-full object-cover" />

        <button  className="absolute inset-0 bg-transparent"></button>
      </div>

      <div className="w-full h-full col-span-1 row-span-1 relative">
        <Image src={hotel.gallery_images[1]} alt="" className="w-full h-full object-cover" />

        <button  className="absolute inset-0 bg-transparent"></button>
      </div>

      <div className="w-full h-full col-span-1 row-span-1 relative">
        <Image src={hotel.gallery_images[2]} alt="" className="w-full h-full object-cover" />

        <button
          
          className="absolute inset-0 bg-black bg-opacity-30 grid place-items-center hover:bg-opacity-50"
        >
          <h4 className="text-white font-extrabold text-sm md:text-base">
            <span className="text-base md:text-4xl">+</span>
            <span className="text-lg md:text-6xl">{hotel.gallery_images.length - 2}</span> photos
          </h4>
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
