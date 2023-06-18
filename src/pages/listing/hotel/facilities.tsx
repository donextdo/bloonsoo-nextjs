import { useState } from "react";
import baseUrl from "../../../../Utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import HotelTabs from "@/components/Listing/HotelTabs";
import FormCard from "@/components/Listing/FormCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const FacilitiesPage = () => {
    const [parkingType, setParkingType] = useState('paid');
    const [parkingType2, setParkingType2] = useState('Private');
    const [parkingType3, setParkingType3] = useState('On site');
    const [reservation, setReservation] = useState('no');
    const [priceUnit, setPriceUnit] = useState('USD');
    const [parkingPrice, setParkingPrice] = useState('');
    const [parkingPriceError, setParkingPriceError] = useState(false);
    const [breakfastOption, setBreakfastOption] = useState('no');
    const [breakpastOptionError, setBreakpastOptionError] = useState(false);
    const [languages, setLanguages] = useState<string[]>([]);
    const [facilities, setFacilities] = useState<any[]>([]);
    const [facilitiesError, setFacilitiesError] = useState(false);
    const [extraBedOpt, setExtraBedOpt] = useState('no');
    const [noOfBeds, setNoOfBeds] = useState('1');
    const [accommodateGuests, setAccommodateGuests] = useState<any[]>([]);
    const [amenities, setAmenities] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter()
    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    const { hotelId } = router.query;

    const facilitiesData = [
        { data: 'Non-smoking rooms', label: 'Non-smoking rooms' },
        { data: 'Restaurant', label: 'Restaurant' },
        { data: 'Free WiFi', label: 'Free WiFi' },
        { data: 'Airport shuttle', label: 'Airport shuttle' },
        { data: 'Hot tub', label: 'Hot tub' },
        { data: 'Water park', label: 'Water park' },

        { data: 'Non-smoking rooms', label: 'Non-smoking rooms' },
        { data: 'Restauran', label: 'Restauran' },
        { data: 'Free WiFi', label: 'Free WiFi' },
        { data: 'Airport shuttle', label: 'Airport shuttle' },
        { data: 'Hot tub', label: 'Hot tub' },
        { data: 'Water park', label: 'Water park' },

        { data: 'Non-smoking rooms', label: 'Non-smoking rooms' },
        { data: 'Restauran', label: 'Restauran' },
        { data: 'Free WiFi', label: 'Free WiFi' },
        { data: 'Airport shuttle', label: 'Airport shuttle' },
        { data: 'Hot tub', label: 'Hot tub' },
        { data: 'Water park', label: 'Water park' },

        { data: 'Non-smoking rooms', label: 'Non-smoking rooms' },
        { data: 'Restauran', label: 'Restauran' },
        { data: 'Free WiFi', label: 'Free WiFi' },
        { data: 'Airport shuttle', label: 'Airport shuttle' },
        { data: 'Hot tub', label: 'Hot tub' },
        { data: 'Water park', label: 'Water park' }
    ]

    const amenitiesData = [
        { data: 'A/C', label: 'A/C' },
        { data: 'Spa bath', label: 'Spa bath' },
        { data: 'Bath', label: 'Bath' },
        { data: 'Flat-screen TV', label: 'Flat-screen TV' },
        { data: 'Electric kettle', label: 'Electric kettle' },
        { data: 'Balcony', label: 'Balcony' },

        { data: 'A/C', label: 'A/C' },
        { data: 'Spa bath', label: 'Spa bath' },
        { data: 'Bath', label: 'Bath' },
        { data: 'Flat-screen TV', label: 'Flat-screen TV' },
        { data: 'Electric kettle', label: 'Electric kettle' },
        { data: 'Balcony', label: 'Balcony' },

        { data: 'A/C', label: 'A/C' },
        { data: 'Spa bath', label: 'Spa bath' },
        { data: 'Bath', label: 'Bath' },
        { data: 'Flat-screen TV', label: 'Flat-screen TV' },
        { data: 'Electric kettle', label: 'Electric kettle' },
        { data: 'Balcony', label: 'Balcony' },

        { data: 'A/C', label: 'A/C' },
        { data: 'Spa bath', label: 'Spa bath' },
        { data: 'Bath', label: 'Bath' },
        { data: 'Flat-screen TV', label: 'Flat-screen TV' },
        { data: 'Electric kettle', label: 'Electric kettle' },
        { data: 'Balcony', label: 'Balcony' }

    ]

    const handleParkingTypeChange = (event: any) => {
        setParkingType(event.target.value);
    };

    const addFacilities = async () => {
        setLoading(true);

        const dto = {
            parking: parkingType === 'no' ? false : true,
            parking_details:
                parkingType === 'no'
                    ? null
                    : {
                        parking_type: parkingType,
                        parking_type_2: parkingType2,
                        parking_type_3: parkingType3,
                        reservation: reservation === 'yes' ? true : false,
                        parking_price: `${priceUnit} ${parkingPrice ? parkingPrice : 0.0}`,
                    },
            breakfast: breakfastOption === 'yes' ? true : false,
            languages: languages,
            facilities: facilities,
            extra_beds: extraBedOpt === 'yes' ? true : false,
            extra_beds_options:
                extraBedOpt === 'no' || !extraBedOpt
                    ? null
                    : {
                        no_of_beds: noOfBeds,
                        accommodate_guests: accommodateGuests,
                    },
            amenities: amenities,
        };

        console.log(dto)

        try {
            const response = await axios.patch(`${baseUrl}/hotel/facilities/${hotelId}`, dto, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLoading(false);


            const hotelData = { hotelId: hotelId };
            console.log(hotelData)
            router.push({
                pathname: '/listing/hotel/image',
                query: hotelData,
            });
            //   const hotel = response.data;
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLanguageChange = (language: string) => {
        // if (languages.includes(language)) {
        //     setLanguages(languages.filter((lang) => lang !== language));
        //   } else {
        //     setLanguages([...languages, language]);
        //   }
        // };
        setLanguages([...languages, language]);

    };

    const handleFacilityChange = (event: any) => {
        const facilityValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setFacilities((prevFacilities) => [...prevFacilities, facilityValue]);
        } else {
            setFacilities((prevFacilities) =>
                prevFacilities.filter((facility) => facility !== facilityValue)
            );
        }

    };

    const handleAccommodateGuestsChange = (event: any) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setAccommodateGuests([...accommodateGuests, value]);
        } else {
            setAccommodateGuests(accommodateGuests.filter(item => item !== value));
        }
    };

    const handleAmenitiesChange = (event: any) => {
        const facilityValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setAmenities((prevAmenities) => [...prevAmenities, facilityValue]);
        } else {
            setAmenities((prevAmenities) =>
                prevAmenities.filter((facility) => facility !== facilityValue)
            );
        }

    };

    return (
        <section className="md:container mx-auto px-10 py-16 flex flex-col gap-8 text-black font-montserrat">
            <h2 className="text-2xl font-semibold mb-6">
                List your property on Bloonsoo.com
            </h2>

            <HotelTabs active_1 active_2 active_3 />

            <FormCard label="Parking" >

                <div className="grid grid-cols-3 gap-x-8 gap-y-6 px-4 items-end">

                    <div>
                        <label className="text-gray-600 text-sm font-semibold">Is parking available to the guests?</label>
                        <div className="w-full h-max relative">
                            <select className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none" value={parkingType} onChange={handleParkingTypeChange}>
                                <option className="text-sm font-semibold text-gray-500 appearance-none" value="paid">Yes, paid</option>
                                <option className="text-sm font-semibold text-gray-500 appearance-none" value="free">Yes, free</option>
                                <option className="text-sm font-semibold text-gray-500 appearance-none" value="no">No</option>
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                        </div>
                    </div>

                    {parkingType === 'paid' || parkingType === 'free' && (
                        <div>
                            <label className="text-gray-600 text-sm font-semibold">Choose parking type:</label>
                            <div className="w-full h-max relative">
                                <select className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none" value={parkingType2} onChange={(event) => setParkingType2(event.target.value)}>
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" value="Public">Public</option>
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" value="Private">Private</option>
                                </select>
                                <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {parkingType === 'paid' || parkingType === 'free' && (
                        <div>
                            <label className="text-gray-600 text-sm font-semibold">Choose parking location:</label>
                            <div className="w-full h-max relative">
                                <select className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none" value={parkingType3} onChange={(event) => setParkingType3(event.target.value)}>
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" value="On site">On site</option>
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" value="Off site">Off site</option>
                                </select>
                                <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {parkingType === 'paid' || parkingType === 'free' && (
                        <div>
                            <label className="text-gray-600 text-sm font-semibold">Do guests need to reserve a parking space?</label>
                            <div className="w-full h-max relative">
                                <select className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none" value={reservation} onChange={(event) => setReservation(event.target.value)}>
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" value="no">No reservation needed</option>
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" value="yes">Yes, reservation needed</option>
                                </select>
                                <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {parkingType === 'paid' && (
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-gray-600 text-sm font-semibold">Price for parking (per day)</label>
                            <div className="w-full grid grid-cols-3 items-end">
                                <div className="w-full h-max relative">
                                    <select className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none" value={priceUnit} onChange={(event) => setPriceUnit(event.target.value)}>
                                        <option className="text-sm font-semibold text-gray-500 appearance-none" value="USD">USD</option>
                                        <option className="text-sm font-semibold text-gray-500 appearance-none" value="LKR">LKR</option>
                                        <option className="text-sm font-semibold text-gray-500 appearance-none" value="AUD">AUD</option>
                                    </select>
                                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                </div>
                                <input type="number" value={parkingPrice} onChange={(event) => setParkingPrice(event.target.value)} className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none col-span-2" />
                            </div>
                        </div>
                    )}






                </div>

            </FormCard>

            <div className="flex gap-6">

                <FormCard label="Breakfast" >

                    <div className="px-4">

                        <div>
                            <h4 className="text-gray-600 text-sm font-semibold">Do you serve Breakfast?</h4>
                            <div className="flex gap-2">

                                {[
                                    { data: 'yes', label: 'yes' },
                                    { data: 'no', label: 'no' }
                                ].map((option) => (
                                    <div key={option.data} className="text-gray-600 text-sm h-max w-max font-semibold flex items-center">
                                        <input
                                            type="radio"
                                            name="breakfastOpt"
                                            value={option.data}
                                            // checked={breakfastOption === option.data}
                                            onChange={(event) => setBreakfastOption(event.target.value)}
                                            className="mr-2 w-4 h-4 cursor-pointer"
                                        />
                                        <label >{option.label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </FormCard>

                <FormCard label="Languages spoken" >

                    <div className="px-4 flex flex-col gap-6">

                        <div className="">
                            <h4>What languages do you or your staff speak?</h4>
                            {[
                                { data: 'English', label: 'English' },
                                { data: 'Sinhala', label: 'Sinhala' },
                                { data: 'Tamil', label: 'Tamil' },
                                { data: 'French', label: 'French' }
                            ].map((option) => (
                                <div key={option.data} className="flex gap-2 items-center">
                                    <input
                                        type="checkbox"
                                        value={option.data}
                                        // checked={languages}
                                        onChange={() => handleLanguageChange(option.data)}
                                    />
                                    <label className="text-gray-600 text-sm h-max w-max font-semibold">{option.label}</label>
                                </div>
                            ))}
                        </div>

                        <button className="w-max text-blue-500 font-semibold text-xs">
                            <FontAwesomeIcon icon={faPlusCircle} className="text-blue-500 text-base " />
                            Add More
                        </button>

                    </div>

                </FormCard>
            </div>


            <FormCard label="Facilities that are popular with guests ">

                <div className="px-4 flex flex-col gap-4 items-start">
                    <h4 className="text-sm font-semibold">Facilities:</h4>
                    <div className="grid gap-6 w-full grid-flow-col grid-cols-4 grid-rows-6">
                        {facilitiesData.map((option) => (
                            <div key={option.data} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    value={option.data}
                                    // checked={facilities.includes(option.data)}
                                    onChange={handleFacilityChange}
                                />
                                <label className="text-gray-600 text-sm h-max w-max font-semibold">{option.label}</label>
                            </div>
                        ))}
                        {facilitiesError && <p>Please select facilities</p>}
                    </div>

                </div>

            </FormCard>

            <FormCard label="Extra bed options">

                <div className="px-4 flex flex-col gap-6">

                    <div>
                        <h4 className="text-gray-600 text-sm font-semibold">Do you provide extra beds?</h4>
                        <div className="flex gap-2">

                            {[
                                { data: 'yes', label: 'yes' },
                                { data: 'no', label: 'no' }
                            ].map((option) => (
                                <div key={option.data} className="text-gray-600 text-sm h-max w-max font-semibold flex items-center">
                                    <input
                                        type="radio"
                                        name="extraBedOpt"
                                        value={option.data}
                                        checked={extraBedOpt === option.data}
                                        onChange={(event) => setExtraBedOpt(event.target.value)}
                                        className="mr-2 w-4 h-4 cursor-pointer"
                                    />
                                    <label >{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {extraBedOpt === 'yes' && (
                        <div className="">
                            <label htmlFor="noOfBeds">Select the number of extra beds that can be provided:</label>
                            <div className="w-full h-max relative">
                                <select className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none" id="noOfBeds" value={noOfBeds} onChange={(event) => setNoOfBeds(event.target.value)}>
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" value="1">1</option>
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" value="2">2</option>
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" value="3">3</option>
                                </select>
                                <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {extraBedOpt === 'yes' && (
                        <div className="w-full flex flex-col gap-4">
                            <h4 className="text-gray-600 text-sm font-semibold">
                                Tick the box if you can accommodate the following guests in extra beds
                            </h4>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    value="Children up to 2 years old in cots"
                                    // checked={accommodateGuests.includes('Children up to 2 years old in cots')}
                                    onChange={handleAccommodateGuestsChange}
                                    id="box-1"
                                    className="w-3 h-3 cursor-pointer"
                                />
                                <label htmlFor="box-1" className="text-gray-600 text-sm h-max w-max font-semibold">
                                    Children up to 2 years old in cots
                                </label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    // checked={accommodateGuests.includes('Children')}
                                    onChange={handleAccommodateGuestsChange}
                                    value="Children"
                                    id="box-2"
                                    className="w-3 h-3 cursor-pointer"
                                />
                                <label htmlFor="box-2" className="text-gray-600 text-sm h-max w-max font-semibold">
                                    Children
                                </label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    // checked={accommodateGuests.includes('Adults')}
                                    onChange={handleAccommodateGuestsChange}
                                    value="Adults"
                                    id="box-3"
                                    className="w-3 h-3 cursor-pointer"
                                />
                                <label htmlFor="box-3" className="text-gray-600 text-sm h-max w-max font-semibold">
                                    Adults
                                </label>
                            </div>
                        </div>
                    )}

                </div>

            </FormCard>

            <FormCard label="Amenities">

                <div className="px-4 flex flex-col gap-4 items-start">
                    <h4 className="text-sm font-semibold">Choose amenities:</h4>

                    <div className="grid gap-6 w-full grid-flow-col grid-cols-4 grid-rows-6">
                        {amenitiesData.map((option) => (
                            <div key={option.data} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    id={option.data}
                                    value={option.data}
                                    // checked={amenities.includes(option.data)}
                                    onChange={handleAmenitiesChange}
                                />
                                <label htmlFor={option.data} className="text-gray-600 text-sm h-max w-max font-semibold">{option.label}</label>
                            </div>
                        ))}
                        {/* {amenitiesError && <p>Please choose amenities</p>} */}
                    </div>

                </div>

            </FormCard>

            <button onClick={addFacilities} className="w-full py-4 bg-blue-700 text-white font-semibold text-base rounded-lg hover:bg-blue-900">
                {/* <SharedButtonSpinner v-if="loading"/> */}
                <span>Next</span>
            </button>

        </section >
    );
}

export default FacilitiesPage;