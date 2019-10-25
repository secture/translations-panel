import React from "react";

import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {UserState} from "../../store/user/types";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

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
    textField: {
        width: '100%'
    },
    button: {
        margin: theme.spacing(1),
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

interface formState {
    user: UserState,
    setShowForm: any
}

const FormUsers = ({user, setShowForm}: formState) => {
    const classes = formUserStyles();
    const sendForm = () => {
        //send for to service
        console.log(user);
    };

    return (
        <form className={classes.form} onSubmit={sendForm}>
            <Container className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            value={user.name}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-name"
                            label="Email"
                            className={classes.textField}
                            value={user.email}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-name"
                            label="Role"
                            className={classes.textField}
                            value={user.privilege}
                            margin="normal"
                        />
                    </Grid>
                    {user.associatedLanguages.map((language: string) => (
                        <Grid item xs={12} md={8} lg={9}>
                            <TextField
                                id="standard-name"
                                label="language"
                                className={classes.textField}
                                value={language}
                                margin="normal"
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12} className={classes.actions}>
                        <Button variant="outlined" color="secondary" className={classes.button} onClick={() => setShowForm(false)} >
                            Back
                        </Button>
                        <Button variant="outlined" color="primary" className={classes.button}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </form>
    )
};

export default FormUsers

/*
<Grid container spacing={3}>
    <form onSubmit={sendForm}>
        {Object.keys(user).map((key: string) => (
            <Grid item xs={12} md={4} lg={6}>
                <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={user[key]}
                    margin="normal"
                />
            </Grid>
        ))}
    </form>
</Grid>
*/
