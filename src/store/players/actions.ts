import {SET_PLAYERS, PlayerState, PlayersActionTypes} from "./types";

export function setAllPlayers(players: PlayerState[]): PlayersActionTypes {
    return {
        type: SET_PLAYERS,
        payload: players
    }
}
