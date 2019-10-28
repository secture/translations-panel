import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import { TranslationsStore } from "../store/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import {dashboardViewStyles} from "../styles/dashboard";
import User from "../components/users/users";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getUsers} from "../services/user";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const UsersView = (props: AppProps) => {
    const classes = dashboardViewStyles();

    useEffect(() => {
        props.getUsersAction();
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <User users={props.usersToState}/>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        usersToState: store.users
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getUsersAction: () => dispatch(getUsers()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersView);

