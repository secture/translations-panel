import {SET_LOCALES, LocaleActionsTypes, LocaleState} from "./types";

export function setAllLocales(locales: LocaleState[]): LocaleActionsTypes {
    return {
        type: SET_LOCALES,
        payload: locales
    }
}
