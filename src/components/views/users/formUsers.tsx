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
import {dashboardViewStyles} from "styles/dashboard";

const formUserStyles = makeStyles((theme: Theme) => createStyles({
    form: {
       width: '100%'
    }
}));

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const FormUsers = (props: AppProps) => {
    const classes = formUserStyles();
    const globalStyle = dashboardViewStyles();

    const [updatedUser, setUser]: any = useState(props.user);
    const handleChangedValues = (property: string, value: any) => {
        setUser({...updatedUser, [property]: value});
    };

    const [languagesUser, setLanguagesUser]: any = useState({});
    const handleChangeLanguages = (payload: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLanguagesUser({ ...languagesUser, [payload.data.key]: {isUserLanguage: event.target.checked, data: payload.data}});
    };

    const setLanguagesUserUpdated = () => {
        updatedUser.associatedLanguages = [];
        Object.keys(languagesUser).map((key: any) => {
            if (languagesUser[key].isUserLanguage === true) {
                updatedUser.associatedLanguages.push(languagesUser[key].data.id);
            }
        })
    };

    const sendForm = () => {
        setLanguagesUserUpdated();
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
        let languagesView: any = {};
        props.languages.forEach((language: any) => {
            (updatedUser.associatedLanguages !== [] && updatedUser.associatedLanguages.find((language: AssociatedLanguage) => language.key === language.key)) ?
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

    return (
        <form className={classes.form} onSubmit={sendForm}>
            <Container maxWidth={false} className={globalStyle.container}>
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
                        <FormControl component="fieldset" className={globalStyle.formControl}>
                            <FormLabel component="legend">Languages</FormLabel>
                            <FormGroup>
                                {Object.keys(languagesUser).map((key: any) => ( <FormControlLabel
                                        control={<Checkbox checked={languagesUser[key].isUserLanguage} onChange={handleChangeLanguages(languagesUser[key])} value={key} />}
                                label={languagesUser[key].data.name}/>
                                ))}
                            </FormGroup>
                            <FormHelperText>Select languages for user</FormHelperText>
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
    )
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        languages: store.languages,
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
