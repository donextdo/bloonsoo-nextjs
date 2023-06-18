import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import FormCard from "./FormCard";
import SharedTextInput from "../Shared/SharedTextInput";
import SharedDropDown from "../Shared/SharedDropDown";
import SharedRadioGroup from "../Shared/SharedRadioGroup";
import SharedTextArea from "../Shared/SharedTextArea";
import baseUrl from "../../../Utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import map from "../../assets/map/map.jpg"

const BasicInfo = () => {

    const [hotelId, setHotelId] = useState();
    const [propertyName, setPropertyName] = useState('');
    const [propertyNameError, setPropertyNameError] = useState(false);
    const [startRating, setStartRating] = useState('N/A');
    const [contactName, setContactName] = useState('');
    const [contactNameError, setContactNameError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberRes, setPhoneNumberRes] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [phoneNumberAlt, setPhoneNumberAlt] = useState('');
    const [phoneNumberAltRes, setPhoneNumberAltRes] = useState('');
    const [ownMultipleHotels, setOwnMultipleHotels] = useState('');
    const [ownMultipleHotelsError, setOwnMultipleHotelsError] = useState(false);
    const [channelManager, setChannelManager] = useState('');
    const [channelManagerError, setChannelManagerError] = useState(false);
    const [streetAddress, setStreetAddress] = useState('');
    const [streetAddressError, setStreetAddressError] = useState(false);
    const [country, setCountry] = useState('Sri Lanka');
    const [countryError, setCountryError] = useState(false);
    const [postalCode, setPostalCode] = useState('');
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [about, setAbout] = useState('');
    const [aboutError, setAboutError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [code, setCode] = useState(42);
    const [altCode, setAltCode] = useState(42)

    const options = [13, 23, 42, 33, 5, 56, 64];

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    const createHotel = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            setPropertyNameError(false);
            setContactNameError(false);
            setPhoneNumberError(false);
            setOwnMultipleHotelsError(false);
            setChannelManagerError(false);
            setStreetAddressError(false);
            setPostalCodeError(false);
            setAboutError(false);
        }, 10000);

        if (!propertyName) {
            setPropertyNameError(true);
            setLoading(false);
            return;
        }

        if (!contactName) {
            setContactNameError(true);
            setLoading(false);
            return;
        }

        // Validation and error handling for other fields...

        try {
            const hotelDto = {
                property_name: propertyName,
                star_rating: startRating,
                contact_name: contactName,
                contact_phone_number: phoneNumber,
                contact_phone_number_alternative: phoneNumberAlt
                    ? phoneNumberAlt
                    : null,
                is_own_multiple_hotels: ownMultipleHotels === 'yes',
                use_channel_manager: channelManager === 'yes',
                property_address: {
                    street_address: streetAddress,
                    country: country,
                    postal_code: postalCode
                },
                about: about
            };

            console.log(hotelDto)

            const response = await axios.post(`${baseUrl}/hotel/create`, hotelDto, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // setHotelId(response.data._id);

            console.log(response.data);

            setLoading(false);

            // router.push("/listing/hotel/pricing");
            const hotelData = { hotelId: response.data._id };
            console.log(hotelData)
            router.push({
                pathname: '/listing/hotel/pricing',
                query: hotelData,
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    return (
        <section className="w-full flex flex-col gap-10">
            <FormCard label="Name and Ratings">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 px-4">
                    <div className="flex flex-col gap-2 items-start ">
                        <label className="text-gray-600 text-sm font-semibold">Name of your Property</label>
                        <input
                            type="text"
                            value={propertyName}
                            onChange={(e) => setPropertyName(e.target.value)}
                            className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                        />
                        {propertyNameError && <p>Property name cannot be empty</p>}
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <label className="text-gray-600 text-sm font-semibold">Star Rating</label>
                        <div className="w-full h-max relative">
                            <select value={startRating} onChange={(e) => setStartRating(e.target.value)}
                                className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            >
                                <option value="N/A" className="text-sm font-semibold text-gray-500 appearance-none">
                                    N/A
                                </option>
                                <option value="1" className="text-sm font-semibold text-gray-500 appearance-none">
                                    1
                                </option>
                                <option value="2" className="text-sm font-semibold text-gray-500 appearance-none">
                                    2
                                </option>
                                <option value="3" className="text-sm font-semibold text-gray-500 appearance-none">
                                    3
                                </option>
                                <option value="4" className="text-sm font-semibold text-gray-500 appearance-none">
                                    4
                                </option>
                                <option value="5" className="text-sm font-semibold text-gray-500 appearance-none">
                                    5
                                </option>
                                <option value="6" className="text-sm font-semibold text-gray-500 appearance-none">
                                    6
                                </option>
                                <option value="7" className="text-sm font-semibold text-gray-500 appearance-none">
                                    7
                                </option>
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />

                        </div>
                    </div>
                    <p className="text-sm text-gray-500">This name will be seen to guests</p>
                </div>
            </FormCard>

            <FormCard label="Contact Details">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-4">
                    <div className="flex flex-col gap-2 items-start">
                        <label className="text-gray-600 text-sm font-semibold">Contact name</label>
                        <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                        />
                        {propertyNameError && <p>Contact name cannot be empty</p>}
                    </div>

                    <div className="flex flex-col gap-2 items-start ">

                        <label className={`text-sm font-semibold ${phoneNumberError ? 'text-red-600' : 'text-gray-600'}`}>Phone Number</label>

                        <div className="flex items-center w-full">
                            <div className="w-28 h-max relative">
                                <select
                                    id="dropdown"
                                    value={code}
                                    onChange={(event)=>setCode(Number(event.target.value))}
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

                        {/* <small className="text-xs text-red-600">
                            Please enter a mobile number
                        </small> */}

                    </div>

                    <div className="flex flex-col gap-2 items-start ">

                        <label className={`text-sm font-semibold ${phoneNumberError ? 'text-red-600' : 'text-gray-600'}`}>Alternative Phone Number</label>

                        <div className="flex items-center w-full">
                            <div className="w-28 h-max relative">
                                <select
                                    id="dropdown"
                                    value={altCode}
                                    onChange={(event)=>setAltCode(Number(event.target.value))}
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
                                value={phoneNumberAlt}
                                onChange={(e) => setPhoneNumberAlt(e.target.value)}
                                className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            />
                        </div>

                        {/* <small className="text-xs text-red-600">
    Please enter a mobile number
</small> */}

                    </div>

                    <div>
                        <label className="text-gray-600 text-sm font-semibold">Do you own multiple hotels, or are you a part of a property management company?</label>
                        <div className="flex gap-2">
                            {[
                                { data: 'yes', label: 'yes' },
                                { data: 'no', label: 'no' },
                            ].map((option) => (
                                <label key={option.data} className="text-gray-600 text-sm h-max w-max font-semibold flex items-center">
                                    <input
                                        type="radio"
                                        value={option.data}
                                        name="multihotel"
                                        // checked={ownMultipleHotels === option.data}
                                        onChange={() => setOwnMultipleHotels(option.data)}
                                        className="mr-2 w-4 h-4 cursor-pointer"
                                    />
                                    {option.label}
                                </label>
                            ))}
                            {/* {ownMultipleHotelsError && <span className="text-red-600">{ownMultipleHotelsError}</span>} */}
                        </div>
                    </div>
                </div>
            </FormCard>

            <FormCard label="Do you use a channel manager?">
                <div className="px-4">
                    <p className="text-sm text-gray-600 font-semibold mb-4 text-justify">
                        A channel manager is a tool that lets you choose what you sell across all the different sites you might list your place on. You can then set your prices and open and close dates in your calendar on all of these sites in one place.
                        <br />
                        If you use a channel manager, tell us below. Well use this information to help you connect it to Bloonsoo.com in the future. It also helps if you tell us the brand name of your channel manager.
                    </p>
                    <div className="flex gap-2 items-center">
                        {[
                            { data: 'yes', label: 'yes' },
                            { data: 'no', label: 'no' },
                        ].map((option) => (
                            <label key={option.data} className="text-gray-600 text-sm h-max w-max font-semibold flex items-center">
                                <input
                                    type="radio"
                                    value={option.data}
                                    name="channelmanager"
                                    //   checked={channelManager === option.data}
                                    onChange={(e) => setChannelManager(e.target.value)}
                                    className="mr-2 w-4 h-4 cursor-pointer"
                                />
                                {option.label}
                            </label>
                        ))}
                        {channelManagerError && <span className="text-red-600">{channelManagerError}</span>}
                    </div>
                </div>
            </FormCard>

            <FormCard label="Where is your property located?">
                <div className="px-4 flex flex-col gap-6">
                    <p className="text-sm text-gray-600 font-semibold mb-4 text-justify">
                        Please make sure you enter the full address of your property, including your building name, number, etc.
                        Based on the information you provide, we might send a letter to verify this address.
                    </p>
                    <div className="w-full grid grid-cols-2 gap-6">
                        {/* <SharedTextInput
                            label="Street Address"
                            value={streetAddress}
                            error={streetAddressError}
                            errorMessage="Please enter street address"
                            // onChange={handleStreetAddressChange}
                            className="col-start-1"

                        /> */}
                        <div className="flex flex-col gap-2 items-start">
                            <label className="text-gray-600 text-sm font-semibold">Street Address</label>
                            <input
                                type="text"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                                className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                            />
                            {streetAddressError && <p>Contact name cannot be empty</p>}
                        </div>

                        {/* <SharedDropDown
                            label="Country/Region"
                            value={country}
                            error={countryError}
                            errorMessage="Please select a country"
                            options={['Sri Lanka', 'Australia', 'India']}
                            // onChange={handleCountryChange}
                            className="col-start-1"

                        /> */}
                        <div className="w-full h-max relative">

                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            >
                                <option value="" className="text-sm font-semibold text-gray-500 appearance-none">Select a country</option>
                                {['Sri Lanka', 'Australia', 'India'].map((option) => (
                                    <option key={option} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                        </div>
                        {countryError && <span className="text-red-600">{countryError}</span>}

                        <div className="flex flex-col gap-2 items-start">
                            <label className="text-gray-600 text-sm font-semibold">Post Code</label>
                            <input
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none col-start-1"
                            />
                            {postalCodeError && <p>Contact name cannot be empty</p>}
                        </div>
                        <div className="flex flex-col gap-2 items-start row-span-3 col-start-2 row-start-1">
                            <h4 className="text-sm font-semibold text-gray-600">Select Your Location (Move the pin)</h4>
                            <Image
                                src={map}
                                alt="item1"
                                style={{
                                    objectFit: "cover",
                                    backgroundColor: "white",
                                    width: "100%",
                                    height: "100%",
                                }}
                                width={450}
                                height={400}
                            />

                        </div>
                    </div>
                </div>
            </FormCard>

            <FormCard label="Add description about your property">
                <div className="px-4">
                    {/* <SharedTextArea
                        label="Add description (up to 1200 characters)"
                        rows="8"
                        maxChars={1200}
                        value={about}
                        onChange={(e: any) => setAbout(e.target.value)}
                        error={aboutError}
                        errorMessage="content too long"
                    /> */}
                    <div className="flex flex-col gap-2 items-start">
                        <label>Add description (up to 1200 characters)</label>
                        <textarea
                            rows={8}
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="col-start-1 w-full"
                        />
                        {aboutError && <p>content too long</p>}
                    </div>
                </div>
            </FormCard>

            <button onClick={createHotel} className="w-full py-4 btn-accent">
                {/* {loading ? <SharedButtonSpinner /> : <span>Next</span>} */}
                Next
            </button>
        </section>
    );
}

export default BasicInfo;