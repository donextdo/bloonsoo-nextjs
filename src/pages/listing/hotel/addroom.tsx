import HotelTabs from "@/components/Listing/HotelTabs";
import baseUrl from "../../../../Utils/baseUrl";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import FormCard from "@/components/Listing/FormCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCaretDown, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import noimage from "../../../assets/icons/image.png"
import axios from "axios";

const AddRoomPage = () => {
    const [roomType, setRoomType] = useState('0');
    const [roomTypeError, setRoomTypeError] = useState(false);

    const [roomName, setRoomName] = useState('');
    const [roomNameError, setRoomNameError] = useState(false);

    const [smokingPolicy, setSmokingPolicy] = useState('Non-smoking');

    const [nbrOfRooms, setNbrOfRooms] = useState(0);
    const [nbrOfRoomsError, setNbrOfRoomsError] = useState(false);

    const [bedType, setBedType] = useState('');
    const [bedTypeError, setBedTypeError] = useState(false);

    const [noOfBeds, setNoOfBeds] = useState(0);
    const [noOfBedsError, setNoOfBedsError] = useState(false);

    const [beds, setBeds] = useState<any[]>([]);

    const [addAnotherBed, setAddAnotherBed] = useState(false);
    const [bedsError, setBedsError] = useState(false);

    const [guests, setGuests] = useState('1');

    const [breakfastOption, setBreakfastOption] = useState('');
    const [breakfastPriceUnit, setBreakfastPriceUnit] = useState('USD');
    const [breakfastPrice, setBreakfastPrice] = useState(0);

    const [roomSize, setRoomSize] = useState(0);
    const [roomSizeUnit, setRoomSizeUnit] = useState('Square meter');

    const [priceUnit, setPriceUnit] = useState('USD');
    const [price, setPrice] = useState(0);
    const [priceError, setPriceError] = useState(false);

    const [facilities, setFacilities] = useState<any[]>([]);
    const [facilitiesError, setFacilitiesError] = useState(false);

    const [images, setImages] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const inputRef = useRef(null);
    const [previews, setPreviews] = useState<any[]>([]);


    const { hotelId } = router.query;

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    const facilitiesData = [
        { data: 'Non-smoking rooms', label: 'Non-smoking rooms' },
        { data: 'Restaurant', label: 'Restaurant' },
        { data: 'Free WiFi', label: 'Free WiFi' },
        { data: 'Airport shuttle', label: 'Airport shuttle' },
        { data: 'Hot tub', label: 'Hot tub' },
        { data: 'Water park', label: 'Water park' },

        { data: 'Non-smoking rooms', label: 'Non-smoking rooms' },
        { data: 'Restaurant', label: 'Restaurant' },
        { data: 'Free WiFi', label: 'Free WiFi' },
        { data: 'Airport shuttle', label: 'Airport shuttle' },
        { data: 'Hot tub', label: 'Hot tub' },
        { data: 'Water park', label: 'Water park' },

        { data: 'Non-smoking rooms', label: 'Non-smoking rooms' },
        { data: 'Restaurant', label: 'Restaurant' },
        { data: 'Free WiFi', label: 'Free WiFi' },
        { data: 'Airport shuttle', label: 'Airport shuttle' },
        { data: 'Hot tub', label: 'Hot tub' },
        { data: 'Water park', label: 'Water park' },

        { data: 'Non-smoking rooms', label: 'Non-smoking rooms' },
        { data: 'Restaurant', label: 'Restaurant' },
        { data: 'Free WiFi', label: 'Free WiFi' },
        { data: 'Airport shuttle', label: 'Airport shuttle' },
        { data: 'Hot tub', label: 'Hot tub' },
        { data: 'Water park', label: 'Water park' }
    ]

    useEffect(() => {
        fetchData();
    }, [previews]);

    async function fetchData() {
        try {
            const res = await axios.get(`${baseUrl}/hotel/${hotelId}`);
            console.log(res.data.gallery_images)
            const data = res.data.gallery_images
            setGalleryImages(data)

        } catch (err) {
            console.log(err);
        }
    }

    const addBed = () => {
        setTimeout(() => {
            setBedTypeError(false);
            setNoOfBedsError(false);
        }, 10000);

        // if (bedType === '0') return setBedTypeError(true);
        // if (noOfBeds === '0') return setNoOfBedsError(true);

        const bedDto = {
            bed_type: bedType,
            no_of_beds: noOfBeds,
        };

        setBeds((prevBeds) => [...prevBeds, bedDto]);

        setTimeout(() => {
            setAddAnotherBed(false);
        }, 1000);
    };

    const removeBed = (bedType: any) => {
        setBeds((prevBeds) => prevBeds.filter((bed) => bed.bed_type !== bedType));
    };

    const addAnotherBedFunc = () => {

        setAddAnotherBed(true);
    };

    const onMultipleChange = async (event: any) => {
        const input = event.target;
        console.log(input.files)
        if (input.files) {
            const fileList = input.files;
            setImages(fileList);

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                let formData = new FormData();
                formData.append('gallery_img', file);

                try {
                    const response = await axios.post(`${baseUrl}/rooms/gallery/${hotelId}`, formData, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    });

                    const path = response.data;
                    console.log(path);
                    setPreviews(prevPreviews => [...prevPreviews, path]);
                } catch (error) {
                    // Handle any errors that occurred during the request
                    console.error(error);
                }
            }
        }
    };

    const clearGallery = async (imglink: any) => {
        console.log(imglink)
        setPreviews((prevPreviews) => prevPreviews.filter((path) => path !== imglink));
        try {
            const response = await axios.delete(`${baseUrl}/rooms/gallery/delete/${hotelId}`, {
                data: { imgPath: imglink },
            });

        } catch (error) {
            // Handle any errors that occurred during the request
            console.error(error);
        }
    };

    const deletephoto = async (imglink: any) => {
        console.log(imglink)
        setGalleryImages((prevGalleryImages) => prevGalleryImages.filter((path) => path !== imglink));
        setPreviews((prevPreviews) => prevPreviews.filter((path) => path !== imglink));

        try {
            const response = await axios.delete(`${baseUrl}/rooms/gallery/delete/${hotelId}`, {
                data: { imgPath: imglink },
            });

        } catch (error) {
            // Handle any errors that occurred during the request
            console.error(error);
        }
    };

    const addRoom = async () => {
        console.log("hi")
        setTimeout(() => {
            setRoomTypeError(false);
            setRoomNameError(false);
            setNbrOfRoomsError(false);
            setBedsError(false);
            setPriceError(false);
            setFacilitiesError(false);
        }, 10000);

        // if (roomType === '0') return setRoomTypeError(true);
        // if (!roomName) return setRoomNameError(true);
        // if (!nbrOfRooms) return setNbrOfRoomsError(true);
        // if (beds.length === 0) return setBedsError(true);
        // if (!price) return setPriceError(true);
        // if (facilities.length === 0) return setFacilitiesError(true);

        setLoading(true);
        console.log("dsdsd")

        const roomDto = {
            property_id: hotelId,
            room_type: roomType,
            room_name: roomName,
            smoking_policy: smokingPolicy,
            nbr_of_rooms: nbrOfRooms,
            beds: beds,
            guests: guests,
            is_breakfast_available: breakfastOption === 'yes',
            breakfast_price: `${breakfastPriceUnit} ${breakfastPrice ? breakfastPrice : '0'
                }`,
            room_size: `${roomSize} ${roomSizeUnit === 'Square meter' ? 'm' : 'f'}`,
            price_for_one_night: `${priceUnit} ${price}`,
            facilities: facilities,
            gallery_images: previews,
        };

        console.log(roomDto)

        try {
            const response = await axios.post(`${baseUrl}/rooms/create`, roomDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const room = response.data;
            console.log(room)
            setLoading(false);
            const hotelData = { hotelId: hotelId };
            console.log(hotelData)
            router.push({
                pathname: '/listing/hotel/pricing',
                query: hotelData,
            });

        } catch (error) {
            // Handle any errors that occurred during the request
            console.error(error);
        }

        setBeds([]);

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

    return (
        <section className="md:container mx-auto px-10 py-16 flex flex-col gap-8 text-black font-montserrat">
            <h2 className="text-2xl font-semibold mb-6">
                List your property on Bloonsoo.com
            </h2>

            <HotelTabs active_1 active_2 />

            <Link href="/listing/hotel/pricing" className="text-sm -mb-4 font-semibold text-blue-500" >
                Go back to overview
            </Link>

            <FormCard label="Please select " >
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-4">

                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="roomType" className="text-gray-600 text-sm font-semibold">Room Type</label>
                        <div className="w-full h-max relative">
                            <select
                                id="roomType"
                                value={roomType}
                                onChange={(event) => setRoomType(event.target.value)}
                                className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            >
                                <option value="0" className="text-sm font-semibold text-gray-500 appearance-none">Please select</option>
                                {[
                                    'Single Room',
                                    'Double Room',
                                    'Twin Room',
                                    'Twin/double Room',
                                    'Triple Room',
                                    'Quadruple Room',
                                    'Family Room',
                                    'Suite Room',
                                    'Apartment Room',
                                    'Dormitory room',
                                    'Bed in dormitor'
                                ].map((option, index) => (
                                    <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                        </div>

                        {roomTypeError && <p>Please select room type</p>}
                    </div>

                    <div className="flex flex-col gap-2 items-start">
                        <label className="text-gray-600 text-sm font-semibold">Room Name</label>
                        <input
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                        />
                        {roomNameError && <p>please enter room name</p>}
                    </div>


                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="roomType" className="text-gray-600 text-sm font-semibold">Smoking policy</label>
                        <div className="w-full h-max relative">
                            <select
                                id="roomType"
                                value={smokingPolicy}
                                onChange={(event) => setSmokingPolicy(event.target.value)}
                                className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            >
                                {['Non-smoking', 'Smoking', 'Both options'].map((option, index) => (
                                    <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                        </div>
                        {roomTypeError && <p>please enter Smoking policy</p>}
                    </div>

                    <div className="flex flex-col gap-2 items-start">
                        <label className="text-gray-600 text-sm font-semibold">Number of rooms (of this type)</label>
                        <input
                            type="number"
                            value={nbrOfRooms}
                            onChange={(e) => setNbrOfRooms(Number(e.target.value))}
                            className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                        />
                        {nbrOfRoomsError && <p>please enter room name</p>}
                    </div>

                </div>

            </FormCard>

            {/* not finish */}
            <FormCard label="Bed options" >
                <div className="flex flex-col gap-y-6 px-4">
                    <h4 className="text-sm font-semibold text-gray-600">
                        Tell us only about the existing beds in a room. Do not include extra beds.
                    </h4>

                    <div className="flex flex-col gap-2">
                        <h4 className={`text-sm font-semibold ${bedsError ? 'text-red-500' : 'text-gray-600'}`}>
                            What kind of beds are available in this room?
                        </h4>

                        {beds.length > 0 && beds.map((bed, index) => (
                            <div key={index} className="grid grid-cols-12 gap-x-8 items-end">
                                <div className="flex flex-col gap-2 col-span-6">
                                    <div className="w-full h-max relative">
                                        <select
                                            id={`roomType-${index}`}
                                            value={bed.bed_type}
                                            onChange={(event) => setBedType(event.target.value)}
                                            className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                        >
                                            {[
                                                'Single bed / 90-130 cm wide',
                                                'Double bed / 90-130 cm wide',
                                                'Large bed (king size) / 151-180 cm wide',
                                                'Extra-large double bed (Super-king size) / 181-210 cm wide',
                                                'Bunk bed / variable Size',
                                                'Sofa bed / variable Size',
                                                'Futon Mat / variable Size',
                                            ].map((option, optionIndex) => (
                                                <option key={optionIndex} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                    </div>
                                    {/* Add any error handling for roomType here */}
                                </div>

                                <div className="flex flex-col gap-2 col-span-4 relative">
                                    <select
                                        id={`roomType-${index}`}
                                        value={bed.no_of_beds}
                                        onChange={(event) => setNoOfBeds(Number(event.target.value))}
                                        className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                    >
                                        {['1', '2', '3', '4', '5'].map((option, optionIndex) => (
                                            <option key={optionIndex} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                    {/* Add any error handling for noOfBeds here */}
                                </div>

                                <button
                                    onClick={() => removeBed(bed.bed_type)}
                                    className="w-full h-9 col-span-2 bg-red-500 text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-red-700"
                                >
                                    <FontAwesomeIcon icon={faPlusCircle} className="text-white text-base" />
                                    <span>Remove</span>
                                </button>
                            </div>
                        ))}


                        {((beds.length === 0) || addAnotherBed) && (
                            <div className="grid grid-cols-12 gap-x-8 items-end">


                                <div className="flex flex-col gap-2 col-span-6 relative">

                                    <select
                                        id="roomType"
                                        value={bedType}
                                        onChange={(event) => setBedType(event.target.value)}
                                        className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                    >
                                        <option value="0" className="text-sm font-semibold text-gray-500 appearance-none">Please select a bed type</option>
                                        {[
                                            'Single bed / 90-130 cm wide',
                                            'Double bed / 90-130 cm wide',
                                            'Large bed (king size) / 151-180 cm wide',
                                            'Extra-large double bed (Super-king size) / 181-210 cm wide',
                                            'Bunk bed / variable Size',
                                            'Sofa bed / variable Size',
                                            'Futon Mat / variable Size'
                                        ].filter((option) => !beds.some((bed) => bed.bed_type === option)).map((option, index) => (
                                            <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                    {roomTypeError && <p>please enter Smoking policy</p>}
                                </div>

                                <div className="flex flex-col gap-2 col-span-4 relative">

                                    <select
                                        id="roomType"
                                        value={noOfBeds}
                                        onChange={(event) => setNoOfBeds(Number(event.target.value))}
                                        className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                    >
                                        <option value="0" className="text-sm font-semibold text-gray-500 appearance-none">Select the number of beds</option>
                                        {['1', '2', '3', '4', '5'].map((option, index) => (
                                            <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                    {roomTypeError && <p>please enter Smoking policy</p>}
                                </div>

                                <button
                                    onClick={addBed}
                                    className="w-full h-9 col-span-2 bg-blue-500 text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-blue-700">

                                    <FontAwesomeIcon icon={faPlusCircle} className="text-white text-base " />
                                    <span>Add</span>

                                </button>

                            </div>
                        )}


                        {bedsError && (
                            <small className="text-xs text-red-600">
                                Please add room(s)
                            </small>
                        )}

                        {beds.length > 0 && !addAnotherBed && (
                            <button
                                onClick={addAnotherBedFunc}
                                className="w-max text-blue-500 font-semibold text-xs"
                            >
                                <i className="text-blue-500 text-base fas fa-plus-circle" />
                                Add another bed
                            </button>
                        )}

                        <div className="grid grid-cols-2 gap-x-8 items-end">


                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="roomType" className="text-gray-600 text-sm font-semibold">How many guests can stay in this room?</label>
                                <div className="w-full h-max relative">
                                    <select
                                        id="roomType"
                                        value={guests}
                                        onChange={(event) => setGuests(event.target.value)}
                                        className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                    >
                                        {['1', '2', '3', '4', '5', '6', '7', '8'].map((option, index) => (
                                            <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                </div>
                                {/* {roomTypeError && <p>please enter country</p>} */}
                            </div>
                        </div>
                    </div>


                </div>

            </FormCard>

            <FormCard label="Breakfast" >
                <div className="px-4 w-full grid grid-cols-2 gap-x-8">
                    <div className="">
                        <p className="text-gray-600 text-sm font-semibold">Do you provide breakfast?</p>
                        <div className="flex gap-2">

                            {[
                                { value: 'yes', label: 'Yes' },
                                { value: 'no', label: 'No' },
                            ].map((option, index) => (
                                <label key={index} className="text-gray-600 text-sm h-max w-max font-semibold flex items-center">
                                    <input
                                        type="radio"
                                        name="breakfast"
                                        value={option.value}
                                        onChange={() => setBreakfastOption(option.value)}
                                        className="mr-2 w-4 h-4 cursor-pointer"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        {breakfastOption === 'yes' && (
                            <>
                                <div className="flex flex-col gap-2 w-full">
                                    <label className={`text-sm font-semibold ${priceError ? 'text-red-600' : 'text-gray-600'}`}>
                                        Price for Breakfast
                                    </label>
                                </div>

                                <div className="w-full grid grid-cols-6 ">

                                    <div className="flex flex-col gap-2 relative col-span-2">

                                        <select
                                            id="roomType"
                                            value={breakfastPriceUnit}
                                            onChange={(event) => setBreakfastPriceUnit(event.target.value)}
                                            className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                        >
                                            {['USD', 'LKR', 'AUD'].map((option, index) => (
                                                <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                        {/* {roomTypeError && <p>please enter price unit</p>} */}
                                    </div>

                                    <div className="col-span-4">

                                        <input
                                            type="number"
                                            value={breakfastPrice}
                                            onChange={(e) => setBreakfastPrice(Number(e.target.value))}
                                            className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                        />
                                        {/* {nbrOfRoomsError && <p>please enter a price</p>} */}
                                    </div>

                                </div>
                            </>

                        )}
                    </div>


                </div>

            </FormCard>

            <FormCard label="Room Size (Optional)" >
                {/* <div className="grid grid-cols-2 gap-x-8 px-4"> */}

                <div className="w-full grid grid-cols-3 items-end px-4">

                    <div className="col-span-2">
                        <label className="text-gray-600 text-sm font-semibold">How big is the room?</label>
                        <input
                            type="number"
                            value={roomSize}
                            onChange={(e) => setRoomSize(Number(e.target.value))}
                            className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                        />
                        {/* {nbrOfRoomsError && <p>please enter room name</p>} */}
                    </div>

                    <div className="col-span-1 relative">

                        <select
                            id="roomType"
                            value={roomSizeUnit}
                            onChange={(event) => setRoomSizeUnit(event.target.value)}
                            className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                        >
                            {['Square meter', 'Squeare feet'].map((option, index) => (
                                <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                    {option}
                                </option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                        {/* {roomTypeError && <p>please enter Smoking policy</p>} */}
                    </div>


                </div>

                {/* </div> */}
            </FormCard>

            <FormCard label="Base price per night">
                <div className="flex flex-col gap-y-6 px-4">

                    <p className="text-sm font-semibold text-gray-600">
                        This is the lowest price that we automatically apply to this room for all dates. Before your property goes live, you can set seasonal pricing in your property dashboard.
                    </p>

                    <div className="grid grid-cols-3 gap-x-8">

                        <div className="flex flex-col gap-2 w-full col-span-2">

                            <label className={`text-sm font-semibold ${priceError ? 'text-red-600' : 'text-gray-600'}`}>
                                Price for 1 person ( 1 night)
                            </label>

                            <div className="w-full grid grid-cols-3 items-start">

                                <div className="flex flex-col gap-2 relative">
                                    <select
                                        id="roomType"
                                        value={priceUnit}
                                        onChange={(event) => setPriceUnit(event.target.value)}
                                        className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"

                                    >
                                        {['USD', 'LKR', 'AUD'].map((option, index) => (
                                            <option key={index} value={option} className="text-sm font-semibold text-gray-500 appearance-none">
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                                </div>

                                <div className="flex flex-col gap-2 col-span-2">
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                                    />
                                    {nbrOfRoomsError && <p>please enter room name</p>}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </FormCard>

            <FormCard label="Facilities that are popular with guests">
                <div className="px-4">
                    <div className="grid gap-6 w-full grid-flow-col grid-cols-4 grid-rows-6">
                        {facilitiesData.map((option, index) => (
                            <div key={index} className="flex gap-2 items-center">
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

            <FormCard label="What does your room look like?">
                <div className="px-4 flex flex-col gap-6">
                    <h4 className="text-sm font-semibold text-gray-600">
                        Add at least 3 photos now. You can always add more later.
                    </h4>

                    <div className="w-full border rounded-lg border-slate-500 border-dashed">
                        {images.length === 0 ? (
                            <div className="w-full h-full py-24 flex flex-col items-center gap-8">
                                <div className="w-32 h-32">
                                    <Image
                                        src={noimage}
                                        alt="item1"
                                        style={{
                                            objectFit: "contain",
                                            backgroundColor: "white",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        width={450}
                                        height={400}
                                    />
                                </div>

                                <p className="text-base text-gray-400 text-center">Upload your gallery photos here</p>

                                <label
                                    htmlFor="gallery-img"
                                    className="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faCamera} className="text-blue-500 text-base mr-2" />
                                    Upload photo
                                </label>

                                <input
                                    className="hidden"
                                    id="gallery-img"
                                    type="file"
                                    onChange={onMultipleChange}
                                    accept="image/*"
                                    ref={inputRef}
                                    multiple
                                />
                            </div>
                        ) : (
                            <div className="w-full grid grid-cols-4 bg-slate-300">
                                {previews.map((preview: any, index: number) => (
                                    <div key={index} className="w-full aspect-square relative">
                                        <Image
                                            src={preview}
                                            alt="item1"
                                            style={{
                                                objectFit: "contain",
                                                backgroundColor: "white",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            width={450}
                                            height={400}
                                        />
                                        <button
                                            onClick={() => clearGallery(preview)}
                                            className="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-white text-sm" />
                                        </button>
                                    </div>
                                ))}

                                {galleryImages.length < 31 && (
                                    <div className="w-full aspect-square grid place-items-center">
                                        <label
                                            htmlFor="gallery-img"
                                            className="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faCamera} className="text-blue-500 text-base mr-2" />
                                            Add more
                                        </label>

                                        <input
                                            className="hidden"
                                            id="gallery-img"
                                            type="file"
                                            onChange={onMultipleChange}
                                            accept="image/*"
                                            ref={inputRef}
                                            multiple
                                        />
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            </FormCard>

            <FormCard label="All the Photos of a Hotel">
                <div className="px-4 flex flex-col gap-6">
                    {/* <h4 className="text-sm font-semibold text-gray-600">
                        Add at least 3 photos now. You can always add more later.
                    </h4> */}

                    <div className="w-full grid grid-cols-6 bg-slate-300">
                                {galleryImages.map((preview: any, index: number) => (
                                    <div key={index} className="w-full aspect-square relative border">
                                        <Image
                                            src={preview}
                                            alt="item1"
                                            className="w-full h-full object-contain bg-white"
                                            width={450}
                                            height={400}
                                        />
                                        <button
                                            onClick={() => deletephoto(preview)}
                                            className="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-white text-sm" />
                                        </button>
                                    </div>
                                ))}
         
                            </div>
                </div>
            </FormCard>

            

            <button onClick={addRoom} className="w-full py-4 bg-blue-700 text-white font-semibold text-base rounded-lg hover:bg-blue-900">
                {/* <SharedButtonSpinner v-if="loading"/> */}
                {/* <span v-else>Add Room</span>  */}
                Add Room
            </button>

        </section >

    );
}

export default AddRoomPage;