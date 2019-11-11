import {SET_PLAYERS, PlayerState, PlayersActionTypes} from "./types";
import {initialUserState} from "../user/reducers";

export const initialPlayerState: PlayerState = {
    id: '',
    playerMasterId: '',
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
