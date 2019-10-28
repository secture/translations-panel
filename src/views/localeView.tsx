import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux'
import {TranslationsStore} from "../store/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import {dashboardViewStyles} from "../styles/dashboard";
import LocalesList from "../components/locales/localesList";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {deleteLocaleById, editLocaleById, getAllLocales} from "../services/locale";
import {LocaleState} from "../store/locale/types";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const LocaleView: React.FC<any> = (props: AppProps) => {

    useEffect(() => {
        props.getAllLocaleActions().then((response: any) => {
        });
    }, []);

    const onDeleteLocale = (data: LocaleState) => {
        props.deleteLocaleByIdActions(data).then((response: any) => {
        })
    };
    const onEditLocale = (data: LocaleState) => {
        props.editLocaleByIdActions(data).then((response: any) => {
        })
    };

    const classes = dashboardViewStyles();
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <LocalesList locales={props.locale} onDeleteLocale={onDeleteLocale}
                                     onEditLocale={onEditLocale}/>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        locale: store.locale
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllLocaleActions: () => dispatch(getAllLocales()),
        deleteLocaleByIdActions: (data: LocaleState) => dispatch(deleteLocaleById(data)),
        editLocaleByIdActions: (data: LocaleState) => dispatch(editLocaleById(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LocaleView);
