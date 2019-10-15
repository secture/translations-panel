export const GET_USER = 'GET USER';
export const SET_USER = 'UPDATE USER';

export interface UserState {
    userName: string,
    password: string,
    role: string,
}

//Actions interface
interface GetUserAction {
    type: typeof GET_USER
}

interface SetUserAction {
    type: typeof SET_USER
    payload: UserState
}

export type UserActionsTypes = GetUserAction | SetUserAction
