// src/store/index.ts

import { systemReducer } from './system/reducers'
import { chatReducer } from './chat/reducers'
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    system: systemReducer,
    chat: chatReducer
});

export type AppState = ReturnType<typeof rootReducer>
