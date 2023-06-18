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

// import { storeToRefs } from "pinia";

const hotelPages = () => {
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

    return (
        <div>
            <section className="flex flex-col gap-14 bg-gray-50 text-black font-montserrat mb-8">
                <main className="md:container md:mx-auto  md:px-2 pt-16 pb-6 grid  md:grid-cols-3 gap-5 md:w-full">
                    <section className="w-96 px-5  mb-5 md:mb-0 md:w-full md:col-span-2 ">

                        <Gallery
                            hotelGallery={hotelGallery}
                            toggleGallery={toggleGallery}
                        />

                        <HotelDetails hotel={hotel} />

                    </section>
                    <aside className="w-96 px-5 md:w-full md:col-span-1 h-full flex flex-col gap-4">
                        <HotelMap />

                        <HotelRating hotel={hotel} />

                        <HotelBlog />
                    </aside>
                </main>
                {showGallery && (
                    <GalleryModal setShowGallery={setShowGallery} hotelGallery={hotelGallery}/>
                )}

                <section className="md:container mx-auto px-5 md:px-12 flex flex-col gap-6">

                    <h4 className="text-xl font-bold">
                        Facilities
                    </h4>

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

                    


                </section>


            </section>
            
        </div >
    );
}

export default hotelPages;