import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllTranslations, setDeleteTranslations} from "store/translations/actions";
import {TranslationState} from "store/translations/types";
import {LocaleState} from "store/locales/types";

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
        } catch (error) {
            console.log(error);
        }
        return translations;
    }
};

export const getAllTranslations = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/translations');
            dispatch(setAllTranslations(translations.data));
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
        }
        return translations;
    }
};
export const confirmTranslationLocaleById = (translation: TranslationState, locale: LocaleState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/translations/${translation.id}/confirm/${locale.id}`);
            dispatch(getAllTranslations());
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
        return translations;
    }
};

