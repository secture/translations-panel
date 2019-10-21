import {SET_USER, UserActionsTypes, UserState} from "./types";

export const initialUserState: UserState = {
    email: '',
    name: '',
    privilege: '',
    id: '',
    associatedLanguages: []
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
