import { faCaretDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ProfileForm = () => {
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [about, setAbout] = useState('');
    const [aboutError, setAboutError] = useState(false);
    const [code, setCode] = useState(42);


    const options = [13, 23, 42, 33, 5, 56, 64];

    const handleClose = () => {

    }

    const onSubmit = () => {

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">
            <div className="w-[60vw] max-h-full bg-white rounded-lg relative shadow-md overflow-visible flex flex-col gap-6 px-10 py-8 overflow-y-scroll !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-gray-500">

                <div className="w-full grid grid-cols-2 gap-6">
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

                    <div>
                        <label
                            htmlFor="location"
                            className="text-gray-600 text-sm font-semibold"
                        >
                            Location
                        </label>
                        <input
                            className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                            type="text"
                            id="location"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            placeholder="George"
                        />
                    </div>

                    <div className="flex flex-col gap-1 items-start col-start-2">
                        <label className={`text-sm font-semibold ${phoneNumberError ? 'text-red-600' : 'text-gray-600'}`}>Phone Number</label>
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
                    </div>

                    <div className="flex flex-col gap-2 items-start">
                        <label>About (up to 1200 characters)</label>
                        <textarea
                            rows={8}
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="col-start-1 w-full border"
                        />
                        {aboutError && <p>content too long</p>}
                    </div>

                </div>

                <div className="w-full flex items-center justify-end gap-4">

                    <button
                        onClick={handleClose}
                        className="px-6 py-2 btn-accent bg-gray-600 hover:bg-gray-800">
                        Cancel
                    </button>

                    <button
                        onClick={onSubmit}
                        className="px-6 py-2 gradient-btn rounded-md">
                        Save Changes
                    </button>
                </div>

                <button onClick={handleClose} className="absolute right-4 top-4 w-6 h-6 z-50">
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>
            </div>

        </div>
    );
}

export default ProfileForm;