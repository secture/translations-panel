import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllTranslations} from "../store/translations/actions";
import {TranslationState} from "../store/translations/types";

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
            translations = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/translations/${translation.id}`, translation);
            dispatch(getAllTranslations());
        } catch (error) {
            console.log(error);
        }
        return translations;
    }
};
export const addTranslation = (translation: TranslationState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.post(process.env.REACT_APP_API_URL + '/v1/translations', translation);
            dispatch(getAllTranslations());
        } catch (error) {
            console.log(error);
        }
        return translations;
    }
};

