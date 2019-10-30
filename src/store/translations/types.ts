export const GET_ALL_TRANSLATIONS = 'GET ALL TRANSLATIONS';
export const SET_ALL_TRANSLATIONS = 'SET ALL TRANSLATIONS';

export interface UpdateUserState {
    associatedLanguages: [],
    name: string,
    privilege: string,
    email: string,
    id: string
}

export interface TranslationState {
    id: string,
    key: string,
    translations: any,
    tags: [],
    context: string,
    category: string,
    insertionDate: Date,
    updateDate: Date,
    insertionUser: string,
    updateUser: UpdateUserState,
    confirmed: boolean
}

interface GetAllTranslationsAction {
    type: typeof GET_ALL_TRANSLATIONS
}

interface SetAllTranslationsAction {
    type: typeof SET_ALL_TRANSLATIONS,
    payload: TranslationState[]
}

export type TranslationsActionsTypes = GetAllTranslationsAction | SetAllTranslationsAction
