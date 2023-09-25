export interface Hotel {
    _id: string;
    user: string;
    property_name: string;
    star_rating: string;
    contact_name: string;
    contact_phone_number: string;
    contact_phone_number_alternative: string;
    is_own_multiple_hotels: boolean;
    use_channel_manager: boolean;
    property_address: {
        street_address: string;
        country: string;
        postal_code: string;
        _id: string;
    };
    about: string;
    rooms: {
        _id: string;
        property_id: string;
        room_type: string;
        room_name: string;
        smoking_policy: string;
        nbr_of_rooms: number;
        beds: {
            bed_type: string;
            no_of_beds: number;
            _id: string;
        }[];
        guests: number;
        is_breakfast_available: boolean;
        breakfast_price: string;
        room_size: string;
        price_for_one_night: string;
        facilities: string[];
        gallery_images: string[];
        createdAt: string;
        updatedAt: string;
        __v: number;
    }[];
    gallery_images: string[];
    parking: boolean;
    languages: string[];
    facilities: string[];
    amenities: string[];
    credit_card_options: boolean;
    is_open_to_bookings: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    breakfast: boolean;
    extra_beds: boolean;
    extra_beds_options: null;
    parking_details: {
        parking_type: string;
        parking_type_2: string;
        parking_type_3: string;
        reservation: boolean;
        parking_price: string;
        _id: string;
    };
    cover_image: string;
    policies: {
        cancellation_duration: number;
        pay_time: string;
        preventAccidental_bookings: boolean;
        check_in_form: string;
        check_in_untill: string;
        check_out_form: string;
        check_out_untill: string;
        accommodate_children: boolean;
        pets: boolean;
        _id: string;
    };
    special_commission: number;
  }