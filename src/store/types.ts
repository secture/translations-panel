import {AuthState} from "./auth/types";
import {UserState} from "./user/types";

export interface TranslationsStore {
    user: UserState,
    auth: AuthState;
}
