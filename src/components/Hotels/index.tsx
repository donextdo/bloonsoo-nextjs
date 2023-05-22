import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import HotelCard from './HotelCard';
import axios from 'axios';
import baseUrl from '../../../Utils/baseUrl';

interface Hotel {
  _id: string;
  cover_image: string;
  property_name: string;
  property_address: {
    street_address: string;
  };
}

const Hotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [visibleItems, setVisibleItems] = useState(8);

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

  const sortedHotels = hotels.sort();

  const showMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  return (
    <section className="my-16 md:container md:mx-auto flex flex-col font-montserrat">
      {/* <h1 className="text-3xl text-center font-semibold leading-5 mb-12 -mt-4">hello</h1> */}
      <div className="w-full md:px-20 grid md:grid-cols-2 gap-4 justify-items-center lg:grid-cols-4 md:gap-8">
        {sortedHotels.slice(0, visibleItems).map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
          
        ))}
      


      </div>
      {
        <button
          onClick={showMore}
          className="py-3 px-8 self-center rounded-full mt-10 text-sm text-black font-bold bg-gradient-to-b from-darkyellow to-semidarkyellow hover:from-semidarkyellow hover:to-darkyellow"
        >
          View more
        </button>
      }
    </section>
  );
};

export default Hotels;
