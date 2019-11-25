import {FiltersActionsTypes, FiltersState, SET_CATEGORY_FILTER, SET_LANGUAGE_FILTER, SET_TAG_FILTER} from "./types";

export const initialFilter: FiltersState = {
    language: null,
    tags: [],
    category: null,
};
export const initialFilterState: FiltersState = initialFilter;

export function filterReducer(state = initialFilterState, action: FiltersActionsTypes): FiltersState {
    switch (action.type) {
        case SET_LANGUAGE_FILTER: {
            return {
                ...state,
                language: action.payload
            }
        }
        case SET_TAG_FILTER: {
            return {
                ...state,
                tags: action.payload
            }
        }
        case SET_CATEGORY_FILTER: {
            return {
                ...state,
                category: action.payload
            }
        }

        default:
            return state
    }
}
