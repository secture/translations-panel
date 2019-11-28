import React from "react";
import {TableCell, TableHead, TableRow} from "@material-ui/core";
import {PlayerHistoryState, PlayerState} from "store/players/types";
import {confirmedTranslations, playerNames, user} from "components/common/utilsTable";

interface PropsPlayersHistoryColumns {
    columns: string[]
}

export const PlayersHistoryColumns: React.FC<any> = (props: PropsPlayersHistoryColumns) => {
    return (
        <TableHead>
            {(props.columns).map((column: string) => (
                <TableCell>{column}</TableCell>
            ))}
        </TableHead>
    )
};

interface PropsPlayersRows {
    data: PlayerHistoryState
}

export const PlayersHistoryRows: React.FC<any> = (props: PropsPlayersRows) => {

    const printTableCells = (player: PlayerState) => {
        return (
            <TableRow key={player.id}>
                <TableCell component="th" scope="row">
                    {user(player.insertionUser, 'red')}
                </TableCell>
                <TableCell component="th" scope="row">{new Date(player.insertionDate).toDateString()}</TableCell>
                <TableCell component="th" scope="row">
                    {user(player.updateUser, 'red')}
                </TableCell>
                <TableCell component="th" scope="row">{new Date(player.updateDate).toDateString()}</TableCell>
                <TableCell component="th" scope="row">
                    {playerNames(player, true)}
                </TableCell>
                <TableCell component="th" scope="row">
                    {playerNames(player, false)}
                </TableCell>
                <TableCell component="th" scope="row">
                    {confirmedTranslations(player.confirmedTranslations, {true: 'confirmed', false: 'unconfirmed'})}
                </TableCell>
                <TableCell component="th" scope="row">{player.team}</TableCell>
                <TableCell component="th" scope="row">{player.comments}</TableCell>
            </TableRow>
        )
    };

    return (
        <TableHead>
            {props.data.history.map((player: PlayerState) =>
                printTableCells(player)
            )}
        </TableHead>
    )
};
