import {UserLoginDTO, UserSignInDTO} from "../store/auth/types";
import {signInAction, loginAction, logoutAction} from '../store/auth/actions'
import {setUserAction} from "../store/user/actions";
import {initialUserState} from "../store/user/reducers";
import httpClient from "./common/http-interceptor";

import {AnyAction} from 'redux';
import {ThunkDispatch, ThunkAction} from 'redux-thunk'

export const login = (user: UserLoginDTO): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        let loginServiceDTO: any = null;
        try {
            const apiResponse: any = await httpClient.post('http://localhost:3000/api/auth/login', user);
            if (typeof apiResponse.isAxiosError === 'undefined' || !apiResponse.isAxiosError) {
                loginServiceDTO = {
                    userAuthenticated: apiResponse.data.user,
                    accessToken: apiResponse.data.accessToken,
                    isAuthenticated: true
                };
                dispatch(loginAction(loginServiceDTO));
                dispatch(setUserAction(loginServiceDTO.userAuthenticated));
            } else {
                console.log(apiResponse.response.data);
            }
        } catch (error) {
            console.log(error);
        }
        return loginServiceDTO;
    }
};

export const logOut = (): ThunkAction<Promise<boolean>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        localStorage.removeItem('user-token');
        dispatch(logoutAction(initialUserState));
        dispatch(setUserAction(initialUserState));
        return true;
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
