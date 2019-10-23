// src/store/index.ts

import {authReducer} from './auth/reducers'
import {userReducer} from "./user/reducers";
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer
});

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const middleWares = [thunk];

export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleWares)));
    let persistor = persistStore(store);
    return {store, persistor}
}
