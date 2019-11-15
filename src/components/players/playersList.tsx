import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import MaterialTable, {MTableToolbar} from "material-table";
import {enhancedTableStyles} from 'styles/table';
import {PlayerState} from "store/players/types";
import {initialPlayerState} from "store/players/reducers";
import {LanguageState} from "store/languages/types";
import {initialLanguage} from "store/languages/reducers";
import {getColumns} from 'components/common/utilsTable';
import LanguageSelector from "components/common/languageSelector";
import {TranslationsStore} from "../../store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import {historyPlayer} from "../../services/players";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const PlayersList: React.FC<any> = (props: AppProps) => {
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

    const getHistoryPlayer = (rowData: any) => {
        props.historyPlayerAction(rowData).then((historyPlayer: any) => {
            console.log(historyPlayer);
        })
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
                onRowClick={(event, rowData: any) => getHistoryPlayer(rowData)}
                isLoading={props.players.length === 0}/>
        </Paper>
    )
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        players: props.players,
        user: props.user,
        setPlayerSelected: props.setPlayerSelected,
        setEditForm: props.setEditForm,
        setShowForm: props.setShowForm,
        openDialog: props.openDialog
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        historyPlayerAction: (player: PlayerState) => dispatch(historyPlayer(player)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlayersList);
