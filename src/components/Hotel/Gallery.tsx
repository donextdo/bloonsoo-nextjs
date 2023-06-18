const Gallery = ({hotelGallery, toggleGallery}:any) => {
   
    // const handleClick = () => {
    //     setShowGallery(false)
    // }

    return ( 
        <div className="w-full h-48 md:h-70vh grid grid-cols-3 grid-rows-2 gap-4 relative">
        
        <div className="w-full h-full row-span-2 col-span-2 relative">
            <img src={hotelGallery[0]} alt="" className="w-full h-full object-cover" />

            <button onClick={toggleGallery} className="absolute inset-0 bg-transparent"></button>    
        </div>

        <div className="w-full h-full col-span-1 row-span-1 relative">
            <img src={hotelGallery[1]} alt="" className="w-full h-full object-cover"/>

            <button onClick={toggleGallery} className="absolute inset-0 bg-transparent"></button>
        </div>

        <div className="w-full h-full col-span-1 row-span-1 relative">
            <img src={hotelGallery[2]} alt="" className="w-full h-full object-cover"/>

            <button onClick={toggleGallery} className="absolute inset-0 bg-black bg-opacity-30 grid place-items-center hover:bg-opacity-50">

                <h4 className="text-white font-extrabold text-sm md:text-base">
                    <span className="text-base md:text-4xl">+</span><span className="text-lg md:text-6xl">{ hotelGallery.length - 2 }</span> 
                    photos
                </h4>

            </button>
        </div>  

    </div>
     );
}
 
export default Gallery;