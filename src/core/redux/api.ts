import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GithubEvent } from '_app/types/types';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  reducerPath: 'api',
  endpoints: (builder) => ({
    getPublicEvents: builder.query<GithubEvent[], number | undefined>({
      query: (count = 25) => '/events?per_page=' + count,
    }),
  }),
});

export const { useGetPublicEventsQuery } = api;
