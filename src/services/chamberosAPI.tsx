import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IProfession, IAuthenticateUser } from "../../types";

// const BASE_API_URL = "http://localhost:8080"; // TODO: Move the variable to the env file
const BASE_API_URL = "https://chamberos-api.herokuapp.com";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  credentials: "include",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
  prepareHeaders: async (headers) => {
    return headers;
  },
});

export const apiChamberos = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Users", "Professions"],
  endpoints: (builder) => ({
    getUser: builder.query<
      IUser,
      {
        userId: string;
      }
    >({
      query: ({ userId }) => ({
        url: "/user/get",
        method: "get",
        credentials: "include",
        providesTags: ["Users"],
        params: {
          userId
        },
      }),
    }),
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
        credentials: "include",
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
        url: `/auth/register`,
        method: "post",
        body: JSON.stringify(user),
      }),
    }),
    signIn: builder.mutation<
      IAuthenticateUser,
      Pick<IUser, "username" | "password">
    >({
      query: (user) => ({
        url: `/auth/authenticate`,
        method: "post",
        body: JSON.stringify(user),
        credentials: "include",
      }),
    }),
  }),
});

export const {
  endpoints,
  useGetUsersQuery,
  useGetUserQuery,
  useLazyGetUsersQuery,
  useLazyGetProfessionsQuery,
  useGetProfessionsQuery,
  useCreateUserMutation,
  useSignInMutation
} = apiChamberos;
