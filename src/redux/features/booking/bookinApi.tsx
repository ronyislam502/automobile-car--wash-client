import { TBooking } from "../../../types/booking.types";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();
        console.log(params);

        return {
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["booking"],
      transformResponse: (response: TResponseRedux<TBooking[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getMyBookings: builder.query({
      query: (bookingInfo) => ({
        url: "/my-bookings",
        method: "GET",
        body: bookingInfo,
      }),
      providesTags: ["booking"],
    }),
    createBookings: builder.mutation({
      query: (bookingInfo) => ({
        url: "/bookings",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useCreateBookingsMutation,
} = bookingApi;
