import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import React from 'react';



const SwiperSlidershow = ({ hotelGallery }: any) => {

   
    return (
        <div className="w-full h-[45vh] md:h-[90vh] grid grid-rows-5 gap-4">
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            className="w-full md:h-full row-span-4 z-10"   
        >
            {hotelGallery.map((img: any, index: any) => (
                <SwiperSlide key={index}>

                    <Image
                        src={img}
                        alt="item1"
                        style={{
                            objectFit: "cover",
                            backgroundColor: "white",
                            width: "100%",
                            height: "100%",
                        }}
                        width={450}
                        height={400}
                    />

                </SwiperSlide>
            ))}
        </Swiper>

        <Swiper
            spaceBetween={10}
            slidesPerView={8}
            onSwiper={(swiper) => console.log(swiper)}
            className="w-full h-full z-10"   
        >
            {hotelGallery.map((img: any, index: any) => (
                <SwiperSlide key={index}>

                    <Image
                        src={img}
                        alt="item1"
                        style={{
                            objectFit: "cover",
                            backgroundColor: "white",
                            width: "100%",
                            height: "100%",
                        }}
                        width={450}
                        height={400}
                    />

                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
}

export default SwiperSlidershow;