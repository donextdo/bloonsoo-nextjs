import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import DateInput from "../Shared/DateInput";
import GuestsPanel from "../Shared/GuestPanel";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../../Utils/baseUrl";
import { FiSearch } from "react-icons/fi";
import { FaHotel } from "react-icons/fa";

const Form = () => {
  const [error, setError] = useState(false);
  const [modelValue, setModelValue] = useState("");
  const [city, setCity] = useState("");
  const errorMessage = "Please provide a valid date";
  const router = useRouter();
  // const [disabled, setDisabled] = useState(!city);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    const search = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      const response = await axios.post(`${baseUrl}/hotel/searchBySocket`, {
        query,
      });
      const Products = response.data;
      console.log("filter hotel : ", Products);
      setResults(Products);
    };

    const timeoutId = setTimeout(() => {
      search();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  const handleUpdateModelValue = (value: string) => {
    setModelValue(value);
  };

  const handleSearch = () => {
    const hotelData = { city: city };
    console.log(hotelData);
    router.push({
      pathname: "/search",
      query: hotelData,
    });
  };
  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  const viewHotelById = async (hotel: any) => {
    setIsHide(true);
    setQuery(hotel.property_name);
    console.log("hotel : ", hotel.id);
    router.push({
      pathname: `/hotels/${hotel.id}`,
    });
  };

  return (
    <div className="relative mx-auto md:container px-10 md:px-20 -mt-14 z-20">
      <div className="relative w-full h-full border-4 rounded-lg px-8 py-4 bg-white border-blue-500 flex flex-col gap-4 md:px-24">
        <div>
          <label className="font-montserrat text-sm font-bold text-slate-700">
            Location
          </label>

          <div className="relative w-full mt-2">
            <input
              type="text"
              className="w-full px-12 py-2 border border-slate-400 rounded-lg text-slate-700 text-sm font-semibold focus:border-blue-500 focus:border focus:outline-none"
              placeholder="Which city do you prefer?"
              // value={city}
              // onChange={(e) => setCity(e.target.value)}
              value={query}
              onChange={handleInputChange}
            />
            <FiSearch
              type="submit"
              className="absolute left-4 top-0 bottom-0 my-auto text-slate-700 text-2xl"
            />
          </div>
          {results.length > 0 && !isHide && (
            <div className="border border-gray-300 p-4 rounded-md">
              <ul>
                {results.map((hotel: any, index) => (
                  <li key={index} className="mb-2">
                    <div className="flex flex-row  items-center">
                      <div>
                        <FaHotel className="mr-2 " />
                      </div>
                      <div
                        className="font-bold cursor-pointer"
                        onClick={() => viewHotelById(hotel)}
                      >
                        {" "}
                        {hotel.property_name}
                      </div>
                    </div>
                    <div
                      className="text-sm"
                      onClick={() => viewHotelById(hotel)}
                    >
                      <span>{hotel.street_address}</span>
                    </div>
                    <div
                      className="text-sm"
                      onClick={() => viewHotelById(hotel)}
                    >
                      <span className="mr-2">{hotel.city}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {error && (
            <small className="text-red-900 font-semibold">
              Please provide a location
            </small>
          )}
        </div>

        <div className="grid gird-rows-2 lg:grid-cols-2 gap-4">
          <DateInput
            label="Check In"
            modelValue={modelValue}
            error={error}
            errorMessage={errorMessage}
            onUpdateModelValue={handleUpdateModelValue}
          />

          <DateInput
            label="Check Out"
            modelValue={modelValue}
            error={error}
            errorMessage={errorMessage}
            onUpdateModelValue={handleUpdateModelValue}
          />
        </div>

        <GuestsPanel />

        <button
          onClick={handleSearch}
          className="py-3 px-6 -mb-10 rounded-full text-sm text-black font-semibold bg-gradient-to-b from-darkyellow to-semidarkyellow hover:from-semidarkyellow hover:to-darkyellow"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Form;
