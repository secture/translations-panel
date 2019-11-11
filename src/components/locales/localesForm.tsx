import React, {useState} from "react";
import {Button, Grid, Switch, TextField, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {LocaleState} from "../../store/locales/types";
import Container from "@material-ui/core/Container";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {formStyles} from '../../styles/form'

interface PropsLocalesForm {
    showForm: boolean,
    setShowForm: (show: boolean) => void,
    editForm: boolean,
    localeSelected: LocaleState,
    onEditLocale: (locale: LocaleState) => void,
    onAddLocale: (locale: LocaleState) => void,
}

const LocalesForm: React.FC<any> = (props: PropsLocalesForm) => {
    const classes = formStyles();
    const [locale, setLocale] = useState(props.localeSelected);

    const changedValues = (e: any, property: string) => {
        setLocale({
            ...locale,
            [property]: e.target.value
        });
    };

    const confirmEditLocale = () => {
        props.setShowForm(false);
        props.onEditLocale(locale);
    };

    const confirmCreateLocale = () => {
        props.setShowForm(false);
        props.onAddLocale(locale);
    };

    const changeValuesBoolean = (e: any, property: string) => {
        setLocale({
            ...locale,
            [property]: e.target.value.toLowerCase() !== "true"
        });
    };

    return (
        <Paper className={classes.root}>
            <form className={classes.form}>
                <Container className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid container item direction="row" justify="center" xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {props.editForm ?
                                    'Locale Edition whose ID is: ' + props.localeSelected.id :
                                    'Create a new Locale'
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="key"
                                name="key"
                                label="Key"
                                fullWidth
                                autoComplete="fname"
                                onChange={(e) => changedValues(e, 'key')}
                                value={locale.key}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="flag"
                                name="flag"
                                label="flag"
                                fullWidth
                                autoComplete="fname"
                                onChange={(e) => changedValues(e, 'icon')}
                                value={locale.icon}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                onChange={(e) => changedValues(e, 'name')}
                                autoComplete="fname"
                                value={locale.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch checked={locale.localeForPlayers}
                                            onChange={(e) => changeValuesBoolean(e, 'localeForPlayers')}
                                            value={locale.localeForPlayers}
                                            color="primary"/>
                                }
                                label="Locale for players"
                            />
                        </Grid>
                        <Grid container item direction="row" justify="flex-end" xs={12}>
                            <Button className={classes.button} onClick={() => props.setShowForm(false)}>Back</Button>
                            {props.editForm ? (
                                <Button variant="contained" color="primary"
                                        onClick={() => {confirmEditLocale()}}
                                        className={classes.button}> Save </Button>
                            ) : (
                                <Button variant="contained" color="primary"
                                        onClick={() => {confirmCreateLocale()}}
                                        className={classes.button}> Create </Button>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Paper>
    )
};

export default LocalesForm;
