import { Book } from '@interfaces/';
import { createReducer, RootAction } from 'typesafe-actions';
import { fetchQueueBooks, searchBooks } from '../actions/books.actions';

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
}

export const booksReducer = createReducer<IBooksInitialState, RootAction>({
	mainBooks: commonInitialState,
	searchBooks: commonInitialState,
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
	.handleAction(fetchQueueBooks.request, state => ({
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
	.handleAction(searchBooks.request, state => ({
		...state,
		searchBooks: {
			...state.searchBooks,
			fetching: false,
			error: false,
		},
	}));
