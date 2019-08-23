import { Book } from '@interfaces/';
import { NativeModules } from 'react-native';

interface IScrapper {
	fetchQueueBooks(page: number): Promise<Book[]>;
	searchBooks(): Promise<Book[]>;
}

const scrapper: IScrapper = NativeModules.Scrapper;

export default { scrapper } as const;
