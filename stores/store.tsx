import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../src/components/Hotel/bookingSlice" 
import currencyReducer from "../src/components/Currency/currencySlice"
import siteDataReducer from "../src/components/Currency/siteDataSlice"

export const store = configureStore({
  reducer: {
    booking : bookingReducer,
    currencychange : currencyReducer,
    siteData : siteDataReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
