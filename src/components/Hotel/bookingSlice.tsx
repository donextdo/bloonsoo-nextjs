import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import baseUrl from "../../../Utils/baseUrl";

interface Payload {
    id: string;
    nights: number;
    rooms: number;
    adults: number;
    children: number;
    checkInDate: string;
    checkOutDate: string;
    roomName: string;
    roomType: string;
    totalPrice: number;
  }

  interface BookingInfoFirst {
    arrivalTime: string;
    email: string;
    fullGuestName: string;
    isTravellingForWorkVal: boolean;
  }

interface BookingState {
  items: Payload[];
  totalCount: number;
  totalAmount: number;
  hotelId: string | null;
  BookingInfoFirstPage : BookingInfoFirst;
  BookingInfoSecondPage : object;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BookingState = {
  items: [],
  totalCount: 0,
  totalAmount: 0,
  hotelId: null,
  BookingInfoFirstPage: {
    arrivalTime: "",
    email: "",
    fullGuestName: "",
    isTravellingForWorkVal: false,
  },
  BookingInfoSecondPage:{},
  status: "idle",
  error: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Payload>) => {
      console.log(action.payload)
        state.items.push({ ...action.payload });
        state.totalAmount += action.payload.totalPrice;
    }, 
    removeAll: (state) => {
        state.items = [];
        state.totalCount = 0;
        state.totalAmount = 0;
      },
      removeItem: (state, action: PayloadAction<string>) => {
       
        const removedItemId = action.payload;
        const removedItem = state.items.find((item) => item.id === removedItemId);
        
        if (removedItem) {
          state.items = state.items.filter((item) => item.id !== removedItemId);
          state.totalAmount -= removedItem.totalPrice;
        }


      },
      setHotelId: (state, action: PayloadAction<string>) => {
        state.hotelId = action.payload;
      },

      saveFirstPage: (state, action: PayloadAction<BookingInfoFirst>) => {
        state.BookingInfoFirstPage = { ...action.payload };
        console.log(state.BookingInfoFirstPage)
      },
      saveSecondPage: (state, action: PayloadAction<object>) => {
        state.BookingInfoSecondPage = { ...action.payload };
        console.log(state.BookingInfoFirstPage)
      },
    }
});

export const {
    addBooking,
    removeAll,
    removeItem,
    setHotelId,
    saveFirstPage,
    saveSecondPage

} = bookingSlice.actions;

export default bookingSlice.reducer;