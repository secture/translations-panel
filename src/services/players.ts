import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllPlayers} from "store/players/actions";
import {PlayerState} from "store/players/types";
import {handleError, handleResponse} from "./common/axios-response";
import {TranslationState} from "../store/translations/types";
import {TranslationsStore} from "../store/types";

export const getAllPlayers = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let players: any = null;
        try {
            players = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/players');
            dispatch(setAllPlayers(players.data));
        } catch (error) {
            console.log(error);
        }
    }
};

export const deletePlayerById = (id: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let deletePlayer = null;
        try {
            const response = await httpClient.delete(`${process.env.REACT_APP_API_URL}/v1/players/${id}`);
            if (response !== null && typeof response.data !== 'undefined') {
                deletePlayer = response.data;
                dispatch(getAllPlayers());
            }
        } catch (error) {
            console.log(error);
        }
        return deletePlayer;
    }
};

export const editPlayerById = (player: PlayerState): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/players/${player.id}`, createPlayerDTO(player));
            handleResponse(response, dispatch(getAllPlayers()), {
                type: 'success',
                message: `player`,
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
                message: `ok`,
                show: true
            });
        } catch (error) {
            handleError(error);
        }
    }
};

export const historyPlayer = (player: PlayerState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let historyPlayer = null;
        try {
            const response = await httpClient.get(`${process.env.REACT_APP_API_URL}/v1/players/${player.id}/history`);
            if (response !== null && typeof response.data !== 'undefined') {
                historyPlayer = response.data;
            }
        } catch (error) {
            console.log(error);
        }
        return historyPlayer
    }
};

export const confirmPlayerTranslations = (id: string, languageKey: string): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function(dispatch: any) {
        let confirmPlayerTranslations = null;
        try {
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/players/${id}/confirm/${languageKey}`);
            if (response !== null && typeof response.data !== 'undefined') {
                confirmPlayerTranslations = response.data;
                dispatch(getAllPlayers());
            }
        } catch (error) {
            console.log(error);
        }
        return confirmPlayerTranslations;
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
