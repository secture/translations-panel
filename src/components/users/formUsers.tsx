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
import {TranslationsStore} from "../../store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import {getAllLocales} from "../../services/locale";
import {UserState} from "../../store/user/types";
import {createUser, updateUser} from "../../services/user";

const formUserStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    form: {
       width: '100%'
    },
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const FormUsers = (props: AppProps) => {
    const classes = formUserStyles();

    const [updatedUser, setUser]: any = useState(props.user);
    const handleChangedValues = (property: string, value: any) => {
        setUser({...updatedUser, [property]: value});
    };

    const [localesForm, setLocalesForm]: any = useState({});
    const handleChangeLocales = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalesForm({ ...localesForm, [key]: event.target.checked });
    };

    useEffect(() => {
        let localesView: any = {};
        props.locales.forEach((locale: any) => {
            (props.user.associatedLanguages.find((language: any) => language === locale.key)) ? localesView[locale.key] = true : localesView[locale.key] = false;
        });
        setLocalesForm(localesView);
    }, []);

    const setLocalesUserUpdated = () => {
        updatedUser.associatedLanguages = [];
        Object.keys(localesForm).map((key: any) => {
            if (localesForm[key] === true) {
                updatedUser.associatedLanguages.push(key);
            }
        })
    };

    const sendForm = () => {
        setLocalesUserUpdated();
        switch (props.action) {
            case 'create':
                props.createUserAction(updatedUser).then((response: any) => {
                    console.log(response);
                });
                break;
            case 'update':
                props.updateUserAction(updatedUser).then((response: any) => {
                    console.log(response);
                });
                break;
            default:
                alert('no se ha podido crear o editar el usuarios');
                break;
        }
    };

    return (
        <form className={classes.form} onSubmit={sendForm}>
            <Container className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-name"
                            label="Name"
                            fullWidth
                            value={updatedUser.name}
                            margin="normal"
                            onChange={(e) => handleChangedValues(e.target.name, e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-name"
                            label="Email"
                            fullWidth
                            value={updatedUser.email}
                            margin="normal"
                            onChange={(e) => handleChangedValues(e.target.name, e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-name"
                            label="Role"
                            fullWidth
                            value={updatedUser.privilege}
                            margin="normal"
                            onChange={(e) => handleChangedValues(e.target.name, e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Locales</FormLabel>
                            <FormGroup>
                                {Object.keys(localesForm).map((key: any) => ( <FormControlLabel
                                        control={<Checkbox checked={localesForm[key]} onChange={handleChangeLocales(key)} value={localesForm[key]} />}
                                label={key}/>
                                ))}
                            </FormGroup>
                            <FormHelperText>Select locales for user</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.actions}>
                        <Button variant="outlined" color="secondary" className={classes.button} onClick={() => props.setShowForm(false)} >
                            Back
                        </Button>
                        <Button variant="outlined" color="primary" className={classes.button} onClick={() => sendForm()}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </form>
    )
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        locales: (store.locale === null || typeof store.locale === 'undefined') ? props.getLocalesAction() : store.locale,
        action: props.action,
        user: props.user,
        setShowForm: props.setShowForm
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getLocalesAction: () => dispatch(getAllLocales()),
        createUserAction: (user: UserState) => dispatch(createUser(user)),
        updateUserAction: (user: UserState) => dispatch(updateUser(user))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FormUsers);
