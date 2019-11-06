import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllCategories} from "../store/categories/actions";
import {CategoryState} from "../store/categories/types";

export const getAllCategories = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let categories: any = null;
        try {
            categories = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/categories');
            dispatch(setAllCategories(categories.data));
        } catch (error) {
            console.log(error);
        }
    }
};

export const deleteCategoryById = (category: CategoryState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let categories: any = null;
        try {
            categories = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/categories/${category.id}`);
            dispatch(getAllCategories());
        } catch (error) {
            console.log(error);
        }
        return categories;
    }
};

export const editCategoryById = (category: CategoryState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let categories = null;
        try {
            categories = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/categories/${category.id}`, category);
            dispatch(getAllCategories());
        } catch (error) {
            console.log(error);
        }
        return categories;
    }
};
export const addCategory = (category: CategoryState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let categories = null;
        try {
            categories = await httpClient.post(process.env.REACT_APP_API_URL + '/v1/locales', category);
            dispatch(getAllCategories());
        } catch (error) {
            console.log(error);
        }
        return categories;
    }
};
