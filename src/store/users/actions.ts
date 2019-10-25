import {GET_USERS, UsersActionsTypes} from "./types";
import {UserState} from "../user/types";

export function setUsersAction(users: UserState[]): UsersActionsTypes {
    return {
        type: GET_USERS,
        payload: users
    }
}
