import userReducer from './userReducer';
import clientReducer from './clientReducer';
import memoReducer from './memoReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

const reducer = combineReducers({
    userReducer: userReducer,
    clientReducer: clientReducer,
    memoReducer: memoReducer
})

export default createStore(reducer, applyMiddleware(promiseMiddleware()));