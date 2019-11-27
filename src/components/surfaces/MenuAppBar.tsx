import React from 'react';
import {UserState} from "store/user/types";
import {connect, useSelector} from "react-redux";
import {TranslationsStore} from "store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

import CssConditional from "clsx";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {logOut} from "services/auth";
import history from "../../history";

const drawerWidth = 240;

const menuAppBarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
        toolbar: {
            paddingRight: 24,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const MenuAppBar: React.FC<any> = (props: AppProps) => {
    const userAuthenticated: UserState = useSelector((state: TranslationsStore) => state.user);
    const classes = menuAppBarStyles();

    const exit = () => {
        props.logoutAction().then((logoutOk: boolean) => {
            if (logoutOk) {
                history.push('/login');
            }
        })
    };

    return (
        <AppBar position="absolute" className={CssConditional(classes.appBar, props.open_state && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.updateOpen}
                    className={CssConditional(classes.menuButton, props.open_state && classes.menuButtonHidden)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    {userAuthenticated.name}
                </Typography>
                <IconButton onClick={exit} className={classes.button} aria-label="exit" color="inherit">
                    <ExitToAppIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        auth: store.auth,
        open_state: props.open_state,
        updateOpen: props.updateOpen
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        logoutAction: () => dispatch(logOut()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MenuAppBar);
