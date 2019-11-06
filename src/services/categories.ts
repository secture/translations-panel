import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllLocales} from "../store/locales/actions";
import {LocaleState} from "../store/locales/types";

export const getAllLocales = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let locales: any = null;
        try {
            locales = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/categories');
            dispatch(setAllLocales(locales.data));
        } catch (error) {
            console.log(error);
        }
    }
};

export const deleteLocaleById = (locale: LocaleState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let locales = null;
        try {
            locales = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/locales/${locale.id}`);
            dispatch(getAllLocales());
        } catch (error) {
            console.log(error);
        }
        return locales;
    }
};

export const editLocaleById = (locale: LocaleState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let locales = null;
        try {
            locales = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/locales/${locale.id}`, locale);
            dispatch(getAllLocales());
        } catch (error) {
            console.log(error);
        }
        return locales;
    }
};
export const addLocale = (locale: LocaleState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let locales = null;
        try {
            locales = await httpClient.post(process.env.REACT_APP_API_URL + '/v1/locales', locale);
            dispatch(getAllLocales());
        } catch (error) {
            console.log(error);
        }
        return locales;
    }
};
