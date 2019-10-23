import React from 'react';
import { useSelector } from 'react-redux'
import { TranslationsStore } from "../store/types";
import { UserState } from "../store/user/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import {dashboardViewStyles} from "../styles/dashboard";

const LocaleView = () => {
    const classes = dashboardViewStyles();
    const user: UserState = useSelector((state: TranslationsStore) => state.user);
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <div>Locale View</div>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
};

export default LocaleView;
