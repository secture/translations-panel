import {UserState} from "../user/types";

export const SIGN_IN = '[Auth] SIGN IN USER';
export const LOGIN = '[Auth] LOGIN USER';
export const LOGOUT = '[Auth] LOGOUT USER';

//State and DTO Auth interface
export interface AuthState {
    userAuthenticated: UserState,
    accessToken: string
    isAuthenticated: boolean
}

export interface UserLoginDTO {
    email: string,
    password: string
}

export interface UserSignInDTO {
    name: string,
    email: string,
    privilege: string,
    password: string
}

//Actions interface
interface SignInAction {
    type: typeof SIGN_IN
    payload: UserSignInDTO
}

interface LogInAction {
    type: typeof LOGIN
    payload: AuthState
}

interface LogOutAction {
    type: typeof LOGOUT
    payload: UserState
}

export type AuthActionsTypes = SignInAction | LogInAction | LogOutAction
