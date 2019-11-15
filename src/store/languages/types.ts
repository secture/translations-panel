export const GET_ALL_LANGUAGES = 'GET ALL LANGUAGES';
export const SET_ALL_LANGUAGES = 'SET ALL LANGUAGES';

export interface LanguageState {
    id: string,
    key: string,
    name: string,
    icon: string,
    localeForPlayers: boolean
}

interface GetAllLanguagesAction {
    type: typeof GET_ALL_LANGUAGES
}

interface SetAllLanguagesAction {
    type: typeof SET_ALL_LANGUAGES,
    payload: Array<LanguageState>
}

export type LanguageActionsTypes = GetAllLanguagesAction | SetAllLanguagesAction
