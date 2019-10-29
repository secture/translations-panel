import {UserState} from "../user/types";

export const GET_USERS = '[Users] GET USERS';
export const CREATE_USER = '[Users] CREATE USER';
export const UPDATE_USER = '[Users] UPDATE USER';
export const DELETE_USER = '[Users] DELETE USER';

export interface UsersState {
    users: UserState[]
}

//Actions interface
interface GetUsersAction {
    type: typeof GET_USERS,
    payload: UserState[]
}

interface CreateUserAction {
    type: typeof CREATE_USER,
    payload: UserState
}

interface UpdateUserAction {
    type: typeof UPDATE_USER,
    payload: UserState
}

interface DeleteUserAction {
    type: typeof DELETE_USER,
    payload: string
}

export type UsersActionsTypes = GetUsersAction | CreateUserAction | UpdateUserAction | DeleteUserAction
