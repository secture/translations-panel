// src/store/index.ts

import { authReducer } from './auth/reducers'
import { userReducer } from "./user/reducers";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer
});


const middleWares = [thunk];
const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middleWares)));

export default store
