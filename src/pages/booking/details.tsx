import BookingHotelCard from "@/components/Booking/BookingHotelCard";
import BookingPriceCard from "@/components/Booking/BookingPriceCard";
import BookingTabs from "@/components/Booking/Tabs";
import FormCard from "@/components/Listing/FormCard";
import {
    faAirFreshener,
    faBan,
    faBanSmoking,
    faBed,
    faCaretDown,
    faCircleCheck,
    faHandSparkles,
    faHandsWash,
    faKitchenSet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RootState } from "../../../stores/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../../../Utils/baseUrl";
import { saveFirstPage } from "@/components/Hotel/bookingSlice";
import BookingDetailsCard from "@/components/Booking/BookingDetailsCard";
import useCurrency from "@/components/Hooks/useCurrencyHook";

const BookingDetailsPage = () => {
    const [hotel, setHotel] = useState([]);
    const [isTravellingForWork, setIsTravellingForWork] = useState("");
    const [isTravellingForWorkError, setIsTravellingForWorkError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState("");
    const [confirmEmailError, setConfirmEmailError] = useState(false);
    const [setNameAsProfileName, setSetNameAsProfileName] = useState(false);
    const [showSetNameAsProfileName, setShowSetNameAsProfileName] = useState(false);
    const [arrivalTime, setArrivalTime] = useState('9:00 AM — 10:00 AM');
    const router = useRouter();
    const { getPrice } = useCurrency();


    const fullGuestName = `${firstName} ${lastName}`;
    const [fullGuestNameError, setFullGuestNameError] = useState(false);
  const dispatch = useDispatch();


    const bookings = useSelector((state: RootState) => state.booking.items);
    const totalPrice = useSelector((state: RootState) => state.booking.totalAmount);
    const hotelId = useSelector((state: RootState) => state.booking.hotelId);

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
      

      console.log(user)

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


      const handleNext = async () => {
        // setTimeout(() => {
        //   setFirstNameError(false);
        //   setEmailError(false);
        // }, 5000);

        // if (!firstName) {
        //   setFirstNameError(true);
        //   return;
        // }
        // if (!lastName) {
        //   setFirstNameError(true);
        //   return;
        // }
        // if (!email) {
        //   setEmailError(true);
        //   return;
        // }

        const isTravellingForWorkVal = isTravellingForWork === 'yes' ? true : false;

        try {
            const BookingInfoFirstPage = {
            isTravellingForWorkVal,
            fullGuestName,
            email,
            arrivalTime
            }
            console.log(BookingInfoFirstPage)
            dispatch(saveFirstPage(BookingInfoFirstPage))
        

        //   if (setNameAsProfileName) {
            const response = await axios.patch(`${baseUrl}/user/${user._id}`, {
                firstName: firstName,
                lastName: lastName,
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });


            const data = response.data;
            console.log(data)
            // authStore.setUser(userData);
        //   }

          router.push('/booking/final');
        } catch (error) {
          console.log(error);
        }
      };

    

    let adultsCount = 0;
    let childrenCount = 0;
  
    for (let i = 0; i < bookings.length; i++) {
      adultsCount += bookings[i].adults;
      childrenCount += bookings[i].children;
    }

    let totalGuests = adultsCount + childrenCount
    return (
        <section className="text-black font-montserrat md:container mx-auto px-5 md:px-2 flex flex-col gap-14 py-6">
            <BookingTabs />

            <main className="grid md:grid-cols-3 items-start gap-8 w-full">
                <section className="w-full col-span-2 grid grid-col gap-6">
                    <BookingHotelCard  coverImg={data.cover_image} propertyName={data.property_name} address={data.property_address}/>

                    <div className="bg-white shadow-md w-[90vw] md:w-full p-5 pb-8">
                        <h4 className="font-bold text-base md:text-lg mb-4">
                            Your booking details
                        </h4>

                        <div className="flex items-center text-gray-600 font-semibold gap-4">
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                className="text-green-600 text-base md:text-xl"
                            />
                            <p className="text-sm md:text-base">
                                No payment is required to secure this booking. You&apos;ll pay during
                                your stay.{" "}
                            </p>
                        </div>
                    </div>

                    <FormCard label="Enter your details">
                        <div className="md:grid grid-cols-2 gap-x-16 gap-y-6 px-4 space-y-4 md:space-y-0">
                            <div className="col-span-2">
                                <h4 className="text-gray-600 text-sm font-semibold">
                                    Are you traveling for work?
                                </h4>

                                <div className="flex gap-2">
                                    {[
                                        { data: "yes", label: "yes" },
                                        { data: "no", label: "no" },
                                    ].map((option) => (
                                        <div
                                            key={option.data}
                                            className="text-gray-600 text-sm h-max w-max font-semibold flex items-center"
                                        >
                                            <input
                                                type="radio"
                                                name="group1"
                                                value={option.data}
                                                // checked={breakfastOption === option.data}
                                                onChange={(event) =>
                                                    setIsTravellingForWork(event.target.value)
                                                }
                                                className="mr-2 w-4 h-4 cursor-pointer"
                                            />
                                            <label>{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="text-gray-600 text-sm font-semibold"
                                >
                                    First Name
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    placeholder="Regina"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="text-gray-600 text-sm font-semibold"
                                >
                                    Last Name
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    placeholder="George"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-gray-600 text-sm font-semibold"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="Regina@fun.com"
                                    />
                                </div>
                                <p className="text-sm text-gray-500">
                                    Confirmation email sent to this address
                                </p>
                            </div>

                            <div className="col-start-1">
                                <label
                                    htmlFor="confirmEmail"
                                    className="text-gray-600 text-sm font-semibold"
                                >
                                    Confirm Email Address
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="confirmEmail"
                                    value={confirmEmail}
                                    onChange={(event) => setConfirmEmail(event.target.value)}
                                    placeholder="Regina@fun.com"
                                />
                            </div>
                        </div>
                    </FormCard>

                    <FormCard>
                        <div className="flex flex-col gap-8 px-4">
                            <div className="flex flex-col gap-2">
                                <div className="w-full flex items-center gap-3">
                                    <FontAwesomeIcon
                                        icon={faBan}
                                        className="text-gray-700 text-lg md:text-xl"
                                    />
                                    <p className="text-gray-500 font- text-base">
                                        Total cost to cancel
                                    </p>
                                </div>

                                <div className="w-full flex items-center gap-3">
                                    <FontAwesomeIcon icon={faHandSparkles} className="w-5 h-5" />
                                    <p className="text-gray-500 text-base">Sparkly clean rooms</p>
                                </div>

                                <div className="w-full flex items-center gap-3">
                                    <FontAwesomeIcon
                                        icon={faBanSmoking}
                                        className="text-gray-500 text-lg md:text-xl"
                                    />
                                    <p className="text-gray-500 text-base">No smoking </p>
                                </div>
                            </div>

                            <div className="w-full md:flex items-center justify-between ">
                                <div className="text-gray-600 text-sm font-semibold w-full py-4 px-2 pl-6 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faKitchenSet} className="w-5 h-5" />
                                    <h4>
                                        Kitchen
                                    </h4>
                                </div>
                                <div className="text-gray-600 text-sm font-semibold w-full py-4 px-2 pl-6 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faAirFreshener} className="w-5 h-5" />
                                    <h4>
                                        Air Conditioner
                                    </h4>
                                </div>
                                <div className="text-gray-600 text-sm font-semibold w-full py-4 px-2 pl-6 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faHandsWash} className="w-5 h-5" />
                                    <h4>
                                        Washer
                                    </h4>
                                </div>
                                <div className="text-gray-600 text-sm font-semibold w-full py-4 px-2 pl-6 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faBed} className="w-5 h-5" />
                                    <h4>
                                        King size bed
                                    </h4>
                                </div>
                                <div className="text-gray-600 text-sm font-semibold w-full py-4 px-2 pl-6 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faHandsWash} className="w-5 h-5" />
                                    <h4>
                                        Cleaning Service
                                    </h4>
                                </div>
                            </div>

                            <p className="text-sm font-semibold text-gray-600">
                                Total Guests: { totalGuests}
                            </p>

                            <div className="grid md:grid-cols-2 gap-x-16">

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="text-gray-600 text-sm font-semibold"
                                    >
                                        Full guest name
                                    </label>
                                    <input
                                        className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                        type="text"
                                        id="fullGuestName"
                                        value={fullGuestName}
                                        // onChange={(event) => setFu(event.target.value)}
                                        placeholder="Regina@fun.com"
                                    />
                                </div>
                            </div>

                            {showSetNameAsProfileName && (
                                <div className="flex items-center gap-3 -mt-4">
                                    <input
                                        type="checkbox"
                                        id="checkbox-confirm"
                                        value="setNameAsProfileName"
                                        // checked={setNameAsProfileName}
                                        // onChange={handleCheckboxChange}
                                        className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
                                    />

                                    <label htmlFor="checkbox-confirm" className="text-sm font-semibold text-gray-700">
                                        Set this name as my profile name
                                    </label>
                                </div>
                            )}
                        </div>
                    </FormCard>

                    <FormCard label="Your arrival time ">
                        <div className="px-4 flex flex-col gap-6">

                            <div className="w-full grid md:grid-cols-2 gap-x-16">


                                <div className="flex flex-col gap-2 col-start-1">
                                    <label htmlFor="arrivalTime" className="text-gray-600 text-sm font-semibold">Add your estimated arrival time (optional) </label>
                                    <div className="w-full h-max relative">
                                        <select
                                            id="arrivalTime"
                                            value={arrivalTime}
                                            onChange={(event) => setArrivalTime(event.target.value)}
                                            className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                        >

                                            {[
                                                '9:00 AM — 10:00 AM',
                                                '10:00 AM — 11:00 AM',
                                                '11:00 AM — 12:00 PM',
                                                '12:00 PM — 13:00 PM',
                                                '13:00 PM — 14:00 PM',
                                                '14:00 PM — 15:00 PM',
                                                '15:00 PM — 16:00 PM',
                                                '16:00 PM — 17:00 PM',
                                                '17:00 PM — 18:00 PM',
                                            ].map((option, index) => (
                                                <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </FormCard>
                </section>

                <aside className="w-[90vw] md:w-full md:col-span-1 h-full md:flex flex-col gap-6 space-y-10">

                    <BookingDetailsCard />

                    <BookingPriceCard />

                    <div className="shadow-md rounded-lg bg-white w-full px-5 py-8">
                        <h4 className="font-semibold mb-4 text-sm md:text-base">Payment shedule</h4>
                        <p className=" text-sm md:text-base text-green-600">No payment today. You’ll pay when you stay</p>
                    </div>

                    <div className="shadow-md rounded-lg bg-white w-full px-5 py-8">

                        <h4 className="font-semibold mb-4 text-sm md:text-base">Cancellation fee</h4>

                        <div className="flex items-center justify-between gap-8">
                            <div>
                                <p className="text-gray-600 text-sm md:text-base" >If you cancel you will pay </p>
                            </div>

                            <div>
                                <p className=" float-right text-gray-600 text-sm md:text-base"> {getPrice(49)}</p>
                            </div>

                        </div>

                    </div>

                </aside>
            </main>

            <button onClick={handleNext} className="w-full py-3 md:py-4 btn-accent">
            Next
        </button>
        </section>
    );
};

export default BookingDetailsPage;
