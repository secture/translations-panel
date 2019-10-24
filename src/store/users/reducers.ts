import {GET_USERS, UsersActionsTypes} from "./types";
import {UserState} from "../user/types";
import {initialUserState} from "../user/reducers";

export const initialUsersState: UserState[] = [initialUserState];

export function usersReducer(state = initialUsersState, action: UsersActionsTypes): UserState[] {
    switch (action.type) {
        case GET_USERS: {
            return action.payload;
        }
        default:
            return state;
    }
}
