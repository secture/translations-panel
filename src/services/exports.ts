import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import httpClient from "./common/http-interceptor";

export const getExportsByPlatform = (tag: string): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let exportsTranslates: any = null;
        try {
            exportsTranslates = await httpClient.get(`http://localhost:3000/api/v1/export/${tag}`);
            console.log(exportsTranslates);
            const element = document.createElement('a');
            element.setAttribute('href', `http://localhost:3000/api/v1/export/${tag}`);
            element.setAttribute('download', 'filename');

            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        } catch (error) {
            console.log(error);
        }
    }
};
