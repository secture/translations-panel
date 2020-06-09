import httpClient from "services/common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setUserAction} from "store/user/actions";
import {setUsersAction} from "store/users/actions";
import {UserState} from "store/user/types";
import {handleError, handleResponse} from "./common/axios-response";

export const getUsers = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        try {
            const response = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/users');
            handleResponse(response, dispatch(setUsersAction(response.data)));
        } catch (error) {
            handleError(error);
        }
    }
};

export const getUser = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        try{
            const response = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/users/me');
            handleResponse(response, dispatch(setUserAction(response.data)), {
                type: 'success',
                message: 'Users have been obtained successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const createUser = (createdUser: UserState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        try{
            const response = await httpClient.post(process.env.REACT_APP_API_URL + '/v1/auth/register', createdUser);
            handleResponse(response, dispatch(getUsers()), {
                type: 'success',
                message: 'Added user successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const updateUser = (updatedUser: UserState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        try{
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/users/${updatedUser.id}`, updatedUser);
            handleResponse(response, dispatch(getUsers()), {
                type: 'success',
                message: 'Updated user successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const deleteUser = (id: string): ThunkAction<void, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        try{
            const response = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/users/${id}`);
            handleResponse(response, dispatch(getUsers()), {
                type: 'success',
                message: 'Deleted user successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};


