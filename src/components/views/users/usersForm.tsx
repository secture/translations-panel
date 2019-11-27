import React, {useEffect, useState} from "react";
import {LanguageState} from "store/languages/types";
import {UserState} from "store/user/types";

import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {
    Grid,
    Container,
    TextField,
    Button,
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Checkbox,
    Radio,
    RadioGroup,
    Paper
} from "@material-ui/core";
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

interface PropsUserForm {
    user: UserState,
    userSelected: UserState,
    languages: LanguageState[],
    roles: string[],
    editForm: boolean,
    showForm: boolean,
    onAddUser: (user: UserState) => void,
    onEditUser: (user: UserState) => void,
    setShowForm: (show: boolean) => void,
}

const UsersForm = (props: PropsUserForm) => {
    const classes = formUserStyles();
    const globalStyle = dashboardViewStyles();

    const [userSelected, setUserSelected]: any = useState(props.userSelected);
    const handleChangedValues = (property: string, value: any) => {
        setUserSelected({...userSelected, [property]: value});
    };

    const [languagesUser, setLanguagesUser]: any = useState({});
    const handleChangeLanguages = (payload: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLanguagesUser({
            ...languagesUser,
            [payload.data.key]: {isUserLanguage: event.target.checked, data: payload.data}
        });
    };

    const setLanguagesUserUpdated = () => {
        userSelected.associatedLanguages = [];
        Object.keys(languagesUser).map((key: any) => {
            if (languagesUser[key].isUserLanguage === true) {
                userSelected.associatedLanguages.push(languagesUser[key].data.id);
            }
        })
    };

    useEffect(() => {
        let languagesView: any = {};
        props.languages.forEach((language: any) => {
            (userSelected.associatedLanguages !== [] && userSelected.associatedLanguages.find((associatedLanguage: LanguageState) => associatedLanguage.key === language.key)) ?
                languagesView[language.key] = {
                    isUserLanguage: true,
                    data: language,
                } :
                languagesView[language.key] = {
                    isUserLanguage: false,
                    data: language
                };
        });
        setLanguagesUser(languagesView)
    }, []);

    const confirmCreateUser = () => {
        props.setShowForm(false);
        setLanguagesUserUpdated();
        props.onAddUser(userSelected);
    };

    const confirmEditUser = () => {
        props.setShowForm(false);
        setLanguagesUserUpdated();
        props.onEditUser(userSelected);
    };

    return (
        <Paper className={classes.root}>
            <form className={classes.form}>
                <Container maxWidth={false} className={globalStyle.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="name"
                                label="Name"
                                fullWidth
                                value={userSelected.name}
                                margin="normal"
                                onChange={(e) => handleChangedValues('name', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                label="Email"
                                fullWidth
                                value={userSelected.email}
                                margin="normal"
                                onChange={(e) => handleChangedValues('email', e.target.value)}
                            />
                        </Grid>
                        {!props.editForm && <Grid item xs={12}>
                            <TextField
                                id="password"
                                label="Password"
                                fullWidth
                                value={userSelected.password}
                                margin="normal"
                                onChange={(e) => handleChangedValues('password', e.target.value)}
                            />
                        </Grid>}
                        <Grid item xs={12}>
                            <FormControl component="fieldset" className={globalStyle.formControl}>
                                <FormLabel component="legend">Privilege</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={userSelected.privilege}
                                            onChange={(e) => handleChangedValues('privilege', e.target.value)} row>
                                    {props.roles.map((role: string) => (
                                        <FormControlLabel value={role} control={<Radio/>} label={role}
                                                          disabled={props.user.privilege !== 'Admin'}/>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" className={globalStyle.formControl}>
                                <FormLabel component="legend">Languages</FormLabel>
                                <FormGroup row>
                                    {Object.keys(languagesUser).map((key: any) => (<FormControlLabel
                                            control={<Checkbox checked={languagesUser[key].isUserLanguage}
                                                               onChange={handleChangeLanguages(languagesUser[key])}
                                                               value={key}/>}
                                            label={languagesUser[key].data.name}/>
                                    ))}
                                </FormGroup>
                                <FormHelperText>Select languages for user</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className={globalStyle.actions}>
                            <Button variant="outlined" color="secondary" className={globalStyle.button}
                                    onClick={() => props.setShowForm(false)}>
                                Back
                            </Button>
                            {props.editForm ? (
                                <Button variant="outlined"
                                        color="primary"
                                        className={globalStyle.button}
                                        onClick={() => {
                                            confirmEditUser()
                                        }}>
                                    Save
                                </Button>
                            ) : (
                                <Button variant="outlined"
                                        color="primary"
                                        className={globalStyle.button}
                                        onClick={() => {
                                            confirmCreateUser()
                                        }}>
                                    Create
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Paper>
    )
};

export default UsersForm;
