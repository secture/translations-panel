import {AuthState} from "./auth/types";
import {UserState} from "./user/types";
import {LocaleState} from "./locale/types";
import {TranslationState} from "./translations/types";

export interface TranslationsStore {
    auth: AuthState;
    user: UserState;
    users: UserState[];
    locale: LocaleState[];
    translations: TranslationState[];
    tags: [];
}
