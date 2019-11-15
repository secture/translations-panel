import {AuthState} from "./auth/types";
import {UserState} from "./user/types";
import {LocaleState} from "./locales/types";
import {TranslationState} from "./translations/types";
import {CategoryState} from "./categories/types";
import {StatusState} from "./status/types";

export interface TranslationsStore {
    auth: AuthState;
    user: UserState;
    users: UserState[];
    locales: LocaleState[];
    translations: TranslationState[];
    categories: CategoryState[];
    status: StatusState;
    tags: [];
    roles: [];
}
