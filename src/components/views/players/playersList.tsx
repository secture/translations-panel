import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import MaterialTable, {MTableToolbar} from "material-table";
import {enhancedTableStyles} from 'styles/table';
import {PlayerState} from "store/players/types";
import {initialPlayerState} from "store/players/reducers";
import {LocaleState} from "store/locales/types";
import {initialLocale} from "store/locales/reducers";
import {getColumns} from 'components/common/utilsTable';
import LocaleSelector from "components/common/localeSelector";
import {UserState} from "../../../store/user/types";

interface PropsPlayerList {
    players: PlayerState[],
    user: UserState,
    setPlayerSelected: (Player: PlayerState) => void,
    setEditForm: (editForm: boolean) => void,
    setShowForm: (showForm: boolean) => void,
    openDialog: () => void,
    openHistoryPlayerDialog: () => void,
    updateHistoryPlayer: (historyPlayer: any) => void
}

const PlayersList: React.FC<any> = (props: PropsPlayerList) => {
    const classes = enhancedTableStyles();

    const [locale, setLocale] = useState(initialLocale);
    const handleLocale = (locale: LocaleState) => {
        setLocale(locale)
    };

    const loadFormAddPlayer = () => {
        props.setEditForm(false);
        props.setPlayerSelected(initialPlayerState);
        props.setShowForm(true);
    };

    const loadFormEditPlayer= (player: PlayerState) => {
        props.setEditForm(true);
        props.setPlayerSelected(player);
        props.setShowForm(true);
    };

    const deletePlayer = (player: PlayerState) => {
        props.setPlayerSelected(player);
        props.openDialog();
    };

    const loadHistoryPlayer = (rowData: any) => {
        props.updateHistoryPlayer(rowData);
        props.openHistoryPlayerDialog();
    };

    return (
        <Paper className={classes.root}>
            <MaterialTable
                title={'Players'}
                columns={getColumns(locale)}
                data={props.players}
                components={{
                    Toolbar: (props) => (
                        <div>
                            <div style={{display: 'flex', flexDirection: 'row', paddingTop: '15px'}}>
                                <MTableToolbar {...props} />
                                <LocaleSelector locale={locale} handleLocale={handleLocale}/>
                                <IconButton style={{width: '50px', height: '50px'}} aria-label="add" onClick={() => loadFormAddPlayer()}>
                                    <AddCircleOutlineIcon color="primary"/>
                                </IconButton>
                            </div>
                        </div>
                    ),
                }}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        iconProps: {color: 'primary'},
                        onClick: (event, rowData: any) => loadFormEditPlayer(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        iconProps: {color: 'secondary'},
                        onClick: (event, rowData: any) => deletePlayer(rowData)
                    }
                ]}
                options={{
                    search: true,
                    filtering: true,
                }}
                onRowClick={(event, rowData: any) => loadHistoryPlayer(rowData)}
                isLoading={props.players.length === 0}/>
        </Paper>
    )
};

export default PlayersList;
