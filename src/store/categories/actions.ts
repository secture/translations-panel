import {SET_ALL_CATEGORIES, CategoriesActionsTypes, CategoryState} from "./types";

export function setAllCategories(categories: CategoryState[]): CategoriesActionsTypes {
    return {
        type: SET_ALL_CATEGORIES,
        payload: categories
    }
}
