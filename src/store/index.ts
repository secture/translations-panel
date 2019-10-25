// src/store/index.ts

import { authReducer } from './auth/reducers'
import { userReducer } from "./user/reducers";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {usersReducer} from "./users/reducers";
import {localeReducer} from "./locale/reducers";

const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
    locale: localeReducer
});


const middleWares = [thunk];
const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middleWares)));

export default store
