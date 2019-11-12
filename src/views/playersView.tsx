import React, {useEffect, useState} from 'react';

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import {dashboardViewStyles} from "../styles/dashboard";
import {TranslationsStore} from "../store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import PlayersList from "../components/players/playersList";
import PlayersForm from "../components/players/playersForm";
import {addPlayer, deletePlayerById, editPlayerById, getAllPlayers} from "../services/players";
import {initialPlayerState} from "../store/players/reducers";
import DeleteDialog from "../components/common/deleteDialog";
import {LocaleState} from "../store/locales/types";
import {PlayerState} from "../store/players/types";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const PlayersView: React.FC<any> = (props: AppProps) => {
    const classes = dashboardViewStyles();

    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };
    const [playerSelected, setPlayerSelected] = useState(initialPlayerState);
    const [editForm, setEditForm] = useState(false);
    const [showForm, setShowForm] = useState(false);

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
        debugger;
        props.editPlayerAction(player).then((player: LocaleState) => {
            (player !== null) ? alert('Player editado') : alert('no ha sido posible editar el Player')
        })
    };
    const onAddPlayer = (player: PlayerState) => {
        debugger;
        props.addPlayerAction(player).then((player: LocaleState) => {
            (player !== null) ? alert('Player creado') : alert('no ha sido posible crear el Player')
        })
    };

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container>
                    {!showForm ? (
                        <Grid item xs={12}>
                            <PlayersList
                                players={props.players}
                                user={props.user}
                                setPlayerSelected={setPlayerSelected}
                                setShowForm={setShowForm}
                                openDialog={updateDialog}
                                setEditForm={setEditForm}/>
                        </Grid>) : (
                        <Grid item xs={12}>
                            <PlayersForm
                                playerSelected={playerSelected}
                                onAddPlayer={onAddPlayer}
                                onEditPlayer={onEditPlayer}
                                locales={props.locales}
                                setShowForm={setShowForm}
                                openDialog={updateDialog}
                                setEditForm={setEditForm}
                                editForm={editForm}
                            />
                        </Grid>)
                    }
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
        deletePlayerAction: (id: string) => dispatch(deletePlayerById(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlayersView);
