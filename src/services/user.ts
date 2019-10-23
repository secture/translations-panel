import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setUserAction} from "../store/user/actions";

export const getUser = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let user = null;
        try{
            user = await httpClient.get('http://localhost:3000/api/user/me');
            dispatch(setUserAction(user.data));
        } catch (error) {
            console.log(error);
        }
        return user;
    }
};
