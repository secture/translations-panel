import {SET_PLAYERS, PlayerState, PlayersActionTypes, PlayerHistoryState} from "./types";
import {initialUserState} from "../user/reducers";

export const initialHistoryPlayerState: PlayerHistoryState = {
    id: '',
    deleted: false,
    history: [],
};

export const initialPlayerState: PlayerState = {
    id: '',
    playerMasterId: 0,
    shortName: {},
    largeName: {},
    team: '',
    comments: '',
    insertionDate: '',
    updateDate: '',
    insertionUser: initialUserState,
    updateUser: initialUserState,
    confirmedTranslations: {}
};

export const initialPlayersState: PlayerState[] = [];

export function playersReducer(state = initialPlayersState, action: PlayersActionTypes): PlayerState[] {
    switch (action.type) {
        case SET_PLAYERS: {
            return action.payload
        }
        default:
            return state
    }
}
