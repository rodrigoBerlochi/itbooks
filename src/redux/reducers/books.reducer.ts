import { Book } from '@interfaces/';
import { createReducer, RootAction } from 'typesafe-actions';
import { fetchQueueBooks } from '../actions/books.actions';

export interface IBooksInitialState {
	readonly books: Book[];
	readonly fetching: boolean;
	readonly error: boolean;
	readonly currentPage: number;
	readonly searchQuery: string;
}

export const booksReducer = createReducer<IBooksInitialState, RootAction>({
	books: [],
	fetching: false,
	error: false,
	currentPage: 1, // (N * 2) - 1
	searchQuery: '',
})
	.handleAction(fetchQueueBooks.request, state => ({
		...state,
		fetching: true,
		error: false,
	}))
	.handleAction(fetchQueueBooks.success, (state, { payload }) => ({
		...state,
		fetching: false,
		books: [...state.books, ...payload],
		error: false,
		currentPage: state.currentPage + 1,
	}))
	.handleAction(fetchQueueBooks.failure, state => ({
		...state,
		fetching: false,
		error: true,
	}))
	.handleAction(fetchQueueBooks.request, state => ({
		...state,
		fetching: false,
		error: false,
	}));
