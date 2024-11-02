import { TService } from "../../../types";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();
        console.log(params);

        return {
          url: "/services",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["service"],
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/services/service/${id}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    createService: builder.mutation({
      query: (serviceInfo) => ({
        url: "/services/create-service",
        method: "POST",
        body: serviceInfo,
      }),
      invalidatesTags: ["service"],
    }),
    updateService: builder.mutation({
      query: ({ serviceData, id }) => ({
        url: `/services/update/${id}`,
        method: "PUT",
        body: serviceData,
      }),
      invalidatesTags: ["service"],
    }),
    deleteService: builder.mutation({
      query: (id: string) => {
        return {
          url: `/services/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetSingleServiceQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useGetAllServicesQuery,
} = serviceApi;
