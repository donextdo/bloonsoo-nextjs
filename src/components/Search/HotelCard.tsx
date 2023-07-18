import Link from "next/link";

const HotelCard = ({hotel}:any) => {
    return ( 
        <div className="bg-white shadow-md w-full grid md:grid-cols-5 mb-10">
        <img
          src={hotel.cover_image}
          className="w-full aspect-square object-cover col-span-3 md:col-span-2"
          alt=""
        />
  
        <div className="w-full col-span-3 h-full p-6 flex flex-col">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-blue-700">{hotel.property_name}</h3>
              <p className="text-sm md:text-base font-medium text-gray-600">
                {hotel.property_address.street_address}, {hotel.property_address.country}
              </p>
            </div>
  
            <div className="flex gap-1 w-max">
              <i className="fa-solid fa-star text-semidarkyellow text-sm" />
              <i className="fa-solid fa-star text-semidarkyellow text-sm" />
              <i className="fa-solid fa-star text-semidarkyellow text-sm" />
              <i className="fa-solid fa-star text-semidarkyellow text-sm" />
              <i className="fa-regular fa-star text-semidarkyellow text-sm" />
            </div>
          </div>
  
          <div className="flex flex-col gap-6">
            <div className="w-full">
              <p className="text-sm text-gray-600 font-semibold">
                {hotel.about && hotel.about.substr(0, 400)}...
              </p>
              <Link
                href={`/hotels/${hotel._id}`}
                className="flex items-center justify-center py-3 md:px-6 w-1/2 rounded-full mx-auto md:ml-auto mt-10 text-sm text-black font-semibold bg-gradient-to-b from-darkyellow to-semidarkyellow hover:from-semidarkyellow hover:to-darkyellow"
              >
                See Availability
              </Link>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default HotelCard;