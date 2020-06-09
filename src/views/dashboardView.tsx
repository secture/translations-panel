import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import history from "../history";

/* Material UI */
import {Grid, Container, Typography, Button, Card, CardActionArea, CardActions, CardContent} from "@material-ui/core";
import {dashboardViewStyles} from "styles/dashboard";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

/* Services */
import {Bar} from 'react-chartjs-2';

import {getTranslationsStats} from "services/translations";
import {TranslationStatsState} from "store/translations/types";
import {TranslationsStore} from "store/types";
import {UserState} from "store/user/types";
import {LanguageState} from "store/languages/types";
import {setLanguageFilter} from "store/filters/actions";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const DashboardView: React.FC<any> = (props: AppProps) => {
        const classes = dashboardViewStyles();
        useEffect(() => {
            props.getTranslationsStatsActions().then((response: any) => {
            });
        }, []);

        const navigateToTranslation = (language: LanguageState) => {
            props.setLanguageFilterActions(language);
            history.push('/dashboard/translations');
        };

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth={false} className={classes.container}>
                    <Grid container spacing={3}>
                        {props.translationsStats.map((stat: TranslationStatsState) => (
                            props.user.associatedLanguages.find(element => element.key === stat.locale.key) ?
                                <Grid item xs={12} md={6} xl={3}>
                                    <Card onClick={() => {
                                        navigateToTranslation(stat.locale)
                                    }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {stat.locale.name}
                                                            ({stat.locale.key})
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography className={classes.subHeader} color="textSecondary">
                                                            ForPlayers:
                                                            {stat.locale.localeForPlayers ? <CheckCircleIcon/> :
                                                                <CancelIcon/>}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Bar
                                                    data={{
                                                        labels: [
                                                            'Confirmed',
                                                            'Unconfirmed',
                                                            'Translated',
                                                            'Untranslated'
                                                        ],
                                                        datasets: [{
                                                            label: false,
                                                            data: [
                                                                stat.translatedAndConfirmed,
                                                                stat.translatedAndUnconfirmed,
                                                                stat.translatedAndConfirmed + stat.translatedAndUnconfirmed,
                                                                stat.untranslated,
                                                            ],
                                                            backgroundColor: [
                                                                '#3cffa4',
                                                                '#ebc66e',
                                                                '#ff6b68'
                                                            ],
                                                            hoverBackgroundColor: [
                                                                '#3cffa4',
                                                                '#ebc66e',
                                                                '#ff6b68'
                                                            ]
                                                        }]
                                                    }}
                                                    width={100}
                                                    height={50}
                                                    options={{
                                                        legend: {
                                                            display: false
                                                        },
                                                    }}
                                                />
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary"
                                                    onClick={() => {
                                                        navigateToTranslation(stat.locale)
                                                    }}>
                                                Show translations
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid> : null
                        ))}
                    </Grid>
                </Container>
            </main>
        )
    }
;

const mapStateToProps = (store: TranslationsStore) => {
    return {
        translationsStats: store.translations.stats,
        user: store.user,
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getTranslationsStatsActions: () => dispatch(getTranslationsStats()),
        setLanguageFilterActions: (data: LanguageState) => dispatch(setLanguageFilter(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashboardView);
