import { from, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { isActionOf, RootEpic } from 'typesafe-actions';
import { fetchQueueBooks } from '../actions/books.actions';

const searchBooksEpic$: RootEpic = (action$, store$, { scrapper }) =>
	action$.pipe(
		filter(isActionOf(fetchQueueBooks.request)),
		switchMap(_ =>
			// pass to fetchQueueBooks store$.value.books.currentPage
			from(scrapper.fetchQueueBooks(store$.value.books.currentPage)).pipe(
				map(data =>
					fetchQueueBooks.success(JSON.parse((data as unknown) as string)),
				),
				catchError(
					pipe(
						fetchQueueBooks.failure,
						of,
					),
				),
				takeUntil(action$.pipe(filter(isActionOf(fetchQueueBooks.cancel)))),
			),
		),
	);

export default { searchBooksEpic$ } as const;
