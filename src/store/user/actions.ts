import {SET_USER, UserActionsTypes, UserState} from "./types";

export function setUserAction(newUser: UserState): UserActionsTypes {
    return {
        type: SET_USER,
        payload: newUser
    }
}
