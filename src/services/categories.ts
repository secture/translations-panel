import httpClient from "services/common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllCategories} from "store/categories/actions";
import {CategoryState} from "store/categories/types";
import {setStatus} from "../store/status/actions";

export const getAllCategories = (): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let categories: any = null;
        try {
            categories = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/categories');
            dispatch(setAllCategories(categories.data));
            dispatch(setStatus({
                type: 'success',
                message: 'All categories have been obtained successfully ',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error getting categories',
                show: true
            }));
        }
    }
};

export const deleteCategoryById = (category: CategoryState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let categories: any = null;
        try {
            categories = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/categories/${category.id}`);
            dispatch(getAllCategories());
            dispatch(setStatus({
                type: 'success',
                message: 'Deleted category successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error deleting category',
                show: true
            }));
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
            dispatch(setStatus({
                type: 'success',
                message: 'Edited category successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error editing category',
                show: true
            }));
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
            dispatch(setStatus({
                type: 'success',
                message: 'Added category successfully',
                show: true
            }));
        } catch (error) {
            dispatch(setStatus({
                type: 'error',
                message: 'Error adding category',
                show: true
            }));
        }
        return categories;
    }
};
