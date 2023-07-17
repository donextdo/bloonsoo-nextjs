import BookingHotelCard from "@/components/Booking/BookingHotelCard";
import BookingPriceCard from "@/components/Booking/BookingPriceCard";
import BookingTabs from "@/components/Booking/Tabs";
import FormCard from "@/components/Listing/FormCard";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faCaretDown, faCreditCard, faHotel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import axios from "axios";
import baseUrl from "../../../Utils/baseUrl";
import BookingDetailsCard from "@/components/Booking/BookingDetailsCard";
import { saveSecondPage } from "@/components/Hotel/bookingSlice";
import { useRouter } from "next/router";

const BookingFinalPage = () => {
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState('Sri Lanka');
    const [countryError, setCountryError] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberRes, setPhoneNumberRes] = useState();
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [paperlessConfirmation, setPaperlessConfirmation] = useState(false);
    const [updatesEmailConfirmation, setUpdatesEmailConfirmation] = useState(false);
    const [marketingEmailConfirmation, setMarketingEmailConfirmation] = useState(false);
    const [paymentOption, setPaymentOption] = useState('Onsite');
    const [paymentOptionError, setPaymentOptionError] = useState(false);
    const [promoCode, setPromoCode] = useState();
    const [promoCodeError, setPromoCodeError] = useState(false);
    const [showBookingCheckOut, setShowBookingCheckOut] = useState(false);
    const [code, setCode] = useState(42);
    const options = [13, 23, 42, 33, 5, 56, 64];
    const router = useRouter()

    const hotelId = useSelector((state: RootState) => state.booking.hotelId);
    const bookings = useSelector((state: RootState) => state.booking.items);
  const totalPrice = useSelector((state: RootState) => state.booking.totalAmount);
  const BookingInfoFirstPage = useSelector((state: RootState) => state.booking.BookingInfoFirstPage);

  const dispatch = useDispatch();


    const [data, setData] = useState({
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
      
      let token: any
      if (typeof localStorage !== 'undefined') {
          token = localStorage.getItem("token");
      }

      let user: any

   
        if (typeof localStorage !== 'undefined') {
            const userJson = localStorage.getItem('user');
             user = userJson ? JSON.parse(userJson) : null;
        }
      

    useEffect(() => {
        fetchData();
    }, [hotelId]);

    async function fetchData() {
        try {
            const res = await axios.get(`${baseUrl}/hotel/${hotelId}`);
            console.log(res.data)
            // setHotel(res.data)
            setData(res.data)
        } catch (err) {
            console.log(err);
        }
    }


    // useEffect(() => {
    //   console.log(user);
    //   bookingStore.setHotel(baseUrl);
    //   setDefaults();
    // }, []);

    // const setDefaults = () => {
    //   // country.value = user.value?.address.country ? user.value.adress.country : ''
    //   setPhoneNumber(user.value?.mobile ? user.value.mobile : '');
    // };

    const toggleCheckOutPopup = () => {
        setShowBookingCheckOut(!showBookingCheckOut);
    };

    const handleBooking = async () => {
    //   setTimeout(() => {
    //     setPaymentOptionError(false);
    //   }, 5000);

    //   if (!paymentOption) {
    //     setPaymentOptionError(true);
    //     return;
    //   }

      try {
        // bookingStore.setBookingInfoSecondPage(country, phoneNumberRes.e164, paymentOption);

        const BookingInfoSecondPage = {
            country,
            paymentOption,
            phoneNumber,
            }
            console.log(BookingInfoSecondPage)
            dispatch(saveSecondPage(BookingInfoSecondPage))

            const bookingDto = {
                hotel_id: hotelId,
                full_name: BookingInfoFirstPage.fullGuestName,
                email: BookingInfoFirstPage.email,
                country: country,
                mobile: phoneNumber,
                arrival_time: BookingInfoFirstPage.arrivalTime,
                total: totalPrice,
                bookings: bookings,
                payment_method: paymentOption,
                is_travelling_for_work: BookingInfoFirstPage.isTravellingForWorkVal,
                
            }


            console.log(bookingDto)
            console.log(BookingInfoFirstPage.email)

            try {
                const response = await axios.post(`${baseUrl}/booking/`, bookingDto,{
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  });
              
                const booking = response.data;
                console.log(booking);
              } catch (error) {
                throw error;
              }

        
        router.push('/profile/reservations');

        // if (paymentOption === 'card') {
        //   toggleCheckOutPopup();
        //   return;
        // }

        // setTimeout(() => {
        //   bookingStore.$reset();
        // }, 1000);
      } catch (error) {
        // if (error.response) {
        //   console.log(error.response._data);
        // }

        console.log(error);
      }
    };

    const launchPayhere = async () => {
        toggleCheckOutPopup();
    };

    const handleCheckboxChange = (event: any) => {
        setPaperlessConfirmation(event.target.checked);
    };

    const handleRadioChange = (event: any) => {
        setPaymentOption(event.target.value);
        setPaymentOptionError(false);
    };

    const handleUpdatesCheckboxChange = (event: any) => {
        setUpdatesEmailConfirmation(event.target.checked);
    };

    const handleMarketingCheckboxChange = (event: any) => {
        setMarketingEmailConfirmation(event.target.checked);
    };

    return (
        <section className="text-black font-montserrat md:container mx-auto px-5 md:px-2 flex flex-col gap-14 py-6">
            <BookingTabs final />

            <main className="grid md:grid-cols-3 gap-8 items-start w-full">
                <section className="w-full col-span-2 grid grid-col gap-6">
                    <BookingHotelCard coverImg={data.cover_image} propertyName={data.property_name} address={data.property_address} />

                    <FormCard label="Enter Your Information" className="shadow-md">
                        <div className="md:grid grid-cols-2 gap-x-16 gap-y-6 px-4 space-y-4">

                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="arrivalTime" className="text-gray-600 text-sm font-semibold">Country/Region </label>
                                <div className="w-full h-max relative">
                                    <select
                                        id="arrivalTime"
                                        value={country}
                                        onChange={(event) => setCountry(event.target.value)}
                                        className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                    >

                                        {['Sri Lanka', 'Australia', 'India'].map((option, index) => (
                                            <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                </div>

                            </div>

                            <div className="flex flex-col gap-2 items-start col-start-1">
                                <label className={`text-sm font-semibold ${phoneNumberError ? 'text-red-600' : 'text-gray-600'}`}>Telephone (mobile number preferred)</label>

                                <div className="flex items-center w-full">
                                    <div className="w-28 h-max relative">
                                        <select
                                            id="dropdown"
                                            value={code}
                                            onChange={(event) => setCode(Number(event.target.value))}
                                            className={`{error ? 'border-red-600' : 'border-slate-400} w-full px-6 py-2 border border-r-0 bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none`}
                                        >
                                            {options.map((option, index) => (
                                                <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                    </div>
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                    />
                                </div>

                                <p className="text-sm text-gray-500 ">Needed by the property to validate your booking</p>
                            </div>

                            <div className="flex item-center gap-3 col-span-2">
                                <input
                                    type="checkbox"
                                    id="default-checkbox"
                                    value=""
                                    checked={paperlessConfirmation}
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600"
                                />

                                <label htmlFor="default-checkbox" className="text-sm font-semibold text-gray-600">
                                    Yes, I want free paperless confirmation (recommended)
                                </label>
                            </div>

                        </div>

                    </FormCard>

                    <FormCard label="Select a Payment Option" className="shadow-md !bg-gray-300 ">
                        <div className="px-4 w-full flex gap-4 text-gray-600 text-sm font-semibold ">
                            <div className="flex flex-col items-center gap-2 flex-1">
                                <label htmlFor="credit-card" className="cursor-pointer">
                                    <FontAwesomeIcon icon={faCreditCard} className="text-blue-600 text-2xl md:text-5xl" />
                                </label>

                                <label htmlFor="credit-card" className="cursor-pointer">
                                    Credit/Debit Card
                                </label>

                                <input
                                    type="radio"
                                    id="credit-card"
                                    name="payment-options"
                                    value="0"
                                    checked={paymentOption === '0'}
                                    onChange={handleRadioChange}
                                    className="w-5 h-5 cursor-pointer"
                                    disabled
                                />
                            </div>

                            <div className="flex flex-col items-center gap-2 flex-1">
                                <label htmlFor="crypto" className="cursor-pointer">
                                    <FontAwesomeIcon icon={faBitcoin} className="text-blue-600 text-2xl md:text-5xl" />
                                </label>

                                <label htmlFor="crypto" className="cursor-pointer">
                                    Crypto Currency
                                </label>

                                <input
                                    type="radio"
                                    id="crypto"
                                    name="payment-options"
                                    value="1"
                                    checked={paymentOption === '1'}
                                    onChange={handleRadioChange}
                                    className="w-5 h-5 cursor-pointer"
                                    disabled
                                />
                            </div>

                            <div className="flex flex-col items-center gap-2 flex-1">
                                <label htmlFor="on-site" className="cursor-pointer">
                                    <FontAwesomeIcon icon={faHotel} className="text-blue-600 text-2xl md:text-5xl" />
                                </label>

                                <label htmlFor="on-site" className="cursor-pointer">
                                    Onsite
                                </label>

                                <input
                                    type="radio"
                                    id="on-site"
                                    name="payment-options"
                                    value="Onsite"
                                    checked={paymentOption === 'Onsite'}
                                    onChange={handleRadioChange}
                                    className="w-5 h-5 cursor-pointer"
                                />
                            </div>

                            {paymentOptionError && (
                                <small className="text-red-600 font-semibold text-sm px-4">
                                    Please select a payment method
                                </small>
                            )}
                        </div>
                    </FormCard>

                    <div className="flex item-center gap-3 mt-6">
                        <input
                            type="checkbox"
                            id="checkbox-confirm"
                            value=""
                            checked={updatesEmailConfirmation}
                            onChange={handleUpdatesCheckboxChange}
                            className="w-5 h-5 text-blue-600"
                        />

                        <label htmlFor="checkbox-confirm" className="text-sm">
                            Yes, I consent to receiving marketing emails including deals, travel inspiration, and updates on products and services from Bloonsoo.com.
                        </label>
                    </div>

                    <div className="flex item-center gap-3 mt-2">
                        <input
                            type="checkbox"
                            id="checkbox-confirm-1"
                            value=""
                            checked={marketingEmailConfirmation}
                            onChange={handleMarketingCheckboxChange}
                            className="w-4 h-4 text-blue-600"
                        />

                        <label htmlFor="checkbox-confirm-1" className="text-sm">
                            Yes, I consent to receiving marketing emails from Bloonsoo.com about transportation deals.
                        </label>
                    </div>

                    <p className="text-sm mt-2">
                        You can unsubscribe at any time. View our
                        <Link href="#" className="text-blue-700 font-semibold">privacy policy.</Link>
                    </p>

                    <p className="text-sm mt-2">
                        Your booking is directly with French Garden Kandy and by completing this booking you agree href the
                        <Link href="#" className="text-blue-700 font-semibold block">booking  conditions, general terms, and privacy policy.</Link>
                    </p>

                </section>

                <aside className="w-[90vw] md:w-full col-span-1 flex flex-col gap-6">

                <BookingDetailsCard />

                <BookingPriceCard />

                <div className="shadow-md rounded-lg bg-white w-full px-5 py-8">
                    <h4 className="font-semibold mb-4 text-sm md:text-base">Payment shedule</h4>
                    <p className="text-sm md:text-base text-green-600">No payment today. You’ll pay when you stay</p>
                </div>

                <div className="shadow-md rounded-lg bg-white w-full px-5 py-8">
                            
                    <h4 className="font-semibold mb-4 text-sm md:text-base">Cancellation fee</h4>

                    <div className="flex items-center justify-between gap-8">
                        <div>
                            <p className="text-gray-600 text-sm md:text-base" >If you cancel you will pay </p>
                        </div>

                        <div>
                            <p className=" float-right text-gray-600 text-sm md:text-base"> LKR 4900</p>
                        </div>

                    </div>

                </div>


            </aside> 

            </main>

            <button
             onClick={handleBooking}
             className="w-full py-3 md:py-4 btn-accent">
            Complete booking 
            
        </button>


        </section>
    );
}

export default BookingFinalPage;