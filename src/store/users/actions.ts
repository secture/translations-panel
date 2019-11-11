import {SET_USERS, UsersActionsTypes} from "./types";
import {UserState} from "../user/types";

export function setUsersAction(users: UserState[]): UsersActionsTypes {
    return {
        type: SET_USERS,
        payload: users
    }
}
