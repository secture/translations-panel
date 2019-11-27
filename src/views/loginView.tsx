import React, {useState} from 'react';
import {connect} from "react-redux";
import {ThunkDispatch} from 'redux-thunk'
import {AnyAction} from 'redux';
import {UserLoginDTO} from "store/auth/types";
import {TranslationsStore} from "store/types";
import {login} from 'services/auth'
import history from "../history";

/* Material UI */
import {Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Paper, Grid, Typography} from '@material-ui/core';
import {makeStyles, Theme} from "@material-ui/core/styles";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const loginViewStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const LoginView: React.FC<any> = (props: AppProps) => {
    const initialState: UserLoginDTO = {
        email: '',
        password: ''
    };
    const [user, setValues] = useState(initialState);
    const classes = loginViewStyles();

    const handleSubmit = (e: any) => {
        props.loginAction(user).then((response: any) => {
            (response !== null) ? history.push('/dashboard') : alert('Error al iniciar sesion');
        });
        e.preventDefault();
    };


    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setValues({...user, [name]: value})
    };

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        auth: store.auth
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        loginAction: (user: UserLoginDTO) => dispatch(login(user)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginView);
