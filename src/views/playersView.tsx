import React, {useEffect, useState} from 'react';
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {AnyAction} from "redux";
import {setStatus} from "store/status/actions";
import {StatusState} from "store/status/types";
import {LanguageState} from "store/languages/types";
import {TranslationsStore} from "store/types";
import {PlayerHistoryState, PlayerState} from "store/players/types";
import {initialHistoryPlayerState, initialPlayerState} from "store/players/reducers";

/* Services */
import {
    addPlayer,
    confirmPlayerTranslations,
    deletePlayerById,
    editPlayerById,
    getAllPlayers,
    historyPlayer
} from "services/players";
import {getAllLanguages} from "services/languages";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import {dashboardViewStyles} from "styles/dashboard";

/* Components */
import PlayersList from "components/views/players/playersList";
import PlayersForm from "components/views/players/playersForm";
import DeleteDialog from "components/common/deleteDialog";
import FullScreenDialog from "components/common/fullScreenDialog";

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
    const [historyPlayer, setHistoryPlayer] = useState(initialHistoryPlayerState);

    useEffect(() => {
        props.getAllLanguagesAction();
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
        props.editPlayerAction(player).then((player: LanguageState) => {
            (player !== null) ? alert('Player editado') : alert('no ha sido posible editar el Player')
        })
    };
    const onAddPlayer = (player: PlayerState) => {
        props.addPlayerAction(player).then((player: LanguageState) => {
            (player !== null) ? alert('Player creado') : alert('no ha sido posible crear el Player')
        })
    };

    const onConfirmPlayerTranslation = (id: string, languageKey: string) => {
        props.confirmPlayerTranslationAction(id, languageKey).then((confirmPlayer: PlayerState) => {
            (confirmPlayer !== null) ? alert('Player confirmado') : alert('no ha sido posible confirmar el player')
        });
    };

    const getHistoryPlayer = (rowData: any) => {
        props.historyPlayerAction(rowData).then((historyPlayer: PlayerHistoryState) => {
            setHistoryPlayer(historyPlayer);
            if (historyPlayer.history.length === 0) {
                props.statusAction({type: 'info',
                    message: 'The player has no history changes',
                    show: true})
            } else {
                updateHistoryPlayerDialog();
            }
        });
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
                                getHistoryPlayer={getHistoryPlayer}
                                setEditForm={setEditForm}/>
                        </Grid>) : (
                        <Grid item xs={12}>
                            <PlayersForm
                                playerSelected={playerSelected}
                                onAddPlayer={onAddPlayer}
                                onEditPlayer={onEditPlayer}
                                onConfirmPlayerTranslation={onConfirmPlayerTranslation}
                                languages={props.languages}
                                setShowForm={setShowForm}
                                setEditForm={setEditForm}
                                editForm={editForm}
                            />
                        </Grid>)
                    }
                    <FullScreenDialog openDialog={updateHistoryPlayerDialog} dialog={historyPlayerDialog} data={historyPlayer}/>
                    <DeleteDialog openDialog={updateDialog} dialog={dialog} deleteItem={playerSelected} deleteFunction={onDeletePlayer}/>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        players: store.players,
        languages: store.languages,
        user: store.user
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllPlayersAction: () => dispatch(getAllPlayers()),
        getAllLanguagesAction: () => dispatch(getAllLanguages()),
        addPlayerAction: (player: PlayerState) => dispatch(addPlayer(player)),
        editPlayerAction: (player: PlayerState) => dispatch(editPlayerById(player)),
        deletePlayerAction: (id: string) => dispatch(deletePlayerById(id)),
        historyPlayerAction: (player: PlayerState) => dispatch(historyPlayer(player)),
        confirmPlayerTranslationAction: (id: string, languageKey: string) => dispatch(confirmPlayerTranslations(id, languageKey)),
        statusAction: (status: StatusState) => dispatch(setStatus(status))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlayersView);
