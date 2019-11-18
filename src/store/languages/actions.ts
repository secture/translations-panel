import {SET_ALL_LANGUAGES, LanguageActionsTypes, LanguageState} from "./types";

export function setAllLanguages(languages: LanguageState[]): LanguageActionsTypes {
    return {
        type: SET_ALL_LANGUAGES,
        payload: languages
    }
}
