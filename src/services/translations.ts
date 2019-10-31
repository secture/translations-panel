import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllTranslations} from "../store/translations/actions";

export const getAllTranslations = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let translations = null;
        try {
            translations = await httpClient.get('http://localhost:3000/api/v1/translations');
            dispatch(setAllTranslations(translations.data));
        } catch (error) {
            console.log(error);
        }
        return translations;
    }
};
