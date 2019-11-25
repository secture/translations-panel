import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllLanguages} from "store/languages/actions";
import {LanguageState} from "store/languages/types";
import {setStatus} from "store/status/actions";
import {handleError, handleResponse} from "./common/axios-response";

export const getAllLanguages = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/locales');
            handleResponse(response, dispatch(setAllLanguages(response.data)));
        } catch (error) {
            handleError(error);
        }
    }
};

export const deleteLanguageById = (language: LanguageState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/locales/${language.id}`);
            handleResponse(response, dispatch(getAllLanguages()), {
                type: 'success',
                message: 'Deleted language successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const editLanguageById = (language: LanguageState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/locales/${language.id}`, language);
            handleResponse(response, dispatch(getAllLanguages()), {
                type: 'success',
                message: 'Edited language successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const addLanguage = (language: LanguageState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.post(`${process.env.REACT_APP_API_URL}/v1/locales`, language);
            handleResponse(response, dispatch(getAllLanguages()), {
                type: 'success',
                message: 'Added language successfully',
                show: true
            });
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error adding language',
                show: true
            }));
        }
    }
};
