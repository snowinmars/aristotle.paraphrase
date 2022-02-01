import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {Book, Chapter, EditorParameters, ParagraphUpdate} from '../types/types';
import {config} from "../utils/config";

export const booksApi = createApi({
  reducerPath: 'books',
  baseQuery: fetchBaseQuery({ baseUrl: config.beUri }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => 'api/books',
    }),
    getBook: builder.query<Book, number>({
      query: (id) => `api/books/${id}`,
    }),
    getChapter: builder.query<Chapter, {bookId: number, chapterId: number}>({
      query: ({bookId, chapterId}) => `api/books/${bookId}/${chapterId}`,
    }),
    pushParagraph: builder.mutation<ParagraphUpdate, EditorParameters>({
      query: ({bookId, chapterId, paragraphId, header, text}) => {
        return {
          url: `api/books/${bookId}/${chapterId}/${paragraphId}`,
          method: 'POST',
          body: {
            header,
            text,
          }
        };
      },
    })
  }),
});

export const { useGetBookQuery, useGetBooksQuery, useGetChapterQuery, usePushParagraphMutation } = booksApi;
