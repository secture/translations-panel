import {AuthActionsTypes, AuthState, LOGIN, LOGOUT, SIGN_IN} from "./types";

const initialAuthState: AuthState = {
    userAuthenticated: {
        name: '',
        email: '',
        id: '',
        privilege: '',
        associatedLanguages: []
    },
    accessToken: localStorage.getItem('user-token') || '',
    isAuthenticated: false
};

export function authReducer(state = initialAuthState, action: AuthActionsTypes): AuthState {
    switch (action.type) {
        case SIGN_IN: {
            return {
                ...state,
                ...action.payload
            }
        }
        case LOGIN: {
            return {
                ...state,
                userAuthenticated: action.payload.userAuthenticated,
                accessToken: action.payload.accessToken,
                isAuthenticated: action.payload.isAuthenticated
            }
        }
        case LOGOUT: {
            return {
                ...state,
                userAuthenticated: action.payload,
                accessToken: '',
                isAuthenticated: false
            }
        }
        default:
            return state
    }
}
