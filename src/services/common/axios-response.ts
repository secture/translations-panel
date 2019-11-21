import store from "store";
import {setStatus} from "store/status/actions";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";

export const handleResponse = (response: any, thunkAction: AnyAction, status: any) => {
    if (response !== null && typeof response.data !== 'undefined') {
        store.dispatch(setStatus(status));
        return function (dispatch: ThunkDispatch<{}, {}, any>) {
            dispatch(thunkAction);
        }
    }
};

export const handleError = (error: any) => {
    store.dispatch(setStatus({
        type: 'error',
        message: `We have a problem ${error.response.data.error} 😢`,
        show: true
    }));
};
