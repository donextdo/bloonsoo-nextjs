import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';
import { Pagination, Navigation, Lazy } from 'swiper';

interface CustomSwiperProps extends SwiperProps {
  lazy?: boolean;
}

const SwiperComponent: React.FC = () => {
  const modules = [Pagination, Navigation, Lazy];
  const pagination = { clickable: true };

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      modules={modules}
      loop={true}
      //  lazy={true}
      pagination={pagination}
      className="w-full h-full rounded-lg z-10"
    >
      <SwiperSlide>
        <img
          src={require('@/assets/featured/image_1.jpg')}
          loading="lazy"
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={require('@/assets/featured/image_2.jpg')}
          loading="lazy"
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={require('@/assets/featured/image_3.jpg')}
          loading="lazy"
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src={require('@/assets/featured/image_4.jpg')}
          loading="lazy"
          className="w-full h-full object-cover"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
