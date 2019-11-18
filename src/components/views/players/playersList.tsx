import React, {useState} from "react";
import {PlayerState} from "store/players/types";
import {UserState} from "store/user/types";
import {LanguageState} from "store/languages/types";
import {initialPlayerState} from "store/players/reducers";
import {initialLanguage} from "store/languages/reducers";

import MaterialTable, {MTableToolbar} from "material-table";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import {enhancedTableStyles} from 'styles/table';

import {getColumns} from 'components/common/utilsTable';
import LanguageSelector from 'components/common/languageSelector'

interface PropsPlayerList {
    players: PlayerState[],
    user: UserState,
    setPlayerSelected: (Player: PlayerState) => void,
    setEditForm: (editForm: boolean) => void,
    setShowForm: (showForm: boolean) => void,
    openDialog: () => void,
    getHistoryPlayer: (roData: any) => void,
}

const PlayersList: React.FC<any> = (props: PropsPlayerList) => {
    const classes = enhancedTableStyles();

    const [language, setLanguage] = useState(initialLanguage);
    const handleLanguage = (language: LanguageState) => {
        setLanguage(language)
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

    return (
        <Paper className={classes.root}>
            <MaterialTable
                title={'Players'}
                columns={getColumns(language)}
                data={props.players}
                components={{
                    Toolbar: (props) => (
                        <div>
                            <div style={{display: 'flex', flexDirection: 'row', paddingTop: '15px'}}>
                                <MTableToolbar {...props} />
                                <LanguageSelector language={language} handleLanguage={handleLanguage}/>
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
                onRowClick={(event, rowData: any) => props.getHistoryPlayer(rowData)}
                isLoading={props.players.length === 0}/>
        </Paper>
    )
};

export default PlayersList;
