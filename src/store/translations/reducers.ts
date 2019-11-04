import {SET_ALL_TRANSLATIONS, TranslationsActionsTypes, TranslationState, UpdateUserState} from "./types";

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
    category: {name: '', id: ''},
    insertionDate: new Date(),
    updateDate: new Date(),
    insertionUser: {},
    updateUser: initialUpdateUserState,
    confirmed: false
};
export const initialTranslationState: TranslationState[] = [initialTranslation];

export function translationsReducer(state = initialTranslationState, action: TranslationsActionsTypes): TranslationState[] {
    switch (action.type) {
        case SET_ALL_TRANSLATIONS: {
            return action.payload;
        }
        default:
            return state
    }
}
