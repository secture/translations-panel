import {LocaleActionsTypes, LocaleState, SET_ALL_LOCALES} from "./types";

export const initialLocale: LocaleState = {
    id: '',
    key: '',
    name: '',
    localeForPlayers: false
};
export const initialLocaleState: LocaleState[] = [];

export function localesReducer(state = initialLocaleState, action: LocaleActionsTypes): LocaleState[] {
    switch (action.type) {
        case SET_ALL_LOCALES: {
            return action.payload;
        }
        default:
            return state
    }
}
