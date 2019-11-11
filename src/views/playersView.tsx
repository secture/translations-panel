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
import {getAllPlayers, searchPlayer} from "../services/players";
import {initialPlayerState} from "../store/players/reducers";

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
        debugger;
        if (props.players.length === 0) {
            props.getAllPlayersAction();
        }
    }, []);

    const onSearchPlayer = (search: string) => {
        props.searchPlayersActions(search);
    };

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container>
                    {!showForm ? (
                        <Grid item xs={12}>
                            <PlayersList players={props.players}
                                         user={props.user}
                                         setPlayerSelected={setPlayerSelected}
                                         setShowForm={setShowForm}
                                         openDialog={updateDialog}
                                         setEditForm={setEditForm}
                                         onSearchPlayer={onSearchPlayer}/>
                        </Grid>) : (
                        <Grid item xs={12}>
                            <PlayersForm />
                        </Grid>)
                    }
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        players: store.players,
        user: store.user
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllPlayersAction: () => dispatch(getAllPlayers()),
        searchPlayersActions: (search: string) => dispatch(searchPlayer(search)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlayersView);
