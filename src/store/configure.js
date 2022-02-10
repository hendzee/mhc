import { createStore, combineReducers } from 'redux';
import { itemReducer, bookmarkReducer } from './reducers';

const rootReducer = combineReducers({
    item: itemReducer,
    bookmark: bookmarkReducer
});

const configure = () => {
    return createStore(rootReducer);
}

export default configure;