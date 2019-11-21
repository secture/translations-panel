import axios, { AxiosRequestConfig } from 'axios'
import store from 'store/index'
import {setStatus} from "store/status/actions";

let config: AxiosRequestConfig = {
    /**
     * Cambiar cuando se tengan las variables de entorno de la aplicación
     */
    baseURL: 'https://localhost:3001',
    validateStatus: (status: any) => {
        return status < 400;
    }
};

const httpClient = axios.create(config);

const authInterceptor = (config: any) => {
    const tokenStore = store.getState().auth.accessToken;
    const token: string = (tokenStore === null) ? store.getState().auth.accessToken : tokenStore;
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };
    return config
};

const okInterceptor = (response: any) => {
    return response;
};

const errorInterceptor = (error: any) => {
    localStorage.removeItem('user-token');
    //store.dispatch(logoutAction(initialUserState));
    /*if (error.request.status === 401) {
        localStorage.removeItem('user-token');
        store.dispatch(logoutAction(initialUserState));
    }*/
    return Promise.reject(error);
};

httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.response.use(okInterceptor, errorInterceptor);

export default httpClient;
