import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  currency: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CurrencyState = { 
  currency: "",
  status: "idle",
  error: null,
};

export const currencySlice = createSlice({
  name: "currencychange",
  initialState,
  reducers: {
    addCurrency: (state, action) => {
    state.currency = action.payload;
    sessionStorage.setItem("currency", action.payload);
    }, 
    }
});

export const {
    addCurrency,   

} = currencySlice.actions;

export default currencySlice.reducer;