import {SET_USER, UserActionsTypes, UserState} from "./types";

export function setUser(newUser: UserState): UserActionsTypes {
    return {
        type: SET_USER,
        payload: newUser
    }
}
