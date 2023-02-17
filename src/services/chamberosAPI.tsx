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
        params: {
          latitude,
          longitude,
          radiusInKilometers: radius,
          professionIds: professions,
        },
      }),
    }),
    getProfessions: builder.query<IProfession[], { name: string }>({
      query: ({ name }) => ({
        url: `/profession/get-all`,
        method: "get",
        params: {
          name,
        },
      }),
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName;
      },
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
      transformResponse: (response: any) => {
        return response as IUser[];
      },
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
