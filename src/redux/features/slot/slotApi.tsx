import { TSlotWithService } from "../../../types";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();
        console.log(params);

        return {
          url: "/slots",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["slot"],
      transformResponse: (response: TResponseRedux<TSlotWithService[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createSlot: builder.mutation({
      query: (slotInfo) => ({
        url: "/services/slots",
        method: "POST",
        body: slotInfo,
      }),
      invalidatesTags: ["slot"],
    }),
    updateSlot: builder.mutation({
      query: (args) => ({
        url: `/slots/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["slot"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetAllSlotsQuery,
  useUpdateSlotMutation,
} = slotApi;
