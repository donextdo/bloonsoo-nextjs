const HotelMap = () => {
    return ( 
        <div className="md:w-full h-36 rounded-lg relative overflow-hidden shadow-md">
      <img src={require('@/assets/map/map.jpg')} className="w-full h-full object-cover" alt="" />
      <div className="absolute inset-0 grid place-items-center">
        <a href="#" className="py-2 md:py-3 px-5 md:px-10 rounded-full w-max gradient-btn">
          Show on map
        </a>
      </div>
    </div>
     );
}
 
export default HotelMap;