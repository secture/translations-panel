import {SET_STATUS, StatusActionsTypes, StatusState} from "./types";

export function setStatus(status: StatusState): StatusActionsTypes {
    return {
        type: SET_STATUS,
        payload: status
    }
}
