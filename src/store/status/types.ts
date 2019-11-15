export const SET_STATUS = 'SET STATUS';

export interface StatusState {
    type: string,
    message: string,
    show: boolean
}

interface SetStatusAction {
    type: typeof SET_STATUS,
    payload: StatusState
}

export type StatusActionsTypes = SetStatusAction
