import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../../Utils/baseUrl";
import HotelTabs from "@/components/Listing/HotelTabs";
import FormCard from "@/components/Listing/FormCard";
import ListingBed from "@/components/Listing/ListingBed";
import Link from "next/link";
import { useRouter } from "next/router";
import ListingTable from "@/components/Listing/ListingTable";
import ListingRow from "@/components/Listing/ListingRow";


const PricingPage = () => {
    // const [hotelId, setHotelId] = useState(useHotelId());
    //   const [config, setConfig] = useState(useRuntimeConfig());
    const [rooms, setRooms] = useState([]);
    const [groupedRooms, setGroupedRooms] = useState([]);
    const router = useRouter();

    const { hotelId } = router.query;


    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`${baseUrl}/rooms/bypropertyid/${hotelId}`);
                console.log(response.data)
                setRooms(response.data);
            } catch (error) {
                // Handle error if needed
            }
        };

        fetchRooms();

    }, [hotelId]);

    const postNext = () => {
        // router.push('/listing/hotel/facilities');
        const hotelData = {  hotelId:hotelId };
        console.log(hotelData)
        router.push({
            pathname: '/listing/hotel/facilities',
            query: hotelData,
        });
    };

    const handleAddRoom = () => {
        // router.push('/listing/hotel/facilities');
        const hotelData = {  hotelId:hotelId };
        console.log(hotelData)
        router.push({
            pathname: '/listing/hotel/addroom',
            query: hotelData,
        });
    };

    const headers = [
        'Room Type', 'Sleeps', 'Price for one night', 'Your Choices', 'Rooms', 'Actions'
    ];

    console.log(rooms)
    return (
        <section className="md:container mx-auto px-10 py-16 flex flex-col gap-8 text-black font-montserrat">
            <h2 className="text-2xl font-semibold mb-6">List your property on Bloonsoo.com</h2>
            <HotelTabs active_1 active_2 />

            {rooms.length === 0 && (
                <FormCard label="Layout and pricing">
                    <div className="px-4 flex flex-col gap-6">
                        <h4 className="text-sm text-gray-600 font-semibold">
                            Give us the information of the room that you willing to add first.
                        </h4>
                        <div className="w-full h-70vh bg-white shadow-lg flex flex-col items-center gap-10 justify-center">
                            <ListingBed />
                            <p className="text-sm font-semibold text-gray-500 text-center max-w-lg">
                                No rooms have been added to your property. Start adding rooms to describe bed options, layout and pricing for guests.
                            </p>
                            <button onClick={handleAddRoom} className="py-3 px-10 w-max rounded-lg text-sm text-white font-semibold cursor-pointer bg-blue-700 hover:bg-blue-900">
                                Add Room
                            </button>
                        </div>
                        <h4 className="text-sm text-gray-600 font-semibold">
                            After you complete registration, you will still be able to make changes to your listing before it goes live.
                        </h4>
                    </div>
                </FormCard>
            )}

            {rooms.length > 0 && (
                <>
                    <ListingTable headers={headers} />
                    {rooms.map((room:any) => (
                        <ListingRow key={room._id} room={room} />
                    ))}
                </>
            )}

            {rooms.length > 0 && (
                <Link href="/listing/hotel/addroom" className="self-end w-max px-8 py-3 bg-blue-700 text-white font-semibold text-sm rounded-lg hover:bg-blue-900">
                    Add Another Room
                </Link>
            )}

            <button onClick={postNext} className="w-full py-4 bg-blue-700 text-white font-semibold text-base rounded-lg hover:bg-blue-900">
                Next
            </button>
        </section>
    );
}

export default PricingPage;