import { Book } from '@interfaces/';
import { NativeModules } from 'react-native';

interface IScrapper {
	fetchQueueBooks(): Promise<Book[]>;
	searchBooks(): Promise<Book[]>;
}

const scrapper: IScrapper = NativeModules.Scrapper;

export default { scrapper } as const;
