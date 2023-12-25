import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({

    reducerPath: 'articleApi',

    baseQuery: fetchBaseQuery({

        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',

        prepareHeaders: (headers) => {
            // headers.set('X-RapidAPI-Key' , "[ENTER_YOUR_API_KEY_HERE]");
            headers.set('X-RapidAPI-Key' , 'db308020e6msh666a1a41252b0dap1ad9bfjsn8eee83b36ab6');
            headers.set('X-RapidAPI-Host' , 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),

    endpoints: (builder) => ({

        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })

    })

});

export const { useLazyGetSummaryQuery } = articleApi; 