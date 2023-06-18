import { faBitcoin, faCcAmex, faCcDiscover, faCcMastercard, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const BookingCheckout = () => {
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [zipError, setZipError] = useState(false);
    const [cardNameError, setCardNameError] = useState(false);
    const [expMonthError, setExpMonthError] = useState(false);
    const [expYearError, setExpYearError] = useState(false);
    const [cvvError, setCvvError] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const bookings = useSelector((state: RootState) => state.booking.items);
    const totalPrice = useSelector((state: RootState) => state.booking.totalAmount);

    const handleCardNameChange = (e: any) => {
        setCardName(e.target.value);
    };

    const handleCardNumberChange = (e: any) => {
        setCardNumber(e.target.value);
    };

    const handleExpMonthChange = (e: any) => {
        setExpMonth(e.target.value);
    };

    const handleExpYearChange = (e: any) => {
        setExpYear(e.target.value);
    };

    const handleCvvChange = (e: any) => {
        setCvv(e.target.value);
    };

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleAddressChange = (e: any) => {
        setAddress(e.target.value);
    };

    const handleCityChange = (e: any) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e: any) => {
        setState(e.target.value);
    };

    const handleZipChange = (e: any) => {
        setZip(e.target.value);
    };

    const handleClose = () => {
        // Handle close logic
    };

    const handleSubmit = () => {
        // Handle submit logic
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-10">
            <div className="w-[80vw] max-h-full bg-white rounded-lg relative shadow-md overflow-visible flex flex-col gap-6 px-8 py-6 overflow-y-scroll !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-gray-500">
                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-1 flex flex-col gap-6">
                        <h3 className="text-xl font-bold">Card Holder Details</h3>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="name" className="text-gray-600 text-sm font-semibold">
                                    Full Name
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="Regina"
                                />
                                {nameError && <p className="text-red-500 text-xs">{nameError}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="text-gray-600 text-sm font-semibold">
                                    Email Address
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Regina@fun.com"
                                />
                                {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                            </div>

                            <div>
                                <label htmlFor="address" className="text-gray-600 text-sm font-semibold">
                                    Address
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={handleAddressChange}
                                    placeholder="285 15/2"
                                />
                                {addressError && <p className="text-red-500 text-xs">{addressError}</p>}
                            </div>

                            <div>
                                <label htmlFor="city" className="text-gray-600 text-sm font-semibold">
                                    City
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={handleCityChange}
                                    placeholder="Colombo"
                                />
                                {cityError && <p className="text-red-500 text-xs">{cityError}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="state" className="text-gray-600 text-sm font-semibold">
                                        State
                                    </label>
                                    <input
                                        className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                        type="text"
                                        id="state"
                                        value={state}
                                        onChange={handleStateChange}
                                        placeholder="WP"
                                    />
                                    {stateError && <p className="text-red-500 text-xs">{stateError}</p>}
                                </div>

                                <div>
                                    <label htmlFor="zip" className="text-gray-600 text-sm font-semibold">
                                        Zip
                                    </label>
                                    <input
                                        className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                        type="text"
                                        id="zip"
                                        value={zip}
                                        onChange={handleZipChange}
                                        placeholder="50000"
                                    />
                                    {zipError && <p className="text-red-500 text-xs">{zipError}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="flex flex-col gap-4">
                            <div className="mb-[0.4rem] mt-12">
                                <label className="text-gray-600 text-sm font-semibold">Accepted Card</label>
                                <div className="flex gap-3 w-max mt-4">
                                    <FontAwesomeIcon icon={faCcVisa} className="text-blue-900 text-2xl" />
                                    <FontAwesomeIcon icon={faCcAmex} className="text-blue-600 text-2xl" />
                                    <FontAwesomeIcon icon={faCcMastercard} className="text-red-600 text-2xl" />
                                    <FontAwesomeIcon icon={faCcDiscover} className="text-yellow-500 text-2xl" />
                                    <FontAwesomeIcon icon={faBitcoin} className="text-semidarkyellow text-2xl" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="cardName" className="text-gray-600 text-sm font-semibold">
                                    Name on Card
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="cardName"
                                    value={cardName}
                                    onChange={handleCardNameChange}
                                    placeholder="Master Card"
                                />
                                {cardNameError && <p className="text-red-500 text-xs">{cardNameError}</p>}
                            </div>

                            <div>
                                <label htmlFor="cardNumber" className="text-gray-600 text-sm font-semibold">
                                    Credit card number
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="cardNumber"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder="1111-2222-3333-4444"
                                />
                                {/* {cardNumberError && <p className="text-red-500 text-xs">{cardNumberError}</p>} */}
                            </div>

                            <div>
                                <label htmlFor="expMonth" className="text-gray-600 text-sm font-semibold">
                                    Exp Month
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="expMonth"
                                    value={expMonth}
                                    onChange={handleExpMonthChange}
                                    placeholder="September"
                                />
                                {expMonthError && <p className="text-red-500 text-xs">{expMonthError}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="expYear" className="text-gray-600 text-sm font-semibold">
                                        Exp Year
                                    </label>
                                    <input
                                        className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                        type="text"
                                        id="expYear"
                                        value={expYear}
                                        onChange={handleExpYearChange}
                                        placeholder="2024"
                                    />
                                    {expYearError && <p className="text-red-500 text-xs">{expYearError}</p>}
                                </div>

                                <div>
                                    <label htmlFor="cvv" className="text-gray-600 text-sm font-semibold">
                                        CVV
                                    </label>
                                    <input
                                        className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                        type="text"
                                        id="cvv"
                                        value={cvv}
                                        onChange={handleCvvChange}
                                        placeholder="858"
                                    />
                                    {cvvError && <p className="text-red-500 text-xs">{cvvError}</p>}
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="col-span-1">
                        <div className="grid grid-cols-2 gap-6 pb-5">
                            <div>
                                {/* <h3 className="text-xl font-bold">{hotel.property_name}</h3> */}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 border-b border-gray-400 mb-5">
                            <p className="font-semibold mb-3">You selected: </p>
                            {bookings.map((booking: any, index: number) => (
                                <p key={index} className="text-gray-600 text-base">
                                    {booking.rooms} x {booking.roomType} {booking.roomName}
                                </p>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="font-medium text-base">
                                <p className="mb-4">Total Price</p>
                            </div>

                            <div className="font-medium text-base">
                                <p className="text-gray-600 mb-4">{totalPrice}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <button onClick={handleClose} className="absolute right-4 top-4 w-6 h-6 z-50">
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>

                <button onClick={handleSubmit} className="w-full py-4 btn-accent">
                    Complete Checkout
                </button>
            </div>
        </div>

    );
}

export default BookingCheckout;