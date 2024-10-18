import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
// import cartReducer from "./features/cart/cartSlice";
import foodReducer from "./features/food/foodSlice";
// import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    // cart: cartReducer,
    // user: userReducer,
    food: foodReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
