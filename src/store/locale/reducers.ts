import {LocaleActionsTypes, LocaleState, SET_ALL_LOCALES} from "./types";

export const initialLocaleState: LocaleState[] = [{
    id: '',
    key: '',
    name: ''
}];

export function localeReducer(state = initialLocaleState, action: LocaleActionsTypes): LocaleState[] {
    switch (action.type) {
        case SET_ALL_LOCALES: {
            return action.payload;
        }
        default:
            return state
    }
}
