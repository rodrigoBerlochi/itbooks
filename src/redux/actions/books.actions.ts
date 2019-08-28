import { Book } from '@interfaces/';
import { createAsyncAction } from 'typesafe-actions';

export const fetchQueueBooks = createAsyncAction(
	'BOOKS_QUEUE_REQUEST',
	'BOOKS_QUEUE_SUCCESS',
	'BOOKS_QUEUE_ERROR',
	'BOOKS_QUEUE_CANCEL',
)<undefined, Book[], undefined, undefined>();

export const searchBooks = createAsyncAction(
	'BOOKS_SEARCH_REQUEST',
	'BOOKS_SEARCH_SUCCESS',
	'BOOKS_SEARCH_ERROR',
	'BOOKS_SEARCH_CANCEL',
)<string, Book[], undefined,undefined>();