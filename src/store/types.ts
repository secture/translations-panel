import {AuthState} from "store/auth/types";
import {UserState} from "store/user/types";
import {LocaleState} from "store/locales/types";
import {TranslationState} from "store/translations/types";
import {CategoryState} from "store/categories/types";
import {PlayerState} from "store/players/types";
import {StatusState} from "store/status/types";

export interface TranslationsStore {
    auth: AuthState;
    user: UserState;
    users: UserState[];
    locales: LocaleState[];
    translations: TranslationState[];
    categories: CategoryState[];
    players: PlayerState[];
    status: StatusState;
    tags: [];
    roles: [];
}
