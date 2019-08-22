import { from, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { isActionOf, RootEpic } from 'typesafe-actions';
import { searchQueueBooks } from '../actions/books.actions';

const searchBooksEpic$: RootEpic = (action$, store$, { scrapper }) =>
	action$.pipe(
		filter(isActionOf(searchQueueBooks.request)),
		switchMap(_ =>
			// pass to fetchQueueBooks store$.value.books.currentPage
			from(scrapper.fetchQueueBooks()).pipe(
				map(data =>
					searchQueueBooks.success(JSON.parse((data as unknown) as string)),
				),
				catchError(
					pipe(
						searchQueueBooks.failure,
						of,
					),
				),
				takeUntil(action$.pipe(filter(isActionOf(searchQueueBooks.cancel)))),
			),
		),
	);

export default { searchBooksEpic$ } as const;
