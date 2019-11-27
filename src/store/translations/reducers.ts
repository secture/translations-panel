import {
    SET_ALL_TRANSLATIONS,
    SET_DELETED_TRANSLATIONS,
    SET_TRANSLATIONS_STATS,
    TranslationHistoryState,
    TranslationsActionsTypes, TranslationsState,
    TranslationState,
    UpdateUserState
} from "./types";
import {initialCategory} from "store/categories/reducers";

export const initialTranslationHistoryState: TranslationHistoryState = {
    id: '',
    deleted: false,
    history: [],
};


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
export const initialTranslationsState: TranslationsState = {
    data: [initialTranslation],
    stats: [],
};

export function translationsReducer(state = initialTranslationsState, action: TranslationsActionsTypes): TranslationsState {
    switch (action.type) {
        case SET_ALL_TRANSLATIONS:
        case SET_DELETED_TRANSLATIONS: {
            return {
                ...state,
                data: action.payload
            };
        }
        case SET_TRANSLATIONS_STATS: {
            return {
                ...state,
                stats: action.payload
            };
        }
        default:
            return state
    }
}
