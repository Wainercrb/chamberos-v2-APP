import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IProfession } from "../../types";

// const BASE_API_URL = "http://localhost:8080"; // TODO: Move the variable to the env file
const BASE_API_URL = "https://chamberos-api.herokuapp.com";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: async (headers) => {
    return headers;
  },
});

export const apiChamberos = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Users", "Professions"],
  endpoints: (builder) => ({
    getUsers: builder.query<
      IUser[],
      {
        latitude: number;
        longitude: number;
        radius: number;
        professions: string;
      }
    >({
      query: ({ latitude, longitude, professions, radius }) => ({
        url: "/user/get-location-near",
        method: "get",
        providesTags: ["Users"],
        params: {
          latitude,
          longitude,
          radiusInKilometers: radius,
          professionIds: professions,
        },
      }),
    }),
    getProfessions: builder.query<IProfession[], { professionName?: string }>({
      query: ({ professionName = "" }) => ({
        url: `/profession/get-all`,
        method: "get",
        providesTags: ["Professions"],
        params: {
          name: professionName,
        },
      }),
    }),
    createUser: builder.mutation<IUser[], IUser>({
      query: (user) => ({
        url: `/user/register`,
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        params: {},
      }),
    }),
  }),
});

export const {
  endpoints,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useLazyGetProfessionsQuery,
  useGetProfessionsQuery,
  useCreateUserMutation,
} = apiChamberos;
