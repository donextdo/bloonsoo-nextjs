import ImageGallery from '@/components/Hotel/Gallery';
import { useEffect, useState, FC } from 'react';
import axios from 'axios';
import baseUrl from '../../../Utils/baseUrl';
import { HotelData } from '@/components/Hotels/HotelData';

// interface Hotel {
//   _id: string;
//   gallery_image: string[];
// }

interface HotelCardProps {
  hotel: HotelData;
}


const Hotels: React.FC<HotelCardProps> = ({ hotel }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  },[]);
  
  const fetchHotels = async () => {
    try {
      const response = await axios.get(`${baseUrl}/hotel`);
      console.log(response.data)
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  return (
    <section className="flex flex-col gap-14 bg-gray-50 text-black font-montserrat">
      <main className="md:container md:mx-auto  md:px-2 pt-16 pb-6 grid  md:grid-cols-3 gap-5 md:w-full">
      <section className="w-96 px-5  mb-5 md:mb-0 md:w-full md:col-span-2 ">
        <ImageGallery hotel={hotel}  />
      </section>
      </main>
    </section>
  );
}

export default Hotels