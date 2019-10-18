import { Book } from '@interfaces/';
import { createReducer, RootAction } from 'typesafe-actions';
import {
	fetchBook,
	fetchQueueBooks,
	searchBooks,
} from '../actions/books.actions';

export interface ICommonState {
	readonly books: Book[];
	readonly fetching: boolean;
	readonly error: boolean;
	readonly currentPage: number;
}

const commonInitialState = {
	books: [],
	fetching: false,
	error: false,
	currentPage: 1,
};

export interface IBooksInitialState {
	readonly mainBooks: ICommonState;
	readonly searchBooks: ICommonState;
	readonly fetchedBook: Book & { fetching: boolean; error?: boolean };
}

export const booksReducer = createReducer<IBooksInitialState, RootAction>({
	mainBooks: commonInitialState,
	searchBooks: commonInitialState,
	fetchedBook: { fetching: false },
})
	.handleAction(fetchQueueBooks.request, state => ({
		...state,
		fetching: true,
		error: false,
	}))
	.handleAction(fetchQueueBooks.success, (state, { payload }) => ({
		...state,
		mainBooks: {
			fetching: false,
			books: [...state.mainBooks.books, ...payload],
			error: false,
			currentPage: state.mainBooks.currentPage + 1,
		},
	}))
	.handleAction(fetchQueueBooks.failure, state => ({
		...state,
		mainBooks: {
			...state.mainBooks,
			fetching: false,
			error: true,
		},
	}))
	.handleAction(fetchQueueBooks.cancel, state => ({
		...state,
		mainBooks: {
			...state.mainBooks,
			fetching: false,
			error: false,
		},
	}))
	.handleAction(searchBooks.request, state => ({
		...state,
		searchBooks: {
			...state.searchBooks,
			fetching: true,
			error: false,
		},
	}))
	.handleAction(searchBooks.success, (state, { payload }) => ({
		...state,
		searchBooks: {
			fetching: false,
			books: [...state.searchBooks.books, ...payload],
			error: false,
			currentPage: state.searchBooks.currentPage + 1,
		},
	}))
	.handleAction(searchBooks.failure, state => ({
		...state,
		searchBooks: {
			...state.searchBooks,
			fetching: false,
			error: true,
		},
	}))
	.handleAction(searchBooks.cancel, state => ({
		...state,
		searchBooks: {
			...state.searchBooks,
			fetching: false,
			error: false,
		},
	}))
	.handleAction(fetchBook.request, state => ({
		...state,
		fetchedBook: {
			fetching: true,
			error: false,
		},
	}))
	.handleAction(fetchBook.success, (state, { payload }) => ({
		...state,
		fetchedBook: {
			fetching: false,
			...payload,
		},
	}))
	.handleAction(fetchBook.failure, state => ({
		...state,
		fetchedBook: {
			fetching: false,
			error: true,
		},
	}))
	.handleAction(fetchBook.cancel, state => ({
		...state,
		fetchedBook: {
			fetching: false,
			error: false,
		},
	}));
