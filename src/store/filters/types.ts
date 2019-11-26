import {LanguageState} from "store/languages/types";
import {CategoryState} from "store/categories/types";

export const GET_ALL_FILTERS = 'GET ALL FILTERS';

export const SET_LANGUAGE_FILTER = 'SET LANGUAGE FILTER';
export const SET_TAG_FILTER = 'SET TAG FILTER';
export const SET_CATEGORY_FILTER = 'SET CATEGORY FILTER';

export interface FiltersState {
    language: LanguageState | null,
    tags: Array<string>,
    category: CategoryState | null,
}

interface GetAllFiltersAction {
    type: typeof GET_ALL_FILTERS
}

interface SetLanguageFilterAction {
    type: typeof SET_LANGUAGE_FILTER,
    payload: LanguageState
}

interface SetTagFilterAction {
    type: typeof SET_TAG_FILTER,
    payload: Array<string>
}

interface SetCategoryFilterAction {
    type: typeof SET_CATEGORY_FILTER,
    payload: CategoryState
}

export type FiltersActionsTypes = GetAllFiltersAction |
    SetLanguageFilterAction | SetTagFilterAction | SetCategoryFilterAction;
