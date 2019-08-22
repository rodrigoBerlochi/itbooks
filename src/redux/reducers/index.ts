import { combineReducers } from 'redux';
import { booksReducer as books } from './books.reducer';

export const rootReducer = combineReducers({
	books,
});
