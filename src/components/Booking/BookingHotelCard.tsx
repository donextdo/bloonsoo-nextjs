import { faAirFreshener, faHandsWash, faKitchenSet, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookingHotelCard = ({ propertyName, coverImg, address }: any) => {
    return (
        <div className="bg-white shadow-md w-[90vw] md:w-full grid md:grid-cols-5">
            <img
                src={coverImg}
                className="w-full aspect-square object-cover col-span-3 md:col-span-2"
                alt=""
            />

            <div className="w-full md:col-span-3 h-full p-6 flex flex-col">
                <div className="md:flex items-start justify-between mb-5">
                    <div>
                        <h3 className="text-lg font-bold text-blue-700">{propertyName}</h3>

                        <p className="text-sm font-medium text-gray-600">
                            {address?.street_address}, {address?.country}
                        </p>
                    </div>

                    <div className="flex gap-1 w-max">
                        <FontAwesomeIcon
                            icon={faStar}
                            className="text-semidarkyellow text-sm"
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className="text-semidarkyellow text-sm"
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className="text-semidarkyellow text-sm"
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className="text-semidarkyellow text-sm"
                        />
                        <FontAwesomeIcon
                            icon={faStar}
                            className="text-semidarkyellow text-sm"
                        />
                    </div>
                </div>

                <h5 className="text-[#048919] font-semibold text-sm mb-5">
                    Excellent Location - 9.0
                </h5>

                <p className="text-sm text-gray-600 md:w-4/5 mb-5 md:mb-0">
                    Deluxe Double Room with Free Late check out till 4PM (STA), Free High
                    Tea from Thursday to Sunday, 15% Off on F&B, 10% Off on Laundry & Free
                    access to the Infinity Pool
                </p>

                <div className="w-full flex items-center justify-between mt-auto mb-6">
                    <div className="text-gray-600 text-sm font-semibold w-full py-4 px-2 pl-6 flex items-center justify-start gap-3">
                    <FontAwesomeIcon icon={faKitchenSet} className="w-5 h-5" />
                        <h4>
                        Kitchen
                        </h4>
                    </div>
                    <div className="text-gray-600 text-sm font-semibold w-full py-4 px-2 pl-6 flex items-center justify-start gap-3">
                    <FontAwesomeIcon icon={faAirFreshener} className="w-5 h-5" />
                        <h4>
                        Air Conditioner
                        </h4>
                    </div>
                    <div className="text-gray-600 text-sm font-semibold w-full py-4 px-2 pl-6 flex items-center justify-start gap-3">
                    <FontAwesomeIcon icon={faHandsWash} className="w-5 h-5" />
                        <h4>
                        Washer
                        </h4>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BookingHotelCard;