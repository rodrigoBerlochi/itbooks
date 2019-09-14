import { fetchBook, fetchQueueBooks, searchBooks } from '../src/redux/actions';

describe('REDUX ACTIONS', () => {
	describe('BOOKS QUEUE ACTIONS', () => {
		it('should create request queue action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_QUEUE_REQUEST',
			};
			expect(fetchQueueBooks.request()).toEqual(expectedAction);
		});

		it('should create success queue action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_QUEUE_SUCCESS',
				payload: [],
			};
			expect(fetchQueueBooks.success([])).toEqual(expectedAction);
		});

		it('should create error queue action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_QUEUE_ERROR',
			};
			expect(fetchQueueBooks.failure()).toEqual(expectedAction);
		});

		it('should create cancel queue action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_QUEUE_CANCEL',
			};
			expect(fetchQueueBooks.cancel()).toEqual(expectedAction);
		});
	});

	describe('FETCH BOOK ACTIONS', () => {
		it('should create request fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_FETCH_ONE_REQUEST',
				payload: 'TYPESCRIPT GOLANG',
			};
			expect(fetchBook.request('TYPESCRIPT GOLANG')).toEqual(expectedAction);
		});

		it('should create success fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_FETCH_ONE_SUCCESS',
				payload: {},
			};
			expect(fetchBook.success({})).toEqual(expectedAction);
		});

		it('should create error fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_FETCH_ONE_ERROR',
			};
			expect(fetchBook.failure()).toEqual(expectedAction);
		});

		it('should create cancel fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_FETCH_ONE_CANCEL',
			};
			expect(fetchBook.cancel()).toEqual(expectedAction);
		});
	});

	describe('SEARCH BOOK ACTIONS', () => {
		it('should create search fetch action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_SEARCH_REQUEST',
				payload: 'TYPESCRIPT GOLANG',
			};
			expect(searchBooks.request('TYPESCRIPT GOLANG')).toEqual(expectedAction);
		});

		it('should create success search action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_SEARCH_SUCCESS',
				payload: [],
			};
			expect(searchBooks.success([])).toEqual(expectedAction);
		});

		it('should create error search action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_SEARCH_ERROR',
			};
			expect(searchBooks.failure()).toEqual(expectedAction);
		});

		it('should create cancel search action successfully', () => {
			const expectedAction = {
				type: 'BOOKS_SEARCH_CANCEL',
			};
			expect(searchBooks.cancel()).toEqual(expectedAction);
		});
	});
});
