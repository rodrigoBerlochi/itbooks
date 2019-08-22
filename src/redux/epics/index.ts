import { combineEpics } from 'redux-observable';
import booksEpics from './books.epic';

export default combineEpics(...(Object as any).values(booksEpics));
