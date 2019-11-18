import {ConfirmedTranslations, NamePlayers} from "../translations/types";
import {UserState} from "../user/types";

export const GET_PLAYERS = 'GET PLAYERS';
export const SET_PLAYERS = 'SET PLAYERS';

export interface PlayerHistoryState {
    id: string,
    deleted: boolean,
    history: PlayerState[],
}

export interface PlayerState {
    id: string,
    playerMasterId: string,
    shortName: NamePlayers,
    largeName: NamePlayers,
    team: string,
    comments: string,
    insertionDate: string,
    updateDate: string,
    insertionUser: UserState,
    updateUser: UserState,
    confirmedTranslations: ConfirmedTranslations
}

//Actions interface
interface GetPlayersAction {
    type: typeof GET_PLAYERS
}

interface SetPlayersAction {
    type: typeof SET_PLAYERS
    payload: PlayerState[]
}

export type PlayersActionTypes = GetPlayersAction | SetPlayersAction
