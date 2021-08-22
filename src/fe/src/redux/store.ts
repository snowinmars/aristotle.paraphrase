import { configureStore } from '@reduxjs/toolkit';
import {booksApi} from "../components/accessor";
import {setupListeners} from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(booksApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
