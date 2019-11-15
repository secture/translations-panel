import React, {useEffect, useState} from "react";

import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {TranslationsStore} from "store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import {AssociatedLanguage, UserState} from "store/user/types";
import {createUser, updateUser} from "services/user";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
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

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const UsersForm = (props: AppProps) => {
    const classes = formUserStyles();
    const globalStyle = dashboardViewStyles();

    const [updatedUser, setUser]: any = useState(props.user);
    const handleChangedValues = (property: string, value: any) => {
        setUser({...updatedUser, [property]: value});
    };

    const [localesUser, setLocalesUser]: any = useState({});
    const handleChangeLocales = (payload: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalesUser({ ...localesUser, [payload.data.key]: {isUserLocale: event.target.checked, data: payload.data}});
    };

    const setLocalesUserUpdated = () => {
        updatedUser.associatedLanguages = [];
        Object.keys(localesUser).map((key: any) => {
            if (localesUser[key].isUserLocale === true) {
                updatedUser.associatedLanguages.push(localesUser[key].data.id);
            }
        })
    };

    const sendForm = () => {
        setLocalesUserUpdated();
        switch (props.typeForm) {
            case 'create':
                props.createUserAction(updatedUser).then((user: UserState) => {
                    (user !== null) ? alert('User creado') : alert('no ha sido posible crear el usuario')
                });
                break;
            case 'update':
                props.updateUserAction(updatedUser).then((user: UserState) => {
                    (user !== null) ? alert('User editado') : alert('no ha sido posible editar el usuario')
                });
                break;
        }
        props.setShowForm(false);
    };

    useEffect(() => {
        let localesView: any = {};
        props.locales.forEach((locale: any) => {
            (updatedUser.associatedLanguages !== [] && updatedUser.associatedLanguages.find((language: AssociatedLanguage) => language.key === locale.key)) ?
                localesView[locale.key] = {
                    isUserLocale: true,
                    data: locale,
                } :
                localesView[locale.key] = {
                    isUserLocale: false,
                    data: locale
                 };
        });
        setLocalesUser(localesView)
    }, []);

    return (
        <Paper className={classes.root}>
            <form className={classes.form} onSubmit={sendForm}>
                <Container className={globalStyle.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="name"
                                label="Name"
                                fullWidth
                                value={updatedUser.name}
                                margin="normal"
                                onChange={(e) => handleChangedValues('name', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                label="Email"
                                fullWidth
                                value={updatedUser.email}
                                margin="normal"
                                onChange={(e) => handleChangedValues('email', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" className={globalStyle.formControl}>
                                <FormLabel component="legend">Privilege</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={updatedUser.privilege} onChange={(e) => handleChangedValues('privilege', e.target.value)} row>
                                    {props.roles.map((role: string) => (
                                        <FormControlLabel value={role} control={<Radio />} label={role} disabled={props.user.privilege !== 'Admin'}/>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {props.typeForm === 'create' && <Grid item xs={12}>
                            <TextField
                                id="password"
                                label="Password"
                                fullWidth
                                value={updatedUser.password}
                                margin="normal"
                                onChange={(e) => handleChangedValues('password', e.target.value)}
                            />
                        </Grid>}
                        <Grid item xs={12}>
                            <FormControl component="fieldset" className={globalStyle.formControl}>
                                <FormLabel component="legend">Locales</FormLabel>
                                <FormGroup row>
                                    {Object.keys(localesUser).map((key: any) => ( <FormControlLabel
                                            control={<Checkbox checked={localesUser[key].isUserLocale} onChange={handleChangeLocales(localesUser[key])} value={key} />}
                                    label={localesUser[key].data.name}/>
                                    ))}
                                </FormGroup>
                                <FormHelperText>Select locales for user</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className={globalStyle.actions}>
                            <Button variant="outlined" color="secondary" className={globalStyle.button} onClick={() => props.setShowForm(false)} >
                                Back
                            </Button>
                            <Button variant="outlined" color="primary" className={globalStyle.button} onClick={() => sendForm()}>
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Paper>
    )
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        user: props.user,
        locales: store.locales,
        roles: store.roles,
        typeForm: props.typeForm,
        setShowForm: props.setShowForm,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        createUserAction: (user: UserState) => dispatch(createUser(user)),
        updateUserAction: (user: UserState) => dispatch(updateUser(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersForm);