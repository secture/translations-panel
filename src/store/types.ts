import {AuthState} from "./auth/types";
import {UserState} from "./user/types";
import {LocaleState} from "./locale/types";

export interface TranslationsStore {
    user: UserState,
    auth: AuthState;
    locale: LocaleState;
}
