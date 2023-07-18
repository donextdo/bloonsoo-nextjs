import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useEffect, useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import axios from "axios";

const BookingDetailsCard = () => {
  const bookings = useSelector((state: RootState) => state.booking.items);
  const hotelId = useSelector((state: RootState) => state.booking.hotelId);

  const [hotel, setHotel] = useState({
      about: "",
      amenities: [],
      breakfast: false,
      contact_name: "",
      contact_phone_number: "",
      contact_phone_number_alternative: "",
      cover_image: "",
      createdAt: "",
      credit_card_options: false,
      extra_beds: false,
      extra_beds_options: {
        no_of_beds: 0,
        accommodate_guests: [],
        _id: ''
      },
      facilities: [],
      gallery_images: [],
      is_open_to_bookings: false,
      is_own_multiple_hotels: false,
      languages: [],
      parking: false,
      parking_details: {
        parking_type: '',
        parking_type_2: '',
        parking_type_3: '',
        reservation: false,
        parking_price: '',
        // ...
      },
      policies: {
        cancellation_duration: 0,
        pay_time: '',
        preventAccidental_bookings: false,
        check_in_form: '',
        check_in_untill: '',
        check_out_untill:'',
        check_out_form:'',
        // ...
      },
      property_address: {
        street_address: '',
        country: '',
        postal_code: '',
        _id: ''
      },
      property_name: "",
      rooms: [],
      star_rating: "",
      status: "",
      updatedAt: "",
      use_channel_manager: false,
      user: "",
      __v: 0,
      _id: ""
    });

    useEffect(() => {
        fetchData();
    }, [hotelId]);

    async function fetchData() {
        try {
            const res = await axios.get(`${baseUrl}/hotel/${hotelId}`);
            console.log(res.data)
            // setHotel(res.data)
            setHotel(res.data)
        } catch (err) {
            console.log(err);
        }
    }

  const goBack = () => {
    // const element = document.getElementById('rooms-area');
    // element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // const element = document.getElementById('rooms-area');
    // const scrollOptions = { top: element.offsetTop, behavior: 'smooth' };
    // setTimeout(() => {
    //   element.scrollIntoView(scrollOptions);
    // }, 3000);
  }, []);

    return ( 
        <div className="shadow-md rounded-lg bg-white w-full px-5 py-8">
        <h4 className="font-semibold mb-8 text-base">Your booking details</h4>
  
        {bookings.map((booking, index) => (
          <div key={index} className="w-full">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="border-r border-gray-400 flex flex-col gap-3 items-start text-sm pr-2">
                <p>Check-in</p>
                <p className="font-semibold">
                {new Date(booking.checkInDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                </p>
                <p>
                  {hotel?.policies.check_in_form} - {hotel?.policies.check_in_untill}
                </p>
              </div>
  
              <div className="pl-2 flex flex-col items-start gap-3 text-sm">
                <p>Check-out</p>
                <p className="font-semibold">
                {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                </p>
                <p>
                  {hotel?.policies.check_out_form} - {hotel?.policies.check_out_untill}
                </p>
              </div>
            </div>
  
            <p className="font-semibold text-sm mb-5 pb-5 border-b border-gray-400">
              Total length of stay: {`${booking.nights} nights`} {`${booking.adults} adults`}{' '}
              {booking.children > 0 ? `${booking.children} children` : ''}
            </p>
  
            <div className="mb-5 pb-5 border-b border-gray-400">
              <p className="font-semibold mb-3">You selected: </p>
              <p className="text-gray-600 text-sm md:text-base">
                {booking.rooms} x {booking.roomType} {booking.roomName}
              </p>
            </div>
          </div>
        ))}
  
        <button onClick={goBack} className="font-semibold text-sm md:text-base text-blue-600">
          Change your selection
        </button>
      </div>
     );
}
 
export default BookingDetailsCard;