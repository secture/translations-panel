import httpClient from "./common/http-interceptor";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import {setAllPlayers} from "../store/players/actions";
import {PlayerState} from "../store/players/types";

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

export const searchPlayer = (search: string): ThunkAction<void, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let players = null;
        try {
            players = await httpClient.get(process.env.REACT_APP_API_URL + '/v1/players/search?text=' + search);
            dispatch(setAllPlayers(players.data));
        } catch (error) {
            console.log(error);
        }
        return players;
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

export const editPlayerById = (player: PlayerState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let editPlayer = null;
        try {
            debugger;
            const response = await httpClient.put(`${process.env.REACT_APP_API_URL}/v1/players/${player.id}`, createPlayerDTO(player));
            if (response !== null && typeof response.data !== 'undefined') {
                editPlayer = response.data;
                dispatch(getAllPlayers());
            }
        } catch (error) {
            console.log(error);
        }
        return editPlayer;
    }
};

export const addPlayer = (player: PlayerState): ThunkAction<Promise<any>, {}, {}, AnyAction> => {
    return async function (dispatch: any) {
        let newPlayer = null;
        try {
            debugger;
            const response = await httpClient.post(`${process.env.REACT_APP_API_URL}/v1/players`, createPlayerDTO(player));
            if (response !== null && typeof response.data !== 'undefined') {
                newPlayer = response.data;
                dispatch(getAllPlayers());
            }
        } catch (error) {
            console.log(error);
        }
        return newPlayer;
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
