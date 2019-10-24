import {AuthState} from "./auth/types";
import {UserState} from "./user/types";

export interface TranslationsStore {
    auth: AuthState;
    user: UserState,
    users: UserState[];
}
