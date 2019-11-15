import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllTranslations, setDeleteTranslations} from "store/translations/actions";
import {TranslationState} from "store/translations/types";
import {LanguageState} from "store/languages/types";
import {setStatus} from "../store/status/actions";

export const getAllTranslations = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/translations');
            dispatch(setAllTranslations(translations.data));
            dispatch(setStatus({
                type: 'success',
                message: 'All translations have been obtained successfully ',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error getting translations',
                show: true
            }));
        }
        return translations;
    }
};

export const getDeletedTranslations = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/translations/deleted');
            dispatch(setDeleteTranslations(translations.data));
            dispatch(setStatus({
                type: 'success',
                message: 'All deleted translations have been obtained successfully ',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error getting deleted translation',
                show: true
            }));
        }
        return translations;
    }
};

export const addTranslation = (translation: TranslationState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.post(process.env.REACT_APP_API_URL + '/v1/translations',
                {
                    key: translation.key,
                    translations: translation.translations,
                    tags: translation.tags,
                    context: translation.context,
                    category: translation.category.id
                });
            dispatch(getAllTranslations());
            dispatch(setStatus({
                type: 'success',
                message: 'Added translation successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error adding translation',
                show: true
            }));
        }
        return translations;
    }
};

export const deleteTranslationById = (translation: TranslationState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/translations/${translation.id}`);
            dispatch(getAllTranslations());
            dispatch(setStatus({
                type: 'success',
                message: 'Deleted translation successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error deleting translation',
                show: true
            }));
        }
        return translations;
    }
};
export const editTranslationById = (translation: TranslationState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/translations/${translation.id}`,
                {
                    key: translation.key,
                    translations: translation.translations,
                    confirmedTranslations: translation.confirmedTranslations,
                    tags: translation.tags,
                    context: translation.context,
                    category: translation.category.id
                });
            dispatch(getAllTranslations());
            dispatch(setStatus({
                type: 'success',
                message: 'Edited translation successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error editing translation',
                show: true
            }));
        }
        return translations;
    }
};
export const confirmTranslationLanguageById = (translation: TranslationState, language: LanguageState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/translations/${translation.id}/confirm/${language.id}`);
            dispatch(getAllTranslations());
            dispatch(setStatus({
                type: 'success',
                message: 'Confirmed translation successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error confirming translation',
                show: true
            }));
        }
        return translations;
    }
};
export const searchTranslations = (search: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/translations/search?text=' + search);
            dispatch(setAllTranslations(translations.data));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error searching translation',
                show: true
            }));
        }
        return translations;
    }
};

