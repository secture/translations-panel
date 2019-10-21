// src/store/index.ts

import { authReducer } from './auth/reducers'
import { userReducer } from "./user/reducers";
import {combineReducers} from "redux";

const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default rootReducers
