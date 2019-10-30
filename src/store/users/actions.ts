import {CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER, UsersActionsTypes} from "./types";
import {UserState} from "../user/types";

export function setUsersAction(users: UserState[]): UsersActionsTypes {
    return {
        type: GET_USERS,
        payload: users
    }
}

export function createUserAction(user: UserState): UsersActionsTypes {
    return {
        type: CREATE_USER,
        payload: user
    }
}

export function updateUserAction(user: UserState): UsersActionsTypes {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function deleteUserAction(id: string): UsersActionsTypes {
    return {
        type: DELETE_USER,
        payload:id
    }
}
