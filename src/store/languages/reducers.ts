import {LanguageActionsTypes, LanguageState, SET_ALL_LANGUAGES} from "./types";

export const initialLanguage: LanguageState = {
    id: '',
    key: 'es',
    name: '',
    icon: '',
    localeForPlayers: false
};
export const initialLanguageState: LanguageState[] = [];

export function languagesReducer(state = initialLanguageState, action: LanguageActionsTypes): LanguageState[] {
    switch (action.type) {
        case SET_ALL_LANGUAGES: {
            return action.payload;
        }
        default:
            return state
    }
}
