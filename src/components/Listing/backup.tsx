import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import FormCard from "./FormCard";
import SharedTextInput from "../Shared/SharedTextInput";
import SharedDropDown from "../Shared/SharedDropDown";
import SharedRadioGroup from "../Shared/SharedRadioGroup";
import SharedTextArea from "../Shared/SharedTextArea";
import baseUrl from "../../../Utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import map from "../../assets/map/map.jpg";
import Script from "next/script";
import { Loader, GoogleMap, Marker } from "@react-google-maps/api";
import Head from "next/head";

interface Prediction {
  description: String;
  place_id: string;
}

const BasicInfo = () => {
  const [hotelId, setHotelId] = useState();
  const [propertyName, setPropertyName] = useState("");
  const [propertyNameError, setPropertyNameError] = useState(false);
  const [startRating, setStartRating] = useState("N/A");
  const [contactName, setContactName] = useState("");
  const [contactNameError, setContactNameError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberRes, setPhoneNumberRes] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberAlt, setPhoneNumberAlt] = useState("");
  const [phoneNumberAltRes, setPhoneNumberAltRes] = useState("");
  const [ownMultipleHotels, setOwnMultipleHotels] = useState("");
  const [ownMultipleHotelsError, setOwnMultipleHotelsError] = useState(false);
  const [channelManager, setChannelManager] = useState("");
  const [channelManagerError, setChannelManagerError] = useState(false);
  const [streetAddressError, setStreetAddressError] = useState(false);
  const [country, setCountry] = useState("Sri Lanka");
  const [countryError, setCountryError] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [about, setAbout] = useState("");
  const [aboutError, setAboutError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [code, setCode] = useState(42);
  const [altCode, setAltCode] = useState(42);

  const [streetAddress, setStreetAddress] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [location, setLocation] = useState<string>("");
  const [city, setCity] = useState("");
  const [hide, setHide] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const options = [13, 23, 42, 33, 5, 56, 64];

  let token: any;
  if (typeof localStorage !== "undefined") {
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
        is_own_multiple_hotels: ownMultipleHotels === "yes",
        use_channel_manager: channelManager === "yes",
        property_address: {
          street_address: streetAddress,
          country: country,
          city: city,
          postal_code: postalCode,
        },
        about: about,
      };

      console.log(hotelDto);

      const response = await axios.post(`${baseUrl}/hotel/create`, hotelDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // setHotelId(response.data._id);

      console.log(response.data);

      setLoading(false);

      // router.push("/listing/hotel/pricing");
      const hotelData = { hotelId: response.data._id };
      console.log(hotelData);
      router.push({
        pathname: "/listing/hotel/pricing",
        query: hotelData,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //google address

  const mapRef = useRef(null);

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
    const location = event.target.value;
    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input: location,
        types: ["geocode"],
      },
      handleAutocompleteResults
    );
  };

  const handleAutocompleteResults = (predictions: any, status: any) => {
    setHide(false);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      setPredictions(predictions);

      //   console.log("prediction : ", predictions);
    }
  };

  function handlePredictionClick(place_id: any): void {
    setHide(true);
    console.log("place_id: ", place_id);
    const placeService = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    console.log("placeService: ", placeService);

    placeService.getDetails(
      { placeId: place_id },
      (
        placeResult: google.maps.places.PlaceResult | null,
        placeStatus: google.maps.places.PlacesServiceStatus
      ) => {
        console.log("placeResult: ", placeResult);

        if (
          placeStatus === google.maps.places.PlacesServiceStatus.OK &&
          placeResult &&
          placeResult.address_components
        ) {
          const lat = placeResult.geometry?.location?.lat();
          const lng = placeResult.geometry?.location?.lng();
          setLat(lat);
          setLng(lng);
          const addressComponents = placeResult.address_components;
          let city = "";

          console.log("addressComponents: ", addressComponents);
          for (let i = 0; i < addressComponents.length; i++) {
            const component = addressComponents[i];
            if (component.types.includes("locality")) {
              city = component.long_name;
              console.log("city: ", city);
              setCity(city);

              break;
            }
          }
          const formattedAddress = placeResult.formatted_address;
          console.log("Formatted Address: ", formattedAddress);

          setLocation(formattedAddress as string);
          setStreetAddress(location);
        }
      }
    );
  }

  useEffect(() => {
    if (lat && lng) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 14,
      });

      new google.maps.Marker({
        position: { lat, lng },
        map,
      });
    }
  }, [lat, lng]);

  return (
    <section className="w-full flex flex-col gap-10">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyALJN3bDbGEk8ppXieiWNnwHVYM_8ntKng&libraries=places`}
        onLoad={() => console.log("Google Maps API script loaded")}
      />

      <FormCard label="Where is your property located?">
        <div className="px-4 flex flex-col gap-6">
          <div className="w-full grid grid-cols-2 gap-6">
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
            />
            {predictions.length > 0 && !hide && (
              <ul className=" top-full left-0 w-full bg-white z-10 border border-gray-300 rounded-md shadow-lg">
                {predictions.map((prediction: Prediction) => (
                  <li
                    key={prediction.place_id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left"
                    onClick={() => handlePredictionClick(prediction.place_id)}
                  >
                    {prediction.description}
                  </li>
                ))}
              </ul>
            )}
            {streetAddressError && <p>Contact name cannot be empty</p>}
          </div>

          <div className="w-full h-max relative">
            <div className="flex flex-col gap-2 items-start row-span-3 col-start-2 row-start-1">
              <div
                ref={mapRef}
                style={{ height: "400px", width: "100%" }}
              ></div>
            </div>
          </div>
        </div>
      </FormCard>
    </section>
  );
};

export default BasicInfo;
