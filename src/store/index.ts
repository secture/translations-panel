// src/store/index.ts

import {authReducer} from 'store/auth/reducers'
import {userReducer} from "store/user/reducers";
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {usersReducer} from "store/users/reducers";
import {localesReducer} from "store/locales/reducers";
import {loadState} from 'store/localStorage';
import {translationsReducer} from "store/translations/reducers";
import {categoriesReducer} from "store/categories/reducers";
import {playersReducer} from "store/players/reducers";
import {statusReducer} from "./status/reducers";

const persistedState = loadState();
const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
    locales: localesReducer,
    translations: translationsReducer,
    categories: categoriesReducer,
    players: playersReducer,
    status: statusReducer,
    tags: () => { return ['android', 'ios', 'web']; },
    roles: () => { return ['Admin', 'Developer', 'Interpreter', 'User']; }
});

const middleWares = [thunk];
const store = createStore(rootReducers, persistedState, composeWithDevTools(applyMiddleware(...middleWares)));

export default store
