import React, {useState} from "react";
import {PlayerState} from "store/players/types";
import {LanguageState} from "store/languages/types";
import {TranslationState} from "store/translations/types";
import {
    Button,
    Grid,
    TextField,
    Typography,
    Paper,
    Switch,
    Container,
    FormControlLabel,
    FormGroup
} from "@material-ui/core";
import {formStyles} from 'styles/form'
import {prop} from "components/common/utilsForm";

interface PropsPlayersForm {
    playerSelected: PlayerState,
    onEditPlayer: (player: PlayerState) => void,
    onAddPlayer: (player: PlayerState) => void,
    onConfirmPlayerTranslation: (player: PlayerState, language: LanguageState) => void,
    onUnConfirmPlayerTranslation: (player: PlayerState, language: LanguageState) => void,
    onRejectPlayerTranslation: (player: PlayerState, language: LanguageState) => void,
    languages: LanguageState[]
    editForm: boolean
    showForm: boolean,
    setShowForm: (show: boolean) => void,
}

const PlayersForm: React.FC<any> = (props: PropsPlayersForm) => {
    const classes = formStyles();
    const [player, setPlayer] = useState<PlayerState>(props.playerSelected);

    const changedValues = (value: any, property: string, key: string, shortName?: boolean) => {
        setPlayer({
            ...player,
            [property]: (key === 'noKey') ? value : {
                ...(shortName ? player.shortName : player.largeName),
                [key] : value
            }
        });
    };

    const changeValueByLanguage = (e: any, property: keyof PlayerState, language: LanguageState) => {
        setPlayer({
            ...player as PlayerState,
            [property]: {
                ...player[property] as PlayerState,
                [language.key]: e.target.value.toLowerCase() !== "true"
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

    const rejectPlayers = (language: LanguageState) => {
        return (
            <FormGroup row>
                <FormControlLabel
                    key={'switch_reject' + language.key}
                    disabled={!props.editForm || prop((player.koTranslations as any), language.key, false)}
                    control={
                        <Switch
                            name={'switch_reject' + language.key}
                            checked={prop((player.koTranslations as any), language.key, false)}
                            onChange={(e) => {
                                props.onRejectPlayerTranslation(player, language);
                                changeValueByLanguage(e, 'koTranslations', language);
                            }}
                            value={prop((player.koTranslations as any), language.key, false)}
                            color="primary"
                        />
                    }
                    label="Rejected"
                />
            </FormGroup>
        )
    };

    const confirmedPlayers = (language: LanguageState) => {
        return (
            <FormGroup row>
                <FormControlLabel
                    key={'switch_confirm' + language.key}
                    disabled={!props.editForm}
                    control={
                        <Switch
                            name={'switch_confirm' + language.key}
                            checked={prop((player.confirmedTranslations as any), language.key, false)}
                            onChange={(e) => {
                                checkedConfirmUnconfirmed(e.target.value.toLowerCase(), 'confirmedTranslations', language);
                                changeValueByLanguage(e, 'confirmedTranslations', language);
                            }}
                            value={prop((player.confirmedTranslations as any), language.key, false)}
                            color="primary"
                        />
                    }
                    label="Confirmed"
                />
            </FormGroup>
        )
    };

    const checkedConfirmUnconfirmed = (value: any, property: keyof TranslationState, language: LanguageState) => {
        (value !== "true") ?
            props.onConfirmPlayerTranslation(player, language) :
            props.onUnConfirmPlayerTranslation(player, language);
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
                            {props.languages.map((language: LanguageState) => {
                                return (
                                    language.localeForPlayers && <div>
                                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                            <Typography variant="body2" component="p">
                                                {language.name}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                ({language.key})
                                            </Typography>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            {confirmedPlayers(language)}
                                            {rejectPlayers(language)}
                                        </div>
                                    </div>
                                )
                            })}
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
                            <Button variant="outlined" color="secondary"
                                    className={classes.button} onClick={() => props.setShowForm(false)}>Back</Button>
                            {props.editForm ? (
                                <Button variant="outlined" color="primary"
                                        onClick={() => {confirmEditPlayer()}}
                                        className={classes.button}> Save </Button>
                            ) : (
                                <Button variant="outlined" color="primary"
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
