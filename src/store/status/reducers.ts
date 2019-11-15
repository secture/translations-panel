import {SET_STATUS, StatusActionsTypes, StatusState} from "./types";

export const initialStatus: StatusState = {
    type: 'success', //success, warning, error, info
    message: '',
    show: false
};
export const initialStatusState: StatusState = initialStatus;

export function statusReducer(state = initialStatusState, action: StatusActionsTypes): StatusState {
    switch (action.type) {
        case SET_STATUS: {
            return action.payload;
        }
        default:
            return state
    }
}
