import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import httpClient from "./common/http-interceptor";
import {setStatus} from "../store/status/actions";

export const getExportsByPlatform = (tag: string): ThunkAction<Promise<boolean>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let exportsTranslates: any = null;
        let exportOk = false;
        try {
            exportsTranslates = await httpClient.get(`${process.env.REACT_APP_API_URL}/v1/export/${tag}`, {responseType: 'blob'});
            if (typeof exportsTranslates.data !== 'undefined' || exportsTranslates.data !== '') {
                const downloadUrl = URL.createObjectURL(new Blob([exportsTranslates.data], {type: 'application/zip'}));
                let a = document.createElement("a");
                a.href = downloadUrl;
                a.download = `${tag}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                exportOk = true;
                dispatch(setStatus({
                    type: 'success',
                    message: 'Export data successfully',
                    show: true
                }));
            }
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error exporting data',
                show: true
            }));
        }
        return exportOk;
    }
};
