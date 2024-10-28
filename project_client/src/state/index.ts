import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
   isSideBarCollapsed: boolean;
   isDarkMode: boolean;
}

const initialState: initialStateTypes = {
   isSideBarCollapsed: false,
   isDarkMode: true,
};

export const globalSLice = createSlice({
   name: "global",
   initialState,
   reducers: {
      setIsSideBarCollapsed: (state, action: PayloadAction<boolean>) => {
         state.isSideBarCollapsed = action.payload;
      },
      setIsSarkMode: (state, action: PayloadAction<boolean>) => {
         state.isDarkMode = action.payload;
      },
   },
});

export const { setIsSarkMode, setIsSideBarCollapsed } = globalSLice.actions;

export default globalSLice.reducer;
