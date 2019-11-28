import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllPlayers} from "store/players/actions";
import {PlayerState} from "store/players/types";
import {TranslationsStore} from "store/types";
import {LanguageState} from "store/languages/types";
import {handleError, handleResponse} from "./common/axios-response";

export const getAllPlayers = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/players');
            handleResponse(response, dispatch(setAllPlayers(response.data)));
        } catch (error) {
            handleError(error);
        }
    }
};

export const deletePlayerById = (id: string): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/players/${id}`);
            handleResponse(response, dispatch(getAllPlayers()), {
                type: 'success',
                message: `Player has been deleted`,
                show: true
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export const editPlayerById = (player: PlayerState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/players/${player.id}`, createPlayerDTO(player));
            handleResponse(response, dispatch(getAllPlayers()), {
                type: 'success',
                message: `Player has been updated`,
                show: true
            });
        } catch (error) {
            handleError(error)
        }
    }
};

export const addPlayer = (player: PlayerState): ThunkAction<void, TranslationsStore, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.post(`${process.env.REACT_APP_API_URL}/v1/players`, createPlayerDTO(player));
            handleResponse(response, dispatch(getAllPlayers()), {
                type: 'success',
                message: `Player has been added`,
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const historyPlayer = (player: PlayerState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function () {
        let historyPlayer = null;
        try {
            const response = await httpClient.get(`${process.env.REACT_APP_API_URL}/v1/players/${player.id}/history`);
            if (response !== null && typeof response.data !== 'undefined' && Object.entries(response.data).length !== 0) {
                historyPlayer = response.data;
            }
        } catch (error) {
            handleError(error);
        }
        return historyPlayer
    }
};

export const confirmPlayerTranslation = (player: PlayerState, language: LanguageState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/players/${player.id}/confirm/${language.id}`);
            handleResponse(response, dispatch(getAllPlayers()), {
                type: 'success',
                message: 'Confirmed player successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const unConfirmPlayerTranslation = (player: PlayerState, language: LanguageState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/players/${player.id}/unconfirm/${language.id}`);
            handleResponse(response, dispatch(getAllPlayers()), {
                type: 'success',
                message: 'Unconfirmed player successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const rejectPlayerTranslation = (player: PlayerState, language: LanguageState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/players/${player.id}/reject/${language.id}`);
            handleResponse(response, dispatch(getAllPlayers()), {
                type: 'success',
                message: 'Rejected player successfully',
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

const createPlayerDTO = (player: PlayerState) => {
    return {
        playerMasterId: player.playerMasterId,
        shortName: player.shortName,
        largeName: player.largeName,
        team: player.team,
        comments: player.comments
    }
};
