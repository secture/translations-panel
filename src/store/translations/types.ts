import {CategoryState} from "../categories/types";

export const GET_ALL_TRANSLATIONS = 'GET ALL TRANSLATIONS';
export const GET_DELETED_TRANSLATIONS = 'GET DELETED TRANSLATIONS';
export const SET_ALL_TRANSLATIONS = 'SET ALL TRANSLATIONS';
export const SET_DELETED_TRANSLATIONS = 'SET DELETED TRANSLATIONS';

export interface NamePlayers {
    [key: string]: string
}

export interface ConfirmedTranslations {
    [key: string]: boolean
}

export interface TranslationHistoryState {
    id: string,
    deleted: boolean,
    history: TranslationState[],
}

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
    translations: {
        [key: string]: string
    },
    tags: string[],
    context: string,
    category: CategoryState
    insertionDate: Date,
    updateDate: Date,
    insertionUser: {},
    updateUser: UpdateUserState,
    confirmedTranslations: ConfirmedTranslations
}

interface GetAllTranslationsAction {
    type: typeof GET_ALL_TRANSLATIONS
}

interface GetDeletedTranslationsAction {
    type: typeof GET_DELETED_TRANSLATIONS
}

interface SetAllTranslationsAction {
    type: typeof SET_ALL_TRANSLATIONS,
    payload: TranslationState[]
}

interface SetDeletedTranslationsAction {
    type: typeof SET_DELETED_TRANSLATIONS,
    payload: TranslationState[]
}

export type TranslationsActionsTypes =
    GetAllTranslationsAction |
    SetAllTranslationsAction |
    GetDeletedTranslationsAction |
    SetDeletedTranslationsAction;
