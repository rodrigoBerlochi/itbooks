import { Book } from '@interfaces/';
import { createAsyncAction } from 'typesafe-actions';

export const searchQueueBooks = createAsyncAction(
	'BOOKS_QUEUE_REQUEST',
	'BOOKS_QUEUE_SUCCESS',
	'BOOKS_QUEUE_ERROR',
	'BOOKS_QUEUE_CANCEL',
)<undefined, Book[], undefined, undefined>();
