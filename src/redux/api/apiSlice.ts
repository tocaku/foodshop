import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://food-backend-ohlq.onrender.com/",
    // baseUrl: "http://localhost:7000/api/v1",
  }),
  tagTypes: [
    "reviews",
    "menu",
    "orders",
    "users",
    "accounts",
    "cart",
    "wishlist",
  ],
  endpoints: () => ({}),
});
