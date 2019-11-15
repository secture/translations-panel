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

    const getHistoryPlayer = (rowData: any) => {
        props.historyPlayerAction(rowData).then((historyPlayer: any) => {
            console.log(historyPlayer);
        })
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
