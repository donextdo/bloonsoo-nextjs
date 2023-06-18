import React, { useState, useRef } from 'react';
import SwiperCore, { Navigation, Pagination, Lazy, FreeMode, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
// import '../../../public/swiper.css';

SwiperCore.use([Navigation, Pagination, Lazy, FreeMode, Thumbs]);

const Swipper = ({ hotelGallery }: any) => {

  console.log(hotelGallery)
  const [modules] = useState([Pagination, Navigation, Lazy, FreeMode, Thumbs]);
  const thumbsSwiper = useRef(null);

  const setThumbsSwiper = (swiper: any) => {
    thumbsSwiper.current = swiper;
  };
  return (
    <div className="w-full h-[45vh] md:h-[90vh] grid grid-rows-5 gap-4">
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper.current }}
        modules={modules}
        className="w-full md:h-full row-span-4 z-10"
      >
        {hotelGallery.map((img: any, index: any) => (
          <SwiperSlide key={index}>
            <img src={img} loading="lazy" className="w-full h-full object-cover bg-gray-400" alt="" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={8}
        freeMode={true}
        watchSlidesProgress={true}
        modules={modules}
        className="w-full h-full z-10"
      >
        {hotelGallery.map((img: any, index: any) => (
          <SwiperSlide key={index}>
            <img src={img} loading="lazy" className="w-full h-full object-cover bg-gray-400" alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Swipper;


