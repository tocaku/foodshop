import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMenuList: builder.query({
      query: () => ({
        url: "/menu/list",
      }),
      providesTags: ["menu"],
    }),
    getCategory: builder.query({
      query: () => "/menu/category",
    }),
    getCuisine: builder.query({
      query: () => "/menu/cuisine",
    }),
    getUserAccountsList: builder.query({
      query: () => ({
        url: "/user_accounts/list",
      }),
      providesTags: ["accounts"],
    }),
    getUserList: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["users"],
    }),
    getCartList: builder.query({
      query: () => ({
        url: "/cart",
      }),
      providesTags: ["cart"],
    }),
    getWishlistList: builder.query({
      query: () => ({
        url: "/wishlist",
      }),
      providesTags: ["wishlist"],
    }),
    getOrderList: builder.query({
      query: () => ({
        url: "/orders",
      }),
      providesTags: ["orders"],
    }),
    getReviewList: builder.query({
      query: () => ({
        url: "/menu/reviews",
      }),
      providesTags: ["reviews"],
    }),
    getMenu: builder.query({
      query: (options) => ({
        url: "/menu/list",
        params: {
          cuisine__name: options?.cuisine__name,
          category__name: options?.category__name,
          title: options?.title,
        },
      }),
      providesTags: ["menu"],
    }),
    getReviews: builder.query({
      query: (id) => ({
        url: `/menu/reviews/?menu_id=${id}`,
      }),
      providesTags: ["reviews"],
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `/orders/?customer_id=${id}`,
      }),
      providesTags: ["orders"],
    }),
    getCart: builder.query({
      query: (id) => ({
        url: `/cart/?customer_id=${id}`,
      }),
      providesTags: ["cart"],
    }),
    getWishlist: builder.query({
      query: (id) => ({
        url: `/wishlist/?customer_id=${id}`,
      }),
      providesTags: ["wishlist"],
    }),
    singleMenu: builder.query({
      query: (id) => ({
        url: `/menu/list/${id}`,
      }),
      providesTags: ["menu"],
    }),
    singleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: ["users"],
    }),
    singleUserAccount: builder.query({
      query: (id) => ({
        url: `/user_accounts/list/${id}`,
      }),
      providesTags: ["accounts"],
    }),
    updateAccount: builder.mutation({
      query: (options) => ({
        url: `/user_accounts/list/${options?.id}/`,
        method: "PATCH",
        body: options?.data,
      }),
      invalidatesTags: ["accounts"],
    }),
    updateOrder: builder.mutation({
      query: (options) => ({
        url: `/orders/${options?.id}/`,
        method: "PATCH",
        body: options?.data,
      }),
      invalidatesTags: ["orders"],
    }),
    updateCart: builder.mutation({
      query: (options) => ({
        url: `/cart/${options?.id}/`,
        method: "PATCH",
        body: options?.data,
      }),
      invalidatesTags: ["cart"],
    }),
    updateWishlist: builder.mutation({
      query: (options) => ({
        url: `/wishlist/${options?.id}/`,
        method: "PATCH",
        body: options?.data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    postOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    postReview: builder.mutation({
      query: (options) => ({
        url: `/menu/reviews/?menu_id=${options?.id}`,
        method: "POST",
        body: options?.data,
      }),
      invalidatesTags: ["reviews"],
    }),
    postCart: builder.mutation({
      query: (data) => ({
        url: `/cart/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    postWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist"],
    }),
    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `/menu/list/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["menu"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});
export const {
  useUpdateAccountMutation,
  useUpdateOrderMutation,
  useUpdateCartMutation,
  useUpdateWishlistMutation,
  usePostCartMutation,
  usePostWishlistMutation,
  usePostReviewMutation,
  usePostOrderMutation,
  useSingleMenuQuery,
  useSingleUserQuery,
  useSingleUserAccountQuery,
  useGetCartQuery,
  useGetWishlistQuery,
  useGetReviewsQuery,
  useGetOrderQuery,
  useGetMenuQuery,
  useGetUserListQuery,
  useGetOrderListQuery,
  useGetReviewListQuery,
  useGetUserAccountsListQuery,
  useGetCartListQuery,
  useGetWishlistListQuery,
  useGetMenuListQuery,
  useGetCategoryQuery,
  useGetCuisineQuery,
  useDeleteCartMutation,
  useDeleteWishlistMutation,
  useDeleteMenuMutation,
  useDeleteOrderMutation,
} = bookApi;
