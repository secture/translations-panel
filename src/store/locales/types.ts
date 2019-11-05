export const GET_ALL_LOCALES = 'GET ALL LOCALES';
export const SET_ALL_LOCALES = 'SET ALL LOCALES';

export interface LocaleState {
    id: string,
    key: string,
    name: string,
    localeForPlayers: boolean
}

interface GetAllLocalesAction {
    type: typeof GET_ALL_LOCALES
}

interface SetAllLocalesAction {
    type: typeof SET_ALL_LOCALES,
    payload: Array<LocaleState>
}

export type LocaleActionsTypes = GetAllLocalesAction | SetAllLocalesAction
