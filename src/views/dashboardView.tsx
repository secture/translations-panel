import React from 'react';
import { useSelector } from 'react-redux'
import { TranslationsStore } from "../store/types";
import { UserState } from "../store/user/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import {dashboardViewStyles} from "../styles/dashboard";

const DashboardView = () => {
    const classes = dashboardViewStyles();
    const user: UserState = useSelector((state: TranslationsStore) => state.user);
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <div>{user.email}</div>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <div>{user.name}</div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>{user.privilege}</div>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
};

export default DashboardView;
