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

    const [localesUser, setLocalesUser]: any = useState({});
    const handleChangeLocales = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalesUser({ ...localesUser, [key]: event.target.checked });
    };

    const setLocalesUserUpdated = () => {
        updatedUser.associatedLanguages = [];
        Object.keys(localesUser).map((key: any) => {
            if (localesUser[key] === true) {
                updatedUser.associatedLanguages.push(key);
            }
        })
    };

    const sendForm = () => {
        setLocalesUserUpdated();
        switch (props.action) {
            case 'create':
                props.createUserAction(updatedUser).then((response) => {
                    console.log(response);
                });
                break;
            case 'update':
                props.updateUserAction(updatedUser).then((response) => {
                    console.log(response);
                });
                break;
        }
        props.setShowForm(false);
    };

    useEffect(() => {
        let localesView: any = {};
        props.locales.forEach((locale: any) => {
            (updatedUser.associatedLanguages !== [] && updatedUser.associatedLanguages.find((language: any) => language === locale.key)) ?
                localesView[locale.key] = true :
                localesView[locale.key] = false;
        });
        setLocalesUser(localesView)
    }, []);

    return (
        <form className={classes.form} onSubmit={sendForm}>
            <Container className={classes.container}>
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
                        <TextField
                            id="privilege"
                            label="Role"
                            fullWidth
                            value={updatedUser.privilege}
                            margin="normal"
                            onChange={(e) => handleChangedValues('privilege', e.target.value)}
                        />
                    </Grid>
                    {props.action === 'create' && <Grid item xs={12}>
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
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Locales</FormLabel>
                            <FormGroup>
                                {Object.keys(localesUser).map((key: any) => ( <FormControlLabel
                                        control={<Checkbox checked={localesUser[key]} onChange={handleChangeLocales(key)} value={localesUser[key]} />}
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
        locales: store.locale,
        action: props.action,
        user: props.user,
        setShowForm: props.setShowForm
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
)(FormUsers);