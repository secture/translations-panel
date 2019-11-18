import httpClient from "services/common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setUserAction} from "store/user/actions";
import {setUsersAction} from "store/users/actions";
import {UserState} from "store/user/types";
import {setStatus} from "../store/status/actions";

export const getUsers = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let users: any = null;
        try {
            users = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/users');
            dispatch(setUsersAction(users.data));
            dispatch(setStatus({
                type: 'success',
                message: 'All users have been obtained successfully ',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error getting users',
                show: true
            }));
        }
    }
};

export const getUser = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let user = null;
        try{
            user = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/users/me');
            dispatch(setUserAction(user.data));
            dispatch(setStatus({
                type: 'success',
                message: 'Users have been obtained successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error getting user',
                show: true
            }));
        }
        return user;
    }
};

export const createUser = (createdUser: UserState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let user = null;
        try{
            const response = await httpClient.post(process.env.REACT_APP_API_URL + '/v1/auth/register', createdUser);
            if (response !== null && typeof response.data !== 'undefined') {
                user = response.data;
                dispatch(getUsers());
            }
            dispatch(setStatus({
                type: 'success',
                message: 'Added user successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error adding user',
                show: true
            }));
        }
        return user;
    }
};

export const updateUser = (updatedUser: UserState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let user = null;
        try{
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/users/${updatedUser.id}`, updatedUser);
            if (response !== null && typeof response.data !== 'undefined') {
                user = response.data;
                dispatch(getUsers());
            }
            dispatch(setStatus({
                type: 'success',
                message: 'Updated user successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error updating user',
                show: true
            }));
        }
        return user
    }
};

export const deleteUser = (id: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let user = null;
        try{
            user = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/users/${id}`);
            dispatch(getUsers());
            dispatch(setStatus({
                type: 'success',
                message: 'Deleted user successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error deleting user',
                show: true
            }));
        }
        return user;
    }
};


