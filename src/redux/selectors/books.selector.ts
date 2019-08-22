import { Book } from '@interfaces/';
import { RootState } from 'typesafe-actions';

export const isFetching = (state: RootState): boolean => state.books.fetching;

export const hasError = (state: RootState): boolean => state.books.error;

export const books = (state: RootState): Book[] => state.books.books;
