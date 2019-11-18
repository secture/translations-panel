import {UserLoginDTO, UserSignInDTO} from "store/auth/types";
import {signInAction, loginAction, logoutAction} from 'store/auth/actions'
import {setUserAction} from "store/user/actions";
import {initialUserState} from "store/user/reducers";
import httpClient from "services/common/http-interceptor";

import {AnyAction} from 'redux';
import {ThunkDispatch, ThunkAction} from 'redux-thunk'
import {setStatus} from "../store/status/actions";

export const login = (user: UserLoginDTO): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        let loginServiceDTO: any = null;
        try {
            const apiResponse: any = await httpClient.post(process.env.REACT_APP_API_URL + '/v1/auth/login', user);
            if (typeof apiResponse.isAxiosError === 'undefined' || !apiResponse.isAxiosError) {
                loginServiceDTO = {
                    userAuthenticated: apiResponse.data.user,
                    accessToken: apiResponse.data.accessToken,
                    isAuthenticated: true
                };
                dispatch(loginAction(loginServiceDTO));
                dispatch(setUserAction(loginServiceDTO.userAuthenticated));
                dispatch(setStatus({
                    type: 'success',
                    message: 'Login successfully ',
                    show: true
                }));
            } else {
                dispatch(setStatus({
                    type: 'warning',
                    message: 'Login not response',
                    show: true
                }));
            }
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error login',
                show: true
            }));
        }
        return loginServiceDTO;
    }
};

export const logOut = (): ThunkAction<Promise<boolean>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        //localStorage.removeItem('user-token');
        dispatch(logoutAction(initialUserState));
        dispatch(setUserAction(initialUserState));
        dispatch(setStatus({
            type: 'success',
            message: 'Logout successfully',
            show: true
        }));
        return true;
    }
};

export const signIn = (user: UserSignInDTO) => {
    return async function(dispatch: any) {
        try{
            let result: any = await httpClient.post('https://localhost:3000/api/v1/auth/signIn', user);
            console.log(result);
            dispatch(signInAction(result));
            dispatch(setStatus({
                type: 'success',
                message: 'SignIn successfully',
                show: true
            }));
            return result;
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error signIn',
                show: true
            }));
        }
    }
};
