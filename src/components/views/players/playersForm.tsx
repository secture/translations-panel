import React, {useState} from "react";
import {PlayerState} from "store/players/types";
import {LanguageState} from "store/languages/types";
import {ConfirmedTranslations} from "store/translations/types";

import {Button, Grid, TextField, Typography, Paper, Switch, Container, FormControl, FormLabel, FormControlLabel} from "@material-ui/core";
import {formStyles} from 'styles/form'

interface PropsPlayersForm {
    playerSelected: PlayerState,
    onEditPlayer: (player: PlayerState) => void,
    onAddPlayer: (player: PlayerState) => void,
    onConfirmPlayerTranslation: (id: string, languageKey: string) => void,
    languages: LanguageState[]
    editForm: boolean
    showForm: boolean,
    setShowForm: (show: boolean) => void,
}

const PlayersForm: React.FC<any> = (props: PropsPlayersForm) => {
    const classes = formStyles();
    const [player, setPlayer] = useState(props.playerSelected);
    const [confirmedPlayers, setConfirmedPlayers] = useState<ConfirmedTranslations>(props.playerSelected.confirmedTranslations);

    const changedValues = (value: any, property: string, key: string, shortName?: boolean) => {
        setPlayer({
            ...player,
            [property]: (key === 'noKey') ? value : {
                ...(shortName ? player.shortName : player.largeName),
                [key] : value
            }
        });
    };

    const changedConfirmedPlayers = (value: any, key: string) => {
        setConfirmedPlayers({
            ...confirmedPlayers,
            [key]: (value === 'false')
        });
    };

    const confirmEditPlayer = () => {
        props.setShowForm(false);
        player.confirmedTranslations = confirmedPlayers;
        props.onEditPlayer(player);
    };

    const confirmCreatePlayer = () => {
        props.setShowForm(false);
        props.onAddPlayer(player);
    };

    const namePlayersByLanguage = (shortName: boolean) => {
        return (
            <div>
                {props.languages.map((language: LanguageState) => (
                    language.localeForPlayers && <TextField
                        id={language.key}
                        name={language.key}
                        label={language.key}
                        fullWidth
                        autoComplete="fname"
                        onChange={(e) => changedValues(e.target.value, shortName ? 'shortName': 'largeName',`${language.key}`, shortName)}
                        value={shortName ? player.shortName[language.key]: player.largeName[language.key]}
                    />))}
            </div>
        )
    };

    const confirmedPlayersByLanguage = () => {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Confirm player translations by language</FormLabel>
                {props.languages.map((language: LanguageState) => {
                    return (language.localeForPlayers && <FormControlLabel
                        control={<Switch
                            disabled={confirmedPlayers[language.key] || !props.editForm}
                            checked={confirmedPlayers[language.key]}
                            onChange={(e) => {changedConfirmedPlayers(e.target.value, `${language.key}`);
                                props.onConfirmPlayerTranslation(props.playerSelected.id, language.key)}}
                            value={confirmedPlayers[language.key]}
                            inputProps={{ 'aria-label': 'primary checkbox' }}/>}
                        label={language.key}
                    />)
                })}
            </FormControl>
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
                                onChange={(e) => changedValues(parseInt(e.target.value), 'playerMasterId', 'noKey')}
                                value={player.playerMasterId}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Short Name
                            </Typography>
                            {namePlayersByLanguage(true)}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Large Name
                            </Typography>
                            {namePlayersByLanguage(false)}
                        </Grid>
                        <Grid item xs={12}>
                            {confirmedPlayersByLanguage()}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="team"
                                name="team"
                                label="Team"
                                fullWidth
                                autoComplete="fname"
                                onChange={(e) => changedValues(e.target.value, 'team', 'noKey')}
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
                                onChange={(e) => changedValues(e.target.value, 'comments', 'noKey')}
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
