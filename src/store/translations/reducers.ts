import {
    SET_ALL_TRANSLATIONS,
    SET_DELETED_TRANSLATIONS,
    TranslationsActionsTypes,
    TranslationState,
    UpdateUserState
} from "./types";
import {initialCategory} from "../categories/reducers";

export const initialUpdateUserState: UpdateUserState = {
    associatedLanguages: [],
    name: '',
    privilege: '',
    email: '',
    id: ''
};

export const initialTranslation: TranslationState = {
    id: '',
    key: '',
    translations: {},
    tags: [],
    context: '',
    category: initialCategory,
    insertionDate: new Date(),
    updateDate: new Date(),
    insertionUser: {},
    updateUser: initialUpdateUserState,
    confirmedTranslations: {}
};
export const initialTranslationState: TranslationState[] = [initialTranslation];

export function translationsReducer(state = initialTranslationState, action: TranslationsActionsTypes): TranslationState[] {
    switch (action.type) {
        case SET_ALL_TRANSLATIONS:
        case SET_DELETED_TRANSLATIONS: {
            return action.payload;
        }
        default:
            return state
    }
}
