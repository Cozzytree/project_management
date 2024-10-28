"use client";

import { useRef } from "react";
import {
   Provider,
   TypedUseSelectorHook,
   useDispatch,
   useSelector,
} from "react-redux";
import globalReducer from "@/state";
import { api } from "@/state/api";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
   global: globalReducer,
   [api.reducerPath]: api.reducer,
});

export const makeStore = () => {
   return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(api.middleware),
   });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function StoreProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const storeRef = useRef<AppStore>();
   if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore();
   }

   return <Provider store={storeRef.current}>{children}</Provider>;
}
