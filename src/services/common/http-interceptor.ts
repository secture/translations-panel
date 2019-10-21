import axios, { AxiosRequestConfig } from 'axios'

let config: AxiosRequestConfig = {
    /**
     * Cambiar cuando se tengan las variables de entorno de la aplicación
     */
    baseURL: 'https://localhost:3001'
};

const httpClient = axios.create(config);

const authInterceptor = (config: any) => {
    debugger;
    // obtener el token desde el state o comprobarlo en el localStorage
    const token = '';

    // configurar los headers para incluir el token
    config.headers = {
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
    // manejar errores de autenticacion de token. En este caso no hay refresh token, el usuario se le deslogeará directamente de la aplicación
    return error;
};

httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.response.use(okInterceptor, errorInterceptor);

export default httpClient;
