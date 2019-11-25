import httpClient from "services/common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllCategories} from "store/categories/actions";
import {CategoryState} from "store/categories/types";
import {handleError, handleResponse} from "./common/axios-response";

export const getAllCategories = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/categories');
            handleResponse(response, dispatch(setAllCategories(response.data)));
        } catch (error) {
            handleError(error);
        }
    }
};

export const deleteCategoryById = (category: CategoryState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/categories/${category.id}`);
            handleResponse(response, dispatch(getAllCategories()), {
                type: 'success',
                message: 'Deleted category successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const editCategoryById = (category: CategoryState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/categories/${category.id}`, category);
            handleResponse(response, dispatch(getAllCategories()), {
                type: 'success',
                message: 'Edited category successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};
export const addCategory = (category: CategoryState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.post(process.env.REACT_APP_API_URL + '/v1/locales', category);
            handleResponse(response, dispatch(getAllCategories()), {
                type: 'success',
                message: 'Added category successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};
