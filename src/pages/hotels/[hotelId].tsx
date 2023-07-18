import Gallery from "@/components/Hotel/Gallery";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import GalleryModal from "@/components/GalleryModal/GalleryModal";
import HotelDetails from "@/components/Hotel/HotelDetails";
import HotelMap from "@/components/Hotel/HotelMap";
import HotelRating from "@/components/Hotel/HotelRating";
import HotelBlog from "@/components/Hotel/HotelBlog";
import HotelFacility from "@/components/Hotel/HotelFacility";
import ReserveAll from "@/components/Hotel/ReserveAll";
import Table from "@/components/Hotel/Table";
import { useBookingStore } from "../../../stores/bookingStore";
import { useAuthStore } from "../../../stores/authStore";
import Row from "@/components/Hotel/Row";
import LoginPopup from "@/components/Auth/LoginPopup/LoginPopup";
import Description from "@/components/ViewItem/Details/Description";
import AdditionalInformation from "@/components/ViewItem/Details/AdditionalInformation";
import Review from "@/components/ViewItem/Details/Review";
import MobileRoomCard from "@/components/Hotel/MobileRoomCard";
import MobileReserveAll from "@/components/Hotel/MobileReserveAll";

// import { storeToRefs } from "pinia";

const HotelPages = () => {
    const [hotelGallery, setHotelgallery] = useState([])
    const [showGallery, setShowGallery] = useState(false)
    const [showBookingDetails, setShowBookingDetails] = useState(false)
    const [hotel, setHotel] = useState([])
    const [bookings, setBookings] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [showAuthPopup, setShowAuthPopup] = useState(true);
    const [currentRoom, setCurrentRoom] = useState();
    const [showBookingPopup, setShowBookingPopup] = useState(false);
    const [roomIdOnBooking, setRoomIdOnBooking] = useState();
    const [rooms, setRooms] = useState([])
    const [isColor, setIsColor] = useState(2);






    const router = useRouter();
    const { hotelId } = router.query;


    useEffect(() => {
        fetchData();
    }, [hotelId]);

    async function fetchData() {
        try {
            const res = await axios.get(`${baseUrl}/hotel/${hotelId}`);
            console.log(res.data)
            setHotel(res.data)
            setHotelgallery(res.data.gallery_images)
            setRooms(res.data.rooms)
        } catch (err) {
            console.log(err);
        }
    }
    console.log(hotelGallery)
    if (hotelGallery.length > 0) {
        console.log(hotelGallery[0]);
    }


    const toggleGallery = () => {
        setShowGallery(!showGallery)
    }

    const toggleBookingDetails = () => {
        setShowBookingDetails(!showBookingDetails)
    };

    const toggleRoomModal = (id: any) => {

        const room = rooms.filter((room: any) => room._id === id);

        setCurrentRoom(room[0]);
        setShowRoomModal(!showRoomModal);
    };

    const closeRoomModal = () => {
        setShowRoomModal(!showRoomModal);
    };

    const headers = [
        'Room Type',
        'Sleeps',
        'Price for 1 night',
        'Your Choices',
        'Rooms',
    ];

    const handleChange = (id: any) => {
        setIsColor(id);
    };

    return (
        <div>
            <section className="flex flex-col gap-14 bg-gray-50 text-black font-montserrat mb-8">
                <main className="md:container md:mx-auto  md:px-2 pt-16 pb-6 grid  grid-cols-1 md:grid-cols-3 gap-5 w-full">
                    <section className="w-full px-5  mb-5 md:mb-0 md:w-full md:col-span-2 ">

                        <Gallery
                            hotelGallery={hotelGallery}
                            toggleGallery={toggleGallery}
                        />

                        <HotelDetails hotel={hotel} />

                    </section>
                    <aside className="w-full px-5 md:w-full md:col-span-1 h-full flex flex-col gap-4">
                        {/* <HotelMap /> */}

                        <HotelRating hotel={hotel} />

                        <HotelBlog />
                    </aside>
                </main>
                {showGallery && (
                    <GalleryModal setShowGallery={setShowGallery} hotelGallery={hotelGallery}/>
                )}

                <section className="md:container mx-auto px-5 md:px-12 flex flex-col gap-6">

                    {/* <h4 className="text-xl font-bold">
                        Facilities
                    </h4> */}

                    <div className="md:px-20 grid md:grid-cols-3 grid-cols-2">

                        {/* <HotelFacility icon="kitchen" label="Kitchen"/>
                        <HotelFacility icon="television" label="Television with Netflix"/>
                        <HotelFacility icon="cleaning" label="Cleaning Service"/>
                        <HotelFacility icon="ac" label="Air Conditioner"/>
                        <HotelFacility icon="wifi" label="Free Wireless Internet"/>
                        <HotelFacility icon="telephone" label="Telephone Connection"/>
                        <HotelFacility icon="washer" label="Washer"/>
                        <HotelFacility icon="balcony" label="Balcony or Patio"/>
                        <HotelFacility icon="kingbed" label="King size bed"/> */}


                    </div>

                </section>

                <section
                    id="rooms-area"
                    className="md:container md:mx-auto pt-4 px-5 md:px-12 flex flex-col gap-6"
                >
                    <h4 className="text-xl font-bold">Availability</h4>

                    {/* <ReserveAll  headers={headers}/> */}
                    <Table headers={headers}  hotel={hotel}/>

                     {rooms.map((room) => (
                            <Row
                                key="room._id"
                                room={room}
                                toggleRoomModal={toggleRoomModal}
                            />
                     ))}
                        
                        {rooms.map((room) => (
                            <MobileRoomCard
                                key="room._id"
                                room={room}
                                toggleRoomModal={toggleRoomModal}
                            />
                     ))}
                    

                        <MobileReserveAll hotel={hotel}/>

                </section>

                <div className="bg-white drop-shadow rounded-md mt-10 pb-5 md:container md:mx-auto pt-4 px-5 md:px-12">
                        <div className=" flex flex-col sm:flex-row gap-4 sm:gap-8  justify-start text-left text-gray-400 py-5 px-6">
                            {/* <button
                                className={`   ${isColor === 1 ? "text-black" : "text-[#c2c2d3]"
                                    }`}
                                onClick={() => handleChange(1)}
                            >
                                DESCRIPTION
                            </button> */}
                            {/* {data.additionalInformation?.length > 0 && ( */}
                                <button
                                    className={`  ${isColor === 2 ? "text-black" : "text-[#c2c2d3]"
                                        }`}
                                    onClick={() => handleChange(2)}
                                >
                                    ADDITIONAL INFORMATION
                                </button>
                            {/* )} */}
                            <button
                                className={`   ${isColor === 3 ? "text-black" : "text-[#c2c2d3]"
                                    }`}
                                onClick={() => handleChange(3)}
                            >
                                REVIEWS
                                {/* ({approvedReviews.length}) */}
                            </button>
                        </div>
                        <hr />
                        <div className="mt-4 px-6">
                            {isColor === 1 ? (
                                <Description  />
                            ) : isColor === 2 ? (
                                <AdditionalInformation  hotel={hotel} />
                            ) : (
                                <Review  hotelId={hotelId} hotel={hotel}/>
                            )}
                        </div>
                    </div>


            </section>
            
        </div >
    );
}

export default HotelPages;