import React, {useEffect, useState} from 'react';

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {dashboardViewStyles} from "../styles/dashboard";
import {TranslationsStore} from "../store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import PlayersList from "components/views/players/playersList";
import PlayersForm from "components/views/players/playersForm";
import {addPlayer, deletePlayerById, editPlayerById, getAllPlayers, historyPlayer} from "../services/players";
import {initialPlayerState} from "store/players/reducers";
import DeleteDialog from "components/common/deleteDialog";
import {LocaleState} from "store/locales/types";
import {PlayerState} from "store/players/types";
import FullScreenDialog from "../components/common/fullScreenDialog";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const PlayersView: React.FC<any> = (props: AppProps) => {
    const classes = dashboardViewStyles();

    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };
    const [historyPlayerDialog, setHistoryPlayerDialog] = useState(false);
    const updateHistoryPlayerDialog = () => {
        setHistoryPlayerDialog(!historyPlayerDialog);
    };
    const [playerSelected, setPlayerSelected] = useState(initialPlayerState);
    const [editForm, setEditForm] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [historyPlayer, setHistoryPlayer] = useState({});
    const updateHistoryPlayer = (historyPlayer: any) => {
        setHistoryPlayer(historyPlayer);
        getHistoryPlayer(historyPlayer);
    };

    useEffect(() => {
        if (props.players.length === 0) {
            props.getAllPlayersAction();
        }
    }, []);

    const onDeletePlayer = () => {
        props.deletePlayerAction(playerSelected.id).then((deleteOk: boolean) => {
            (deleteOk) ? alert('Player eliminado') : alert('no ha sido posible elimar el Player')
        });
        updateDialog();
    };

    const onEditPlayer = (player: PlayerState) => {
        props.editPlayerAction(player).then((player: LocaleState) => {
            (player !== null) ? alert('Player editado') : alert('no ha sido posible editar el Player')
        })
    };
    const onAddPlayer = (player: PlayerState) => {
        props.addPlayerAction(player).then((player: LocaleState) => {
            (player !== null) ? alert('Player creado') : alert('no ha sido posible crear el Player')
        })
    };

    const getHistoryPlayer = (rowData: any) => {
        props.historyPlayerAction(rowData).then((historyPlayer: any) => {
            console.log(historyPlayer);
        })
    };

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    {!showForm ? (
                        <Grid item xs={12}>
                            <PlayersList
                                players={props.players}
                                setPlayerSelected={setPlayerSelected}
                                setShowForm={setShowForm}
                                openDialog={updateDialog}
                                openHistoryPlayerDialog={updateHistoryPlayerDialog}
                                updateHistoryPlayer={updateHistoryPlayer}
                                setEditForm={setEditForm}/>
                        </Grid>) : (
                        <Grid item xs={12}>
                            <PlayersForm
                                playerSelected={playerSelected}
                                onAddPlayer={onAddPlayer}
                                onEditPlayer={onEditPlayer}
                                locales={props.locales}
                                setShowForm={setShowForm}
                                setEditForm={setEditForm}
                                editForm={editForm}
                            />
                        </Grid>)
                    }
                    <FullScreenDialog openDialog={updateHistoryPlayerDialog} dialog={historyPlayerDialog} data={historyPlayer} items={[]}/>
                    <DeleteDialog openDialog={updateDialog} dialog={dialog} deleteItem={playerSelected} deleteFunction={onDeletePlayer}/>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        players: store.players,
        locales: store.locales,
        user: store.user
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllPlayersAction: () => dispatch(getAllPlayers()),
        addPlayerAction: (player: PlayerState) => dispatch(addPlayer(player)),
        editPlayerAction: (player: PlayerState) => dispatch(editPlayerById(player)),
        deletePlayerAction: (id: string) => dispatch(deletePlayerById(id)),
        historyPlayerAction: (player: PlayerState) => dispatch(historyPlayer(player)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlayersView);
