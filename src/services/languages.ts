import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllLanguages} from "store/languages/actions";
import {LanguageState} from "store/languages/types";
import {setStatus} from "store/status/actions";

export const getAllLanguages = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let languages: any = null;
        try {
            languages = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/locales');
            dispatch(setAllLanguages(languages.data));
            dispatch(setStatus({
                type: 'success',
                message: 'All languages have been obtained successfully ',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error getting languages',
                show: true
            }));
        }
    }
};

export const deleteLanguageById = (language: LanguageState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let deleteLanguage = null;
        try {
            const response = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/locales/${language.id}`);
            if (response !== null && typeof response.data !== 'undefined') {
                deleteLanguage = response.data;
                dispatch(getAllLanguages());
                dispatch(setStatus({
                    type: 'success',
                    message: 'Deleted language successfully',
                    show: true
                }));
            }
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error deleting language',
                show: true
            }));
        }
        return deleteLanguage.data;
    }
};

export const editLanguageById = (language: LanguageState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let editLanguage = null;
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/locales/${language.id}`, language);
            if (response !== null && typeof response.data !== 'undefined') {
                editLanguage = response.data;
                dispatch(getAllLanguages());
                dispatch(setStatus({
                    type: 'success',
                    message: 'Edited language successfully',
                    show: true
                }));
            }
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error editing language',
                show: true
            }));
        }
        return editLanguage;
    }
};

export const addLanguage = (language: LanguageState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let newLanguage = null;
        try {
            const response = await httpClient.post(`${process.env.REACT_APP_API_URL}/v1/locales`, language);
            if (response !== null && typeof response.data !== 'undefined') {
                newLanguage = response.data;
                dispatch(getAllLanguages());
                dispatch(setStatus({
                    type: 'success',
                    message: 'Added language successfully',
                    show: true
                }));
            }
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error adding language',
                show: true
            }));
        }
        return newLanguage;
    }
};
