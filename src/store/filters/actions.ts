import {FiltersActionsTypes, SET_CATEGORY_FILTER, SET_LANGUAGE_FILTER, SET_TAG_FILTER} from "./types";
import {LanguageState} from "store/languages/types";
import {CategoryState} from "store/categories/types";

export function setLanguageFilter(filter: LanguageState): FiltersActionsTypes {
    return {
        type: SET_LANGUAGE_FILTER,
        payload: filter
    }
}

export function SetTagFilterAction(filter: Array<string>): FiltersActionsTypes {
    return {
        type: SET_TAG_FILTER,
        payload: filter
    }
}

export function SetCategoryFilterAction(filter: CategoryState): FiltersActionsTypes {
    return {
        type: SET_CATEGORY_FILTER,
        payload: filter
    }
}
