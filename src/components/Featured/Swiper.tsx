import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
//import 'swiper/css/lazy';

import { Pagination, Navigation, Lazy } from 'swiper';

// Import your custom CSS if needed
import '../../assets/css/swiperCustom.css';
import Image from 'next/image';

//Swiper.use([Pagination, Navigation, Lazy]);

const SwiperComponent = () => {
  const [modules] = useState([Pagination, Navigation, Lazy]);

  const pagination = {
    clickable: true,
  };

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      modules={modules}
      loop={true}
      //lazy={true}
      pagination={pagination}
      className="w-full h-full rounded-lg z-10"
    >
      <SwiperSlide>
        <Image
          src="/assets/featured/image_1.jpg"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide>
        <Image
          src="/assets/featured/image_2.jpg"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide>
        <Image
          src="/assets/featured/image_3.jpg"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide>
        <Image
          src="/assets/featured/image_4.jpg"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;