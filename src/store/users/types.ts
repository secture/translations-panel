import {UserState} from "../user/types";

export const GET_USERS = '[Users] GET USERS';

export interface UsersState {
    users: UserState[]
}

//Actions interface
interface GetUsersAction {
    type: typeof GET_USERS,
    payload: UserState[]
}

export type UsersActionsTypes = GetUsersAction
