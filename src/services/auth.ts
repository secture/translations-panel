import {AuthState, UserLoginDTO, UserSignInDTO} from "../store/auth/types";
import {signInAction, loginAction, logoutAction} from '../store/auth/actions'
import {setUserAction} from "../store/user/actions";
import {initialUserState} from "../store/user/reducers";
import httpClient from "./common/http-interceptor";

import { AnyAction } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import axios from 'axios'

export const getExample = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        let result = null;
        try {
            result = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
            debugger;
            console.log(result.data);
            dispatch(loginAction(result.data));
        } catch (error) {
            console.log(error);
        }
        return result;
    }
};

export const login = (user: UserLoginDTO): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        let result = null;
        try {
            result = await httpClient.post('http://localhost:3000/api/auth/login', user);
            debugger;
            //build object pass to store auth
            const userApiResponse: AuthState = {
                userAuthenticated: result.data.user,
                accessToken: result.data.accessToken,
                isAuthenticated: true
            };
            dispatch(loginAction(userApiResponse));
            //pass object to user data
            dispatch(setUserAction(userApiResponse.userAuthenticated));
        } catch (error) {
            console.log(error);
        }
        return result;
    }
};

export const signIn = (user: UserSignInDTO) => {
    return async function(dispatch: any) {
        try{
            let result: any = await httpClient.post('https://localhost:3000/auth/signIn', user);
            console.log(result);
            dispatch(signInAction(result));
            return result;
        } catch (error) {
            console.log(error);
        }
    }
};

export const logOut = () => {
    return async function(dispatch: any) {
        dispatch(logoutAction(initialUserState));
        dispatch(setUserAction(initialUserState));
    }
};
