import axios from "axios";
import { useEffect, useState } from "react";

// import Swal from "sweetalert2";

import { useRouter } from "next/router";
import baseUrl from "../../../../Utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const AccountDetails = () => {
  const [modal, setModal] = useState(false);
  const [firstName, setFirstName] = useState("");
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
  const [code, setCode] = useState(94);


  const options = [94, 23, 42, 33, 5, 56, 64];

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
    fetchData()
}, []);

async function fetchData() {
    try {
        const res = await axios.get(`${baseUrl}/user/${user._id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data)
        const data = res.data;
        // setOneUser(data)
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAddressLine1(data.address.addressLine1);
        setAddressLine2(data.address.addressLine2);
        setCity(data.address.city)
        setCountry(data.address.country)
        setPostalCode(data.address.postalCode)
        setPhoneNumber(data.mobile)
        setAbout(data.about);
    } catch (err) {
        console.log(err);
    }
}

  const handleSaveChanges = async () => {
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
          console.log(data)
          
      } else {
          console.log('Error updating profile');
      }
  } catch (error) {
      console.log(error);
  }
  };

  return (
    <div>
      <label className="text-sm">First Name </label>
      <input
        type="text"
        className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label className="text-sm">Last Name </label>
      <input
        type="text"
        className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label className="text-sm">Address Line 1 </label>
      <input
        type="text"
        className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
        value={addressLine1}
        onChange={(event) => setAddressLine1(event.target.value)}
      />

      <label className="text-sm">Address Line 2 (optional)</label>
      <input
        type="text"
        className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
        value={addressLine2}
        onChange={(event) => setAddressLine2(event.target.value)}
      />

      <label className="text-sm">
        City
      </label>
      <input
        type="text"
        className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />

      <label className="text-sm">Country or Region&quot;</label>
      <input
        type="text"
        className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      />

      <label className="text-sm">Postal code</label>
      <input
        type="text"
        className="w-full px-4 h-10 bg-gray-100 rounded-md mt-2 mb-4"
        value={postalCode}
        onChange={(event) => setPostalCode(event.target.value)}
      />

      <div className="flex flex-col gap-1 items-start col-start-2">
        <label className={`text-sm font-semibold ${phoneNumberError ? 'text-red-600' : 'text-gray-600'}`}>Phone Number</label>
        <div className="flex items-center w-full">
          <div className="w-28 h-max relative">
            <select
              id="dropdown"
              value={code}
              onChange={(event) => setCode(Number(event.target.value))}
              className={`mt-2 mb-4 w-full px-6 h-10 bg-gray-100 text-sm rounded-l-md font-semibold focus:outline-none appearance-none`}

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
            className="w-full px-4 h-10 bg-gray-100 rounded-r-md mt-2 mb-4"
          />
        </div>
      </div>

      <button
        className="bg-[#233a95] text-white py-2.5 px-4 mb-4 rounded-md text-sm"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </div>
  );
};

export default AccountDetails;
