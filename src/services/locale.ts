import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllLocales} from "../store/locale/actions";
import {LocaleState} from "../store/locale/types";

export const getAllLocales = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let locales = null;
        try {
            locales = await httpClient.get('http://localhost:3000/api/locale');
            dispatch(setAllLocales(locales.data));
        } catch (error) {
            console.log(error);
        }
        return locales;
    }
};

export const deleteLocaleById = (locale: LocaleState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let locales = null;
        try {
            locales = await httpClient.delete(`http://localhost:3000/api/locale/${locale.id}`);
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
            locales = await httpClient.delete(`http://localhost:3000/api/locale/${locale.id}`);
            dispatch(getAllLocales());
        } catch (error) {
            console.log(error);
        }
        return locales;
    }
};
