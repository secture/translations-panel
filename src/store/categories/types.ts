export const GET_ALL_CATEGORIES = 'GET ALL CATEGORIES';
export const SET_ALL_CATEGORIES = 'SET ALL CATEGORIES';

export interface CategoryState {
    id: string,
    name: string,
}

interface GetAllCategoriesAction {
    type: typeof GET_ALL_CATEGORIES
}

interface SetAllCategoriesAction {
    type: typeof SET_ALL_CATEGORIES,
    payload: Array<CategoryState>
}

export type CategoriesActionsTypes = GetAllCategoriesAction | SetAllCategoriesAction
