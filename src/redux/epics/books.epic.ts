import { bindCallback, from, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { isActionOf, RootEpic } from 'typesafe-actions';
import {
	fetchBook,
	fetchQueueBooks,
	searchBooks,
} from '../actions/books.actions';

const getBooksCb = bindCallback(global.NativeItBooksModule.getBooks);
// TODO make getBooks async
const fetchBooksEpic$: RootEpic = (action$, store$, _) =>
	action$.pipe(
		filter(isActionOf(fetchQueueBooks.request)),
		switchMap(_ =>
			from(getBooksCb(store$.value.books.mainBooks.currentPage)).pipe(
				map(data =>
					fetchQueueBooks.success(JSON.parse((data as unknown) as string)),
				),
				catchError(pipe(fetchQueueBooks.failure, of)),
				takeUntil(action$.pipe(filter(isActionOf(fetchQueueBooks.cancel)))),
			),
		),
	);

const searchBooksEpic$: RootEpic = (action$, store$, { scrapper }) =>
	action$.pipe(
		filter(isActionOf(searchBooks.request)),
		switchMap(({ payload }) =>
			from(
				scrapper.searchBooks(
					payload,
					store$.value.books.searchBooks.currentPage,
				),
			).pipe(
				map(data =>
					searchBooks.success(JSON.parse((data as unknown) as string)),
				),
				catchError(pipe(searchBooks.failure, of)),
				takeUntil(action$.pipe(filter(isActionOf(searchBooks.cancel)))),
			),
		),
	);

const fetchBookEpic$: RootEpic = (action$, _, { scrapper }) =>
	action$.pipe(
		filter(isActionOf(fetchBook.request)),
		switchMap(({ payload }) =>
			from(scrapper.fetchBook(payload)).pipe(
				map(data => fetchBook.success(JSON.parse((data as unknown) as string))),
				catchError(pipe(fetchBook.failure, of)),
				takeUntil(action$.pipe(filter(isActionOf(fetchBook.cancel)))),
			),
		),
	);

export default { fetchBooksEpic$, searchBooksEpic$, fetchBookEpic$ } as const;
