// import Swipper from "./Swiper";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SwiperSlidershow from "./SwiperSlideshow";

const GalleryModal = ({ hotelGallery, setShowGallery }:any) => {

  console.log(hotelGallery)

    const handleClose = () => {
        setShowGallery(false)
      };
    return ( 
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 overflow-hidden">
      <div className="w-[90vw] md:w-[70vw] md:h-max bg-white rounded-lg relative shadow-md overflow-hidden">
        {/* <Swipper hotelGallery={hotelGallery} /> */}
        <SwiperSlidershow hotelGallery={hotelGallery} />
      </div>

      <button onClick={handleClose} className="fixed right-10 top-32 md:top-10 w-6 h-6 z-50">
        <FontAwesomeIcon icon={faTimes} className="text-white text-3xl" />
      </button>
    </div>
     );
}
 
export default GalleryModal;