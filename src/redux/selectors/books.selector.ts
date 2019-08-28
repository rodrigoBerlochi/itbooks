import { Book } from '@interfaces/';
import { RootState } from 'typesafe-actions';

export const isFetching = (state: RootState): boolean =>
	state.books.mainBooks.fetching;

export const hasError = (state: RootState): boolean =>
	state.books.mainBooks.error;

export const books = (state: RootState): Book[] => state.books.mainBooks.books;

export const isSearching = (state: RootState): boolean =>
	state.books.searchBooks.fetching;

export const searchedBooks = (state: RootState): Book[] =>
	state.books.searchBooks.books;
