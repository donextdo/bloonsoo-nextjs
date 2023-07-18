import HotelTabs from "@/components/Listing/HotelTabs";
import axios from "axios";
import { useState } from "react";
import baseUrl from "../../../../Utils/baseUrl";
import FormCard from "@/components/Listing/FormCard";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const PoliciesPage = () => {
    const [cancellationDuration, setCancellationDuration] = useState('1');
    const [payTime, setPayTime] = useState('Of the first night');
    const [preventAccidentalBookings, setPreventAccidentalBookings] = useState(true);
    const [checkInForm, setCheckInForm] = useState('6:00');
    const [checkInUntill, setCheckInUntill] = useState('18:00');
    const [checkOutForm, setCheckOutForm] = useState('6:00');
    const [checkOutUntill, setCheckOutUntill] = useState('18:00');
    const [accommodateChildren, setAccommodateChildren] = useState('');
    const [accommodateChildrenError, setAccommodateChildrenError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pets, setPets] = useState('yes');
    const router = useRouter()

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    const { hotelId } = router.query;


    const createPolicies = async () => {
        setTimeout(() => {
            setAccommodateChildrenError(false);
        }, 10000);

        if (!accommodateChildren) {
            return setAccommodateChildrenError(true);
        }

        setLoading(true);

        const dto = {
            cancellation_duration: cancellationDuration,
            pay_time: payTime,
            preventAccidental_bookings: preventAccidentalBookings,
            check_in_form: checkInForm,
            check_in_untill: checkInUntill,
            check_out_form: checkOutForm,
            check_out_untill: checkOutUntill,
            accommodate_children: accommodateChildren === 'yes',
            pets: pets === 'yes',
        };

        console.log(dto)
        try {



            const response = await axios.patch(
                `${baseUrl}/hotel/policies/${hotelId}`,
                dto,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            // Handle response data as needed
            console.log(response.data);

            setLoading(false);


            const hotelData = { hotelId: hotelId };
            console.log(hotelData)
            router.push({
                pathname: '/listing/hotel/payment',
                query: hotelData,
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handlePreventAccidentalBookingsChange = () => {
        setPreventAccidentalBookings(!preventAccidentalBookings);
    };

    return (
        <section
            className="md:container mx-auto px-10 py-16 flex flex-col gap-8 text-black font-montserrat"
        >
            <h2 className="text-2xl font-semibold mb-6">
                List your property on Bloonsoo.com
            </h2>
            <HotelTabs active_1 active_2 active_3 active_4 active_5 />

            <FormCard label="Cancellations">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-4">
                    <div>
                        <label htmlFor="cancellationDuration" className="text-gray-600 text-sm font-semibold">
                            How many days in advance can guests cancel free of charge?
                        </label>
                        <div className="w-full h-max relative">
                        <select
                            id="cancellationDuration"
                            value={cancellationDuration}
                            onChange={(event) => setCancellationDuration(event.target.value)}
                            className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((option) => (
                                <option className="text-sm font-semibold text-gray-500 appearance-none" key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                        </div>
                        {/* {cancellationDurationError && <p>Please select a number of days</p>} */}
                    </div>

                    <div className="pl-3">
                        <label htmlFor="payTime" className="text-gray-600 text-sm font-semibold">
                            Or guests will pay 100%
                        </label>
                        <div className="w-full h-max relative">
                        <select
                            id="payTime"
                            value={payTime}
                            onChange={(event) => setPayTime(event.target.value)}
                            className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                        >
                            {["Of the first night", "Of the full stay"].map((option) => (
                                <option className="text-sm font-semibold text-gray-500 appearance-none" key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-4">
                    <p className="text-sm font-semibold text-gray-600">
                        The guest must cancel by 18:00 on the day of arrival or pay 100% of
                        the price for the fit st night.
                    </p>
                    <p className="text-sm font-semibold text-gray-500">
                        Please note. You&apos;ll be able to make changes to your policies later on.
                        this is just to get you started.
                    </p>
                </div>

            </FormCard>

            <FormCard label="Protect against accidental bookings">
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-600">Yes</span>
                        <label className="relative cursor-pointer ml-5">
                            <input
                                type="checkbox"
                                checked={preventAccidentalBookings}
                                onChange={handlePreventAccidentalBookingsChange}
                                className="sr-only peer"
                            />
                            <div
                                className={`w-11 h-6 bg-gray-400 focus:outline-none peer-focus:outline-none rounded-full peer dark:bg-gray-700 ${preventAccidentalBookings ? 'peer-checked:after:translate-x-full peer-checked:after:border-white' : ''
                                    } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${preventAccidentalBookings ? 'peer-checked:bg-blue-600' : ''
                                    }`}
                            ></div>
                        </label>
                    </div>
                </div>

                <div className="px-4">
                    <p className="text-sm text-gray-600 font-semibold">
                        To save your time handling accidental bookings, we automatically wave
                        the cancellation fees for the guests who cancel the booking
                        <br />
                        within the first 2 hours after made the booking. You can change this
                        period of time later in your property management platform.
                    </p>
                </div>
            </FormCard>

            <div className="grid md:grid-cols-2 gap-6">
                <FormCard label="Check in">
                    <div className="px-4 flex flex-col gap-6">
                        <div>
                            <label htmlFor="checkInFrom" className="text-gray-600 text-sm font-semibold">
                                From
                            </label>
                        <div className="w-full h-max relative">

                            <select
                                id="checkInFrom"
                                value={checkInForm}
                                onChange={(event) => setCheckInForm(event.target.value)}
                                className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            >
                                {['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map((option) => (
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                            </div>
                            {/* {checkInFormError && <p>Please select a time</p>} */}
                        </div>

                        <div>
                            <label htmlFor="checkInUntil" className="text-gray-600 text-sm font-semibold">
                                Until
                            </label>
                        <div className="w-full h-max relative">

                            <select
                                id="checkInUntil"
                                value={checkInUntill}
                                onChange={(event) => setCheckInUntill(event.target.value)}
                                className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            >
                                {['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map((option) => (
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                            </div>
                            {/* {checkInUntillError && <p>Please select a time</p>} */}
                        </div>
                    </div>

                </FormCard>

                <FormCard label="Check out">
                    <div className="px-4 flex flex-col gap-6">
                        <div>
                            <label htmlFor="checkOutFrom" className="text-gray-600 text-sm font-semibold">
                                From
                            </label>
                        <div className="w-full h-max relative">

                            <select
                                id="checkOutFrom"
                                value={checkOutForm}
                                onChange={(event) => setCheckOutForm(event.target.value)}
                                className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            >
                                {['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map((option) => (
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                            </div>
                            {/* {checkOutFormError && <p>Please select a time</p>} */}
                        </div>

                        <div>
                            <label htmlFor="checkOutUntil" className="text-gray-600 text-sm font-semibold">
                                Until
                            </label>
                        <div className="w-full h-max relative">

                            <select
                                id="checkOutUntil"
                                value={checkOutUntill}
                                onChange={(event) => setCheckOutUntill(event.target.value)}
                                className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            >
                                {['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map((option) => (
                                    <option className="text-sm font-semibold text-gray-500 appearance-none" key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                            </div>
                            {/* {checkOutUntillError && <p>Please select a time</p>} */}
                        </div>
                    </div>

                </FormCard>

            </div>

            <FormCard label="Children and Pets">
                <div className="px-4">
                    <div>
                        <h4 className="text-gray-600 text-sm font-semibold">Children Can you accommodate children? (You can specify the ages and
          prices later)</h4>
          <div className="flex gap-2">
                        <div>
                            <input
                                type="radio"
                                id="childrenYes"
                                name="children"
                                value="yes"
                                // checked={accommodateChildren === "yes"}
                                onChange={(event) => setAccommodateChildren(event.target.value)}
                                className="mr-2 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="childrenYes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="childrenNo"
                                name="children"
                                value="no"
                                // checked={accommodateChildren === "no"}
                                onChange={(event) => setAccommodateChildren(event.target.value)}
                                className="mr-2 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="childrenNo">No</label>
                        </div>
                        </div>
                        {accommodateChildrenError && <p>Please select an option</p>}
                    </div>

                    <div className="pt-7 flex flex-col">
                        <label htmlFor="pets" className="text-gray-600 text-sm font-semibold">Pets</label>
                        <div className="w-96 h-max relative">
                        <select
                            id="pets"
                            value={pets}
                            onChange={(event) => setPets(event.target.value)}
                            className="w-96 px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                        >
                            {["yes", "no"].map((option) => (
                                <option className="text-sm font-semibold text-gray-500 appearance-none" key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faCaretDown} className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none" />
                        </div>
                        {/* {petsError && <p>Please select an option</p>} */}
                    </div>
                </div>

            </FormCard>

            <button
                onClick={createPolicies}
                className="w-full py-4 bg-blue-700 text-white font-semibold text-base rounded-lg hover:bg-blue-900"
            >
                {/* <SharedButtonSpinner v-if="loading"/> */}
                <span >Next</span>
            </button>

        </section>
    );
}

export default PoliciesPage;