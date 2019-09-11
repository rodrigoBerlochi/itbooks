export interface Book {
	readonly author?: string;
	readonly title?: string;
	readonly image?: string;
	readonly description?: string;
	readonly bookInfoLink?: string;
	readonly pdfLink?: string;
	readonly size?: string;
	readonly pages?: number;
	readonly year?: number;
	readonly isbn?: string;
	readonly category?: string;
	readonly formats?: string;
	readonly lang?: string;
}
