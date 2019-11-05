// src/store/index.ts

import {authReducer} from './auth/reducers'
import {userReducer} from "./user/reducers";
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {usersReducer} from "./users/reducers";
import {localesReducer} from "./locales/reducers";
import {loadState} from './localStorage';
import {translationsReducer} from "./translations/reducers";

const persistedState = loadState();
const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
    locales: localesReducer,
    translations: translationsReducer,
    tags: () => { return ['android', 'ios', 'web']; }
});

const middleWares = [thunk];
const store = createStore(rootReducers, persistedState, composeWithDevTools(applyMiddleware(...middleWares)));

export default store
