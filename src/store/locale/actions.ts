import {SET_ALL_LOCALES, LocaleActionsTypes, LocaleState} from "./types";

export function setAllLocales(locales: LocaleState[]): LocaleActionsTypes {
    return {
        type: SET_ALL_LOCALES,
        payload: locales
    }
}
