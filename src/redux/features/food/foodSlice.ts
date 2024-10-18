import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 0,
  currentCost: 0,
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setCurrentPageForNext: (state, action: PayloadAction<number>) => {
      state.currentPage += 1;
      state.currentCost += action.payload;
    },
    setCurrentPageForPrevious: (state, action: PayloadAction<number>) => {
      state.currentPage -= 1;
      state.currentCost -= action.payload;
    },
    // setCategory: (state, action: PayloadAction<string>) => {
    //   state.category__name = action.payload;
    // },
    // setCuisine: (state, action: PayloadAction<string>) => {
    //   state.cuisine__name = action.payload;
    // },
    // setTitle: (state, action: PayloadAction<string>) => {
    //   state.title = action.payload;
    // },
  },
});

export const { setCurrentPageForNext, setCurrentPageForPrevious } =
  foodSlice.actions;

export default foodSlice.reducer;
