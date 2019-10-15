import {SET_USER, UserActionsTypes, UserState} from "./types";

const initialUserState: UserState = {
    userName: 'Sergio Rodriguez',
    password: '',
    role: 'admin'
};

export function userReducer(state = initialUserState, action: UserActionsTypes): UserState {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}
