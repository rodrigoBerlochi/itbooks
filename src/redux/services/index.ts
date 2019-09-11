import { Book } from '@interfaces/';
import { NativeModules } from 'react-native';

interface IScrapper {
	fetchQueueBooks(page: number): Promise<Book[]>;
	fetchBook(name: string): Promise<Book>;
	searchBooks(name: string, page: number): Promise<Book[]>;
}

const scrapper: IScrapper = NativeModules.Scrapper;

export default { scrapper } as const;
