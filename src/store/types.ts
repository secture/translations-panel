import {SystemState} from "./system/types";
import {UserState} from "./user/types";

export interface TranslationsStore {
    user: UserState,
    auth: SystemState;
}
