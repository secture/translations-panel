import React, {ReactElement} from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import MaterialTable, {MTableToolbar} from "material-table";
import {enhancedTableStyles} from '../../styles/table';
import {PlayerState} from "../../store/players/types";
import {UsersState} from "../../store/users/types";
import {initialPlayerState} from "../../store/players/reducers";

interface ColumnsPlayer {
    title: string,
    field: string,
    disablePadding: boolean,
    searchable?: boolean,
    label: string,
    customFilterAndSearch?: (filter: string, rowData: PlayerState) => boolean,
    render?: (rowData: PlayerState) => ReactElement
}

const playerNames = (rowData: PlayerState, shortName: boolean) => {
    return (
        <div>
            {Object.keys(shortName ? rowData.shortName: rowData.largeName).map((key: any)=> (
                <Chip style={{marginBottom: "5px"}}
                      avatar={<Avatar color="secondary">{key}</Avatar>}
                      label={ shortName ? rowData.shortName[key]: rowData.largeName[key]}
                      color="primary"
                />)
            )}
        </div>
    )
};

const confirmedTranslations = (rowData: PlayerState) => {
    return (
        <div>
            {Object.keys(rowData.confirmedTranslations).map((key: any)=> (
                <Chip style={{marginBottom: "5px"}}
                      avatar={<Avatar>{key}</Avatar>}
                      label={rowData.confirmedTranslations[key] ? 'confirm' : 'unconfirmed'}
                      color={rowData.confirmedTranslations[key] ? 'primary' : 'secondary'}
                />)
            )}
        </div>
    )
};

const customSearch = (filter: string, rowData: PlayerState) => {
    return (rowData.largeName['es'].toLowerCase().includes(filter.toLocaleLowerCase()) ||
        rowData.shortName['es'].toLowerCase().includes(filter.toLocaleLowerCase()))
};

const columns: ColumnsPlayer[] = [
    {title: 'Id', field: 'playerMasterId', disablePadding: false, searchable: true, label: 'Id'},
    {title: 'Short name', field: 'shortName', disablePadding: false, searchable: true, label: 'Short name',
        customFilterAndSearch: (filter: string, rowData: PlayerState) => customSearch(filter, rowData),
        render: (rowData: PlayerState) => playerNames(rowData, true)
    },
    {title: 'Large name', field: 'largeName', disablePadding: false, searchable: true, label: 'Large name', render: (rowData: PlayerState) => playerNames(rowData, false)},
    {title: 'Confirmed', field: 'confirmedTranslations', disablePadding: false, label: 'Confirmed', render: (rowData: PlayerState) => confirmedTranslations(rowData)},
    {title: 'Insertion date', field: 'insertionDate', disablePadding: false, label: 'IDate', render: (rowData: PlayerState) => <div>{new Date(rowData.insertionDate).toDateString()}</div>},
    {title: 'Updated date', field: 'updateDate', disablePadding: false, label: 'UDate', render: (rowData: PlayerState) => <div>{new Date(rowData.updateDate).toDateString()}</div>},
    {title: 'Insertion user', field: 'insertionUser', disablePadding: false, searchable: true, label: 'IUser', render: (rowData: PlayerState) => <div>{rowData.insertionUser.name}</div>},
    {title: 'Updated user', field: 'updateUser', disablePadding: false, searchable: true, label: 'UDate', render: (rowData: PlayerState) => <div>{rowData.updateUser.name}</div>},
    {title: 'Team', field: 'team', disablePadding: false, label: 'Team'},
    {title: 'Comments', field: 'comments', disablePadding: false, label: 'Comments'},
];

interface PropsPlayersList {
    players: any,
    user: UsersState,
    setPlayerSelected: (player: PlayerState) => void,
    setEditForm: (isEditForm: boolean) => void,
    setShowForm: (show: boolean) => void,
    openDialog: () => void
}

const PlayersList: React.FC<any> = (props: PropsPlayersList) => {
    const classes = enhancedTableStyles();

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
                columns={columns}
                data={props.players}
                components={{
                    Toolbar: props => (
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <MTableToolbar {...props} />
                            <div style={{padding: '10px 0 0 0'}}>
                                <IconButton aria-label="add" onClick={() => loadFormAddPlayer()}>
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
                    search: true
                }}
                onRowClick={(event, rowData: any) => {
                   alert('player' + rowData.shortName['es']);
                }}
                isLoading={props.players.length === 0}/>
        </Paper>
    )
};

export default PlayersList;
