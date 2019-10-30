import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux'
import {TranslationsStore} from "../store/types";
import {UserState} from "../store/user/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import {dashboardViewStyles} from "../styles/dashboard";
import TranslationsList from "../components/translations/translationsList";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getAllTranslations} from "../services/translations";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const TranslationsView: React.FC<any> = (props: AppProps) => {
    useEffect(() => {
        props.getAllTranslationsActions().then((response: any) => {
        });
    }, []);
    const classes = dashboardViewStyles();
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TranslationsList translations={props.translations} tags={props.tags} onDeleteLocale={null}
                                          onEditLocale={null} onAddLocale={null}/>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        translations: store.translations,
        tags: store.tags
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllTranslationsActions: () => dispatch(getAllTranslations()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslationsView);

