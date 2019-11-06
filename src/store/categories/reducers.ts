import {CategoriesActionsTypes, CategoryState, SET_ALL_CATEGORIES} from "./types";

export const initialCategory: CategoryState = {
    id: '',
    name: '',
};
export const initialCategoryState: CategoryState[] = [];

export function categoriesReducer(state = initialCategoryState, action: CategoriesActionsTypes): CategoryState[] {
    switch (action.type) {
        case SET_ALL_CATEGORIES: {
            return action.payload;
        }
        default:
            return state
    }
}
