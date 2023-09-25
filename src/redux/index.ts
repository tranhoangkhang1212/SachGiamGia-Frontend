import dataFilterReducer from './data-filter/dataFilterSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    dataFilter: dataFilterReducer,
});

export default rootReducer;
