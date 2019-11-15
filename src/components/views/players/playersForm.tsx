import {formStyles} from '../../../styles/form'
import Paper from "@material-ui/core/Paper";
import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {PlayerState} from "store/players/types";
import {LocaleState} from "store/locales/types";

interface PropsPlayersForm {
    playerSelected: PlayerState,
    onEditPlayer: (player: PlayerState) => void,
    onAddPlayer: (player: PlayerState) => void,
    locales: LocaleState[],
    editForm: boolean
    showForm: boolean,
    setShowForm: (show: boolean) => void,
}

const PlayersForm: React.FC<any> = (props: PropsPlayersForm) => {

    const classes = formStyles();
    const [player, setPlayer] = useState(props.playerSelected);

    const changedValues = (e: any, property: string, key: string, shortName?: boolean) => {
        setPlayer({
            ...player,
            [property]: (key === 'noKey') ? e.target.value : {
                ...(shortName ? player.shortName : player.largeName),
                [key] : e.target.value
            }
        });
    };

    const confirmEditPlayer = () => {
        props.setShowForm(false);
        props.onEditPlayer(player);
    };

    const confirmCreatePlayer = () => {
        props.setShowForm(false);
        props.onAddPlayer(player);
    };

    const namePlayersByLocale = (shortName: boolean) => {
        return (
            <div>
                {props.locales.map((locale: LocaleState) => (
                    locale.localeForPlayers && <TextField
                    id={locale.key}
                    name={locale.key}
                    label={locale.key}
                    fullWidth
                    autoComplete="fname"
                    onChange={(e) => changedValues(e, shortName ? 'shortName': 'largeName',`${locale.key}`, shortName)}
                    value={shortName ? player.shortName[locale.key]: player.largeName[locale.key]}
                />))}
            </div>
        )
    };

    return (
        <Paper className={classes.root}>
            <form className={classes.form}>
                <Container maxWidth={false} className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid container item direction="row" justify="center" xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {props.editForm ?
                                    'Player Edition whose ID is: ' + props.playerSelected.id :
                                    'Create a new Player'
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="playerMasterId"
                                name="playerMasterId"
                                label="Player master id"
                                type="number"
                                fullWidth
                                autoComplete="fname"
                                onChange={(e) => changedValues(e, 'playerMasterId', 'noKey')}
                                value={player.playerMasterId}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Short Name
                            </Typography>
                            {namePlayersByLocale(true)}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Large Name
                            </Typography>
                            {namePlayersByLocale(false)}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="team"
                                name="team"
                                label="Team"
                                fullWidth
                                autoComplete="fname"
                                onChange={(e) => changedValues(e, 'team', 'noKey')}
                                value={player.team}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="comments"
                                name="comments"
                                label="Comments"
                                multiline
                                fullWidth
                                rows="4"
                                defaultValue="Default Value"
                                variant="outlined"
                                onChange={(e) => changedValues(e, 'comments', 'noKey')}
                                value={player.comments}
                            />
                        </Grid>
                        <Grid container item direction="row" justify="flex-end" xs={12}>
                            <Button className={classes.button} onClick={() => props.setShowForm(false)}>Back</Button>
                            {props.editForm ? (
                                <Button variant="contained" color="primary"
                                        onClick={() => {confirmEditPlayer()}}
                                        className={classes.button}> Save </Button>
                            ) : (
                                <Button variant="contained" color="primary"
                                        onClick={() => {confirmCreatePlayer()}}
                                        className={classes.button}> Create </Button>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Paper>
    )
};

export default PlayersForm
