import { faCheck, faCoffee, faPenSquare, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListingRow = ({ room }: any) => {
    return (
        <div className="w-full gap-2 grid grid-cols-12 items-center">
            <div className="w-full bg-gray-200 col-span-4 pl-6 p-4 h-full flex flex-col gap-4">
                <div className="text-base text-blue-700 font-semibold">
                    <h4 className="cursor-pointer" >
                        {room.room_type}
                    </h4>

                    <h4 className="cursor-pointer" >
                        {room.room_name}
                    </h4>
                </div>

                <div className="flex flex-col gap-2">
                    {room.beds.map((bed: any, index: number) => (
                        <div key={index} className="flex gap-2 items-center">
                            {/* <SharedLogosBed /> */}
                            <span className="text-sm font-semibold text-gray-800">
                                {bed.no_of_beds} {bed.bed_type}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="text-sm text-gray-800">
                    <p className="text-justify">
                        {room.room_size} {room.facilities.join(" ")}
                    </p>
                </div>
            </div>

            <div className="w-full bg-gray-200 col-span-1 p-4 h-full flex items-center justify-center">
                <div className="flex justify-center flex-wrap gap-2">
                    {Array.from({ length: room.guests }).map((_, index) => (
                        <FontAwesomeIcon icon={faUser} className="text-gray-800 text-lg" />
                    ))}
                </div>
            </div>

            <div className="w-full bg-gray-200 col-span-2 p-6 h-full flex flex-col justify-center gap-4">
                <h4 className="text-base text-gray-800 font-semibold text-center">
                    {room.price_for_one_night}
                </h4>
            </div>

            <div className="w-full bg-gray-200 col-span-2 p-6 h-full flex flex-col justify-center gap-4">
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCoffee} className="text-gray-800 text-lg" />

                    <h4 className="text-base text-gray-800 font-semibold">
                        {room.is_breakfast_available
                            ? `Breakfast Available ${room.breakfast_price}`
                            : 'Breakfast not available'}
                    </h4>
                </div>

                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCheck} className="text-gray-800 text-lg" />

                    <h4 className="text-xs text-green-500 font-semibold">
                        Free cancellation within 24 hours
                    </h4>
                </div>
            </div>

            <div className="w-full bg-gray-200 col-span-1 p-6 h-full flex items-center justify-center">
                <h4 className="text-base text-gray-800 font-semibold">
                    {room.nbr_of_rooms}
                </h4>
            </div>

            <div className="w-full bg-gray-200 col-span-2 p-6 h-full flex items-center flex-col gap-4 justify-center">

                <button className="w-8 h-8 rounded-full bg-blue-500">
                    <FontAwesomeIcon icon={faPenSquare} className="text-white text-base" />
                </button>
                <button className="w-8 h-8 rounded-full bg-red-500">
                    <FontAwesomeIcon icon={faTrash} className="text-white text-base" />
                </button>

            </div>
        </div>
    );
}

export default ListingRow;





