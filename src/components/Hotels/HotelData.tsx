export interface HotelData{
      _id: string;
      user: string;
      property_name: string;
      star_rating: number;
      contact_name: string;
      contact_phone_number: string;
      contact_phone_number_alternative: string;
      is_own_multiple_hotels: boolean;
      use_channel_manager: boolean;
      property_address: {
        street_address: string;
        country: string;
        postal_code: number;
        _id: string;
      };
      about: string;
      rooms: string[];
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
      __v: string;
      breakfast: boolean;
      extra_beds: boolean;
      extra_beds_options: string;
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
      }
}