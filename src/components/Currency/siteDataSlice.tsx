import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

type SiteDataType = {
    loading: boolean | null;
    currencyRates: any;
    error: any
}
export const getExchangeRates = createAsyncThunk('currency/check', async () => {
    const response = await fetch(
        'https://openexchangerates.org/api/latest.json?app_id=2e7189d466e040b9bd69705aa964bc29'
    );
    const data = await response.json();
    console.log("pp",data);
    return data;
});

const initialState: SiteDataType = {
    loading: null,
    currencyRates: null,
    error: null
}

const siteDataSlice = createSlice({
    name: 'siteData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExchangeRates.pending, (state) => {
                state.loading = true;
                state.currencyRates = null;
                state.error = null
            })
            .addCase(getExchangeRates.fulfilled, (state, action) => {
                console.log(action, state)
                state.loading = false;
                state.currencyRates = action.payload;
                state.error = null;
            })
            .addCase(getExchangeRates.rejected, (state, action) => {
                state.loading = false;
                state.currencyRates = null;
                state.error = action.error.message;
            });
    },
});

export default siteDataSlice.reducer;
