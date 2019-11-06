import {LocaleActionsTypes, LocaleState, SET_ALL_LOCALES} from "./types";

export const initialLocale: LocaleState = {
    id: '',
    key: '',
    name: '',
    icon: '',
    localeForPlayers: false
};
export const initialLocaleState: LocaleState[] = [];

export function localeReducer(state = initialLocaleState, action: LocaleActionsTypes): LocaleState[] {
    switch (action.type) {
        case SET_ALL_LOCALES: {
            return action.payload;
        }
        default:
            return state
    }
}
