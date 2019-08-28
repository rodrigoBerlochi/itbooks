import { Book } from '@interfaces/';
import { NativeModules } from 'react-native';

interface IScrapper {
	fetchQueueBooks(page: number): Promise<Book[]>;
	searchBooks(name: string, page: number): Promise<Book[]>;
	searchBook(name: string): Promise<Book>;
}

const scrapper: IScrapper = NativeModules.Scrapper;

export default { scrapper } as const;
