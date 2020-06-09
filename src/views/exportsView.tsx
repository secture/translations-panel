import React from 'react';
import {useSelector} from 'react-redux'
import {TranslationsStore} from "store/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import {dashboardViewStyles} from "styles/dashboard";

/*Components*/
import Exports from "components/views/exports/exports";

const ExportsView = () => {
    const classes = dashboardViewStyles();
    const tags: string[] = useSelector((state: TranslationsStore) => state.tags);
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    {tags.map((tag: string) => (
                        <Grid item xs={12} md={4} lg={4} key={'tag_' + tag}>
                            <Exports tag={tag}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    )
};

export default ExportsView;
