// global.d.ts

declare const global: {
	NativeItBooksModule: {
		getBooks: (page: number, cb: (r: string) => void) => any[];
	};
};
