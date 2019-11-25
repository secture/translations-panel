// src/store/index.ts

import {authReducer} from 'store/auth/reducers'
import {userReducer} from "store/user/reducers";
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {usersReducer} from "store/users/reducers";
import {languagesReducer} from "store/languages/reducers";
import {loadState} from 'store/localStorage';
import {translationsReducer} from "store/translations/reducers";
import {categoriesReducer} from "store/categories/reducers";
import {playersReducer} from "store/players/reducers";
import {statusReducer} from "./status/reducers";
import {filterReducer} from "./filters/reducers";

export const roles = {
    admin: 'Admin',
    developer: 'Developer',
    interpreter: 'Interpreter',
    user: 'User'
};

export const tags = {
    android: 'android',
    ios: 'ios',
    web: 'web'
};

export const allowedRoles = [roles.admin];

const persistedState = loadState();
const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
    languages: languagesReducer,
    translations: translationsReducer,
    categories: categoriesReducer,
    players: playersReducer,
    status: statusReducer,
    filters: filterReducer,
    tags: () => { return [tags.android, tags.ios, tags.web]; },
    roles: () => { return [roles.admin, roles.developer, roles.interpreter, roles.user]; }
});

const middleWares = [thunk];
const store = createStore(rootReducers, persistedState, composeWithDevTools(applyMiddleware(...middleWares)));

export default store
