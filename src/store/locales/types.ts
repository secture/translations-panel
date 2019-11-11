export const GET_LOCALES = 'GET ALL LOCALES';
export const SET_LOCALES = 'SET ALL LOCALES';

export interface LocaleState {
    id: string,
    key: string,
    name: string,
    icon: string,
    localeForPlayers: boolean
}

interface GetAllLocalesAction {
    type: typeof GET_LOCALES
}

interface SetAllLocalesAction {
    type: typeof SET_LOCALES,
    payload: Array<LocaleState>
}

export type LocaleActionsTypes = GetAllLocalesAction | SetAllLocalesAction
