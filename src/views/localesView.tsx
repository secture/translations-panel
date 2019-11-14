import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {TranslationsStore} from "../store/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import {dashboardViewStyles} from "../styles/dashboard";
import LocalesList from "components/views/locales/localesList";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {addLocale, deleteLocaleById, editLocaleById, getAllLocales} from "../services/locale";
import {LocaleState} from "store/locales/types";
import DeleteDialog from "components/common/deleteDialog";
import LocalesForm from "components/views/locales/localesForm";
import {initialLocale} from "store/locales/reducers";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const LocalesView: React.FC<any> = (props: AppProps) => {

    const [localeSelected, setLocaleSelected] = useState(initialLocale);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };

    useEffect(() => {
        props.getAllLocaleActions();
    }, []);

    const onDeleteLocale = () => {
        props.deleteLocaleByIdActions(localeSelected).then((locale: LocaleState) => {
            (locale !== null) ? alert('Locale eliminaro') : alert('no ha sido posible eliminar el locale')
        });
        setOpenDialog(false);
    };
    const onEditLocale = (locale: LocaleState) => {
        props.editLocaleByIdActions(locale).then((locale: LocaleState) => {
            (locale !== null) ? alert('Locale editado') : alert('no ha sido posible editar el locale')
        })
    };
    const onAddLocale = (locale: LocaleState) => {
        props.addLocaleActions(locale).then((locale: LocaleState) => {
            (locale !== null) ? alert('Locale creado') : alert('no ha sido posible crear el locale')
        })
    };

    const classes = dashboardViewStyles();
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {!showForm ? (
                        <Grid item xs={12}>
                            <LocalesList locales={props.locales}
                                         setLocaleSelected={setLocaleSelected}
                                         showForm={showForm}
                                         setShowForm={setShowForm}
                                         openDialog={updateDialog}
                                         setEditForm={setEditForm}/>
                        </Grid>) : (
                        <Grid item xs={12}>
                            <LocalesForm onEditLocale={onEditLocale}
                                         onAddLocale={onAddLocale}
                                         localeSelected={localeSelected}
                                         showForm={showForm}
                                         setShowForm={setShowForm}
                                         editForm={editForm}/>
                        </Grid>)}
                    <DeleteDialog openDialog={updateDialog}
                                  dialog={dialog}
                                  dialogTitle={"Are you sure to delete this Locale?"}
                                  deleteItem={localeSelected}
                                  deleteFunction={onDeleteLocale}/>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        locales: store.locales
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllLocaleActions: () => dispatch(getAllLocales()),
        deleteLocaleByIdActions: (data: LocaleState) => dispatch(deleteLocaleById(data)),
        editLocaleByIdActions: (data: LocaleState) => dispatch(editLocaleById(data)),
        addLocaleActions: (data: LocaleState) => dispatch(addLocale(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LocalesView);
