import {SET_ALL_TRANSLATIONS, TranslationsActionsTypes, TranslationState} from "./types";

export function setAllTranslations(translations: TranslationState[]): TranslationsActionsTypes {
    return {
        type: SET_ALL_TRANSLATIONS,
        payload: translations
    }
}
