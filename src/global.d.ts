// global.d.ts

declare const global: {
	NativeItBooksModule: {
		getBooks: (page: number) => any[];
	};
};
