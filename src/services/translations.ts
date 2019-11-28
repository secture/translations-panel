import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllTranslations, setDeleteTranslations, setTranslationsStats} from "store/translations/actions";
import {TranslationState} from "store/translations/types";
import {LanguageState} from "store/languages/types";
import {setStatus} from "store/status/actions";
import {handleError, handleResponse} from "./common/axios-response";

export const getAllTranslations = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/translations');
            handleResponse(response, dispatch(setAllTranslations(response.data)));
        } catch (error) {
            handleError(error);
        }
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
            handleError(error);
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
            handleError(error);
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
            handleError(error);
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
            handleError(error);
        }
        return translations;
    }
};

export const confirmTranslationLanguageById = (translation: TranslationState, language: LanguageState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/translations/${translation.id}/confirm/${language.id}`);
            handleResponse(response, dispatch(getAllTranslations()), {
                type: 'success',
                message: 'Confirmed translation successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const unConfirmTranslationLanguageById = (translation: TranslationState, language: LanguageState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/translations/${translation.id}/unconfirm/${language.id}`);
            handleResponse(response, dispatch(getAllTranslations()), {
                type: 'success',
                message: 'Unconfirmed translation successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const rejectTranslationByLanguageId = (translation: TranslationState, language: LanguageState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/translations/${translation.id}/reject/${language.id}`);
            handleResponse(response, dispatch(getAllTranslations()), {
                type: 'success',
                message: 'Reject translation successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const searchTranslations = (search: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/translations/search?text=' + search);
            dispatch(setAllTranslations(translations.data));
        } catch (error) {
            handleError(error)
        }
        return translations;
    }
};
export const getTranslationsStats = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let stats = null;
        try {
            stats = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/translations/stats');
            dispatch(setTranslationsStats(stats.data));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error getting stats',
                show: true
            }));
        }
        return stats;
    }
};

export const historyTranslation = (translation: TranslationState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function () {
        let historyTranslation = null;
        try {
            const response = await httpClient.get(`${process.env.REACT_APP_API_URL}/v1/translations/${translation.id}/history`);
            if (response !== null && typeof response.data !== 'undefined' && Object.entries(response.data).length !== 0) {
                historyTranslation = response.data;
            }
        } catch (error) {
            handleError(error);
        }
        return historyTranslation;
    }
};

