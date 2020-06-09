import {UserState} from "../user/types";

export const SET_USERS = '[Users] SET USERS';

export interface UsersState {
    users: UserState[]
}

//Actions interface
interface GetUsersAction {
    type: typeof SET_USERS,
    payload: UserState[]
}

export type UsersActionsTypes = GetUsersAction
