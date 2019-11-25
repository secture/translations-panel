import store from "store";
import {setStatus} from "store/status/actions";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";

export const handleResponse = (response: any, thunkAction: AnyAction, status?: any) => {
    if (response !== null && typeof response.data !== 'undefined') {
        if (typeof status !== 'undefined') store.dispatch(setStatus(status));
        return function (dispatch: ThunkDispatch<{}, {}, any>) {
            dispatch(thunkAction);
        }
    } else {
        store.dispatch(setStatus({
            type: 'error',
            message: `Something has been wrong, please try again`,
            show: true
        }));
    }
};

export const handleError = (error: any) => {
    store.dispatch(setStatus({
        type: 'error',
        message: `We have a problem ${error.response.data.error} 😢`,
        show: true
    }));
};
