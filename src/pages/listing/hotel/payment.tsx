import axios from "axios";
import baseUrl from "../../../../Utils/baseUrl";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HotelTabs from "@/components/Listing/HotelTabs";
import FormCard from "@/components/Listing/FormCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";


const PaymentPage = () => {


    const [creditCardOption, setCreditCardOption] = useState('');
    const [creditCardOptionError, setCreditCardOptionError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [commissionPayments, setCommissionPayments] = useState('John');
    const [commissionRate, setCommissionRate] = useState(0);
    const [invoiceName, setInvoiceName] = useState('');
    const [sameAddress, setSameAddress] = useState('no');
    const router = useRouter()

    const { hotelId } = router.query;

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    useEffect(() => {
        const fetchCommissionRate = async () => {
            try {
                


                const response = await axios.get(`${baseUrl}/commission/rate`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                const rate = response.data
                setCommissionRate(rate.rate);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCommissionRate();
    }, []);

    const addPaymentDataAndOpenToBooking = async () => {
        setTimeout(() => {
            setCreditCardOptionError(false);
        }, 1000);

        if (!creditCardOption) {
            setCreditCardOptionError(true);
            return;
        }

        setLoading(true);

        const dto = {
            credit_card_options: creditCardOption === 'yes',
            is_open_to_bookings: true,
        };
        console.log(dto)

        try {
            const token = localStorage.getItem('token');


            const response = await axios.patch(
                `${baseUrl}/hotel/finalize/${hotelId}`,
                dto,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);
            

            setLoading(false);

            router.push('/');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const addPaymentDataAndOpenLater = async () => {
        setTimeout(() => {
            setCreditCardOptionError(false);
        }, 10000);

        if (!creditCardOption) {
            setCreditCardOptionError(true);
            return;
        }

        setLoading(true);

        const dto = {
            credit_card_options: creditCardOption === 'yes',
        };
    console.log(dto)
        try {
            const token = localStorage.getItem('token');


            const response = await axios.patch(
                `${baseUrl}/hotel/finalize/${hotelId}`,
                dto,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);

            setLoading(false);

            router.push('/');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <section
            className="md:container mx-auto px-10 py-16 flex flex-col gap-8 text-black font-montserrat"
        >
            <h2 className="text-2xl font-semibold">List your property on Bloonsoo.com</h2>

            <HotelTabs active_1 active_2 active_3 active_4 active_5 active_6 />

            <FormCard label="Guest payment options">
                <div className="px-4 flex flex-col gap-6">
                    <div>
                        <h4  className="text-gray-600 text-sm font-semibold">Can you charge credit cards at the property?</h4>
                        <div className="flex gap-2">

                        <div>
                            <input
                                type="radio"
                                id="creditCardYes"
                                name="group3"
                                value="yes"
                                // checked={creditCardOption === "yes"}
                                onChange={(event) => setCreditCardOption(event.target.value)}
                                className="mr-2 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="creditCardYes">Yes</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="creditCardNo"
                                name="group3"
                                value="no"
                                // checked={creditCardOption === "no"}
                                onChange={(event) => setCreditCardOption(event.target.value)}
                                className="mr-2 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="creditCardNo">No</label>
                        </div>
                        </div>
                        {creditCardOptionError && <p>Please select an option</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-base font-semibold text-gray-600">
                            How do guests book and how do they pay?
                        </p>
                        <p className="text-sm font-semibold text-gray-600">
                            To initially secure a reservation, we allow guests to use all major credit
                            cards. However, when it comes to collecting payment, you can specify the
                            payment methods you accept at your property.
                        </p>
                    </div>
                </div>

            </FormCard>

            <div className="bg-gray-100 rounded-md w-full flex flex-col gap-6 py-8 px-6 font-montserrat">

                <div className="grid md:grid-cols-2">
                    <h4 className="text-lg text-gray-600 font-semibold">Commission payments</h4>
                    <p className="text-end text-md text-gray-600 font-semibold">
                        Commission percentage :<span className="text-lg text-black block" >{commissionRate}</span>
                    </p>
                </div>

                <div className="grid gap-6 pl-3 md:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <div>
                            <label htmlFor="invoiceName" className="text-gray-600 text-sm font-semibold">What name should be placed on the invoice (e.g. legal/company name)?</label>
                            <input
                                
                                className="w-11/12 px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                type="text"
                                id="invoiceName"
                                value={invoiceName}
                                onChange={(event) => setInvoiceName(event.target.value)}
                            />
                            {/* {invoiceNameError && <p>Please enter a value</p>} */}
                        </div>

                        <div>
                            <label className="text-gray-600 text-sm font-semibold">Does this recipient have the same address as your property?</label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="radio"
                                    id="sameAddressYes"
                                    name="group4"
                                    value="yes"
                                    // checked={sameAddress === "yes"}
                                    onChange={() => setSameAddress("yes")}
                                    className=" w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="sameAddressYes">Yes</label>

                                <input
                                    type="radio"
                                    id="sameAddressNo"
                                    name="group4"
                                    value="no"
                                    // checked={sameAddress === "no"}
                                    onChange={() => setSameAddress("no")}
                                    className=" w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="sameAddressNo">No</label>
                            </div>
                            {/* {sameAddressError && <p>Please select an option</p>} */}

                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="font-semibold text-base text-gray-600">
                            How your commission works for you
                        </h4>

                        <div className="flex flex-col gap-4 text-sm font-normal">
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="text-green-700 text-md"
                                />
                                <p>No hidden fees—one flat commission rate</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="text-green-700 text-md"
                                />
                                <p>Pay only for bookings that stay</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="text-green-700 text-md"
                                />
                                <p>24/7 personal support by phone or e-mail</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="text-green-700 text-md"
                                />
                                <p>Strong search engine presence for more bookings</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="text-green-700 text-md"
                                />
                                <p>Property advice and analytics to increase performance</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="text-green-700 text-md"
                                />
                                <p>Instant confirmations to save you time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FormCard label="Your availability to guests">
                <div className="px-4">
                    <p className="py-4 text-base font-semibold text-gray-600">
                        When is the first date that guests can check in?
                    </p>
                    <p className="text-sm text-justify">
                        To help you start earning, we automatically make your property open
                        for bookings for the next 18 months. If you would like to make changes
                        to your availability before opening, you can choose &apos;complete
                        registration and open later&apos;. Your availability can also be adjusted
                        after you open for bookings.
                    </p>
                    <p className="py-5 pt-8 text-base font-semibold text-gray-600">
                        To complete your registration, please tick the boxes below
                    </p>

                    <div className="flex mb-4">
                        <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />

                        <label htmlFor="default-checkbox" className="ml-2 text-sm"
                        >I certify that this is a legitimate accommodation business with all
                            necessary licenses and permits, which can be shown upon first
                            request. Booking.com B.V. reserves the right to verify and
                            investigate any details provided in this registration.
                        </label>
                    </div>
                    <div className="flex mb-4">
                        <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        />
                        <label htmlFor="default-checkbox" className="ml-2 text-sm"
                        >I have react accepted and agreed to the General Delivery Terms and
                            Privacy Statement. Booking.com enables accommodations and guests to
                            communicate through Etooking.com, which receives and processes
                            communications in accordance with the Booking.com Privacy Statement
                            and General Delivery Terms.
                        </label>
                    </div>
                    <p className="py-5 text-base font-semibold text-gray-600">
                        Almost done! You can always change the information even after you
                        completed the registration!
                    </p>
                </div>
            </FormCard>

            <button
        onClick={addPaymentDataAndOpenToBooking}
        className="w-full py-4 bg-blue-700 text-white font-semibold text-base rounded-lg hover:bg-blue-900 text-bold"
      >
        {/* {loading ? <SharedButtonSpinner /> : 'Complete registration and open to bookings'} */}
        Complete registration and open to bookings&apos;
      </button>

      <button
        onClick={addPaymentDataAndOpenLater}
        className="w-full px-4 py-4 font-semibold text-base text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent text-bold"
      >
        {/* {loading ? <SharedButtonSpinner /> : 'Complete Registration and open later'} */}
        Complete Registration and open later
      </button>

        </section>
    );
}

export default PaymentPage;