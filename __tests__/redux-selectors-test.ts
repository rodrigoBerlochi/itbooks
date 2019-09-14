import * as selectors from '../src/redux/selectors';

describe('REDUX SELECTORS', () => {
	it('should return a boolean is fetching queue books', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: false,
				},
			},
		};

		expect(selectors.isFetching(initialState)).toBeFalsy();
	});

	it('should return a boolean is fetching queue books', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: true,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: false,
				},
			},
		};

		expect(selectors.isFetching(initialState)).toBeTruthy();
	});

	it('should return an array with queue books', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: false,
				},
			},
		};

		expect(selectors.books(initialState).length).toBe([].length);
	});

	it('should return true error with queue books', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: false,
				},
			},
		};

		expect(selectors.hasError(initialState)).toBeFalsy();
	});

	it('should return true error with queue books', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: true,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: false,
				},
			},
		};

		expect(selectors.hasError(initialState)).toBeTruthy();
	});

	it('should return a book by it position', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: false,
				},
			},
		};

		expect(
			Object.keys(selectors.getBookByPosition(initialState, 0)).length,
		).toBe(0);
	});

	it('should return fetched book', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: false,
				},
			},
		};

		expect(Object.keys(selectors.fetchedBook(initialState)).length).toBe(1);
	});

	it('should return false is fetching a book', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: false,
				},
			},
		};

		expect(selectors.isFetchingBook(initialState)).toBeFalsy();
	});

	it('should return true is fetching a book', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: true,
				},
			},
		};

		expect(selectors.isFetchingBook(initialState)).toBeTruthy();
	});

	it('should return false if not searching a books', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: true,
				},
			},
		};

		expect(selectors.isSearching(initialState)).toBeFalsy();
	});

	it('should return true if searching a books', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: true,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: true,
				},
			},
		};

		expect(selectors.isSearching(initialState)).toBeTruthy();
	});

	it('should return searched books', () => {
		const initialState = {
			books: {
				mainBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				searchBooks: {
					books: [],
					fetching: false,
					error: false,
					currentPage: 1,
				},
				fetchedBook: {
					fetching: true,
				},
			},
		};

		expect(selectors.searchedBooks(initialState).length).toBe([].length);
	});
});
