import ProfileForm from "@/components/Profile/ProfileForm";
import { faBars, faCaretDown, faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import ProfileCard from "@/components/Profile/ProfileCard";

const ProfilePage = () => {
    const [menu, setMenu] = useState(false);
    const [showProfileForm, setShowProfileForm] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine1Error, setAddressLine1Error] = useState(false);
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState(false);
    const [country, setCountry] = useState("");
    const [countryError, setCountryError] = useState(false);
    const [postalCode, setPostalCode] = useState("");
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberRes, setPhoneNumberRes] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [about, setAbout] = useState("");
    const [aboutError, setAboutError] = useState(false);
    const [code, setCode] = useState(42);


    const options = [13, 23, 42, 33, 5, 56, 64];

    const router = useRouter()

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    let user: any


    if (typeof localStorage !== 'undefined') {
        const userJson = localStorage.getItem('user');
        user = userJson ? JSON.parse(userJson) : null;
    }

    const logout = () => {
        // user.value = null
        localStorage.removeItem('token')
        router.push('/')
    }

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const toggleProfileForm = () => {
        setShowProfileForm(!showProfileForm)
    }

    const handleCancel = () => {
        setEditMode(!editMode)

    }

    const handleSave = async () => {
        // setTimeout(() => {
        //     setFirstNameError(false);
        //     setLastNameError(false);
        //     setAddressLine1Error(false);
        //     setCityError(false);
        //     setCountryError(false);
        //     setPhoneNumberError(false);
        // }, 10000);

        // if (!firstName) return setFirstNameError(true);
        // if (!lastName) return setLastNameError(true);
        // if (!addressLine1) return setAddressLine1Error(true);
        // if (!city) return setCityError(true);
        // if (!country) return setCountryError(true);
        // if (!phoneNumberRes.isValid) return setPhoneNumberError(true);

        const updateProfileDto = {
            firstName: firstName,
            lastName: lastName,
            address: {
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                city: city,
                country: country,
                postalCode: postalCode,
            },
            mobile: phoneNumber,
            about: about,
            isProfileComplete: true,
        };
        console.log(updateProfileDto)

        try {
            const response = await fetch(`${baseUrl}/user/${user?._id}`, {
                method: 'PATCH',
                body: JSON.stringify(updateProfileDto),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // authStore.setUser(data);
                // setDefaults();
                console.log(response)
                toggleEditMode();
            } else {
                console.log('Error updating profile');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="text-black font-montserrat md:container mx-auto px-2 flex flex-col gap-14 py-10">
            <main className="grid grid-cols-4 items-start gap-12 w-full">
                <aside className="w-full col-span-1 h-full">
                    <ProfileCard onEditClick={toggleEditMode} editMode={editMode} />
                </aside>

                <section className="w-full col-span-3 flex flex-col relative">
                    <div className="w-full pb-6 border-b border-gray-300">
                        <div className="flex items-center gap-4">
                            <h4 className="text-lg font-bold">Your information</h4>
                            <button
                                onClick={toggleEditMode}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} className="text-blue-600 text-base" />
                            </button>
                        </div>

                        <p className="text-sm font-semibold text-red-800"
                          hidden={!user?.isProfileComplete}
                        >
                            *Please complete your profile
                        </p>
                    </div>

                    <div className="w-[80%] flex flex-col gap-6 mt-6">

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
                                readOnly={!editMode}
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
                                readOnly={!editMode}

                            />
                        </div>

                        <div>
                            <label
                                htmlFor="addressLine1"
                                className="text-gray-600 text-sm font-semibold"
                            >
                                Address Line 1
                            </label>
                            <input
                                className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                type="text"
                                id="addressLine1"
                                value={addressLine1}
                                onChange={(event) => setAddressLine1(event.target.value)}
                                readOnly={!editMode}

                            />
                        </div>

                        <div>
                            <label
                                htmlFor="addressLine2"
                                className="text-gray-600 text-sm font-semibold"
                            >
                                Address Line 2 (optional)
                            </label>
                            <input
                                className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                type="text"
                                id="addressLine2"
                                value={addressLine2}
                                onChange={(event) => setAddressLine2(event.target.value)}
                                readOnly={!editMode}

                            />
                        </div>

                        <div>
                            <label
                                htmlFor="city"
                                className="text-gray-600 text-sm font-semibold"
                            >
                                City
                            </label>
                            <input
                                className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                type="text"
                                id="city"
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                                readOnly={!editMode}

                            />
                        </div>

                        <div>
                            <label
                                htmlFor="country"
                                className="text-gray-600 text-sm font-semibold"
                            >
                                Country or Region"
                            </label>
                            <input
                                className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                type="text"
                                id="country"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}
                                readOnly={!editMode}

                            />
                        </div>

                        <div>
                            <label
                                htmlFor="postalCode"
                                className="text-gray-600 text-sm font-semibold"
                            >
                                Postal code
                            </label>
                            <input
                                className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                type="text"
                                id="postalCode"
                                value={postalCode}
                                onChange={(event) => setPostalCode(event.target.value)}
                                readOnly={!editMode}

                            />
                        </div>
                        {editMode && (
                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="text-gray-600 text-sm font-semibold"
                                >
                                    Phone Number
                                </label>
                                <input
                                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    //  onChange={(event) => setPhoneNumber(event.target.value)}
                                    readOnly
                                />
                            </div>
                        )}
                        {editMode && (
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
                        )}

                        {editMode && (
                            <div

                                className="flex flex-col gap-2 items-start col-span-2">

                                <h4 className="text-sm font-semibold text-gray-600">
                                    About
                                </h4>


                                <div className="w-full px-6 py-4 border border-slate-400 font-semibold text-gray-600">
                                    {about}
                                </div>
                            </div>
                        )}

                        {editMode && (
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
                        )}


                        <div>
                            {editMode && (
                                <div className="w-full flex items-center justify-end gap-4">
                                    <button
                                        onClick={handleCancel}
                                        className="px-6 py-2 btn-accent bg-gray-600 hover:bg-gray-800"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        className="px-6 py-2 gradient-btn rounded-md"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <button onClick={toggleMenu} className="absolute top-0 right-10">
                        <FontAwesomeIcon icon={menu ? faTimes : faBars} className="text-4xl text-blue-700" />
                    </button>

                    <div className={`bg-white px-6 py-4 rounded-md w-56 absolute right-10 top-12 z-30 
              shadow-md transition-all duration-300 origin-top ${menu ? 'scale-y-100' : 'scale-y-0'}`}>
                        <ul className="w-full flex flex-col gap-2 text-sm font-semibold text-gray-600">
                            <li className="w-full border-b border-gray-300 py-1">
                                <Link href="/profile">Profile</Link>
                            </li>

                            <li className="w-full border-b border-gray-300 py-1">
                                <Link href="/profile/reservations">Reservations</Link>
                            </li>

                            <li className="w-full border-b border-gray-300 py-1">
                                <Link href="#">Wish List</Link>
                            </li>

                            <button onClick={logout} className="btn-accent py-2">
                                Logout
                            </button>
                        </ul>
                    </div>
                </section>
            </main>

            {showProfileForm && (<ProfileForm
            // showProfileForm={showProfileForm} onSubmit={onProfileFormSubmit} onClose={toggleProfileForm} 
            />)}
        </section>
    );
}

export default ProfilePage;