import actions from '../src/redux/actions';

describe('REDUX ACTIONS', () => {
	describe('BOOKS QUEUE ACTIONS', () => {
		it('should create request queue action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_QUEUE_REQUEST',
			};
			expect(actions.bookActions.fetchQueueBooks.request()).toEqual(
				expectedAction,
			);
		});

		it('should create success queue action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_QUEUE_SUCCESS',
				payload: [],
			};
			expect(actions.bookActions.fetchQueueBooks.success([])).toEqual(
				expectedAction,
			);
		});

		it('should create error queue action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_QUEUE_ERROR',
			};
			expect(actions.bookActions.fetchQueueBooks.failure()).toEqual(
				expectedAction,
			);
		});

		it('should create cancel queue action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_QUEUE_CANCEL',
			};
			expect(actions.bookActions.fetchQueueBooks.cancel()).toEqual(
				expectedAction,
			);
		});
	});

	describe('FETCH BOOK ACTIONS', () => {
		it('should create request fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_FETCH_ONE_REQUEST',
				payload: 'TYPESCRIPT GOLANG',
			};
			expect(
				actions.bookActions.fetchBook.request('TYPESCRIPT GOLANG'),
			).toEqual(expectedAction);
		});

		it('should create success fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_FETCH_ONE_SUCCESS',
				payload: {},
			};
			expect(actions.bookActions.fetchBook.success({})).toEqual(expectedAction);
		});

		it('should create error fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_FETCH_ONE_ERROR',
			};
			expect(actions.bookActions.fetchBook.failure()).toEqual(expectedAction);
		});

		it('should create cancel fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_FETCH_ONE_CANCEL',
			};
			expect(actions.bookActions.fetchBook.cancel()).toEqual(expectedAction);
		});
	});

	describe('SEARCH BOOK ACTIONS', () => {
		it('should create search fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_SEARCH_REQUEST',
				payload: 'TYPESCRIPT GOLANG',
			};
			expect(
				actions.bookActions.searchBooks.request('TYPESCRIPT GOLANG'),
			).toEqual(expectedAction);
		});

		it('should create success search action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_SEARCH_SUCCESS',
				payload: [],
			};
			expect(actions.bookActions.searchBooks.success([])).toEqual(
				expectedAction,
			);
		});

		it('should create error search action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_SEARCH_ERROR',
			};
			expect(actions.bookActions.searchBooks.failure()).toEqual(expectedAction);
		});

		it('should create cancel search action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_SEARCH_CANCEL',
			};
			expect(actions.bookActions.searchBooks.cancel()).toEqual(expectedAction);
		});
	});
});
