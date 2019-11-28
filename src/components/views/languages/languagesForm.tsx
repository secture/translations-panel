import React, {useState} from "react";
import {
    Button,
    createStyles,
    Grid,
    makeStyles,
    Switch,
    TextField,
    Theme,
    Typography,
    Paper,
    Container,
    FormControlLabel
} from "@material-ui/core";
import {LanguageState} from "store/languages/types";
import {dashboardViewStyles} from "styles/dashboard";

const formUserStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    form: {
        width: '100%'
    }
}));

interface PropsLanguagesForm {
    showForm: boolean,
    setShowForm: (show: boolean) => void,
    editForm: boolean,
    languageSelected: LanguageState,
    onEditLanguage: (language: LanguageState) => void,
    onAddLanguage: (language: LanguageState) => void,
}

const LanguagesForm: React.FC<any> = (props: PropsLanguagesForm) => {
    const classes = formUserStyles();
    const globalStyle = dashboardViewStyles();
    const [language, setLanguage] = useState(props.languageSelected);

    const changedValues = (e: any, property: string) => {
        setLanguage({
            ...language,
            [property]: e.target.value
        });
    };

    const confirmEditLanguage = () => {
        props.setShowForm(false);
        props.onEditLanguage(language);
    };

    const confirmCreateLanguage = () => {
        props.setShowForm(false);
        props.onAddLanguage(language);
    };

    const changeValuesBoolean = (e: any, property: string) => {
        setLanguage({
            ...language,
            [property]: e.target.value.toLowerCase() !== "true"
        });
    };

    return (
        <Paper className={classes.root}>
            <form className={classes.form}>
                <Container maxWidth={false} className={globalStyle.container}>
                    <Grid container spacing={2}>
                        <Grid container item direction="row" justify="center" xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {props.editForm ?
                                    'Language Edition whose ID is: ' + props.languageSelected.id :
                                    'Create a new Language'
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
                                value={language.key}
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
                                value={language.icon}
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
                                value={language.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch checked={language.localeForPlayers}
                                            onChange={(e) => changeValuesBoolean(e, 'localeForPlayers')}
                                            value={language.localeForPlayers}
                                            color="primary"/>
                                }
                                label="Language for players"
                            />
                        </Grid>
                        <Grid container item direction="row" justify="flex-end" xs={12}>
                            <Button className={globalStyle.button}
                                    onClick={() => props.setShowForm(false)}>Back</Button>
                            {props.editForm ? (
                                <Button variant="contained" color="primary"
                                        onClick={() => {
                                            confirmEditLanguage()
                                        }}
                                        className={globalStyle.button}> Save </Button>
                            ) : (
                                <Button variant="contained" color="primary"
                                        onClick={() => {
                                            confirmCreateLanguage()
                                        }}
                                        className={globalStyle.button}> Create </Button>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Paper>
    )
};

export default LanguagesForm;
