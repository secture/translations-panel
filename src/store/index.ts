// src/store/index.ts

import { systemReducer } from './system/reducers'
//import { chatReducer } from './chat/reducers'
import { userReducer } from "./user/reducers";
import {combineReducers} from "redux";

const rootReducers = combineReducers({
    system: systemReducer,
    user: userReducer
});

export default rootReducers
