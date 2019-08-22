import { Book } from '@interfaces/';
import { createReducer, RootAction } from 'typesafe-actions';
import { searchQueueBooks } from '../actions/books.actions';

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
	.handleAction(searchQueueBooks.request, state => ({
		...state,
		fetching: true,
		error: false,
	}))
	.handleAction(searchQueueBooks.success, (state, { payload }) => ({
		...state,
		fetching: false,
		books: payload,
		error: false,
		currentPage: state.currentPage + 1,
	}))
	.handleAction(searchQueueBooks.failure, state => ({
		...state,
		fetching: false,
		error: true,
	}))
	.handleAction(searchQueueBooks.request, state => ({
		...state,
		fetching: false,
		error: false,
	}));
