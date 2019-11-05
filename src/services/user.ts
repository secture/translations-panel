import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setUserAction} from "../store/user/actions";
import {setUsersAction} from "../store/users/actions";
import {UserState} from "../store/user/types";

export const getUsers = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let users: any = null;
        try {
            users = await httpClient.get('http://localhost:3000/api/v1/users');
            dispatch(setUsersAction(users.data));
        } catch (error) {
            console.log(error);
        }
    }
};

export const getUser = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let user = null;
        try{
            user = await httpClient.get('http://localhost:3000/api/v1/users/me');
            dispatch(setUserAction(user.data));
        } catch (error) {
            console.log(error);
        }
        return user;
    }
};

export const createUser = (createdUser: UserState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let user = null;
        try{
            const response = await httpClient.post('http://localhost:3000/api/v1/auth/register', createdUser);
            if (response !== null && typeof response.data !== 'undefined') {
                user = response.data;
                dispatch(getUsers());
            }
        } catch (error) {
            console.log(error);
        }
        return user;
    }
};

export const updateUser = (updatedUser: UserState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let user = null;
        try{
            const response = await httpClient.put(`http://localhost:3000/api/v1/users/${updatedUser.id}`, updatedUser);
            if (response !== null && typeof response.data !== 'undefined') {
                user = response.data;
                dispatch(getUsers());
            }
        } catch (error) {
            console.log(error);
        }
        return user
    }
};

export const deleteUser = (id: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let user = null;
        try{
            user = await httpClient.delete(`http://localhost:3000/api/v1/users/${id}`);
            dispatch(getUsers());
        } catch (error) {
            console.log(error);
        }
        return user;
    }
};


