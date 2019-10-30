export const GET_USER = 'GET USER';
export const SET_USER = 'UPDATE USER';

export interface UserState {
    email: string,
    id: string,
    name: string,
    privilege: string,
    password?: string,
    associatedLanguages: AssociatedLanguage[]
}

export interface AssociatedLanguage {
    id: string,
    key: string,
    name: string,
    localeForPlayers: boolean
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
