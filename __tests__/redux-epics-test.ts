import { ActionsObservable } from 'redux-observable';
import actions from '../src/redux/actions/';

describe('REDUX EPIC ACTIONS', () => {
	describe('EPIC QUEUE BOOKS ACTIONS', () => {
		it('should fetch epic shipment success', async () => {
			const actions$ = ActionsObservable.of(
				actions.bookActions.fetchQueueBooks.success([]),
			);
			const actionReceived = await actions$.toPromise();
			expect(actionReceived.type).toBe(
				actions.bookActions.fetchQueueBooks.success([]).type,
			);
			expect(actionReceived.payload.length).toBe([].length);
		});

		it('should fetch epic queue books error', () => {
			const actions$ = ActionsObservable.of(
				actions.bookActions.fetchQueueBooks.request(),
			);

			actions$.toPromise().catch(actionReceived => {
				expect(actionReceived.type).toBe(
					actions.bookActions.fetchQueueBooks.cancel().type,
				);
			});
		});

		it('should cancel fetch epic queue books', async () => {
			const actions$ = ActionsObservable.of(
				actions.bookActions.fetchQueueBooks.request(),
				{
					type: 'BOOKS_QUEUE_CANCEL',
				},
			);

			const actionReceived = await actions$.toPromise();
			expect(actionReceived.type).toBe(
				actions.bookActions.fetchQueueBooks.cancel().type,
			);
		});
	});

	describe('EPIC FETCH BOOK ACTIONS', () => {
		it('should fetch a book successfully', async () => {
			const actions$ = ActionsObservable.of(
				actions.bookActions.fetchBook.success({}),
			);
			const actionReceived = await actions$.toPromise();
			expect(actionReceived.type).toBe(
				actions.bookActions.fetchBook.success({}).type,
			);
			expect(Object.keys(actionReceived.payload).length).toBe(0);
		});

		it('should fetch epic book error', () => {
			const actions$ = ActionsObservable.of(
				actions.bookActions.fetchQueueBooks.request(),
			);

			actions$.toPromise().catch(actionReceived => {
				expect(actionReceived.type).toBe(
					actions.bookActions.fetchQueueBooks.cancel().type,
				);
			});
		});

		it('should cancel fetch epic book', async () => {
			const actions$ = ActionsObservable.of(
				{
					type: 'BOOKS_FETCH_ONE_REQUEST',
					payload: '',
				},
				{
					type: 'BOOKS_FETCH_ONE_CANCEL',
				},
			);

			const actionReceived = await actions$.toPromise();
			expect(actionReceived.type).toBe(
				actions.bookActions.fetchBook.cancel().type,
			);
		});
	});

	describe('EPIC FETCH SEARCH BOOKS ACTIONS', () => {
		it('should fetch a search book successfully', async () => {
			const actions$ = ActionsObservable.of(
				actions.bookActions.searchBooks.success([]),
			);
			const actionReceived = await actions$.toPromise();
			expect(actionReceived.type).toBe(
				actions.bookActions.searchBooks.success([]).type,
			);
			expect(Object.keys(actionReceived.payload).length).toBe(0);
		});

		it('should fetch epic search books error', () => {
			const actions$ = ActionsObservable.of(
				actions.bookActions.searchBooks.request(''),
			);

			actions$.toPromise().catch(actionReceived => {
				expect(actionReceived.type).toBe(
					actions.bookActions.searchBooks.cancel().type,
				);
			});
		});

		it('should cancel fetch epic search books', async () => {
			const actions$ = ActionsObservable.of(
				{
					type: 'BOOKS_SEARCH_REQUEST',
					payload: '',
				},
				{
					type: 'BOOKS_SEARCH_CANCEL',
				},
			);

			const actionReceived = await actions$.toPromise();
			expect(actionReceived.type).toBe(
				actions.bookActions.searchBooks.cancel().type,
			);
		});
	});
});
