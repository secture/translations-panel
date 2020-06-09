import {SIGN_IN, LOGIN, AuthActionsTypes, UserSignInDTO, AuthState, LOGOUT} from "./types";
import {UserState} from "store/user/types";

export function signInAction(user: UserSignInDTO): AuthActionsTypes {
    return {
        type: SIGN_IN,
        payload: user
    }
}

export function loginAction(user: AuthState): AuthActionsTypes {
    return {
        type: LOGIN,
        payload: user
    }
}

export function logoutAction(user: UserState): AuthActionsTypes {
    return {
        type: LOGOUT,
        payload: user
    }
}
