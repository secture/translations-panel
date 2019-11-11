import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllLocales} from "../store/locales/actions";
import {LocaleState} from "../store/locales/types";

export const getAllLocales = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let locales: any = null;
        try {
            locales = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/locales');
            dispatch(setAllLocales(locales.data));
        } catch (error) {
            console.log(error);
        }
    }
};

export const deleteLocaleById = (locale: LocaleState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let deleteLocale = null;
        try {
            const response = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/locales/${locale.id}`);
            if (response !== null && typeof response.data !== 'undefined') {
                deleteLocale = response.data;
                dispatch(getAllLocales());
            }
        } catch (error) {
            console.log(error);
        }
        return deleteLocale;
    }
};

export const editLocaleById = (locale: LocaleState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let editLocale = null;
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/locales/${locale.id}`, locale);
            if (response !== null && typeof response.data !== 'undefined') {
                editLocale = response.data;
                dispatch(getAllLocales());
            }
        } catch (error) {
            console.log(error);
        }
        return editLocale;
    }
};

export const addLocale = (locale: LocaleState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let newLocale = null;
        try {
            const response = await httpClient.post(`${process.env.REACT_APP_API_URL}/v1/locales`, locale);
            if (response !== null && typeof response.data !== 'undefined') {
                newLocale = response.data;
                dispatch(getAllLocales());
            }
        } catch (error) {
            console.log(error);
        }
        return newLocale;
    }
};
