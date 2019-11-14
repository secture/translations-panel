import {SET_USERS, UsersActionsTypes} from "./types";
import {UserState} from "store/user/types";
import {initialUserState} from "store/user/reducers";

export const initialUsersState: UserState[] = [initialUserState];

export function usersReducer(state = initialUsersState, action: UsersActionsTypes): UserState[] {
    switch (action.type) {
        case SET_USERS: {
            return action.payload;
        }
        default:
            return state;
    }
}
