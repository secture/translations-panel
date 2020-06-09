import {CategoryState} from "../categories/types";
import {LanguageState} from "../languages/types";

export const GET_ALL_TRANSLATIONS = 'GET ALL TRANSLATIONS';
export const GET_DELETED_TRANSLATIONS = 'GET DELETED TRANSLATIONS';
export const SET_ALL_TRANSLATIONS = 'SET ALL TRANSLATIONS';
export const SET_DELETED_TRANSLATIONS = 'SET DELETED TRANSLATIONS';
export const SET_TRANSLATIONS_STATS = 'SET TRANSLATIONS STATS';

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

export interface TranslationsState {
    data: TranslationState[],
    stats: TranslationStatsState[]
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
    insertionUser: any,
    updateUser: any,
    confirmedTranslations: ConfirmedTranslations,
    koTranslations: ConfirmedTranslations
}

export interface TranslationStatsState {
    locale: LanguageState,
    translatedAndConfirmed: number,
    translatedAndUnconfirmed: number,
    untranslated: number,
    total: number
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

interface SetTranslationsStatsAction {
    type: typeof SET_TRANSLATIONS_STATS,
    payload: TranslationStatsState[]
}

export type TranslationsActionsTypes =
    GetAllTranslationsAction |
    SetAllTranslationsAction |
    GetDeletedTranslationsAction |
    SetDeletedTranslationsAction |
    SetTranslationsStatsAction;
