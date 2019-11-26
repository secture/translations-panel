import {
    SET_ALL_TRANSLATIONS,
    SET_TRANSLATIONS_STATS,
    TranslationsActionsTypes,
    TranslationState,
    TranslationStatsState
} from "./types";

export function setAllTranslations(translations: TranslationState[]): TranslationsActionsTypes {
    return {
        type: SET_ALL_TRANSLATIONS,
        payload: translations
    }
}
export function setTranslationsStats(translations: TranslationStatsState[]): TranslationsActionsTypes {
    return {
        type: SET_TRANSLATIONS_STATS,
        payload: translations
    }
}
export function setDeleteTranslations(translations: TranslationState[]): TranslationsActionsTypes {
    return {
        type: SET_ALL_TRANSLATIONS,
        payload: translations
    }
}
