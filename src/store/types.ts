import {AuthState} from "store/auth/types";
import {UserState} from "store/user/types";
import {LanguageState} from "store/languages/types";
import {TranslationsState} from "store/translations/types";
import {CategoryState} from "store/categories/types";
import {PlayerState} from "store/players/types";
import {StatusState} from "store/status/types";
import {FiltersState} from "./filters/types";

export interface TranslationsStore {
    auth: AuthState;
    user: UserState;
    users: UserState[];
    languages: LanguageState[];
    translations: TranslationsState;
    categories: CategoryState[];
    players: PlayerState[];
    status: StatusState;
    filters: FiltersState,
    tags: [];
    roles: [];
}
